const titleInfo=document.getElementById('titleInput');
const contentInfo=document.getElementById('bodyInput');
const createButton=document.getElementById('createBtn');
const deleteButton=document.getElementById('deleteBtn');


async function updatePost(){
    let id =createButton.value;
    const data={
          title:titleInfo.value,
          body:contentInfo.value,
    }
    const response=await fetch(`/api/post/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    if(response.ok){
        location.reload();
    }else{
        Swal.fire({
            title:'Error!',
            text:'Oops! We are unable to update this post',
            icon:'error',
        })
    }
}

async function deletePost(){
    let id = deleteButton.value;
    const response=await fetch(`/api/post/${id}`,{
        method:'DELETE'
    })
    if(response.ok){
        window.location.href = '/dashboard';
    }else{
        Swal.fire({
            title:'Error!',
            text:'Oops! We are unable to delete this post',
            icon:'error',
        })
}
}

createButton.addEventListener('click',updatePost);
deleteButton.addEventListener('click',deletePost);