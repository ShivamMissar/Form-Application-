 // Function to fetch user list from the server
 async function fetchUserList() {
    try {
        const response = await fetch('/api/admin/users');
        if (!response.ok) {
            throw new Error('Failed to fetch user list');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user list:', error);
        return [];
    }
}

// Function to display user list
async function displayUserList() {
    const userListContainer = document.getElementById('userList');
    const userList = await fetchUserList();

    userList.forEach(user => {
        const userElement = document.createElement('div');
        userElement.innerHTML = `
            <p class="displayUserInformation">User ID: ${user.UserId}</p>
            <p class="displayUserInformation">Username: ${user.Username}</p>
            <p class="displayUserInformation">Email: ${user.Email}</p>

            <form method="post" action="/admin/deleteUser" class="deleteUser">
                <input type="hidden" name="userId" value="${user.UserId}">
                <button>Delete User</button>
            </form>

            <form method="post" action="/admin/UpdatePassword" class="newPasswordForm">
            <input type="password" name="newPassword" placeholder="Enter their new password">
            <input type="hidden" name="userId" value="${user.UserId}">
            <button>Update User Password</button>
        </form>
           
            <hr>
        `;
        userListContainer.appendChild(userElement);
    });
}

// Function to delete user
async function deleteUser(userId) {
    try {
        const response = await fetch(`/api/admin/users/${userId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete user');
        }
        // Refresh user list after deletion
        document.getElementById('userList').innerHTML = '';
        displayUserList();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

// Call displayUserList function to fetch and display user list
displayUserList();