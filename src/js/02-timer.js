import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startTimerBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEL = document.querySelector('span[data-seconds]');

startTimerBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateNow = new Date();
    const difTime = selectedDates[0] - dateNow;
    // console.log(difTime);
    if (difTime <= 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
    };
    startTimerBtn.disabled = false;
  },
};

flatpickr (input, options);

startTimerBtn.addEventListener('click', countDownTimer);

function countDownTimer() {
  const selectedDate = new Date(input.value).getTime();
  const intervalId = setInterval(() => {
    const dateNow = new Date().getTime();
    const timeDifference = selectedDate - dateNow;
    if (timeDifference >= 0) {
      startTimerBtn.disabled = true;
      input.disabled = true;
      const timeCount = convertMs(timeDifference);
      // console.log(timeDifference);
      updateClockFace(timeCount);
    } else {
      clearInterval(intervalId);
      input.disabled = false;
      Notiflix.Notify.success('Countdown is completed');
    }
  }, 1000);
};

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  };

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

function updateClockFace ({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEL.textContent = seconds;
};