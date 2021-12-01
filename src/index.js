'use strict'

import './css/styles.css';
import {fetchCountries} from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const info = document.querySelector(".country-info");

const DEBOUNCE_DELAY = 300;


input.addEventListener("input", debounce((name) => {
    name = input.value.trim();
    if (name.length === 0) {
        countryList.innerHTML = "";
        info.innerHTML = "";
        return;
    }

    fetchCountries(name)
    .then((countries) => renderCountriesList(countries))
    // .then((countries) => console.log("countries", countries))
    .catch((error) => Notiflix.Notify.failure("Oops, there is no country with that name"))
}, 300));

function renderCountriesList(countries) {
    if (countries.length === 1) {
        showCountryCard(countries);

    } else if (countries.length >= 2 && countries.length <= 10) {
        showCountriesList(countries);
        
    } else if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

    }
}

function showCountryCard (countries) {
    info.innerHTML = countries
        .map((country) => {
            const {flags, name, capital, languages, population} = country;
            const language = Object.values(languages).join(", ");
            return `<img class="country-image" src="${flags.svg}" alt="${country.name}" width="40">
                <span class="country-name">${name.official}</span>
                <p class="country-text"><b>Capital</b>: ${capital}</p>
                <p class="country-text"><b>Languages</b>: ${language}</p>
                <p class="country-text mg-30"><b>Population</b>: ${population}</p>`;
        })
        .join("");
        countryList.innerHTML = "";
}

function showCountriesList(countries) {
    info.innerHTML = "";
    countryList.innerHTML = countries
        .map((country) => {
            const {flags, name} = country;
        return `<li class="country-item">
            <img class="country-image" src="${flags.svg}" alt="${country.name}" width="40">
            <span class="country-name">${name.official}</span>
            </li>`;
        })
        .join("");
}

// Notiflix.Notify.success('Sol lucet omnibus');