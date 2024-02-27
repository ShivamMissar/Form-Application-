function checkLoginStatus() {
    fetch('/check-login-status')
        .then(response => response.json())
        .then(data => {
            if (data.isLoggedIn) {
                // User is logged in
                console.log('User is logged in');
            } else {
                // User is not logged in
                console.log('User is not logged in');
            }
        })
        .catch(error => {
            console.error('Error checking login status:', error);
        });
}

checkLoginStatus();