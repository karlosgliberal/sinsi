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
  'futuroPoblacion',
  'futuroSector',
  'futuroTema',
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
let intentos = 0;
let preguntaFuturo = false;
let preguntaChachara = false;
let preguntaProvoca = false;

export default function Chat() {
  const router = useRouter();
  const ref = useRef(null);
  const [widthCanvasWrapper, setWidthCanvasWrapper] = useState(0);
  const [menssagesLista, setMenssageList] = useState([]);
  const [lastIntention, setLastIntention] = useState('');
  const [botonActivated, setBotonActivate] = useState(false);
  const futurologistName = router.query;
  const [placeholder, setPlaceholder] = useState('Escribe tu mensaje...');
  //const itemsChachara = useState(['preguntaHobbies','preguntaOdias']);
  //const itemsFuturo = useState(['futuroPreguntaEdad','futuroPreguntaGenero','futuroPoblacion','futuroSector','futuroTema']);
  //const [itemsChachara, setItemsChachara] = useState([]);
  //const [itemsFuturo, setItemsFuturo] = useState([]);
  //setItemsChachara(['preguntaHobbies','preguntaOdias']);
  //setItemsFuturo(['futuroPoblacion','futuroSector','futuroTema','futuroDesencadenante']);
  const addMessage = (author, body) => {
    setPlaceholder('Sinsi esta escribiendo...');
    setMenssageList(menssagesLista => [
      ...menssagesLista,
      {
        author,
        body,
      },
    ]);
  };
  const getIntention = async intention => {
    const res = await getIntentionFromDialogflow(intention);
    console.log(res);
    let resIntentName = res.data.intent.displayName;

    console.log('rsssssssssssssss' + resIntentName);

    const resultado = itemsEstadistica.findIndex(
      estadistica => estadistica.reaccion === resIntentName
    );

    if (resultado !== -1) {
      console.log('movida');
      console.log(resultado);
      if (resultado == 2) {
        setBotonActivate(true);
      }
      itemsEstadistica.splice(resultado, 1);
    }

    console.log(resultado);

    /*


    if(itemsEstadistica[resIntentName]){
      //Deberíamos comprobar cual borramos
      //itemsEstadistica.shift();

      let index = itemsEstadistica.indexOf(resIntentName);
      if (index > -1) {
        itemsEstadistica.splice(index, 1);
      }

    }

    */

    clearTimeout(timer);
    timer = setTimeout(function () {
      if (
        resIntentName.indexOf('pregunta') !== -1 ||
        resIntentName.indexOf('Pregunta') !== -1 ||
        resIntentName.indexOf('corte') !== -1
      ) {
        console.log('cortetiempo!!');
        if (intentos > 2) {
          getIntention('sinsiGameOver');
          return;
        } else {
          intentos++;
          getIntention('corteTiempo');
          return;
        }
      } else {
        if (preguntaProvoca) {
          getIntention('provocaUsuario');
          return;
        } else {
          let random = Math.floor(Math.random() * itemsChachara.length);
          console.log('Tema chachara: ' + itemsChachara[random]);
          let item = itemsChachara.splice(random, 1);
          getIntention(item);
          return;
        }
      }
    }, 15000);

    if (
      resIntentName.indexOf('provocaUsuario') !== -1 ||
      resIntentName.indexOf('corteTiempo') !== -1
    ) {
      preguntaProvoca = false;
    } else {
      preguntaProvoca = true;
    }

    console.log('preguntaProvoca');
    console.log(preguntaProvoca);

    console.log('resIntentName');
    console.log(resIntentName);
    if (res.data.intent.isFallback && preguntaFuturo) {
      getIntention('corteCentrate');
      return;
    }
    console.log('pregchachara');
    console.log(preguntaChachara);
    if (preguntaChachara) {
      if (resIntentName.indexOf('corteTiempo') === -1) {
        console.log('desactivamos chachara');
        preguntaChachara = false;
      }
      if (res.data.intent.isFallback) {
        getIntention('seguirAfirmacion');
        return;
      }
    }
    console.log('ddddddddddddd');
    if (resIntentName != 'corteTiempo') {
      intentos = 0;
    }
    if (resIntentName.indexOf('corteConversacion') !== -1) {
      let firstItem = itemsFuturo.find(x => x !== undefined);
      getIntention(firstItem);
    }
    if (resIntentName.indexOf('futuroPregunta') !== -1) {
      //Borramos la pregunta de futuro
      preguntaFuturo = true;
      itemsFuturo.shift();
    }
    if (resIntentName.indexOf('futuroReaccion') !== -1) {
      preguntaFuturo = false;
    }

    console.log('ddddddddddddd');

    if (resIntentName.indexOf('pregunta') === 0) {
      preguntaChachara = true;
      console.log('es pregunta chachara');
    }
    if (resIntentName == 'sinsiGameOver') {
      setTimeout(() => {
        window.location.href =
          'https://i.pinimg.com/originals/df/98/0f/df980ffc2571fa604f2adcdbecddc016.gif';
      }, 1000);
    } else {
      if (res) setLastIntention(res.data.intent.displayName);
      console.log();
      let fulfillmentText = res.data.fulfillmentText;
      let parts = fulfillmentText.split('#');
      let sentence = parts[0];
      addMessage('You', sentence);
      if (parts[1]) {
        setTimeout(() => {
          getIntention(parts[1]);
          return;
        }, 1000);
      } else {
        console.log('preg');
        console.log(resIntentName);
        console.log('xx' + resIntentName.indexOf('estadistica'));
        if (
          resIntentName.indexOf('estadistica') === -1 &&
          resIntentName.indexOf('futuro') === -1 &&
          resIntentName.indexOf('corte') === -1 &&
          resIntentName.indexOf('seguirAfirmacion') === -1 &&
          resIntentName.indexOf('provocaUsuario') === -1
          //resIntentName.indexOf('pregunta') === -1
        ) {
          console.log('contamospreg');
          contPreguntas++;
        }

        console.log(contPreguntas);
        if (contPreguntas > 3) {
          console.log('preg futuro');
          console.log(itemsFuturo);

          contPreguntas = 0;
          console.log(itemsEstadistica);
          console.log(itemsEstadistica.length);
          if (itemsEstadistica.length > 0) {
            console.log(itemsEstadistica);
            let firstItem = itemsEstadistica.find(x => x !== undefined);
            console.log(firstItem.pregunta);
            getIntention(firstItem.pregunta);
            return;
          } else {
            getIntention('corteConversacion');
          }
          return;
        } else {
          if (resIntentName.indexOf('Reaccion') !== -1) {
            console.log('reaccion');
            let random = Math.floor(Math.random() * itemsChachara.length);
            console.log('Tema chachara: ' + itemsChachara[random]);
            getIntention(itemsChachara[random]);
            return;
          }

          console.log('Espera usuario');

          setPlaceholder('Escribe tu mensaje...');
        }

        //setPlaceholder('Escribe tu mensaje...');
      }
    }
  };
  const handleWindowResize = () => {
    console.log('resize');
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
      <P5Wrapper
        sketch={rosa}
        dispatch={handleWindowResize}
        state={{ widthCanvasWrapper: widthCanvasWrapper, text: menssagesLista }}
      />
      <div
        className="w-screen lg:w-1/2 border border-gray-700 flex flex-col justify-end bg-dots"
        ref={ref}
      >
        <div className="h-auto overflow-scroll">
          <MessageList messages={menssagesLista} />
          {botonActivated == true && (
            <ButtonList
              onButtonClick={handleButtonClick}
              buttons={sinsiText['saltoTemporal'].preguntas}
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
