import './sass/main.scss';
import countries_data from '../src/partials/countries.hbs'
import { func } from 'assert-plus';
import { functionDeclaration } from 'babel-types';

const refs = {
    cardContainer: document.querySelector('.js-markup'),
    searchForm: document.querySelector('.js-search-form')
}

refs.searchForm.addEventListener('change', onSearch);
 console.log("🚀 ~ file: index.js ~ line 12 ~ refs.searchForm", refs.searchForm.elements)


function onSearch(e) {
    e.preventDefault();
    
    const form = e.currentTarget;
    console.log(form.elements)
    const searchQuery = form.elements.query.value;

    fetchCountries(searchQuery)
        .then(renderCountriesCard)
        .catch(error => console.log(error));
}

function fetchCountries(countriesName) {
    return fetch(`https://restcountries.eu/rest/v2/name/${countriesName}`)
        .then(response => {
            return response.json();
        });

}

function renderCountriesCard(countries) {
    const markup = countries_data(countries)
    refs.cardContainer.innerHTML = markup
    
}