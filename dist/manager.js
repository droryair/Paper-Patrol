
class ResultManager {
    constructor() {
        this.result = {}
    }
    async getResultData(id) {

        const user = await $.get(`/getUser/?id=${id}`)
        const i = await $.get(`/insurence`)
        const r = await $.get(`/results/${id}`)
        // this.result.push(user.fullDisclosure)
        this.result["userPension"]={monthFee:1,savesFee:1,dangerLvl:"low"}
        this.result["benchmark"]=i
        this.result["bestOffer"]=r

        return this.result
    }

    async finalPage(resultArray){
      const html = await $.post('/finalPage',resultArray)
       $('body').append(html)
    }
}

const manager = new ResultManager()