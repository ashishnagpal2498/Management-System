function loginvalidate() {
    if(document.forms["myloginform"]["email"] == "")
    {
        //alert("Please provide your email ");
        document.getElementById("email").style.color = "red";
        document.myform.email.focus();
        return false;
    }
    if(document.forms["myloginform"]["pwd"] == "")
    {
        //alert("Please provide your password ");
        document.getElementById("pwd").style.borderColor = "red";
        document.myform.pwd.focus();
        return false;
    }
    var loginemail = document.myloginform.email.value;
    loginatpos = loginemail.indexOf("@");
    logindotpos = loginemail.lastIndexOf(".");
    if (loginatpos < 1 || (logindotpos - loginatpos < 2))
    {
        //alert("Please enter correct email ID")
        document.getElementById("email").style.borderColor = "red";
        document.myloginform.email.focus();
        return false;
    }
    return true;

}