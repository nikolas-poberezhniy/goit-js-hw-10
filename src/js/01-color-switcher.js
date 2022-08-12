const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const pageBody = document.querySelector('body');

let timerID = null;

function switchColor() {
  const selectedElement =
    (pageBody.style.background = `${getRandomHexColor()}`);

  selectedElement;
  buttonStart.setAttribute('disabled', '');
  timerID = setInterval(() => {
    selectedElement;
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
