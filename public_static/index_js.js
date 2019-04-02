//Check if the user is logged In then go to mainpage else -
function mainpage() {
    $.get('http://localhost:2121/login',(data)=>{
    //    If the user is logged in then
        if(data.user)
        {   console.log(data.message)
        return    window.location = './mainfile/mainfile.html'
        }
        return window.location = './entry-login-page/entry-login-page.html'
    })
}


function closemenu()
{
    let responsivemenu = document.getElementsByClassName('responsive-menu')[0]
    console.log(responsivemenu)
    responsivemenu.style.display ="none"
}
window.onload = function () {
    let crossbtn = document.getElementsByClassName('cross-button')
    console.log(crossbtn)

    window.openmenu = function () {
        let responsivemenu = document.getElementsByClassName('responsive-menu')[0]
        console.log(responsivemenu)
        responsivemenu.style.display ="block"
    }


    // crossbtn.addEventListener('click',function () {
    //     responsivemenu.style.display ="block"
    // })
}