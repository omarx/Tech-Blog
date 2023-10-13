    const eInput=document.getElementById('eInput');
    const uInput=document.getElementById('uInput');
    const confirmPInput=document.getElementById('confirmPInput');
    const pInput=document.getElementById('pInput');

    const signupBtn=document.getElementById('signupBtn');
    const trimedUInput=uInput.value.trim()
    // All your existing JavaScript code
    async function signup(){
        event.preventDefault();
        if(pInput.value != confirmPInput.value ){
            Swal.fire({
                title:'Error!',
                text:'Oops! The passwords you entered don\'t match. Give it another try.',
                icon:'error',
            })
            return;
        }  
        const data={
            username: trimedUInput,
            email: eInput.value.trim(),
            password: pInput.value.trim()
        }
        
       const response=await fetch('/api/user/signup',{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data)
       })
       const signupInfo=await response.json();
       console.log(signupInfo)
       if(response.ok){
            const response=await fetch('/api/user/login',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(data)
            })
            const loginInfo=await response.json();
            if(response.ok){
                window.location.href='/dashboard';
            }  
       }else{
        Swal.fire({
            title:'Error!',
            text:'Oops! The username or email address already exists.',
            icon:'error',
        });
       }
    }
    
    signupBtn.addEventListener('click',signup);
