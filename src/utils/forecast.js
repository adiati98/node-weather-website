const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=f87189211a7bf47def20e75b268151ac&query=' +
		latitude +
		',' +
		longitude +
		'&units=m';

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to reach weather service!', undefined);
		} else if (body.error) {
			callback('Unable to get coordinates. Try another search!', undefined);
		} else {
			callback(
				undefined,
				`⌚ ${body.location.localtime} || ⛅ ${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out, feels like ${body.current.feelslike} degrees out.`
			);
		}
	});
};

module.exports = forecast;
