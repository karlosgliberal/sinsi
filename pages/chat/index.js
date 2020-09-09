import { useState, useEffect } from 'react';
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

const P5Wrapper = p5Wrapper();

export default function Chat() {
  const router = useRouter();

  const [menssagesLista, setMenssageList] = useState([]);
  const [lastIntention, setLastIntention] = useState('');
  const [botonActivated, setBotonActivate] = useState(false);
  const futurologistName = router.query;
  const [placeholder, setPlaceholder] = useState('Escribe tu mensaje...');
  const temasChachara = ['preguntaHobbies','preguntaOdias'];
  const temasFuturo = ['futuroPoblacion','futuroSector','futuroTema','futuroDesencadenante'];

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

    if (resIntentName == 'sinsiGameOver') {
        setTimeout(() => {
          window.location.href =
            'https://i.pinimg.com/originals/df/98/0f/df980ffc2571fa604f2adcdbecddc016.gif';
        }, 1000);
    }else{
        if (res) setLastIntention(res.data.intent.displayName);
        let fulfillmentText = res.data.fulfillmentText;
        let parts = fulfillmentText.split("#");
        let sentence = parts[0];
        addMessage('You', sentence);
        if(parts[1]){
            setTimeout(() => {
                getIntention(parts[1]);
             }, 1000);
        }else{
            setPlaceholder('Escribe tu mensaje...');
        }
    }
  };

  useEffect(() => {
    if (!futurologistName.name) {
      //Corregir nombre intención con frase intención ("sinsiSinNombre")
      getIntention(`sinsiSinNombre`);
      //getIntention(`sinsiGameOver`);
    } else {
      getIntention(`sinsiIntroNombre ${futurologistName.name}`);
    }
  }, []);

  const handleButtonClick = event => {
    addMessage('Me', event);
  };

  const handleNewMessage = text => {
    addMessage('Me', text);
    getIntention(text);
  };

  return (
    <div className="bg-sinsiblue w-screen h-screen flex justify-center">
      <P5Wrapper
        sketch={takawo}
        dispatch={handleButtonClick}
        state={{ movida: menssagesLista }}
      />
      <div className="w-screen lg:w-1/2 border border-gray-700 flex flex-col justify-end bg-dots">
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
