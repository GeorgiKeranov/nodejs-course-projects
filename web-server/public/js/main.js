const weatherForm = document.querySelector('#weather-form');
const searchField = document.querySelector('#weather-form #location');
const weatherTextElement = document.querySelector('#weather-text');

if (weatherForm) {
    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();

        weatherTextElement.textContent = 'Loading the data...';

        fetch('http://localhost:3000/weather?location=' + searchField.value)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    weatherTextElement.textContent = data.error;
                    return;
                }

                const weatherText = `It is ${data.description} here in ${searchField.value}. ` +
                `It is currently ${data.temperature} degrees out but it feels like ` +
                `a ${data.temperatureFeelsLike} degrees.`;

                if (!weatherTextElement) {
                    console.log('Error, element with id "weather-text" is not found');
                    console.log(weatherText);
                    return;
                }

                weatherTextElement.textContent = weatherText;
            })
            .catch((error) => {
                console.log(error);
            });
    });
}
