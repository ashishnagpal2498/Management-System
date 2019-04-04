let LoggedIn = undefined;
//Check if the user is logged In then go to mainpage else -
function mainpage() {
    console.log('Logged in value inside Mainpage')
    console.log(LoggedIn)
    $.get('http://localhost:2121/login',(data)=>{
    //    If the user is logged in then
        if(data.user)
        {   console.log(data)
        return    window.location = './mainfile/mainfile.html'
        }
        return window.location = './entry-login-page/entry-login-page.html'
    })
}
function displaycontent() {

    let middlesectionRow = $('#middle-section-row')
    if(window.pageYOffset>middlesectionRow[0].height)
    middlesectionRow[0].classList.toggle('middlesection-container')
}
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    let middlesectionRow = $('#middle-section-row')

    let heightval = middlesectionRow[0].offsetTop - 400
    if (document.body.scrollTop > heightval|| document.documentElement.scrollTop > heightval) {
        middlesectionRow[0].classList.add('midd-section-slide');
    } else {
        middlesectionRow[0].classList.remove('midd-section-slide');
    }
}
 function openmenu() {

         let responsivemenu = document.getElementsByClassName('responsive-menu')[0]
         console.log(responsivemenu)
         responsivemenu.style.display ="block"
 }

function closemenu()
{
    let responsivemenu = document.getElementsByClassName('responsive-menu')[0]
    console.log(responsivemenu)
    responsivemenu.style.display ="none"
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