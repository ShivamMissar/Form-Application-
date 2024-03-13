// Function to validate username
function validateUsername() {
    let username = document.getElementById('fullname');
    let usernameError = document.getElementById('username_invalid');
    if (username.value.trim() === '') {
        usernameError.textContent = "Username cannot be empty";
        return false;
    } else {
        usernameError.textContent = ""; // Clear error message
        return true;
    }
}

// Function to validate email
function validateEmail() {
    let email = document.getElementById('email');
    let emailError = document.getElementById('email_invalid');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = "Invalid email format";
        return false;
    } else {
        emailError.textContent = ""; 
        return true;
    }
}

// Function to validate password strength
function validatePassword() {
    let password = document.getElementById('regpassword');
    let passwordError = document.getElementById('password_not_secure');
    let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/; 
    if (!passwordPattern.test(password.value.trim())) {
        passwordError.textContent = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number";
        return false;
    } else {
        passwordError.textContent = ""; 
        return true;
    }
}

// Function to validate confirm password
function validateConfirmPassword() {
    let password = document.getElementById('regpassword');
    let confirmPassword = document.getElementById('regpasswordconfirm');
    let confirmPasswordError = document.getElementById('password_confirmed');
    if (password.value.trim() !== confirmPassword.value.trim()) {
        confirmPasswordError.textContent = "Passwords do not match";
        return false;
    } else {
        confirmPasswordError.textContent = ""; 
        return true;
    }
}

// Function to validate the entire form
function validateForm() {
    return validateUsername() && validateEmail() && validatePassword() && validateConfirmPassword();
}

// Add event listeners to the input fields
document.getElementById('fullname').addEventListener('input', validateUsername);
document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('regpassword').addEventListener('input', validatePassword);
document.getElementById('regpasswordconfirm').addEventListener('input', validateConfirmPassword);

// Add event listener to form submission
document.getElementById('submitRegCredientals').addEventListener('click', function(event) {
    if (!validateForm()) {
        event.preventDefault(); // Prevent form submission if validation fails
    }
});
