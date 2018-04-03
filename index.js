const CENSUS_SEARCH_URL = 'https://api.census.gov/data/2016/acs/acsse/';
const CENSUS_KEY = '67eacecacd439e8e5bdea9feea8ae0281d28c761';

function renderHomeScreen () {
    console.log('open home screen')
    return `<div class="heading">
                <h2>The tool for determining happiness in another city!</h2>
                <p>Enter any city and state in the US to receive commuting and happiness data for that city</p>
            </div>
            <form class="js-searchForm searchForm">
                <label><input type="text" class="js-cityInput cityInput" placeholder="City"></input>
                <input type="text" class="js-stateInput stateInput" placeholder="State"></input>
                <button type="input" class="searchButton">Search</button></label>
            </form>` 
}

function displayHomeScreen () {
    $(`.js-container`).html(renderHomeScreen());
}


function getApiDataTotal (callback) {
    const settings = {
        url: CENSUS_SEARCH_URL,
        data: {
            get: 'NAME,K200802_002E,K200802_003E,K200802_004E,K200802_005E',
            for: `place:*`,
            key: CENSUS_KEY,
        },
        datatype: 'json',
        type: 'GET',
        success: callback,
    };
    $.ajax(settings)
}


function findIndexLocation (element) {
    let cityQuery = $(`.js-cityInput`).val();
    let stateQuery = $(`.js-stateInput`).val();
    const city = cityQuery.toLowerCase();
    const state= stateQuery.toLowerCase();
    if (element[0].toLowerCase().indexOf(city)!=-1 && element[0].toLowerCase().indexOf(state)!=-1)  {
        return true;
    }
}



function returnSearchResults (dataTotal) {
    console.log('Total Results:', dataTotal)
 
    const index = dataTotal.findIndex(findIndexLocation)
        if (index!==-1) {
            return `<div class="results">
                        <h1>${dataTotal[index][0]}</h1>
                        <p>Less than 10 minutes: ${dataTotal[index][1]}</p>
                        <p>Between 10 and 29 minutes: ${dataTotal[index][2]}</p>
                        <p>Between 30 and 59 minutes: ${dataTotal[index][3]}</p>
                        <p>Over 60 minutes: ${dataTotal[index][4]}</p>
                        <button class="js-again again">Look Up Another Location</button>
                    </div>`
        }
        else {
            $(`.happyParagraph`).remove();
            return `<div class= "error">
                        <p>Please enter a valid city and state</p>
                        <button class="js-again again">Try Again</button>
                    </div>`

        }
}     


function displaySearchResults (dataTotal) {
    console.log('This should show results')
    $(`.js-container`).html(returnSearchResults(dataTotal));

}

function determineHappiness () {
    console.log(happyData[0])
    const happyindex= happyData.findIndex(findIndexLocation)
        if (happyindex!==-1) {
            return `<div class="happyParagraph">
                        <p>${happyData[happyindex][0]} is ranked number ${happyData[happyindex][1]} happiest cities in the US!</p>
                    </div>`;
        }
        else {
            return `<div class="happyParagraph">
                        <p>Sorry, your city hasn't been rated one of the happiest cities in the US yet, but make sure to spread the happiness anyway!</p>
                    </div>`
        }
}

function displayHappiness (happyData) {
    $(`.js-happiness`).html(determineHappiness(happyData));
}


function watchSubmitResults () {
    console.log('show results')
    $(`.js-container`).on('submit', '.js-searchForm', function (event) {
        event.preventDefault();
        getApiDataTotal(displaySearchResults);
        displayHappiness();
        
    });
}

function findNewLocation() {
    $(`.js-container`).on('click', '.js-again', function (event) {
        displayHomeScreen();
        $(`.happyParagraph`).remove();
    })
}

function renderApp () {
    displayHomeScreen();
    watchSubmitResults();
    findNewLocation();
}

$(renderApp)