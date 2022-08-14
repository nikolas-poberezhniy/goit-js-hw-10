import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = parseInt(e.currentTarget.elements['delay'].value);
  const step = parseInt(e.currentTarget.elements['step'].value);
  const amount = parseInt(e.currentTarget.elements['amount'].value);

  startGeneratePromise(delay, step, amount);
  e.currentTarget.reset;
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  console.log(shouldResolve);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function startGeneratePromise(delay, step, amount) {
  for (let i = 1; i <= amount; i++) {
    const promise = createPromise(i, delay);
    promise
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
