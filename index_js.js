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