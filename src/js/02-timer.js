import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timEls = document.querySelector('.timer');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const fieldEl = document.querySelectorAll('.field');

startBtn.setAttribute('disabled', 'true');

fieldEl.forEach(el => {
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.justifyContent = 'center';
});

timEls.style.display = 'flex';
timEls.style.columnGap = '10px';
timEls.style.marginTop = '10px';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
const newFlatpickr = flatpickr(inputEl, options);

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

inputEl.addEventListener('input', onInput);
startBtn.addEventListener('click', onStartBtnClick);

function onInput() {
  if (new Date(newFlatpickr.selectedDates) <= Date.now()) {
    Notify.failure('Please choose a date in the futur');
    startBtn.disabled = true;
  } else {
    Notify.success('Good choice');
    startBtn.disabled = false;
  }
}

function onStartBtnClick() {
  const timer = setInterval(() => {
    const timeTimer = new Date(newFlatpickr.selectedDates) - new Date();

    const { days, hours, minutes, seconds } = convertMs(timeTimer);

    if (seconds <= 0) {
      clearInterval(timer);
      Notify.failure('Time over!');
    }

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }, 1000);

  startBtn.disabled = true;
}
