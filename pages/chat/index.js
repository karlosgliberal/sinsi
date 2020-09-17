import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import MessageList from '../../componets/MessageList';
import MessageForm from '../../componets/MessageForm';
import ButtonList from '../../componets/ButtonList';
import { getIntentionFromDialogflow } from '../../core/services/dialogflowResponse';
import { sinsiText } from '../../core/sinsiText';
import p5Wrapper from '../../componets/P5Wrapper';
import { interaction } from '../../sketches/interaction';
import { simbols } from '../../sketches/simbols';
import { takawo } from '../../sketches/takawo';
import { rosa } from '../../sketches/rosa';
import { codigos } from '../../sketches/codigos';
import { lineas } from '../../sketches/lineas';
import Router from 'next/router';

const P5Wrapper = p5Wrapper();
let contPreguntas = 0;
let itemsChachara = [
  'preguntaHobbies',
  'preguntaOdias',
  'preguntaIntimidad1',
  'preguntaIntimidad2',
  'preguntaIntimidad3',
  'preguntaIntimidad4',
  'preguntaIntimidad5',
  'preguntaIntimidad6',
  'preguntaIntimidad7',
];
let itemsFuturo = [
  'futuroPreguntaSaltoTemporal',
  'futuroPreguntaDesencadenante',
  'futuroPreguntaTipoFuturo',
  'futuroPreguntaPoblacion',
  'futuroPreguntaSector',
  'futuroPreguntaTema',
  'futuroPreguntaLugar',
  'futuroPreguntaEscena',
];
let itemsReaccionFuturo = [
  'futuroReaccionSaltoTemporal',
  'futuroReaccionDesencadenante',
  'futuroReaccionTipoFuturo',
  'futuroReaccionPoblacion',
  'futuroReaccionSector',
  'futuroReaccionTema',
  'futuroReaccionLugar',
  'futuroReaccionEscena'
];
const itemsEstadistica = [
  {
    reaccion: 'estadisticaReaccionEdad',
    pregunta: 'estadisticaPreguntaEdad',
  },
  {
    reaccion: 'estadisticaReaccionGenero',
    pregunta: 'estadisticaPreguntaGenero',
  },
  {
    reaccion: 'estadisticaReaccionColor',
    pregunta: 'estadisticaPreguntaColor',
  },
];

