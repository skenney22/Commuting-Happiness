const CENSUS_SEARCH_URL = 'https://api.census.gov/data/2016/acs/acsse/';
const CENSUS_KEY = '67eacecacd439e8e5bdea9feea8ae0281d28c761';


function getApiData (searchTerm,callback) {
    let c = $(`.js-cityInput`).val()
    let s = $(`.js-stateInput`).val()
    const settings = {
        url: CENSUS_SEARCH_URL,
        data: {
            get: 'NAME,K200802_002E,K200802_003E,K200802_004E,K200802_005E',
            for: `place:${c}`,
            in: `state:${s}`,
            key: CENSUS_KEY,
        },
        datatype: 'json',
        type: 'GET',
        success: callback,
    };
$.ajax(settings)
}

function renderHomeScreen () {
    console.log('open home screen')
    return `<form class="js-searchForm">
                <input type="text" class="js-cityInput" placeholder="City"></input>
                <input type="text" class="js-stateInput" placeholder="State"></input>
                <button type="input">Search</button>
            </form>` 
}

function displayHomeScreen () {
    $(`.js-container`).html(renderHomeScreen());
}

function renderSearchResults (item) {
    return `<div>
                <p>Total people with commuting time less than 10 minutes: ${item[1]}</p>
            </div>`;

}

function displaySearchResults (data) {
    console.log('results:', data);
    let results = $.map((item,index) =>
        renderSearchResults(item));
    $(`.js-container`).html(renderSearchResults(results));

}

function watchSubmitResults () {
    console.log('show results')
    $(`.js-container`).on('submit', '.js-searchForm', function (event) {
        event.preventDefault();
        let query = $(`.js-input`).val();
        getApiData(query, displaySearchResults);
    });
}

function renderApp () {
    displayHomeScreen();
    watchSubmitResults();
}

$(renderApp)