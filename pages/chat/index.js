import { useState, useEffect } from 'react';
import MessageList from '../../componets/MessageList';
import MessageForm from '../../componets/MessageForm';
import ButtonList from '../../componets/ButtonList';
import { getIntentionFromDialogflow } from '../../services/dialogflowResponse';
import { sinsiText } from '../../core/sinsiText';

export default function Chat(props) {
  const [menssagesLista, setMenssageList] = useState([]);
  const [botonActivated, setBotonActivate] = useState(true);

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

  const handleButtonClick = event => {
    setMenssageList(menssagesLista => [
      ...menssagesLista,
      {
        author: 'Me',
        body: event,
      },
    ]);
  };

  useEffect(() => {
    getIntention('dame la entrada');
  }, []);

  const handleNewMessage = text => {
    setMenssageList(menssagesLista => [
      ...menssagesLista,
      {
        author: 'Me',
        body: text,
      },
    ]);
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
