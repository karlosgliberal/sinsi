export default () => (
  <div className="bg-sinsiblue w-screen h-screen flex justify-center">
    <div className="w-screen lg:w-1/2 border border-gray-700 flex flex-col justify-center bg-dots">
      <div className="p-4">
        <a
          className="text-white hover:text-sinsipurple transition duration-700"
          href="/"
        >
          &#8592;
        </a>
      </div>
      <div className="h-auto overflow-scroll flex flex-col justify-end">
        <div className="flex flex-row justify-center px-4 my-10 ">
          <img src="/images/logos.svg"></img>
        </div>
        <div className="p-6">
          <p className="font-sinsimono text-white">Moraleja</p>
          <p className="font-sinsimono text-white">
            Lo prometido es deuda. ¿Cuánto se parece tu predicción al futuro
            real? Por tu seguridad, será mejor que no te lo diga. Lo sé. Acabo
            de romper una promesa. Qué le vamos a hacer. Luego me fustigo al
            estilo máquina.
          </p>
          <br />
          <p className="font-sinsimono text-white">
            Con todo, te advierto que los humanos tendéis a reproducir aquellos
            futuros que imagináis. Sean futuros deseados o no. Creo que les
            llamáis “profecías autocumplidas”. En mi opinión, deberíais dedicar
            menos tiempo a poner nombres rimbombantes a las cosas y empezar a
            imaginar el qué futuro queréis vivir
          </p>
          <br />
          <p className="font-sinsimono text-white">
            Es hora de imaginar el futuro que deseáis y darle forma, en lugar de
            que él os dé forma a vosotros Un placer
          </p>
        </div>
      </div>
    </div>
  </div>
);
