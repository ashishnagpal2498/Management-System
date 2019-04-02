//Check if the user is logged In then go to mainpage else -
function mainpage() {
    $.get('http://localhost:2121/login',(data)=>{
    //    If the user is logged in then
        if(data)
        {   console.log(data)
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
$(function () {
    $.get('/login',(data)=>{
        console.log('inside Get')
        console.log(data);

        if(data){
            let name = data[0].name;
           let userIcon = $('#login-user')
            userIcon.empty();
           userIcon[0].innerText = `Hey , ${name} `
            console.log(name);
        }
    })
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
})