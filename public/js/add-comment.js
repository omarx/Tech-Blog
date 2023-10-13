const addComment = document.getElementById('addComment');
const commentBox = document.getElementById('CommentBox');  
const comment=document.getElementById('commentInput');
const addCommentBtn=document.getElementById('addCommentBtn');

if(!addComment) {
    console.log("addComment button not found");
}

if(!commentBox) {
    console.log("commentBox element not found");
}

addComment.addEventListener("click", function() {
    console.log("Button clicked");
    
    if (commentBox.classList.contains("not-visible")) {
        commentBox.classList.remove("not-visible");
    } else {
        commentBox.classList.add("not-visible");
    }
});

const addPost=async()=>{
    const data={
         body:comment.value,
         post_id:addCommentBtn.value
    }

     const response=await fetch('/api/comment',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
     });

     if(response.ok){
        location.reload();
     }else{
        Swal.fire({
            title:'Error!',
            text:'Oops! Unable to add comment',
            icon:'error'
        })
    }
}

addCommentBtn.addEventListener('click',addPost);