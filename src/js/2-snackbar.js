import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const formEl = document.querySelector('.form');
const inputDelayEl = document.querySelector('[name="delay"]')
const inputFulfilled = document.querySelector('[value="fulfilled"]')
const onFormSubmit = event => {
	event.preventDefault();
	const delay = Number(inputDelayEl.value);
	const isChacked = inputFulfilled.checked;
	event.currentTarget.reset();
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			if (isChacked) {
				resolve(delay);
			} else {
				reject(delay);
			}
		}, delay)
	});
	promise.then(() => {
		iziToast.success({
			close: false,
			timeout: 3000,
			position: 'topRight',
			progressBar: false,
			icon: '',
    		message: `✅ Fulfilled promise in ${delay}ms`,
});
	}).catch(() => {
		iziToast.error({
			close: false,
		   timeout: 3000,
			position: 'topRight',
			progressBar: false,
			icon: '',
         message: `❌ Rejected promise in ${delay}ms`,
});
	})
}

formEl.addEventListener('submit', onFormSubmit)