




function validate_form()
{
    // gets the values from the form within the login by id.
    let login_username = document.getElementById('username').value; 
    let login_password = document.getElementById('password').value;    
    const error = document.getElementById('errormessage');


    if(login_username == '' || login_password == '')
    {
        error.innerHTML = "Username/password field is blank";
        return false; // will not allow form submission to happen
    }

    return true; // will allow the form submission to happen as the fields are now non blank

}
// call the function 
validate_form();