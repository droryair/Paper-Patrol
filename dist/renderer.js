// // const Manager = require('./manager')

// const Renderer = function () {
//     // In-Module Methods
//     const renderBenchMark = function(benchMark){
//         const source = $("#bench-mark-template").html()
//         const template = Handlebars.compile(source)
//         const newHTML = template(benchMark)
//         console.log(benchMark)
//         $('#bench-mark-container').append(newHTML)
//     }
//     // const renderUserpension = function(userPension) {
//     //     const source = $("#user-pension-template").html()
//     //     const template = Handlebars.compile(source)
//     //     const newHTML = template(userPension)
//     //     $('#user-pension-container').append(newHTML)

//     // }
//     // const renderBestOffer = function(bestOffer) {
//     //     console.log("renderBestOffer")
//     //     const source = $("#best-offer-template").html()
//     //     const template = Handlebars.compile(source)
//     //     const newHTML = template(bestOffer)
//     //     $('#best-offer-container').append(newHTML)
//     // }

//     // Export Methods
//     const renderData = function(resultsArray) {
//         $("#results-container").empty() 
//         $("#user-info").empty()
//         benchMark = resultsArray[0]
//         userPension = resultsArray[1]
//         bestOffer = resultsArray[2]
//         renderBenchMark(benchMark)
//         // renderUserpension(userPension)
//         // renderBestOffer(bestOffer)
//     }

//     return {
//         renderData
//     }
// }

// // let renderer = new Renderer()

// const renderer = Renderer()
