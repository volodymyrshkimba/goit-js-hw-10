const formEl = document.querySelector('.form');
const inputDelayEl = document.querySelector('[name="delay"]')
const inputFulfilled = document.querySelector('[value="fulfilled"]')
const onFormSubmit = event => {
	event.preventDefault();
	const delay = Number(inputDelayEl.value);
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			if (inputFulfilled.checked) {
				resolve(delay);
			} else {
				reject(delay);
			}
		}, delay)
	});
	console.log(promise);
	promise.then(() => {
		console.log(`✅ Fulfilled promise in ${delay}ms`);
	}).catch(() => {
		console.log(`❌ Rejected promise in ${delay}ms`);
	})
}

formEl.addEventListener('submit', onFormSubmit)