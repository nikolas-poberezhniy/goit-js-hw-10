import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = parseInt(e.currentTarget.elements['delay'].value);
  const step = parseInt(e.currentTarget.elements['step'].value);
  const amount = parseInt(e.currentTarget.elements['amount'].value);

  startGeneratePromise(delay, step, amount);
});

function startGeneratePromise(delay, step, amount) {
  setTimeout(() => {
    promiseRepeating(step, amount, delay);
  }, delay);
}

function promiseRepeating(step, amount, delay) {
  let currentStep = 1;
  let sumOfDelay = delay;

  const timerID = setInterval(() => {
    if (currentStep === amount) {
      clearInterval(timerID);
    }

    outputPromiseResult(currentStep, sumOfDelay);
    currentStep += 1;
    sumOfDelay += step;
  }, step);
}

function outputPromiseResult(position, daley) {
  createPromise(position, daley)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
