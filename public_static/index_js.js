let LoggedIn = undefined;
//Check if the user is logged In then go to mainpage else -

function mainpage(category) {
    // alert(category)
    console.log('Logged in value inside Mainpage')
    console.log(LoggedIn)
    $.get('http://localhost:2121/login',(data)=>{
    //    If the user is logged in then
        if(data.user)
        {   console.log(data)
        return    window.location = `http://localhost:2121/mainfile/mainfile.html?category=${category}`
        }
        return window.location = `http://localhost:2121/Login/login.html?category=${category}`
    })
}

$(function () {
    LoggedIn = undefined;
    console.log(LoggedIn)
    console.log('Logged In value before')
    $.get('/login',(data)=>{
        console.log('inside Get')
        console.log(data);
        if(data.user){
            LoggedIn = data.user
            let name = data.user[0].name;
           let userIcon = $('#login-user')
            userIcon.empty();
           userIcon[0].innerText = `Hey , ${name} `
            console.log(name);
        }
    })
    console.log('Logged In value after')
    console.log(LoggedIn)


})