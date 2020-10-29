export const sinsiText = {
  color: {
    text:
      'Vamos con una pregunta más "personal". ¿Con cuál de estos colores te identificas más?',
    preguntas: ['rosa', 'azul', 'morado'],
  },
  futuroPreguntaSaltoTemporal: {
    text:
      'Una cosa. Para que me sitúe. Cuando piensas en el futuro, ¿de qué salto en el tiempo estamos hablando? \n Date prisa en decidirlo o elegiré yo cómo de lejos vamos a viajar',
    preguntas: [
      'unos meses',
      'unos años',
      'una década',
      'una generación',
      'un siglo',
    ],
  },
  futuroPreguntaDesencadenante: {
    text:
      'Volvamos al tema. El futuro en salto elegido se verá condicionado por un detonante que, aunque se intuía, no se podrá evitar. \n Volvamos al tema. El futuro en salto elegido se verá condicionado por un detonante que, aunque se intuía, no se podrá evitar. \n ',
    preguntas: [
      'un problema sanitario',
      'el cambio medioambiental',
      'una revuelta popular',
      'una guerra',
      'un cambio legislativo',
      'la aparición de nueva tecnología',
      'la dejadez humana',
      'un acuerdo empresarial',
    ],
  },
  futuroPreguntaTipoFuturo: {
    text: '',
    preguntas: ['utópico', 'distópico', 'continuista'],
  },
  futuroPreguntaPoblacion: {
    text: '',
    preguntas: [
      'las minorías',
      'los ancianos',
      'los niños',
      'los adolescentes',
      'los adultos',
    ],
  },
  futuroPreguntaSector: {
    text: '',
    preguntas: [
      'la salud',
      'la economía y las finanzas',
      'el tiempo libre y el ocio',
      'el aprendizaje y la educación',
      'la identidad personal',
      'las relaciones personales y sociales',
      'la agricultura y la alimentación',
      'el empleo',
      'el urbanismo y la ciudadanía',
      'el arte y la cultura',
      'la energía',
      'el medioambiente y el clima',
      'las relaciones internacionales',
      'el transporte',
      'la industria',
      'la política',
      'la religión',
      'la seguridad',
      'la legislación y la justicia',
      'el turismo',
      'el deporte',
      'la información y el periodismo',
      'las comunicaciones',
      'las clases sociales',
      'la moda',
      'el género',
      'la genética',
      'la naturaleza',
      'la memoria',
      'el lenguaje',
      'la robótica',
      'el comercio',
      'el sexo',
    ],
  },
  futuroPreguntaTema: {
    text: '',
    preguntas: [
      'los sistemas de recomendación',
      'el rastreo',
      'los sistemas de scoring',
      'las decisiones automatizadas',
      'el aumento de autoridad de los algoritmos',
      'los datos y el perfilado personalizado por parte de los algoritmos',
      'la identificación facial',
      'las plataformas que monopolizan Internet',
      'las herramientas de autoría creativa y generativas',
      'la monitorización de hábitos y conductas',
      'el aumento de capacidades humanas',
      'la realidad aumentada',
      'los asistentes por voz',
      'la introducción de la naturaleza en entornos sintéticos', //duda
      'la singularidad de la inteligencia artificial',
      'los sistemas de autocontrol personal',
      'las monodosis de información y formación para el desarrollo personal',
      'la realidad virtual',
      'el postureo extremo',
      'la inteligencia artificial explicable',
      'la detección de sesgos en la inteligencia artificial y en los humanos',
      'la trazabilidad de los datos',
      'la credibilidad de la información',
      'el distanciamiento social',
    ],
  },
  futuroPreguntaLugar: {
    text: '',
    preguntas: [
      'un espacio de trabajo',
      'dependencias de un cliente',
      'desplazándote',
      'exterior',
      'un espacio no físico',
    ],
  },
};

export const tiposIntention = ['intro', 'estadistica', 'chachara', 'futuro'];

// export const itemsChachara = ['preguntaHobbies'];
export const itemsChachara = [
  'preguntaHobbies',
  'preguntaOdias',
  'preguntaIntimidad1',
  'preguntaIntimidad2', //Que me preguntarias
  'preguntaIntimidad5',
  'preguntaIntimidad6',
];
export const itemsPreguntaFuturo = [
  'futuroPreguntaSaltoTemporal',
  'futuroPreguntaDesencadenante',
  'futuroPreguntaTipoFuturo',
  'futuroPreguntaPoblacion',
  'futuroPreguntaSector',
  'futuroPreguntaTema',
  'futuroPreguntaLugar',
  // 'futuroPreguntaEscena',
];

export const itemsReaccionFuturo = [
  'futuroReaccionSaltoTemporal',
  'futuroReaccionDesencadenante',
  'futuroReaccionTipoFuturo',
  'futuroReaccionPoblacion',
  'futuroReaccionSector',
  'futuroReaccionTema',
  'futuroReaccionLugar',
  // 'futuroReaccionEscena',
];

export const itemsReaccion = [
  'reaccionChistes',
  'reaccionDesahogo',
  'reaccionHobbies',
  'reaccionInsultos',
  'reaccionIntimidad1',
  'reaccionIntimidad2',
  'reaccionIntimidad5',
  'reaccionIntimidad6',
  'reaccionLigando',
  'reaccionOdias',
  'reaccionPreferencias',
  'reaccionRobot',
  'reaccionSexismos',
  'reaccionTrascendental',
];

export const itemsEstadistica = [
  {
    reaccion: 'estadisticaReaccionEdad',
    pregunta: 'estadisticaPreguntaEdad',
  },
  {
    reaccion: 'estadisticaReaccionGenero',
    pregunta: 'estadisticaPreguntaGenero',
  },
  {
    reaccion: 'estadisticaReaccionColor',
    pregunta: 'estadisticaPreguntaColor',
  },
];
