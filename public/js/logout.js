const logoutBtn = document.querySelector('.card-text-body.logout');

if (logoutBtn) {  // Only add the event listener if the logout button exists
    async function Logout() {
        const response = await fetch('/api/user/logout',{
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            }
        });
        if (response.ok) {
            window.location.href = '/';
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Oops! Something went wrong. Unable to logout.',
                icon: 'error'
            });
        }
    }

    logoutBtn.addEventListener('click', Logout);
}
