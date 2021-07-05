import './sass/main.scss';
import countries_data from '../src/partials/countries.hbs';
import countries_list from '../src/partials/countriesList.hbs';
import API from '../src/js/fetchCountries';
import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');

const debounce = require('lodash.debounce');

const refs = {
  cardContainer: document.querySelector('.js-markup'),
  searchForm: document.querySelector('.js-search-form'),
};

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();

  let form = e.target.value;

  API.fetchCountries(form)
    .then(data => {
      if (data.length === 1) {
        renderCountriesCard(data);
      }
      return data;
    })
    .then(data => {
      if (data.length > 1 && data.length < 10) {
        renderCountriesList(data);
      }
      return data;
    })
    .then(data => {
      if (data.length >= 10) {
        error({
          text: 'Too many matches found. Please enter a more specific query!',
        });
      }
      return data;
    })
    .then(data => {
      if (data.status === 404) {
        error({ text: 'No matches found' });
      }
      return;
    });
}

function renderCountriesCard(countries) {
  const markup = countries_data(countries);
  refs.cardContainer.innerHTML = markup;
}

function renderCountriesList(array) {
  const markupList = countries_list(array);
  refs.cardContainer.innerHTML = markupList;
}
