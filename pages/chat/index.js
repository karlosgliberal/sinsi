import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MessageList from '../../componets/MessageList';
import MessageForm from '../../componets/MessageForm';
import ButtonList from '../../componets/ButtonList';
import { getIntentionFromDialogflow } from '../../services/dialogflowResponse';
import { sinsiText } from '../../core/sinsiText';
// import { responseControl } from '../../core/responseControl';

export default function Chat() {
  const router = useRouter();

  const [menssagesLista, setMenssageList] = useState([]);
  const [lastIntention, setLastIntention] = useState('');
  const [botonActivated, setBotonActivate] = useState(false);
  const [futurologistName, setFuturologist] = useState(router.query);

  const addMessage = (author, body) => {
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
    if (resIntentName == 'sinsiSaludo') {
      getIntention('dame la intro');
    } else if (resIntentName == 'sinsiSinNombre') {
      getIntention('es tu game over');
    } else if (resIntentName == 'sinsiIntro') {
      getIntention('dame segunda intro');
    } else if (resIntentName == 'sinsiGameOver') {
      setTimeout(() => {
        window.location.href =
          'https://i.pinimg.com/originals/df/98/0f/df980ffc2571fa604f2adcdbecddc016.gif';
      }, 4000);
    }
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
          <MessageList messages={menssagesLista} />
          {botonActivated == true && (
            <ButtonList
              onButtonClick={handleButtonClick}
              buttons={sinsiText['saltoTemporal'].preguntas}
            />
          )}
          <MessageForm onMessageSend={handleNewMessage} />
          {/* <div className="p-6"></div> */}
        </div>
      </div>
    </div>
  );
}
