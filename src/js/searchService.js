const BASE_URL = 'https://restcountries.com/v3.1';

export default class SerchService {
  constructor() {
    this.serchQuery = '';
    this.queryFields = ['name', 'capital', 'population', 'flags', 'languages'];
    this.typeOfName = 'official';
  }

  fetchCountries() {
    return fetch(
      `${BASE_URL}/name/${this.serchQuery}?fields=${this.queryFields.join(',')}`
    )
      .then(e => {
        if (!e.ok) {
          throw new Error(e.status);
        }
        return e.json();
      })
      .then(e => {
        console.log(e);
        return e;
      })
      .catch(console.log);
  }

  filteredCountries() {
    return this.fetchCountries().then(e => {
      return e.filter(
        countr =>
          countr.name[this.typeOfName].toLowerCase().indexOf(this.serchQuery) ==
          0
      );
    });
  }

  get query() {
    return this.serchQuery;
  }
  set query(newQuery) {
    this.serchQuery = newQuery.toLocaleLowerCase();
  }
}
