class Renderer {

    renderMarket(market) {
        $("#bench-market").empty()
        const source = $('#template-market').html();
        const template = Handlebars.compile(source)
        const newHTML = template(market)
        $('#results').append(newHTML)
    }

    renderUserResults(user) {
        $("#user-results").empty()
        const source = $('#template-user').html();
        const template = Handlebars.compile(source)
        const newHTML = template(user.fullDisclosure)
        $('#results').append(newHTML)
    }

    renderBestOffers(offers) {
        $("#best-offers").empty()
        const source = $('#template-offers').html();
        const template = Handlebars.compile(source)
        const newHTML = template({offers})
        $('#results').append(newHTML)
    }
}

let renderer = new Renderer()