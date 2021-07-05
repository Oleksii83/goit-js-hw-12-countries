const BASE_URL = 'https://restcountries.eu/rest/v2/name/';
function fetchCountries(countriesName) {
  return fetch(`${BASE_URL}${countriesName}`).then(response => {
    if (response.ok) return response.json();
  });
}

export default { fetchCountries };
