class Manager {
    constructor() {}

    saveUser = async (userData) => {
        const userName = $(`#name`).val()
        await $.post(`/user/${userName}`, userData, (user => {
            renderer.renderUserResults(user)
        }))
    }

    getResults = async () => {
        await $.get(`/insurence`, (market => {
            renderer.renderMarket(market)
        }))
    }
}

const manager = new Manager