import React, { useEffect, useRef } from 'react';

const ReactMarkdown = require('react-markdown');

export default function Message(props) {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [props]);
  return (
    <div>
      {props.author === 'Sinsi' && (
        <div className="siri-talk ml-4 mr-6 border-double border rounded-r-lg rounded-tl-lg border-white mb-6  border-opacity-90 inline-block shadow-inner">
          <ReactMarkdown
            //className= {(prosp.puntos  ? 'active' : '')}
            className="font-ibmmono Xtext-xs text-white p-4"
            source={props.body}
            escapeHtml={false}
          />
        </div>
      )}
      {props.author === 'Me' && (
        <div className="flex justify-end">
          <div className="mr-4 ml-10">
            <p className="user-talk font-sinsimono text-xs p-4 text-sinsipurple border-double border rounded-l-lg rounded-tr-lg border-white mb-6  border-opacity-10 shadow-inner">
              {props.body}
            </p>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
