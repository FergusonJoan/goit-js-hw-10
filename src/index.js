import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

inputCountry.addEventListener(
  'input',
  debounce(onSearchCountries, DEBOUNCE_DELAY)
);

const clearItem = item => (item.innerHTML = '');

function onSearchCountries(e) {
  e.preventDefault();

  const value = e.target.value.trim();
  if (!value) {
    clearItem(listEl);
    clearItem(infoEl);
    return;
  }

  fetchCountries(value).then(countries => {
    console.log(countries);
    if (countries.length > 10) {
      clearItem(listEl);
      Notify.info('Too many matches found. Please enter a more specific name.');
    }
    return;
  });
}
