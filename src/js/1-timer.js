import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]')

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
	onClose(selectedDates) {
		if (selectedDates[0] < new Date()) {
			alert("Please choose a date in the future");
			startBtnEl.setAttribute('disabled', '')
			return;
		}
		console.log(selectedDates[0]);
		startBtnEl.removeAttribute('disabled');
	},
};

flatpickr(inputEl, options);