let timer;
let preguntaFuturo = false;
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
  const timeEntreInteciones = 2000;
  const timeControlTecleando = 12000;
  const timeControlNoRespuestaIntencion = 20000;
  const timeGameOver = 1000;
  let timeoutEntradaSinsi = 2500;

  const router = useRouter();
  const ref = useRef(null);
  const [widthCanvasWrapper, setWidthCanvasWrapper] = useState(0);
  const [menssagesLista, setMenssageList] = useState([]);
  const [lastIntention, setLastIntention] = useState('');
  const [botonColorActivated, setBotonColorActivate] = useState(false);
  const [colorSelect, setColorSelect] = useState('defaut');
  const [botonSaltoTemporalActivated, setBotonSaltoTemporalActivate] = useState(
    false
  );
  const [botonTipoFuturoActivated, setBotonTipoFuturoActivate] = useState(
    false
  );
  const futurologistName = router.query;
  const [placeholder, setPlaceholder] = useState('Escribe tu mensaje...');

  const addMessage = (author, body, intent) => {
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
  const getIntention = async intention => {
    if (!intention) {
      if (nextIntention) {
        getIntention(nextIntention);
      }
      return false;
    }

    if (wait) {
      setTimeout(() => {
        wait = false;
        getIntention(intention);
      }, timeEntreInteciones);
      return;
    }

    wait = false;
    nextIntention = null;

    const res = await getIntentionFromDialogflow(intention);
    let resIntentName = res.data.intent.displayName;
    let fallback = res.data.intent.isFallback;
    let fulfillmentText = res.data.fulfillmentText;

    controlPreguntasEstadistica(resIntentName);

    if(timerActivo) {
      controlInactividad(resIntentName);
    }

    let continuar = controlConversacion(
      resIntentName,
      fulfillmentText,
      fallback
    );


    if (continuar) {
      if (resIntentName == 'sinsiGameOver') {
        setTimeout(() => {
          Router.push('/gameover');
        }, timeGameOver);
      } else {
        if (res) setLastIntention(res.data.intent.displayName);
        let parts = fulfillmentText.split('#');
        let sentence = parts[0];

        console.log('mensaje');
        addMessage('Sinsi', sentence, resIntentName);

        if (parts[1]) {
          nextIntention = parts[1];

          if (nextIntention.indexOf('sinsi') !== -1) {
            timeoutEntradaSinsi = 4000;
          }
          setTimeout(() => {
            getIntention(nextIntention);
            return;
          }, timeoutEntradaSinsi);
        } else {
          controlPreguntas(resIntentName);
          setPlaceholder('Escribe tu mensaje...');
          const input = document.querySelector('input');
          if(input){
            input.focus();
          }
        }
      }
    }
  };

  //Controla el tipo de Intención lanzado
  const getTipoIntencion = resIntentName => {
    if (
      resIntentName.indexOf('pregunta') !== -1 ||
      resIntentName.indexOf('Pregunta') !== -1 ||
      resIntentName.indexOf('corte') !== -1
    ) {
      return 'pregunta';
    }
    if(resIntentName.indexOf('provocaUsuario') !== -1){
      return 'provoca';
    }
    return 'respuesta';
  };

  //Controla si el usuario sigue teclando
  const handleKeyPress = event => {
    if(timerActivo){
      clearTimeout(timer);
      numAvisos = 0;
      timer = setInterval(function () {
        avisoInactividad('');
      }, timeControlTecleando);
    }
  };

  //Controla si el usuario no responde al lanzar la intención
  const controlInactividad = resIntentName => {
    clearTimeout(timer);
    if (resIntentName.indexOf('corteTiempo')) {
      numAvisos = 0;
    }
    timer = setInterval(function () {
      avisoInactividad(resIntentName);
    }, timeControlNoRespuestaIntencion);
  };

  //Muestra avisos de inactividad
  const avisoInactividad = resIntentName => {
    numAvisos++;

    let tipoIntencion = 'pregunta';

    if (resIntentName) {
      tipoIntencion = getTipoIntencion(resIntentName);
    }

    if (tipoIntencion == 'pregunta') {
      if (numAvisos > 2) {
        getIntention('sinsiGameOver');
        return;
      } else {
        getIntention('corteTiempo');
        return;
      }
    } else {
      //Si no hay intención de pregunta y el usuario no escribe lanzamos intención de provocar al usuario
      if (
        resIntentName.indexOf('corteTiempo') !== -1 ||
        resIntentName.indexOf('seguirAfirmacion') !== -1
      ) {
        getIntention('provocaUsuario');
        return;
      } else {
        //Lanzamos un tema de chachara
        if (contPreguntas < 4) {
          let tema = escogerPreguntaCharla();
          getIntention(tema);
          return;
        } else {
          let firstItem = itemsFuturo.find(x => x !== undefined);
          getIntention(firstItem);
          return;
        }
      }
    }
  };

  //Escogemos pregunta aleatoria de charla y la eliminamos para no repetirla
  const escogerPreguntaCharla = () => {
    let random = Math.floor(Math.random() * itemsChachara.length);
    let item = itemsChachara.splice(random, 1);
    //contPreguntas++;
    return item;
  };

  //Controla si se efectuán las preguntas de estadística
  const controlPreguntasEstadistica = resIntentName => {
    let resultado = itemsEstadistica.findIndex(
      estadistica => estadistica.reaccion === resIntentName
    );

    if (resultado !== -1) {
      itemsEstadistica.splice(resultado, 1);
    }
  };

  //Controla la conversación
  const controlConversacion = (resIntentName, fulfillmentText, fallback) => {

    if (resIntentName.indexOf('pregunta') !== -1 || resIntentName.indexOf('Pregunta') !== -1){
      ultimaPreguntaLanzada = resIntentName;
    }

    if (fallback && preguntaFuturo) {
      if (ultimaPreguntaLanzada.indexOf('futuroPreguntaLugar') === 0) {
        getIntention('futuroReaccionLugar');
        return false;
      }
      if (ultimaPreguntaLanzada.indexOf('futuroPreguntaEscena') === 0) {
        getIntention('futuroReaccionEscena');
        return false;
      }
      getIntention('corteCentrate');
      setPlaceholder('Escribe tu mensaje...');
      return false;
    }

    if (fallback && reaccionFuturo) {
      let firstItem = itemsFuturo.find(x => x !== undefined);
      getIntention(firstItem);
      setPlaceholder('Escribe tu mensaje...');
      return false;
    }

    if (preguntaChachara || usuarioProvocado) {
      if (resIntentName.indexOf('corteTiempo') === -1) {
        preguntaChachara = false;
      }
      if (fallback) {
        getIntention('seguirAfirmacion');
        setPlaceholder('Escribe tu mensaje...');
        return false;
      }
    }

    if (
      resIntentName.indexOf('estadistica') === -1 &&
      resIntentName.indexOf('futuro') === -1 &&
      resIntentName.indexOf('corte') === -1 &&
      resIntentName.indexOf('seguirAfirmacion') === -1 &&
      resIntentName.indexOf('provocaUsuario') === -1 &&
      resIntentName.indexOf('sinsiIntro') === -1
      //resIntentName.indexOf('pregunta') === -1
    ) {
      contPreguntas++;
    }

    console.log('Cont preguntas: ' + contPreguntas);

    if (contPreguntas == 3) {
      contPreguntas = 4;
      getIntention('corteConversacion');
      setPlaceholder('Escribe tu mensaje...');
      return false;
    }

    if (resIntentName.indexOf('corteConversacion') !== -1) {
      let firstItem = itemsFuturo.find(x => x !== undefined);
      addMessage('Sinsi', fulfillmentText, resIntentName);
      getIntention(firstItem);
      return false;
    }

    if (resIntentName.indexOf('futuroPregunta') !== -1) {
      preguntaFuturo = true;
      reaccionFuturo = false;

      //Eliminamos la pregunta
      itemsFuturo.shift();

      if (isFunctionDefined(resIntentName)) {
        let fn = resIntentName + '(fulfillmentText)';
        let res = eval(fn);
        addMessage('Sinsi', res, resIntentName);
        setPlaceholder('Escribe tu mensaje...');
        return false;
      }
    }

    if (resIntentName.indexOf('futuroReaccion') !== -1) {
      preguntaFuturo = false;
      reaccionFuturo = true;

      if (isFunctionDefined(resIntentName)) {
        let fn = resIntentName + '(fulfillmentText)';
        let res = eval(fn);

        let parts = res.split('#');

        if(parts[1]){

          let sentence = parts[0];

          addMessage('Sinsi', sentence, resIntentName);

          if (parts[1]) {
            getIntention(parts[1]);
            return false;
          }

        }else{

          addMessage('Sinsi', res, resIntentName);
          setPlaceholder('Escribe tu mensaje...');

          return false;


        }

      }
    }

    if (resIntentName.indexOf('estadisticaPreguntaColor') === 0) {
      let res = preguntaColor(fulfillmentText);
      addMessage('Sinsi', res, resIntentName);
      setPlaceholder('Selecciona una opción');
      return false;
    }

    if (resIntentName.indexOf('pregunta') === 0) {
      preguntaChachara = true;
      console.log('es pregunta chachara');
    }

    if (resIntentName.indexOf('provocaUsuario') === 0) {
      usuarioProvocado = true;
    }

    if (resIntentName.indexOf('seguirAfirmacion') === 0 && usuarioProvocado) {
      lanzarPregunta = true;
      console.log('lanza pregunta');
    }

    return true;
  };

  //Controla las preguntas
  //Controla las preguntas
  const controlPreguntas = resIntentName => {
    if (contPreguntas > 3) {
      /*
      contPreguntas = 2;
      //Después de la charla inicial comprobamos si ha respondido a las preguntas de estadística, sino insistimos
      if(itemsEstadistica.length>0) {
        let firstItem = itemsEstadistica.find(x => x !== undefined);
        addMessage('Sinsi', 'Voy a intentarlo otra vez...');
        getIntention(firstItem.pregunta);
        return;
      }else{
        getIntention('corteConversacion');
        return;
      }
      */
    } else {
      if (resIntentName.indexOf('Reaccion') !== -1 || lanzarPregunta) {
        usuarioProvocado = false;
        lanzarPregunta = false;
        //Lanzamos un tema de chachara
        let tema = escogerPreguntaCharla();
        getIntention(tema);
        return;
      }
    }
  };

  const preguntaColor = fulfillmentText => {
    setBotonColorActivate(true);
    setPlaceholder('Selecciona una opción');
    return fulfillmentText;
  };

  const futuroPreguntaSaltoTemporal = fulfillmentText => {
    setBotonSaltoTemporalActivate(true);
    setPlaceholder('Selecciona una opción');
    return fulfillmentText;
  };

  const futuroReaccionSaltoTemporal = fulfillmentText => {
    let opciones = sinsiText['saltoTemporal'].preguntas;
    let random = Math.floor(Math.random() * opciones.length);

    let opcionSel = opciones[random];

    localStorage.setItem('futuroReaccionSaltoTemporal', opcionSel);

    let res = fulfillmentText.replace(
      '%futuroReaccionSaltoTemporal%',
      opcionSel
    );

    return res;
  };

  const futuroPreguntaDesencadenante = fulfillmentText => {
    let res = fulfillmentText.replace(
      '%futuroPreguntaDesencadenante%',
      localStorage.getItem('futuroReaccionSaltoTemporal')
    );
    return res;
  };

  const futuroReaccionDesencadenante = fulfillmentText => {
    let opciones = sinsiText['desencadenante'].preguntas;
    let random = Math.floor(Math.random() * opciones.length);

    let opcionSel = opciones[random];

    localStorage.setItem('futuroReaccionDesencadenante', opcionSel);

    let res = fulfillmentText.replace(
      '%futuroReaccionDesencadenante%',
      opcionSel
    );

    return res;
  };

  const futuroPreguntaTipoFuturo = fulfillmentText => {
    setBotonTipoFuturoActivate(true);
    let res = fulfillmentText.replace(
      '%futuroPreguntaTipoFuturo%',
      localStorage.getItem('futuroReaccionSaltoTemporal')
    );
    return res;
  };

  const futuroReaccionTipoFuturo = fulfillmentText => {
    let opciones = sinsiText['tipoFuturo'].preguntas;
    let random = Math.floor(Math.random() * opciones.length);

    let opcionSel = opciones[random];

    localStorage.setItem('futuroReaccionTipoFuturo', opcionSel);

    let res = fulfillmentText.replace('%futuroReaccionTipoFuturo%', opcionSel);

    return res;
  };

  const futuroPreguntaPoblacion = fulfillmentText => {
    let res = fulfillmentText.replace(
      '%futuroPreguntaPoblacion%',
      localStorage.getItem('futuroReaccionSaltoTemporal')
    );
    return res;
  };

  const futuroReaccionPoblacion = fulfillmentText => {
    let opciones = sinsiText['poblacion'].preguntas;
    let random = Math.floor(Math.random() * opciones.length);

    let opcionSel = opciones[random];

    localStorage.setItem('futuroReaccionPoblacion', opcionSel);

    let res = fulfillmentText.replace('%futuroReaccionPoblacion%', opcionSel);

    return res;
  };

  const futuroReaccionSector = fulfillmentText => {
    let opciones = sinsiText['sector'].preguntas;
    let random = Math.floor(Math.random() * opciones.length);

    let opcionSel = opciones[random];

    localStorage.setItem('futuroReaccionSector', opcionSel);

    let res = fulfillmentText.replace('%futuroReaccionSector%', opcionSel);

    return res;
  };

  const futuroPreguntaTema = fulfillmentText => {
    let res = fulfillmentText.replace(
      '%futuroPreguntaTema%',
      localStorage.getItem('futuroReaccionSaltoTemporal')
    );
    return res;
  };

  const futuroReaccionTema = fulfillmentText => {
    let opciones = sinsiText['tema'].preguntas;
    let random = Math.floor(Math.random() * opciones.length);

    let opcionSel = opciones[random];

    localStorage.setItem('futuroReaccionTema', opcionSel);

    let res = fulfillmentText.replace('%futuroReaccionTema%', opcionSel);

    timerActivo = false;

    return res;
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

  //Revisar, no se puede borrar
  const futuroReaccionLugar = fulfillmentText => {

    let res = fulfillmentText;

    return res;
  };

  const futuroReaccionEscena = fulfillmentText => {

    let resumen =
        'Futurólogo: ' + localStorage.getItem('futuroReaccionSaltoTemporal') + "\n"+
        'Salto temporal: ' + localStorage.getItem('futuroReaccionSaltoTemporal') + "\n"+
        'Desencadenante: ' + localStorage.getItem('futuroReaccionDesencadenante') + "\n"+
        'Tipo de futuro: ' + localStorage.getItem('futuroReaccionTipoFuturo') + "\n"+
        'Población más afectada: ' + localStorage.getItem('futuroReaccionPoblacion') + "\n"+
        'Área más afectada: ' + localStorage.getItem('futuroReaccionSector') + "\n"+
        'Trending topic: ' + localStorage.getItem('futuroReaccionTema') + "\n"+
        'Un día en ese futuro: ';

    let res = fulfillmentText.replace('%futuroReaccionEscena%', resumen);



    return res;
  };

  const isFunctionDefined = functionName => {
    if (eval('typeof(' + functionName + ') == typeof(Function)')) {
      return true;
    }
  };

  const handleButtonColorClick = value => {
    setColorSelect(value);
    setBotonColorActivate(false);
    wait = true;
    handleNewMessage(value);
  };

  const handleButtonSaltoTemporalClick = value => {
    setBotonSaltoTemporalActivate(false);
    wait = true;
    handleNewMessage(value);
  };

  const handleButtonTipoFuturoClick = value => {
    setBotonTipoFuturoActivate(false);
    wait = true;
    handleNewMessage(value);
  };

  const handleWindowResize = () => {
    setColorSelect('default');
    setWidthCanvasWrapper(ref.current ? ref.current.offsetWidth : 588);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    if (!futurologistName.name) {
      //Corregir nombre intención con frase intención ("sinsiSinNombre")
      getIntention(`sinsiSinNombre`);
      //getIntention(`sinsiGameOver`);
    } else {
      getIntention(`sinsiIntroNombre ${futurologistName.name}`);
    }
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const handleNewMessage = text => {
    addMessage('Me', text);
    getIntention(text);
  };

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
        <div className="h-auto overflow-scroll mt-5">
          <MessageList messages={menssagesLista} />
          {botonColorActivated == true && (
            <ButtonList
              onButtonClick={handleButtonColorClick}
              buttons={sinsiText['color'].preguntas}
            />
          )}
          {botonSaltoTemporalActivated == true && (
            <ButtonList
              onButtonClick={handleButtonSaltoTemporalClick}
              buttons={sinsiText['saltoTemporal'].preguntas}
            />
          )}
          {botonTipoFuturoActivated == true && (
            <ButtonList
              onButtonClick={handleButtonTipoFuturoClick}
              buttons={sinsiText['tipoFuturo'].preguntas}
            />
          )}
          <MessageForm
            onMessageSend={handleNewMessage}
            onUserKeyPress={handleKeyPress}
            placeholder={placeholder}
          />
          {/* <div className="p-6"></div> */}
        </div>
      </div>
    </div>
  );
}
