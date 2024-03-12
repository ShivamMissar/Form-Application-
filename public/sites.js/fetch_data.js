function fetchDiscussions() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/discussionsA4');
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

function fetchReplies(discussionId) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/api/discussionsA4/${discussionId}/replies`); // Adjust the endpoint to fetch replies for a specific discussion
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                const replies = JSON.parse(xhr.responseText);
                resolve(replies);
            } else {
                reject(new Error(`Failed to fetch replies: ${xhr.statusText}`));
            }
        };
        xhr.onerror = function () {
            reject(new Error('Network error occurred while fetching replies'));
        };
        xhr.send();
    });
}

function displayDiscussions() {
    fetchDiscussions()
        .then(discussions => {
            const discussionsContainer = document.getElementById('discussions');
            discussions.forEach(discussion => {
                // Create a div for each discussion
                const discussionElement = document.createElement('div');
                discussionElement.classList.add('discussion');

                // Add HTML content for discussion details
                discussionElement.innerHTML = `
                    <h3 class="discussion-topic"> Topic: ${discussion.title}</h3>
                    <p class="discussion-description"> Question ${discussion.description}</p>
                    <p class="discussion-username">Posted by: ${discussion.username}</p>
                    
                    <section class="replyToPost">
                        <h2>Reply</h2>
                        <form class="replyForm" action="/A4/A4Reply" method="post">
                            <textarea type="text" name="ReplyMessage" placeholder="Enter your message" maxlength="250"></textarea>
                            <input type="text" name="discussionId" value="${discussion.discussionId}">
                            <input type="text" name="Username" value="${discussion.username}">
                            <button type="submit">Reply</button>
                        </form>
                    </section>
                    
                    <!-- Container for displaying replies -->
                    <div class="repliesContainer"></div>

                    <form class="deleteDiscussionForm" action="/A4/A4DeletePost" method="post">
                        <input type="hidden" name="discussionId" value="${discussion.discussionId}">
                        <button type="submit" id="deleteButton" class="deleteButton">Delete</button>
                    </form>
                `;
                discussionsContainer.appendChild(discussionElement);

                // Fetch and display replies for the current discussion
                fetchReplies(discussion.discussionId)
                    .then(replies => {
                        const repliesContainer = discussionElement.querySelector('.repliesContainer');
                        replies.forEach(reply => {
                            const replyElement = document.createElement('div');
                            replyElement.classList.add('reply');
                            replyElement.innerHTML = `
                                <p class="reply-username">Replied by: ${reply.Username}</p>
                                <p class="reply-message">Message : ${reply.message}</p>
                            `;
                            repliesContainer.appendChild(replyElement);
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching or displaying replies:', error);
                    });
            });
        })
        .catch(error => {
            console.error('Error fetching or displaying discussions:', error);
        });
    }

    // Call the displayDiscussions function to fetch and display discussions
    displayDiscussions();