export const sinsiText = {
  color: {
    text:
      'Vamos con una pregunta más "personal". ¿Con cuál de estos colores te identificas más?',
    preguntas: ['rosa', 'azul', 'morado'],
  },
  saltoTemporal: {
    text:
      'Una cosa. Para que me sitúe. Cuando piensas en el futuro, ¿de qué salto en el tiempo estamos hablando? \n Date prisa en decidirlo o elegiré yo cómo de lejos vamos a viajar',
    preguntas: [
      'unos meses',
      'unos años',
      'una década',
      'una generación',
      'un siglo',
      'un milenio',
    ],
  },
  desencadenante: {
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
  tipoFuturo: {
    text: '',
    preguntas: ['utópico', 'distópico', 'continuista'],
  },
  poblacion: {
    text: '',
    preguntas: [
      'las minorías',
      'los ancianos',
      'los niños',
      'los adolescentes',
      'los adultos',
    ],
  },
  sector: {
    text: '',
    preguntas: [
      'de la salud',
      'de la economía y las finanzas',
      'del tiempo libre y el ocio',
      'del aprendizaje y la educación',
      'de la identidad personal',
      'de las relaciones personales y sociales',
      'de la agricultura y la alimentación',
      'del empleo',
      'del urbanismo y la ciudadanía',
      'del arte y la cultura',
      'de la energía',
      'del medioambiente y el clima',
      'de las relaciones internacionales' + 'del transporte',
      'de la industria',
      'de la política',
      'de la religión',
      'de la seguridad',
      'de la legislación y la justicia',
      'del turismo',
      'del deporte',
      'de la información y el periodismo',
      'de las comunicaciones',
      'de las clases sociales',
      'de la moda',
      'del género',
      'de la genética',
      'de la naturaleza',
      'de la memoria',
      'del lenguaje',
      'de la robótica',
      'del comercio',
      'del sexo',
    ],
  },
  tema: {
    text: '',
    preguntas: [
      'serán los sistemas de recomendación',
      'será el rastreo',
      'serán los sistemas de scoring',
      'serán las decisiones automatizadas',
      'será el aumento de autoridad de los algoritmos',
      'serán los datos y el perfilado personalizado por parte de los algoritmos',
      'será la identificación facial',
      'serán las plataformas que monopolizan Internet',
      'serán las herramientas de autoría creativa y generativas',
      'será la monitorización de hábitos y conductas',
      'será el aumento de capacidades humanas',
      'será la realidad aumentada',
      'serán los asistentes por voz',
      'será la introducción de la naturaleza en entornos sintéticos', //duda
      'será la singularidad de la inteligencia artificial',
      'serán los sistemas de autocontrol personal',
      'serán las monodosis de información y formación para el desarrollo personal',
      'será la realidad virtual',
      'será el postureo extremo',
      'será la inteligencia artificial explicable',
      'será la detección de sesgos en la inteligencia artificial y en los humanos',
      'será la trazabilidad de los datos',
      'será la credibilidad de la información',
      'será el distanciamiento social',
    ],
  },
};

export const tiposIntention = ['intro', 'estadistica', 'chachara', 'futuro'];

export const itemsChachara = [
  'preguntaHobbies',
  'preguntaOdias',
  'preguntaIntimidad1',
  'preguntaIntimidad2', //Que me preguntarias
  // 'preguntaIntimidad3',
  // 'preguntaIntimidad4', //recuerdo valioso
  'preguntaIntimidad5',
  'preguntaIntimidad6',
  // 'preguntaIntimidad7', //educación
];
export const itemsFuturo = [
  'futuroPreguntaSaltoTemporal',
  'futuroPreguntaDesencadenante',
  'futuroPreguntaTipoFuturo',
  'futuroPreguntaPoblacion',
  'futuroPreguntaSector',
  'futuroPreguntaTema',
  'futuroPreguntaLugar',
  'futuroPreguntaEscena',
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

export const itemsReaccionFuturo = [
  'futuroReaccionSaltoTemporal',
  'futuroReaccionDesencadenante',
  'futuroReaccionTipoFuturo',
  'futuroReaccionPoblacion',
  'futuroReaccionSector',
  'futuroReaccionTema',
  'futuroReaccionLugar',
  'futuroReaccionEscena',
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
