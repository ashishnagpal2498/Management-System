function signupvalidate() {
    if(document.mysignupform.signupname == " ")
    {
        alert("Please provide your name ");
        document.mysignupform.signupname.focus();
        return false;
    }
    if(document.mysignupform.signupemail == " ")
    {
        alert("Please provide your email ");
        document.mysignupform.signupemail.focus();
        return false;
    }
    if(document.mysignupform.signupdept == " ")
    {
        alert("Please provide your department ");
        document.mysignupform.signupdept.focus();
        return false;
    }
    if(document.mysignupform.designation == " ")
    {
        alert("Please provide your designation ");
        document.mysignupform.designation.focus();
        return false;
    }
    if(document.mysignupform.signuppass == " ")
    {
        alert("Please provide your password ");
        document.mysignupform.signuppass.focus();
        return false;
    }
    var signupemail = document.mysignupform.signupemail.value;
    signupatpos = signupemail.indexOf("@");
    signupdotpos = signupemail.lastIndexOf(".");
    if (signupatpos < 1 || (signupdotpos - signupatpos < 2))
    {
        alert("Please enter correct email ID")
        document.mysignupform.signupemail.focus();
        return false;
    }
    return true;
}