const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
  // prevent page from loading automatically
	e.preventDefault();

	// extract value of input
	const location = search.value;

	// render <p></p>
	messageOne.textContent = 'Loading...'
	messageTwo.textContent = ''

	
	// fetch weather
		fetch('http://localhost:3000/weather?address=' + location).then(
			(response) => {
				response.json().then((data) => {
					if (data.error) {
						messageOne.textContent = data.error;
					} else {
						messageOne.textContent = data.location;
						messageTwo.textContent = data.forecast;
					}
				});
			});
});
