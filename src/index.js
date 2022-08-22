import './css/styles.css';
import SerchService from './js/searchService';
import listTemplate from './templates/listOfCountriesCommon.hbs';
import listTemplateOfficial from './templates/listOfCountriesOfficial.hbs';
import uniqueCountry from './templates/uniqueCountry.hbs';
import _debounce from 'debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 400;

const serchService = new SerchService();

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  checkbox: document.querySelector('input[name=checkbox]'),
  toogle: document.querySelector('.toogle'),
};

refs.input.addEventListener('input', _debounce(onInput, DEBOUNCE_DELAY));
refs.toogle.addEventListener('change', e => {
  serchService.typeOfName = e.target.dataset.name;
  render();
});

function onInput(element) {
  if (element.target.value) {
    console.log(serchService.typeOfName);
    serchService.query = element.target.value;
    render();
    return;
  }
  refs.list.innerHTML = '';
}

refs.list.addEventListener('click', e => console.log(e.target.dataset.name));

refs.checkbox.addEventListener('change', () => {
  render();
  refs.toogle.classList.toggle('hide');
  serchService.typeOfName = 'official';
});

function render() {
  if (refs.input.value) {
    if (refs.checkbox.checked) {
      serchService
        .filteredCountries()
        .then(creatingMarcap)
        .catch(() => {
          failureName();
        });
      return;
    }

    serchService
      .fetchCountries()
      .then(creatingMarcap)
      .catch(() => {
        failureName();
      });
  }
}

function creatingMarcap(e) {
  refs.list.innerHTML = '';
  console.log(e);
  if (e.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  } else if (e.length >= 2) {
    e.forEach(element => {
      if (serchService.typeOfName == 'common')
        appendCountriesMarcup(listTemplate(element));
      if (serchService.typeOfName == 'official')
        appendCountriesMarcup(listTemplateOfficial(element));
    });
    return;
  } else if (!e.length) {
    failureName();
    return;
  }
  appendCountriesMarcup(uniqueCountry(e[0]));
}

function failureName() {
  Notify.failure('Oops, there is no country with that name');
  refs.input.value = '';
  refs.list.innerHTML = '';
}

function appendCountriesMarcup(countries) {
  refs.list.insertAdjacentHTML('beforeend', countries);
}
