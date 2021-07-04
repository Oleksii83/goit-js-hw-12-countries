const BASE_URL = 'https://restcountries.eu/rest/v2';
function fetchCountries(countriesName) {
  return fetch(`${BASE_URL}/name/${countriesName}`).then(response => {
    return response.json();
  });
}

export default { fetchCountries };
