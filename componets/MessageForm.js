import React, { useState } from 'react';

export default function MessageForm(props) {
  //useEffect(() => input.focus(), []);
  const [inputMessage, setInputMessage] = useState('');

  const handleInputChange = event => {
    setInputMessage(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    props.onMessageSend(inputMessage);
    setInputMessage('');
  };

  return (
    <form className="MessageForm" onSubmit={handleFormSubmit}>
      {/* cuando esta activo se añade la clase "submit-outline-active" y cuando no se quita: */}
      <div className="border-t-2 border-b-2 submit-outline p-1 mb-5 mx-4 grid grid-cols-submit bg-sinsiblue">
        <input
          className="border-0 bg-transparent w-full focus:border-transparent py-3 px-2 rounded-none text-white"
          type="text"
          onChange={handleInputChange}
          value={inputMessage}
          /*ref={node => (input = node)}*/
          placeholder="Escribe tu mensaje..."
        />

        <div className="flex justify-center w-full border-l-2 border-gray-800 pl-2">
          {/* cuando esta activo se quita la classe: "opacity-25 y cuando no se pone": */}
          <button
            type="submit"
            className="flex items-center px-2 transition duration-700 opacity-25"
            // onSubmit={handleFormSubmit}
          >
            <div className="">
              <img src="/images/enter-white.svg"></img>
            </div>
          </button>
        </div>
      </div>
    </form>
  );
}
