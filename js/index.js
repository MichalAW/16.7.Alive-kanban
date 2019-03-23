var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = document.getElementById('countries');

function searchCountries() {
    var countryName = document.getElementById('country-name').value;

    if (!countryName.length) countryName = 'Poland';

    fetch(url + countryName)
        .then(function(resp) {
            return resp.json();
        })
        .then(showCountriesList);
}

function showCountriesList(resp) {
    countriesList.innerHTML = '';
    resp.forEach(function(item) {
        var li = document.createElement('li');
        li.innerText = item.name;
        countriesList.appendChild(li);
    });
}

document.getElementById('search').addEventListener('click', searchCountries);