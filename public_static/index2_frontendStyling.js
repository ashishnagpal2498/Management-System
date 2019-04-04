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