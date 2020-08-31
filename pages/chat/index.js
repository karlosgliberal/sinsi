import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MessageList from '../../componets/MessageList';
import MessageForm from '../../componets/MessageForm';
import ButtonList from '../../componets/ButtonList';
import { getIntentionFromDialogflow } from '../../services/dialogflowResponse';
import { sinsiText } from '../../core/sinsiText';

export default function Chat() {
  const router = useRouter();
  const [menssagesLista, setMenssageList] = useState([]);
  const [botonActivated, setBotonActivate] = useState(false);
  const [futurologistName, setFuturologist] = useState(router.query);

  const getIntention = async intention => {
    const res = await getIntentionFromDialogflow(intention);
    setMenssageList(menssagesLista => [
      ...menssagesLista,
      {
        author: 'You',
        body: res.data.fulfillmentText,
      },
    ]);
  };

  useEffect(() => {
    getIntention(`El futurologist se llama ${futurologistName.name}`);
  }, []);

  const handleButtonClick = event => {
    setMenssageList(menssagesLista => [
      ...menssagesLista,
      {
        author: 'Me',
        body: event,
      },
    ]);
  };

  const handleNewMessage = text => {
    setMenssageList(menssagesLista => [
      ...menssagesLista,
      {
        author: 'Me',
        body: text,
      },
    ]);
    getIntention(text);
    setBotonActivate(true);
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
