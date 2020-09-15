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
];
let itemsReaccionFuturo = [
  'futuroReaccionSaltoTemporal',
  'futuroReaccionDesencadenante',
  'futuroReaccionTipoFuturo',
  'futuroReaccionPoblacion',
  'futuroReaccionSector',
  'futuroReaccionTema',
  'futuroReaccionLugar',
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

export default function Chat() {
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
  const futurologistName = router.query;
  const [placeholder, setPlaceholder] = useState('Escribe tu mensaje...');

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
    let resIntentName = res.data.intent.displayName;
    let fallback = res.data.intent.isFallback;
    let fulfillmentText = res.data.fulfillmentText;

    console.log('IntentName: ' + resIntentName);

    controlPreguntasEstadistica(resIntentName);

    controlInactividad(resIntentName);

    let continuar = controlConversacion(
      resIntentName,
      fulfillmentText,
      fallback
    );

    if (continuar) {
      if (resIntentName == 'sinsiGameOver') {
        setTimeout(() => {
          window.location.href =
            'https://i.pinimg.com/originals/df/98/0f/df980ffc2571fa604f2adcdbecddc016.gif';
        }, 1000);
      } else {
        if (res) setLastIntention(res.data.intent.displayName);
        console.log();
        let parts = fulfillmentText.split('#');
        let sentence = parts[0];

        console.log('mensaje');
        addMessage('You', sentence);

        if (parts[1]) {
          setTimeout(() => {
            getIntention(parts[1]);
            return;
          }, 1000);
        } else {
          console.log('controlpreguntas');
          controlPreguntas(resIntentName);
          setPlaceholder('Escribe tu mensaje...');
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
    return 'respuesta';
  };

  //Controla si el usuario sigue teclando
  const handleKeyPress = event => {
    console.log('--------- Pulsa tecla');
    clearTimeout(timer);
    numAvisos = 0;
    timer = setInterval(function () {
      avisoInactividad('');
    }, 5000);
  };

  //Controla si el usuario no responde al lanzar la intención
  const controlInactividad = resIntentName => {
    console.log('--------- Lanza intención: ' + resIntentName);
    clearTimeout(timer);
    if (resIntentName.indexOf('corteTiempo')) {
      numAvisos = 0;
    }
    timer = setInterval(function () {
      avisoInactividad(resIntentName);
    }, 15000);
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
        resIntentName.indexOf('provocaUsuario') !== -1 ||
        resIntentName.indexOf('corteTiempo') !== -1
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
    if (fallback && preguntaFuturo) {
      getIntention('corteCentrate');
      return false;
    }

    if (fallback && reaccionFuturo) {
      let firstItem = itemsFuturo.find(x => x !== undefined);
      getIntention(firstItem);
      return false;
    }

    if (preguntaChachara) {
      if (resIntentName.indexOf('corteTiempo') === -1) {
        preguntaChachara = false;
      }
      if (fallback) {
        getIntention('seguirAfirmacion');
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
      return false;
    }

    if (resIntentName.indexOf('corteConversacion') !== -1) {
      let firstItem = itemsFuturo.find(x => x !== undefined);
      addMessage('You', fulfillmentText);
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
        addMessage('You', res);
        return false;
      }
    }

    if (resIntentName.indexOf('futuroReaccion') !== -1) {
      preguntaFuturo = false;
      reaccionFuturo = true;

      if (isFunctionDefined(resIntentName)) {
        let fn = resIntentName + '(fulfillmentText)';
        let res = eval(fn);

        addMessage('You', res);
        return false;
      }
    }

    if (resIntentName.indexOf('estadisticaPreguntaColor') === 0) {
      let res = preguntaColor(fulfillmentText);
      addMessage('You', res);
      return false;
    }

    if (resIntentName.indexOf('pregunta') === 0) {
      preguntaChachara = true;
      console.log('es pregunta chachara');
    }

    return true;
  };

  //Controla las preguntas
  const controlPreguntas = resIntentName => {
    if (contPreguntas > 3) {
      /*
      contPreguntas = 2;
      //Después de la charla inicial comprobamos si ha respondido a las preguntas de estadística, sino insistimos
      if(itemsEstadistica.length>0) {
        let firstItem = itemsEstadistica.find(x => x !== undefined);
        addMessage('You', 'Voy a intentarlo otra vez...');
        getIntention(firstItem.pregunta);
        return;
      }else{
        getIntention('corteConversacion');
        return;
      }
      */
    } else {
      if (resIntentName.indexOf('Reaccion') !== -1) {
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

  const isFunctionDefined = functionName => {
    if (eval('typeof(' + functionName + ') == typeof(Function)')) {
      return true;
    }
  };

  const handleButtonColorClick = value => {
    console.log('presionamos botón');
    console.log(value);
    setColorSelect(value);
    setBotonColorActivate(false);
    handleNewMessage(value);
  };

  const handleButtonSaltoTemporalClick = value => {
    console.log('presionamos botón');
    setBotonSaltoTemporalActivate(false);
    handleNewMessage(value);
  };

  const handleWindowResize = () => {
    console.log('resize');
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
      {/* <P5Wrapper
        sketch={codigos}
        dispatch={handleWindowResize}
        state={{
          widthCanvasWrapper: widthCanvasWrapper,
          text: menssagesLista,
          color: colorSelect,
        }}
      /> */}
      <div
        className="w-screen lg:w-1/2 border border-gray-700 flex flex-col justify-end bg-dots"
        ref={ref}
      >
        <div className="h-auto overflow-scroll">
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
