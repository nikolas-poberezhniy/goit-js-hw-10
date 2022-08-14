const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const pageBody = document.querySelector('body');

let timerID = null;

function switchColor() {
  buttonStart.setAttribute('disabled', '');
  timerID = setInterval(() => {
    pageBody.style.background = `${getRandomHexColor()}`;
  }, 1000);
}

function switchColorStop() {
  clearInterval(timerID);
  buttonStart.removeAttribute('disabled');
  console.log(2);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
buttonStart.addEventListener('click', switchColor);
buttonStop.addEventListener('click', switchColorStop);
