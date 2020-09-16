
class ResultManager {
    constructor() {
        this.result = []
    }
    async getResultData(id) {

        const user = await $.get(`/getUser/?id=${id}`)
        const i = await $.get(`/insurence`)
        const r = await $.get(`/results/${id}`)

        // this.result.push(user.fullDisclosure)
        this.result.push({monthFee:1,savesFee:1,dangerLvl:"low"})
        this.result.push(i)
        this.result.push(r)

        return this.result
    }
}

const manager = new ResultManager()