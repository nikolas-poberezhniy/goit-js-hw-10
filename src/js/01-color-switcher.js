const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const pageBody = document.querySelector('body');

let timerID = null;
buttonStop.disabled = true;

function switchColor() {
  pageBody.style.backgroundColor = getRandomHexColor();

  buttonStart.disabled = true;
  buttonStop.disabled = false;
  timerID = setInterval(() => {
    pageBody.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function switchColorStop() {
  buttonStart.disabled = true;
  buttonStop.disabled = true;
  clearInterval(timerID);
  buttonStart.removeAttribute('disabled');
  console.log(2);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
buttonStart.addEventListener('click', switchColor);
buttonStop.addEventListener('click', switchColorStop);
