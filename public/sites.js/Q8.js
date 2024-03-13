function fetchDiscussions() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/discussionsQ8');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                const discussions = JSON.parse(xhr.responseText);
                resolve(discussions);
            } else {
                reject(new Error(`Failed to fetch discussions: ${xhr.statusText}`));
            }
        };
        xhr.onerror = function () {
            reject(new Error('Network error occurred while fetching discussions'));
        };
        xhr.send();
    });
}

function displayDiscussions() {
    fetchDiscussions()
        .then(discussions => {
            const discussionsContainer = document.getElementById('discussions');
            discussions.forEach(discussion => 
            {
                // for each new post a div is created
                const discussionElement = document.createElement('div');
                discussionElement.classList.add('discussion');

                discussionElement.innerHTML = `
                <h3 class="discussion-topic"> Topic: ${discussion.Title}</h3>
            <p class="discussion-description"> Question ${discussion.Description}</p>
            <p class="discussion-username">Posted by: ${discussion.Username}</p>


            <button class="discussion-reply replyButton"  onclick="replyToDiscussion('${discussion.Title}', '${discussion.Username}')">Reply</button>
            <button class="discussion-delete deleteButton"  onclick="deleteDiscussion('${discussion.Title}', '${discussion.Username}')">Delete</button>
        `;
                discussionsContainer.appendChild(discussionElement);
            });
        })
        .catch(error => {
            console.error('Error fetching or displaying discussions:', error);
        });
}

// Call the displayDiscussions function to fetch and display discussions
displayDiscussions();