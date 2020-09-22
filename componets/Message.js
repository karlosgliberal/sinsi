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
        <div className="text-decoration">
          <ReactMarkdown
            //className= {(prosp.puntos  ? 'active' : '')}
            className="font-ibmmono text-sm text-white pr-10"
            source={props.body}
            escapeHtml={false}
          />
        </div>
      )}
      {props.author === 'Me' && (
        <p className="text-right font-sinsimono p-6 text-sinsipurple">
          {props.body}
        </p>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
