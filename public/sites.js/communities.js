function getUrl() {
    let currentPage = window.location.href;
    let lastSlashIndex = currentPage.lastIndexOf("/");
    let extractURLPART = currentPage.substring(lastSlashIndex + 1);
    return extractURLPART;
}



function getForm()
{
    document.getElementById('disccusionForm').style.display = 'block';
}


fetch('/login-status')
.then(response => response.json())
.then(data => {
    if (data.isLoggedIn) {
        // User is logged in, show the manage account and signout links
      
        document.getElementById('addPost').style.display = 'block';

        // as there are multiple posts each post will need a button
        let replyButtons =  document.getElementsByClassName('replyButton');
        for(let i = 0; i < replyButtons.length; i++)
        {
            replyButtons[i].style.display = "inline-block";
        }

        let deleteButtons = document.getElementsByClassName('deleteDiscussionForm');

        for(let i = 0; i < deleteButtons.length; i++)
        {
            deleteButtons[i].style.display = "inline-block";
        }
    }
}).catch(error => {
    console.error('Error fetching login status:', error);
});


  

