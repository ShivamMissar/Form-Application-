

    fetch('/login-status')
        .then(response => response.json())
        .then(data => {
            if (data.isLoggedIn) {
                // User is logged in, show the manage account and signout links
                document.getElementById('manageAccountLink').style.display = 'block';
                document.getElementById('signOutLink').style.display = 'block';
                document.getElementById('loginLink').style.display = 'none';
                document.getElementById('registerLink').style.display = 'none';
                document.getElementById('communityLink').style.display = 'block';
                document.getElementById('trendingTags').style.display = 'block';
            

                const checkAdmin = data.getUserInformation.Username == 'Admin';
                if(checkAdmin)
                {
                    document.getElementById('adminLink').style.display = 'block';
                }
            

                
            } else {
                // User is not logged in, hide the manage account and signout links
                document.getElementById('manageAccountLink').style.display = 'none';
                document.getElementById('signOutLink').style.display = 'none';
                document.getElementById('communityLink').style.display = 'none';
                document.getElementById('trendingTags').style.display = 'none';
                document.getElementById('adminLink').style.display = 'none';
               
               
            }
        })
        .catch(error => {
            console.error('Error fetching login status:', error);
        });

