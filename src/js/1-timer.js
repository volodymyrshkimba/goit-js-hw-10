import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const inputEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]')
const hoursEl = document.querySelector('[data-hours]')
const minutesEl = document.querySelector('[data-minutes]')
const secondsEl = document.querySelector('[data-seconds]')
startBtnEl.setAttribute('disabled', '')
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
	onClose(selectedDates) {
		if (selectedDates[0] <= new Date()) {
			iziToast.error({
				close: false,
				timeout: 3000,
				position: 'topRight',
				progressBar: false,
				message: 'Please choose a date in the future',
			 });
			startBtnEl.setAttribute('disabled', '')
			return;
		}
		userSelectedDate = selectedDates[0];
		startBtnEl.removeAttribute('disabled');
	},
};

flatpickr(inputEl, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
	return String(value).padStart(2, '0');
}

const onStartClick = () => {
	inputEl.setAttribute('disabled', '')
	startBtnEl.setAttribute('disabled', '')

	const intID = setInterval(() => {
		const timeToEnd = userSelectedDate - Date.now();
		const timeObj = convertMs(timeToEnd);
		daysEl.textContent = addLeadingZero(timeObj.days);
		hoursEl.textContent = addLeadingZero(timeObj.hours);
		minutesEl.textContent = addLeadingZero(timeObj.minutes);
		secondsEl.textContent = addLeadingZero(timeObj.seconds);
		if (timeToEnd < 1000) {
			clearInterval(intID);
			inputEl.removeAttribute('disabled');
		}
	}, 1000)

}

startBtnEl.addEventListener('click', onStartClick)

