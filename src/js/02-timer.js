import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector('#datetime-picker');
const startTimerBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEL = document.querySelector('span[data-seconds]');
let selectedDate = null;

// startTimerBtn.setAttribute('disabled', true);
const dateNow = new Date().getTime();



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const difTime = selectedDate - dateNow;
    if (difTime <= 0) {
      return window.alert('Please choose a date in the future');
    }
    startTimerBtn.disabled = false;
  },

};

flatpickr (input, options);

startTimerBtn.addEventListener('click', onBtnClick);

function onBtnClick() {
  // startTimerBtn.disabled = true;

  countDownTimer();
}


  function countDownTimer() {
    // const currentDate = new Date(input.value).getTime();
    const currentDate = new Date('Mon Feb 27 2023 13:44:00').getTime();
    const intervalId = setInterval(() => {
      const dateNow = new Date().getTime();
      const timeDifference = currentDate - dateNow;
      const timeCount = convertMs(timeDifference);
      updateClockFace(timeCount);
      if (timeDifference < 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  }


function updateClockFace ({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEL.textContent = seconds;
}

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
}