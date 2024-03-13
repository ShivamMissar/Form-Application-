




function validate_form()
{
    let login_username = document.getElementById('username').value;
    let login_password = document.getElementById('password').value;    
    const error = document.getElementById('errormessage');


    if(login_username == '' || login_password == '')
    {
        error.innerHTML = "Username/password field is blank";
        return false;
    }

    return true;

}

validate_form();