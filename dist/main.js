// const renderer = require('./renderer') 
// const manager = require('./manager')

$('#approve').on("click",function(){
    $('body').empty()
    const id = $(this).data().id
    manager.getResultData(id).then(resultArray=>{
        manager.finalPage(resultArray)
        // $.post('/finalPage',{resultArray})
    })
    // console.log(typeof( manager.getResultData(id)))
})