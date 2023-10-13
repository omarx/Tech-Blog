const uInput=document.getElementById('uInput');
const pInput=document.getElementById('pInput');
const loginBtn=document.getElementById('loginBtn');


async function login() {
    const trimedUInput=uInput.value.trim()
    const data = {
        username: trimedUInput,
        password: pInput.value
    };
    
    const response = await fetch('/api/user/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    
    const loginInfo = await response.json();
    console.log(loginInfo);

    // Check if response status is 200 and redirect
    if(response.ok) {
        window.location.href = '/dashboard';
    } else {
        // Handle any other logic here for non-200 status codes
        Swal.fire({
            title:'Error!',
            text:'Oops! Wrong username or password',
            icon:'error',
        });
    }
}

loginBtn.addEventListener('click',login);