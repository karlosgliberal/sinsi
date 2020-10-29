import { useState } from 'react';
import Router from 'next/router'
import React, { useEffect, useRef } from 'react';

export default () => {
  const [name, setName] = useState('');

  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
  }, []);

  const handleName = event => {
    setName(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleOnClick();
    }
  }

  const handleOnClick = () => {
    const { pathname } = Router
    if (pathname == '/') {
      Router.push({ pathname: '/chat', query: { name: name } });
    }
  }

  return (
    <div className="bg-sinsiblue w-screen h-screen flex justify-center">
      <div className="w-screen lg:w-1/2 border border-gray-700 flex flex-col justify-around m-5">
        <div className="text-right pt-1 pr-4">
          <a
            className="text-gray-700 text-sm hover:text-sinsipurple transition duration-500"
            href="/about"
          >
            About
          </a>
        </div>
        <div className="flex flex-row justify-center flex-grow">
          <img className=" lg:w-32" src="/images/logosinsi.svg"></img>
        </div>

        <div className="flex-grow">
          <div className="sm:px-5 lg:px-10 p-6 text-sm text-gray-100 text-center">
            <div className="text-2xl text-bold text-gray-200 pb-2 ">
              ¿Buscas respuestas sobre el futuro?
            </div>
            <p>Si te atreves a conocer cómo será, estás en el lugar adecuado</p>
          </div>
          <div>
            <div>
              <div className="border-b-2 submit-outline p-1 mb-5 lg:mx-32 mx-6 bg-sinsiblue ">
                <input
                  onChange={handleName}
                  onKeyDown={handleKeyDown}
                  className=" border-0 bg-transparent w-full focus:border-transparent py-3 px-2 rounded-none text-white text-center"
                  type="text"
                  ref={textInput}
                  placeholder="Escribe tu nombre"
                />
              </div>
            </div>
            <div className="flex flex-row justify-around px-4 mt-10 ">
              <button className="transition duration-500 ease-in-out py-3 w-full lg:w-5/6 text-center mb-3 text-white border border-white hover:border-sinsipurple font-sinsimono animate-pulse hover:animate-none" onClick={handleOnClick} type="button">Empezar</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
