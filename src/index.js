import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

inputCountry.addEventListener('input', onSearchCountries);

function onSearchCountries(e) {
  e.preventDefault();

  const value = event.currentTarget.value.trim();
  if (!value) {
    // clearItem(listEl);
    // clearItem(infoEl);
    return;
  }
}
