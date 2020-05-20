const request = require('request');

const geocode = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(address) +
		'.json?access_token=pk.eyJ1IjoiYXl1OTgiLCJhIjoiY2s5dnRrdXhnMDJqbTNwczA2aWh3dTZiZiJ9.NYX935i6m_zHRxtGgvWO8g&limit=1';

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined);
		} else if (body.features.length === 0) {
			callback('Unable to locate the location. Try another search!', undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
