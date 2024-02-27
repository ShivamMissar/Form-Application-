    // // Parse the query parameters from the URL
    // const params = new URLSearchParams(window.location.search);

    // // Check if the 'loggedIn' parameter is set to 'true'
    // if (params.get('loggedIn') === 'true') {
    //     // User is logged in, show manage account link and hide login and register links
    //     document.getElementById('loginLink').style.display = 'none';
    //     document.getElementById('registerLink').style.display = 'none';
    //     document.getElementById('manageAccountLink').style.display = 'block';
    // } else {
    //     // User is not logged in, show login and register links and hide manage account link
    //     document.getElementById('loginLink').style.display = 'block';
    //     document.getElementById('registerLink').style.display = 'block';
    //     document.getElementById('manageAccountLink').style.display = 'none';
    // }

    fetch('/login-status')
        .then(response => response.json())
        .then(data => {
            if (data.isLoggedIn) {
                // User is logged in, show the manage account and signout links
                document.getElementById('manageAccountLink').style.display = 'block';
                document.getElementById('signOutLink').style.display = 'block';
                document.getElementById('loginLink').style.display = 'none';
                document.getElementById('registerLink').style.display = 'none';
            } else {
                // User is not logged in, hide the manage account and signout links
                document.getElementById('manageAccountLink').style.display = 'none';
                document.getElementById('signOutLink').style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching login status:', error);
        });