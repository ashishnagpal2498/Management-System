function loginvalidate() {
    let loginform = document.getElementById('loginForm')
    let username = document.getElementById('username')
    let password = document.getElementById('password')
    if(username.value === "")
    {
        //alert("Please provide your email ");
        username.style.color = "red";
        username.focus();
        return false;
    }
    if(password.value === "")
    {
        //alert("Please provide your password ");
        password.style.borderColor = "red";
        password.focus();
        return false;
    }
    let loginemail = username.value
        ,loginatpos = loginemail.indexOf("@")
    ,   logindotpos = loginemail.lastIndexOf(".");
    if (loginatpos < 1 || (logindotpos - loginatpos < 2))
    {
        //alert("Please enter correct email ID")
        username.style.borderColor = "red";
        username.focus();
        return false;
    }
    return true;

}
$(()=>{
    let loginForm = $('#loginForm')
    let UrlSplitter = window.location.href.split('=')[1]
    loginForm.submit(function (event) {
        event.preventDefault();
        $('#invalid-message').css('display','none')
        console.log('Prevented DEFAULT  ')
        let username = $('#username')
        let password = $('#password')
        let frontEndCheck = loginvalidate();
        console.log(frontEndCheck);
        if(frontEndCheck)
        {   console.log('Inside If')
            //if it comes out to be true - then the data is ready to send to backend
            $.post('http://localhost:2121/login',
                {
                    username: username.val(),
                    password: password.val()
                }, //Callback Function
                (data)=>{
                console.log(data);
                    if(data.userFound)
                    {
                        //userExist -
                        if(UrlSplitter)
                        {
                            window.location = `http://localhost:2121/mainfile/mainfile.html?category=${UrlSplitter}`
                        }
                        else
                        {
                            window.location = "http://localhost:2121/myprofile.html"
                        }
                    }
                    else
                    {
                        let invalidDiv = $('#invalid-message')
                        invalidDiv.css('display','block')
                    }
                })
        }
    })
})