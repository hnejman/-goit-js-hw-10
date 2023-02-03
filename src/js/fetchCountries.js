import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const searchBox = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

function showCountries(country){
    const response = document.createElement("div");
    response.classList.add("country-list__response");
    const flag = document.createElement("img");
    flag.src = country.flags.svg;
    flag.classList.add("country-list__image");
    const cName = document.createElement("p");
    cName.textContent = country.name.common;
    cName.classList.add("country-list__cName");
    countryList.insertAdjacentElement("beforeend",response);
    response.insertAdjacentElement("beforeend",flag);
    response.insertAdjacentElement("beforeend",cName);
};
function showCountriesExpanded(country){
    showCountries(country);
    const decripion = document.createElement("ul");
};

function clearResponse(){

};

function fetchCountries(name) {
  fetch(name)
    .then(r => r.json())
    .then(r => {
      if (r.length <= 10 && r.length != 1) {
        r.forEach(country => {
            console.log(country);
            showCountries(country);
        });
      }else if(r.length == 0){
        Notiflix.Notify.failure("Error: error 404 - page not found")
      }else if(r.length == 1){
        



      }else{
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
      }
    })
    .catch(e => {
      Notiflix.Report.failure('Error:', e);
      console.log('Error:', e);
    });
}
searchBox.addEventListener(
  'input',
  debounce(e => {
    if (searchBox.value.trim() != 0) {
      console.log(fetchCountries('https://restcountries.com/v3.1/name/' + searchBox.value));
    }
  }, 300)
);
