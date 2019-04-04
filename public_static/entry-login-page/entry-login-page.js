function validate() {
    if(document.myform.loginpageemail == " ")
    {
        alert("Please provide your email ");
        document.myform.loginpageemail.focus();
        return false;
    }
    if(document.myform.loginpagepass == " ")
    {
        alert("Please provide your password ");
        document.myform.loginpagepass.focus();
        return false;
    }
    var loginemail = document.myform.loginpageemail.value;
    loginatpos = loginemail.indexOf("@");
    logindotpos = loginemail.lastIndexOf(".");
    if (loginatpos < 1 || (logindotpos - loginatpos < 2))
    {
        alert("Please enter correct email ID")
        document.myform.loginpageemail.focus();
        return false;
    }
    return true;

}