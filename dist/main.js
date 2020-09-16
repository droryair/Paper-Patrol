

const getData = function(){
    const userObject = {}

    userObject.name = $('#name').val()
    userObject.password = $('#password').val()
    userObject.age = $('#age').val()
    userObject.maritalStatus = $('#status').val()
    userObject.file = $('#path').val()
 
    console.log(userObject)

    manager.saveUser(userObject)
    .then(manager.getResults())

    return false
}



