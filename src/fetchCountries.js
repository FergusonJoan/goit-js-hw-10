const BASE_URL = 'https://restcountries.com/v3.1/';

export const fetchCountries = name => {
  const params = new URLSearchParams({
    fields: 'name,capital,population,flags,languages',
  });
  return fetch(`${BASE_URL}/name/${name}?${params}`).then(response => {
    if (response.ok === true) {
      return response.json();
    }
    throw new Error(response.status.text);
  });
};
