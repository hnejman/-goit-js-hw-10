import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const searchBox = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

const parameters = ["capital", "population", "languages"]


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
    console.log(country);
    const description = document.createElement("ul");
    description.classList.add("country-Info__list");
    countryInfo.appendChild(description);
    for( const key in country){
      if(parameters.includes(key)){
      const element = document.createElement("li");
      element.classList.add("country-Info__item");
      description.appendChild(element)
      const tag = document.createElement("span");
      tag.classList.add("country-Info__tag");
      tag.textContent = key + ": ";
      tag.textContent = tag.textContent[0].toUpperCase() + tag.textContent.slice(1);
      element.appendChild(tag);
      const value = document.createElement("span");
      value.classList.add("country-Info__value");
      value.textContent = JSON.stringify(country[key]);
      value.textContent = value.textContent.replace("{"," ");
      value.textContent = value.textContent.replace("}"," ");
      value.textContent = value.textContent.replace("["," ");
      value.textContent = value.textContent.replace("]"," ");
      value.textContent = value.textContent.replaceAll(`"`," ");
      element.appendChild(value);
      }
    };
};

function clearResponse(){
  if(countryList.childNodes.length!=0){
    countryList.childNodes.forEach(()=>{
      countryList.childNodes[0].remove();
    })
  }
  if(countryInfo.childNodes.length!=0){
    countryInfo.childNodes.forEach(()=>{
      countryInfo.childNodes[0].remove();
    })
  }
};

function fetchCountries(name) {
  fetch(name)
    .then(r => r.json())
    .then(r => {
      if (r.length <= 10 && r.length != 1) {
        r.forEach(country => {
            showCountries(country);
        });
      }else if(r.length == 0){
        Notiflix.Notify.failure("Error: error 404 - page not found")
      }else if(r.length == 1){
            showCountriesExpanded(r[0]);
            console.log(r[0]);
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
    clearResponse();
    if (searchBox.value.trim() != 0) {
      console.log(fetchCountries('https://restcountries.com/v3.1/name/' + searchBox.value));
    }
  }, 300)
);
