function signupvalidate() {
    if(document.forms["mysignupform"]["signupname"].value == "")
    {
        document.getElementById("signupname").style.borderColor = "red";
        document.mysignupform.signupname.focus();
        return false;
    }
    if(document.forms["mysignupform"]["signupemail"] == "")
    {
        document.getElementById("signupemail").style.borderColor = "red";
        document.mysignupform.signupemail.focus();
        return false;
    }
    if(document.forms["mysignupform"]["signupdept"] == "")
    {
        //alert("Please provide your department ");
        document.getElementById("signupdept").style.borderColor = "red";
        document.mysignupform.signupdept.focus();
        return false;
    }
    if(document.forms["mysignupform"]["designation"] == "")
    {
        //alert("Please provide your designation ");
        document.getElementById("designation").style.borderColor = "red";
        document.mysignupform.designation.focus();
        return false;
    }
    if(document.mysignupform.signuppass == "")
    {
        alert("Please provide your password ");
        //document.getElementById("signuppass").style.borderColor = "red";
        document.mysignupform.signuppass.focus();
        return false;
    }
    let signupemail = document.mysignupform.signupemail.value;
    let signupatpos = signupemail.indexOf("@");
    let signupdotpos = signupemail.lastIndexOf(".");
    if (signupatpos < 1 || (signupdotpos - signupatpos < 2))
    {
        //alert("Please enter correct email ID")
        document.getElementById("signupemail").style.borderColor = "red";
        document.mysignupform.signupemail.focus();
        return false;
    }
    return true;
}
$(()=>{
    let signUpForm = $('#signUpForm')
    signUpForm.submit((ev)=>{
        ev.preventDefault();
        let username = $('#signupusername')
        let email = $('#signupemail')
        let password = $('#signuppass')
        let designation = $('#designation')
        let dept = $('#signupdept')
        let name = $('#signupname')
        let formCheck = signupvalidate();
        if(formCheck) {
            $.post('/signup',
                {
                    signupname: name.val(),
                    signuppass: password.val(),
                    signupdept: dept.val(),
                    designation: designation.val(),
                    signupemail: email.val(),
                    signupusername: username.val()
                },
                (data) => {
                    if(data.userAdded)
                    {
                        console.log(data.message)
                        window.location = "./login.html"
                    }
                    else
                    {   alert(data.message);
                        window.location = "./signup.html"
                    }
                })
        }
    })
})