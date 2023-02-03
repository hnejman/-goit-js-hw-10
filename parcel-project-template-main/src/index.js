import './css/styles.css';
import notiflix from notiflix;

const DEBOUNCE_DELAY = 300;

fetch("https://restcountries.com/v3.1/name")
.then(resolve=>{console.log(resolve)})
.catch()