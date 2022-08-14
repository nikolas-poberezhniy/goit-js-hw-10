import flatpickr from 'flatpickr';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'flatpickr/dist/flatpickr.min.css';

const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const picker = document.querySelector('#datetime-picker');

let deadlineDate = null;
let timerIsOn = false;
let timeID = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedDateValidation(selectedDates);
  },
};

let input = flatpickr('#datetime-picker', options);

function selectedDateValidation(selectedDates) {
  if (selectedDates[0] < Date.now()) {
    input.open();

    Report.failure('Wrong data', 'Select a non-past date', 'Okay');
    if (!deadlineDate) {
      return;
    }
  }
  deadlineDate = selectedDates[0];
}
buttonStop.disabled = true;
buttonStart.addEventListener('click', () => {
  timerStart(deadlineDate);
});

buttonStop.addEventListener('click', () => {
  stopTimer(timeID);
  renderTimer(convertMs(0));
});

function timerStart(selectedDates) {
  if (timerIsOn) {
    Notify.failure('timer already run');
    return;
  }
  if (!deadlineDate || deadlineDate < Date.now) {
    Notify.failure('firstly choose data');
    return;
  }

  timerIsOn = true;
  buttonStart.disabled = true;
  buttonStop.disabled = false;
  timeID = setInterval(() => {
    let delta = selectedDates - Date.now();
    console.log(delta);

    if (delta < 0) {
      stopTimer(timeID);
      return;
    }

    renderTimer(convertMs(delta));
  }, 1000);
}

function renderTimer(object) {
  for (let item in object) {
    document.querySelector(`[data-${item}]`).innerHTML = String(
      object[item]
    ).padStart(2, '0');
  }
}

function stopTimer(timeID) {
  clearInterval(timeID);
  timerIsOn = false;
  Notify.success('Отсчет завершен');
  deadlineDate = null;
  buttonStart.disabled = false;
  buttonStop.disabled = true;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
