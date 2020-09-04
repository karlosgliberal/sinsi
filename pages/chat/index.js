import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MessageList from '../../componets/MessageList';
import MessageForm from '../../componets/MessageForm';
import ButtonList from '../../componets/ButtonList';
import { getIntentionFromDialogflow } from '../../services/dialogflowResponse';
import { sinsiText } from '../../core/sinsiText';
import { useP5 } from '@gen/react-use-p5';
import { interaction } from '../../sketches/interaction';
// import { responseControl } from '../../core/responseControl';

const Component = ({ sketch }) => {
  const [setRef] = useP5(sketch);
  return <div ref={setRef}></div>;
};

export default function Chat() {
  const router = useRouter();

  const [menssagesLista, setMenssageList] = useState([]);
  const [lastIntention, setLastIntention] = useState('');
  const [botonActivated, setBotonActivate] = useState(false);
  const futurologistName = router.query;
  const [placeholder, setPlaceholder] = useState('Escribe tu mensaje...');

  const addMessage = (author, body) => {
    if (author == 'You') {
      setPlaceholder('Sinsi esta escribiendo...');
    }
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
    setTimeout(() => {
      if (resIntentName == 'sinsiSaludo') {
        getIntention('sinsiIntroUno');
      } else if (resIntentName == 'sinsiIntroUno') {
        getIntention('sinsiIntroDos');
      } else if (resIntentName == 'sinsiIntroDos') {
        getIntention('sinsiIntroTres');
      } else if (resIntentName == 'sinsiIntroTres') {
        getIntention('sinsiIntroCuatro');
      } else if (resIntentName == 'sinsiIntroCuatro') {
        getIntention('sinsiPreguntaEdad');
      } else if (resIntentName == 'sinsiGameOver') {
        setTimeout(() => {
          window.location.href =
            'https://i.pinimg.com/originals/df/98/0f/df980ffc2571fa604f2adcdbecddc016.gif';
        }, 4000);
      }
      setPlaceholder('Escribe tu mensaje...');
    }, 2000);
    if (res) setLastIntention(res.data.intent.displayName);

    console.log(res.data.intent.displayName);
    console.log(lastIntention);
    addMessage('You', res.data.fulfillmentText);
  };

  useEffect(() => {
    if (!futurologistName.name) {
      getIntention(`No has dado el nombre`);
    } else {
      getIntention(`El futurologist se llama ${futurologistName.name}`);
    }
  }, []);

  const handleButtonClick = event => {
    console.log(event);
  };

  const handleNewMessage = text => {
    addMessage('Me', text);
    getIntention(text);
  };

  return (
    <div className="bg-sinsiblue w-screen h-screen flex justify-center">
      <div className="w-screen lg:w-1/2 border border-gray-700 flex flex-col justify-end bg-dots">
        <div className="h-auto overflow-scroll">
          {/* <Component sketch={interaction} /> */}
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
