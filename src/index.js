import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

const clearItem = item => (item.innerHTML = '');

input.addEventListener('input', debounce(findCountries, DEBOUNCE_DELAY));

function findCountries() {
  const value = input.value.trim();
  if (!value) {
    clearItem(listEl);
    clearItem(infoEl);
    return;
  }

  fetchCountries(value)
    .then(countries => {
      console.log(countries);
      if (countries.length > 10) {
        clearItem(listEl);
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      markupRender(countries);
    })
    .catch(err => {
      Notify.failure('Oops, there is no country with that name');
      return;
    });
}

function markupRender(countries) {
  if (countries.length === 1) {
    clearItem(listEl);
    clearItem(infoEl);
    const item = createItem(countries);
    infoEl.insertAdjacentHTML('beforeend', item);
  } else {
    clearItem(listEl);
    clearItem(infoEl);
    const list = createList(countries);
    listEl.insertAdjacentHTML('beforeend', list);
  }
}

function createItem(countries) {
  return countries.map(({ name, capital, population, flags, languages }) => {
    return `<h1 class="country-info__name"><span class="country-info__flag"><img src="${
      flags.svg
    }" alt="${flags.alt} width="30" height="30"></span>${name.official}</h1>
    <p class="country-info__details"><span>Capital: </span>${capital}</p>
    <p class="country-info__details"> <span>Population: </span>${population}</p>
    <p class="country-info__details"> <span>Languages: </span>${Object.values(
      languages
    )}</p>`;
  });
}

function createList(countries) {
  return countries
    .map(
      ({ name, flags }) =>
        `<li class="country-list__element"><img class="country-list__img" src="${flags.png}" alt="${flags.alt}" width="40" height="25">${name.common}</li>`
    )
    .join('');
}

const countryEl = document.querySelectorAll('.country-list__element');
countryEl.addEventListener('click', c => {
  console.log('Country was clicked');
});
