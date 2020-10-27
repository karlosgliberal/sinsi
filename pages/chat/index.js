import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import MessageList from '../../componets/MessageList';
import MessageForm from '../../componets/MessageForm';
import ButtonList from '../../componets/ButtonList';
import { getIntentionFromDialogflow } from '../../core/services/dialogflowResponse';
import { addSinsiResponseFirestore } from '../../core/services/addSinsiResponse';
import {
  sinsiText,
  itemsChachara,
  itemsPreguntaFuturo,
  itemsReaccionFuturo,
  itemsEstadistica,
  itemsReaccion,
} from '../../core/sinsiText';

import p5Wrapper from '../../componets/P5Wrapper';
import { lineas } from '../../sketches/lineas';
import Router from 'next/router';

const P5Wrapper = p5Wrapper();

//Revisar (no funciona si están dentro de la función chat)
let contPreguntas = 0;
let timer;
let preguntaFuturo = false;
let preguntaFuturoEscena = false;
let reaccionFuturo = false;
let preguntaChachara = false;
let numAvisos = 0;
let nextIntention;
let wait = false;
let usuarioProvocado = false;
let lanzarPregunta = false;
let ultimaPreguntaLanzada = '';
let timerActivo = true;

export default function Chat() {
  //valoresde tiempo
  const timeEntreInteciones = 1000;
  const timeControlTecleando = 1200;
  const timeControlNoRespuestaIntencion = 20000;
  const timeGameOver = 4000;
  let timeOutEntradaSinsi = 2000;
  let timeOutEntradaPart = 200;

  const router = useRouter();
  const ref = useRef(null);
  const [widthCanvasWrapper, setWidthCanvasWrapper] = useState(0);
  const [menssagesLista, setMenssageList] = useState([]);
  const [lastIntention, setLastIntention] = useState('');
  const [colorSelect, setColorSelect] = useState('defaut');
  const [botonActivated, setBotonActivate] = useState('hidden');
  const futurologistName = router.query;
  const [countPreguntasFrecuntes, setCountPreguntasFrecuntes] = useState(0);
  const [placeholder, setPlaceholder] = useState('Escribe tu mensaje...');

  const wait = async ms => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  };

  const addMessage = (author, body, intent, time) => {
    let dateMessage = new Date().getTime();
    setPlaceholder('Sinsi esta escribiendo...');
    setMenssageList(menssagesLista => [
      ...menssagesLista,
      {
        author,
        body,
        intent,
        dateMessage,
      },
    ]);
    localStorage.setItem('futureTrip', JSON.stringify(menssagesLista));
  };

  const handleButtoClick = value => {
    setColorSelect(value);
    setBotonActivate('hidden');
    localStorage.setItem(lastIntention, value);
    handleNewMessage(value);
  };

  const handleNewMessage = text => {
    addMessage('Me', text);
    getIntention(text);
  };

  const splitIntention = fulfillmentText => {
    let parts = fulfillmentText.split('#');
    return parts;
  };

  const preguntaColor = fulfillmentText => {
    setBotonActivate('color');
    setPlaceholder('Selecciona una opción');
    return fulfillmentText;
  };

  //Escogemos pregunta aleatoria de charla y la eliminamos para no repetirla
  const escogerPreguntaCharla = () => {
    let random = Math.floor(Math.random() * itemsChachara.length);
    let item = itemsChachara.splice(random, 1);
    if (itemsChachara.length == 0) {
      preguntaChachara = false;
      preguntaFuturo = true;
    }
    return item;
  };

  const isItemReaccion = intention => {
    if (itemsReaccionFuturo.includes(intention)) {
      preguntaFuturo = true;
      let intentionToRemove = itemsReaccionFuturo[intention];
      let item = itemsReaccionFuturo.splice(intentionToRemove, 1);
    }
  };

  const escogerPreguntaFuturo = () => {
    let firstItem = itemsPreguntaFuturo[0];
    let item = itemsPreguntaFuturo.splice(firstItem, 1);
    if (itemsPreguntaFuturo.length == 0) {
      let futureTrip = localStorage.getItem('futureTrip');
      let data = { text: futureTrip };
      const res = addSinsiResponseFirestore(data);
    }
    //setBotonActivate(firstItem);
    preguntaFuturo = false;
    return item;
  };

  const initChachara = (fulfillmentText, intention) => {
    addMessage(
      'Sinsi',
      'Démonos un tiempo de chachara. El tiempo avanzara de acuerdo la calidad de la conversación: *si es estimulante corre lentamente.*',
      intention
    );
    getIntention(escogerPreguntaCharla());
    preguntaChachara = true;
  };

  const initEscena = async (fulfillmentText, intention) => {
    await wait(2000);
    getIntention('futuroPreguntaEscena');
    preguntaFuturoEscena = true;
  };

  const actionIntention = (fulfillmentText, intention) => {
    switch (intention) {
      case 'sinsiGameOver':
        return setTimeout(() => {
          Router.push('/gameover');
        }, timeGameOver);
      case 'estadisticaPreguntaColor':
        return preguntaColor(fulfillmentText, intention);
      case 'estadisticaReaccionColor':
        return initChachara(fulfillmentText, intention);
      case 'futuroReaccionLugar':
        return initEscena(fulfillmentText, intention);
      default:
        console.log('default');
    }
  };

  const getIntention = async intention => {
    if (preguntaFuturoEscena) {
      preguntaFuturoEscena = false;
      return addMessage(
        'Sinsi',
        'Vale te lo has currado',
        'futuroReaccionEscena'
      );
    }
    await wait(500);
    const res = await getIntentionFromDialogflow(intention);
    let resIntentName = res.data.intent.displayName;
    let fallback = res.data.intent.isFallback;
    let fulfillmentText = res.data.fulfillmentText;
    let sentence, intentionInSentece;
    console.log(resIntentName);
    setLastIntention(resIntentName);
    [sentence, intentionInSentece] = splitIntention(fulfillmentText);
    addMessage('Sinsi', sentence, resIntentName, timeOutEntradaPart);

    await wait(timeOutEntradaPart);
    if (intentionInSentece) {
      getIntention(intentionInSentece);
    }
    if (preguntaChachara) {
      clearTimeout(timer);
      timer = setTimeout(getIntention, 1000, escogerPreguntaCharla());
    }

    isItemReaccion(resIntentName);
    if (itemsPreguntaFuturo.length == 0) {
      preguntaFuturo = false;
    }
    if (preguntaFuturo) {
      clearTimeout(timer);
      let preguntaFuturo = escogerPreguntaFuturo();
      timer = setTimeout(getIntention, 500, preguntaFuturo);
      await wait(2000);
      setTimeout(setBotonActivate, 2000, preguntaFuturo);
    }
    actionIntention(fulfillmentText, resIntentName);
    setPlaceholder('Escribe tu mensaje...');
  };

  const futuroPreguntaLugar = fulfillmentText => {
    let resumen =
      'Hemos dado un salto temporal de ' +
      localStorage.getItem('futuroReaccionSaltoTemporal') +
      '. Tras ' +
      localStorage.getItem('futuroReaccionDesencadenante') +
      ', ' +
      localStorage.getItem('futuroReaccionPoblacion') +
      ' están viviendo un futuro ' +
      localStorage.getItem('futuroReaccionTipoFuturo') +
      ', donde, en el área ' +
      localStorage.getItem('futuroReaccionSector') +
      ', el tema más comentado será ' +
      localStorage.getItem('futuroReaccionTema') +
      '.';

    let res = fulfillmentText.replace('%futuroPreguntaLugar%', resumen);

    return res;
  };

  const handleWindowResize = () => {
    setColorSelect('default');
    setWidthCanvasWrapper(ref.current ? ref.current.offsetWidth : 588);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    if (!futurologistName.name) {
      getIntention(`sinsiSinNombre`);
    } else {
      getIntention('azul');
      // getIntention(`sinsiIntroNombre ${futurologistName.name}`);
    }
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <div className="bg-sinsiblue w-screen h-screen flex justify-center">
      <div
        className="w-screen lg:w-1/2 border border-gray-700 flex flex-col justify-between bg-dots"
        ref={ref}
      >
        <P5Wrapper
          sketch={lineas}
          dispatch={handleWindowResize}
          state={{
            widthCanvasWrapper: widthCanvasWrapper,
            text: menssagesLista,
            color: colorSelect,
          }}
        />
        <div className="h-auto overflow-scroll mt-2">
          <MessageList messages={menssagesLista} />
          {botonActivated != 'hidden' && (
            <ButtonList
              onButtonClick={handleButtoClick}
              buttons={sinsiText[botonActivated].preguntas}
            />
          )}
          <MessageForm
            onMessageSend={handleNewMessage}
            placeholder={placeholder}
          />
          {/* <div className="p-6"></div> */}
        </div>
      </div>
    </div>
  );
}
