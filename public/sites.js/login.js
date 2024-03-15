

function validate_form_username()
{
    // gets the values from the form within the login by id.
    let login_username = document.getElementById('username').value; 
    
    const error = document.getElementById('errormessage-username');


    if(login_username == '')
    {
        error.innerHTML = "Username field is blank";
        return false; // will not allow form submission to happen
    }

    return true; // will allow the form submission to happen as the fields are now non blank

}

function validate_form_password()
{
    let login_password = document.getElementById('password').value; 
    const error = document.getElementById('errormessage-password');


    if(login_password == '')
    {
        error.innerHTML = "password field is blank";
        return false; // will not allow form submission to happen
    }

    return true; // will allow the form submission to happen as the fields are now non blank
}



// call the function 
document.getElementById('username').addEventListener('input', validate_form_username);
document.getElementById('password').addEventListener('input', validate_form_password);


