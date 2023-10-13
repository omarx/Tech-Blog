const getTitle=document.getElementById('titleInput');
const getContent=document.getElementById('bodyInput');
const createBtn=document.getElementById('createBtn');


async function CreatePost(){
    const data={
        title:getTitle.value,
        body:getContent.value
    }
    const response=await fetch('/api/post',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    if(response.ok){
        window.location.href='/dashboard';
    }else{
        Swal.fire({
            title:'Error!',
            text:'Oops! Unable to create post',
            icon:'error'
        })
    }

}

createBtn.addEventListener('click',CreatePost);