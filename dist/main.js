// const renderer = require('./renderer') 
// const manager = require('./manager')

$('#approve').on("click",function(){
    const id = $(this).data().id
    manager.getResultData(id).then(resultArray=>{
        console.log(resultArray)
         $.post('/finalPage',{resultArray})
    })
    // console.log(typeof( manager.getResultData(id)))
})