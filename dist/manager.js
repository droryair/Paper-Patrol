class Manager {
    constructor() {}

    saveUser = async (userData) => {
        await $.post(`/user/${userName}`, userData)
    }

    getResults = async () => {
        await $.get(`/insurence`, (results => {
            console.log(results)
        }))
    }
}

const manager = new Manager