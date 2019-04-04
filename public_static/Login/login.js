function validate() {
    if(document.myform.email == " ")
    {
        alert("Please provide your email ");
        document.myform.email.focus();
        return false;
    }
    if(document.myform.pwd == " ")
    {
        alert("Please provide your password ");
        document.myform.pwd.focus();
        return false;
    }
    var loginemail = document.myform.email.value;
    loginatpos = email.indexOf("@");
    logindotpos = email.lastIndexOf(".");
    if (loginatpos < 1 || (logindotpos - loginatpos < 2))
    {
        alert("Please enter correct email ID")
        document.myform.email.focus();
        return false;
    }
    return true;

}