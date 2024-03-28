
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
// call displayUserList to display all the users on screen
displayUserList();