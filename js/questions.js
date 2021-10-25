// Asignacion de variables para modificar elementos del DOM
const startBtn = document.querySelector('#start-btn');
const nextButton = document.querySelector('#next-btn');
const retireButton = document.querySelector('#retire-btn');
const questionContainer = document.querySelector('#question-container');
const questionElement = document.querySelector('#question');
const answerButtonsElements = document.getElementById('answer-buttons');
// Inicializar el Puntaje
let puntaje = 0;
// Variables para escoger preguntas y un indice lo cuales serán modificados luego
let shuffleQuestions, currentQuestionIndex;
// Listeners de los elementos
startBtn.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  questionContainer.classList.remove('hide');
  currentQuestionIndex++;
  setNextQuestion();
});
// Estado inicial de la aplicacion
const initialState = () => {
  puntaje = 0;
  startBtn.classList.remove('hide');
  currentQuestionIndex = 0;
  questionContainer.classList.add('hide');
  nextButton.classList.remove('hide');
};
// Inicializamos el juego , seleccionamos una pregunta random, y mostramos las preguntas
function startGame() {
  startBtn.classList.add('hide');
  shuffleQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove('hide');
  setNextQuestion(); // Funcion que muestra la pregunta
}
// Funcion que asigna la pregunta
function setNextQuestion() {
  resetState();
  showQuestion(shuffleQuestions[currentQuestionIndex]); // Funcion que mustra nuestra pregunta asignada en el parámetro
}
// Una de las funciones principales, recibe una pregunta como parámetro, crea los botones con la respectiva respuesta sacada de QUestion. answers
function showQuestion(question) {
  questionElement.innerHTML = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.innerText = answer.text;
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElements.appendChild(button);
  });
}
// Reinicamos las preguntas que se van a mostrar, eliminamos las que tiene previamente para solo mostrar las nuevas respuestas
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElements.firstChild) {
    answerButtonsElements.removeChild(answerButtonsElements.firstChild);
  }
}
// Evento cuando damos click en cada respuesta. asi asignamos si escogio correctamente y sumamos o no el puntaje
function selectAnswer({ target }) {
  const selectedButton = target;
  const { correct } = selectedButton.dataset;
  setStatusClass(document.body, correct); // Reseteamos los colores de fondo
  // Condicion para verificar si es correcta o no
  if (correct) {
    puntaje += 100;
    alert(`Acertaste, acumulas ${puntaje}`);
    setNextQuestion();
    retireButton.classList.remove('hide');
    retireButton.addEventListener('click', retire);
    questionContainer.classList.add('hide');
  } else {
    alert(`Oh no, has perdido ${puntaje}, el juego termina!. Bye Bye!`);
    location.reload();
  }
  // Se crea un arreglo con los elementos de las respuestas, puesto children no es un arreglo Propio
  Array.from(answerButtonsElements.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffleQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startBtn.innerText = 'Play Again';
    alert(
      'Felitaciones, has llegado al final de todas las preguntas de forma correcta, tu puntaje acumulado es de: ' +
        puntaje
    );
    retireButton.classList.add('hide');
    puntaje = 0;
    startBtn.classList.remove('hide');
  }
}
// Funcion para retirarse, y recargar la pagina para nuevamente jugar
function retire() {
  alert('Has acumulado una cantidad de: ' + puntaje + '. Hasta la proxima');
  location.reload();
}
// asignacion de colores Del body cuando es correcto o incorrecta la pregunta
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}
// Arreglo de preguntas
const questions = [
  {
    question: 'Qué palabra se usa para referirse a los abdominales bien marcados',
    answers: [
      { text: 'Lavadora', correct: false },
      { text: 'Lavadero', correct: true },
      { text: 'Lavaloza', correct: false },
      { text: 'Lavanda', correct: false },
    ],
  },
  {
    question: '¿Qué palabra aparece tradicionalmente en la pantalla al terminar un largometraje?',
    answers: [
      { text: 'Fin', correct: true },
      { text: 'Conclusión', correct: false },
      { text: 'Final', correct: false },
      { text: 'Acabó', correct: false },
    ],
  },
  {
    question: '¿Cuál de los siguientes sería atraído por un imán?',
    answers: [
      { text: 'Plástico', correct: false },
      { text: 'Metal', correct: true },
      { text: 'Madera', correct: false },
      { text: 'El Hombre equivocado', correct: false },
    ],
  },
  {
    question: '¿Cuál de estos nombres no aparece en el título de una obra de Shakespeare?',
    answers: [
      { text: 'Hamlet', correct: false },
      { text: 'Romeo', correct: false },
      { text: 'MacBeth', correct: false },
      { text: 'Darren', correct: true },
    ],
  },
  {
    question: '¿Cuál es el lugar de origen del whisky escocés?',
    answers: [
      { text: 'Irlanda', correct: true },
      { text: 'Gales', correct: false },
      { text: 'Estados Unidos', correct: false },
      { text: 'Escocia', correct: false },
    ],
  },
  {
    question:
      '¿Qué nombre tiene tradicionalmente la fiesta que se hace a una mujer que espera un bebé?',
    answers: [
      { text: 'Baby Drizzle', correct: false },
      { text: 'Baby Shower', correct: true },
      { text: 'Baby DownPour', correct: false },
      { text: 'Baby Deluge', correct: false },
    ],
  },
  {
    question: 'En los hoteles elegantes, ¿qué snack suele dejarse sobre las almohadas?',
    answers: [
      { text: 'Un Pretzel', correct: false },
      { text: 'Una Manzana', correct: false },
      { text: 'Una Menta', correct: true },
      { text: 'Una foto de Donald', correct: false },
    ],
  },
  {
    question: '¿Cuáles de estas aplicaciones ofrecen más o menos el mismo tipo de servicio?',
    answers: [
      { text: 'Snapchat y GrubHub', correct: false },
      { text: 'Whatsapp y SHAREit', correct: false },
      { text: 'TikTok y Spotify', correct: false },
      { text: 'Lyft y Uber', correct: true },
    ],
  },
  {
    question: '¿ De dónde son originarios juegos olímpicos?',
    answers: [
      { text: 'Gran Bretaña', correct: false },
      { text: 'Rusia', correct: false },
      { text: 'Estados Unidos', correct: false },
      { text: 'Grecia', correct: true },
    ],
  },
  {
    question: '¿Cuál es el río más largo del mundo?',
    answers: [
      { text: 'Nilo', correct: true },
      { text: 'Amazonas', correct: false },
      { text: 'Yangtze', correct: false },
      { text: 'Misisipi', correct: false },
    ],
  },
  {
    question: '¿Cuál es el océano más grande?',
    answers: [
      { text: 'Atlántico', correct: false },
      { text: 'Índico', correct: false },
      { text: 'Pacífico', correct: true },
      { text: 'Ártico', correct: false },
    ],
  },
  {
    question: '¿Cuál es quinto planeta en el sistema solar?',
    answers: [
      { text: 'Neptuno', correct: false },
      { text: 'Urano', correct: false },
      { text: 'Tierra', correct: false },
      { text: 'Júpiter', correct: true },
    ],
  },
  {
    question: '¿Cuál es quinto planeta en el sistema solar?',
    answers: [
      { text: 'Neptuno', correct: false },
      { text: 'Urano', correct: false },
      { text: 'Tierra', correct: false },
      { text: 'Júpiter', correct: true },
    ],
  },
  {
    question: '¿Cuál es el metal más caro del mundo?',
    answers: [
      { text: 'Rodio', correct: true },
      { text: 'Plata', correct: false },
      { text: 'Bronce', correct: false },
      { text: 'Oro', correct: false },
    ],
  },
  {
    question: '¿En qué país se encuentra el famoso monumento Taj Mahal?',
    answers: [
      { text: 'Indonesia', correct: false },
      { text: 'Turquía', correct: false },
      { text: 'India', correct: true },
      { text: 'Pakistan', correct: false },
    ],
  },
  {
    question: '¿Qué es más pequeño?',
    answers: [
      { text: 'Molécula', correct: false },
      { text: 'Átomo', correct: true },
      { text: 'Célula', correct: false },
      { text: 'Biomolécula', correct: false },
    ],
  },
  {
    question: '¿Cuál es la capital de Hungría?',
    answers: [
      { text: 'Viena', correct: false },
      { text: 'Praga', correct: false },
      { text: 'Budapest', correct: true },
      { text: 'Estambul', correct: false },
    ],
  },
  {
    question: '¿Cuál es la capital de Hungría?',
    answers: [
      { text: 'Viena', correct: false },
      { text: 'Praga', correct: false },
      { text: 'Budapest', correct: true },
      { text: 'Estambul', correct: false },
    ],
  },
  {
    question: '¿Quién escribió La Odisea?',
    answers: [
      { text: 'Sofocles', correct: false },
      { text: 'Homero', correct: true },
      { text: 'Platón', correct: false },
      { text: 'Eurípides', correct: false },
    ],
  },
  {
    question: '¿Quién va a la cárcel?',
    answers: [
      { text: 'El Imputado', correct: false },
      { text: 'El Acusado', correct: false },
      { text: 'El Culpable', correct: false },
      { text: 'El Condenado', correct: true },
    ],
  },
  {
    question: '¿Cuál es el libro sagrado del Islam?',
    answers: [
      { text: 'La Biblia', correct: false },
      { text: 'El Corán', correct: true },
      { text: 'Torá', correct: false },
      { text: 'Talmud', correct: false },
    ],
  },
  {
    question: '¿Quién ganó el mundial de 2014?',
    answers: [
      { text: 'Alemania', correct: true },
      { text: 'Brasil', correct: false },
      { text: 'Francia', correct: false },
      { text: 'Italia', correct: false },
    ],
  },
  {
    question: '¿Quién traicionó a Jesús?',
    answers: [
      { text: 'Judas', correct: true },
      { text: 'Pablo', correct: false },
      { text: 'Pedro', correct: false },
      { text: 'Michael', correct: false },
    ],
  },
  {
    question: '¿Dónde está la Casa Blanca?',
    answers: [
      { text: 'Inglaterra', correct: false },
      { text: 'India', correct: false },
      { text: 'Colombia', correct: false },
      { text: 'Estados Unidos', correct: true },
    ],
  },
  {
    question: '¿Quién es el protagonista de la película “Rocky”?',
    answers: [
      { text: 'Michael Douglas', correct: false },
      { text: 'Silvester Stallone', correct: true },
      { text: 'Nicolas Cage', correct: false },
      { text: 'John Travolta', correct: false },
    ],
  },
  {
    question: '¿Cuál es el órgano más grande del cuerpo humano?',
    answers: [
      { text: 'La Piel', correct: true },
      { text: 'Corazón', correct: false },
      { text: 'Pulmón', correct: false },
      { text: 'Cerebro', correct: false },
    ],
  },
  {
    question: '¿Cuántos lados tiene un hexágono?',
    answers: [
      { text: '5', correct: false },
      { text: '4', correct: false },
      { text: '6', correct: true },
      { text: '7', correct: false },
    ],
  },
];
