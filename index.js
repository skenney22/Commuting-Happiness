


function renderHomeScreen () {
    console.log('open home screen')
}

function renderSearchResults () {
    console.log('open results page')
}

function renderApp () {
    renderHomeScreen();
    renderSearchResults();
}

$(renderApp)