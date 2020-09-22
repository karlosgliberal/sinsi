import React, { useEffect, useRef } from 'react';

const ReactMarkdown = require('react-markdown');

export default function Message(props) {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [props]);
  return (
    <div>
      {props.author === 'Sinsi' && (
        <div className="ml-4 mr-6 border-double border rounded-br-lg border-white mb-6  border-opacity-75 inline-block">
          <ReactMarkdown
            //className= {(prosp.puntos  ? 'active' : '')}
            className="font-ibmmono text-xs text-white p-4"
            source={props.body}
            escapeHtml={false}
          />
        </div>
      )}
      {props.author === 'Me' && (
        <div className="ml-40 mb-6 mr-4">
          <p className="text-right font-sinsimono p-6 text-sinsipurple">
            {props.body}
          </p>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
