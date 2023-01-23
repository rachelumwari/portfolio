let token = localStorage.getItem("token")
let id = parseInt(location.href.split("#")[1])

const comment_form = document.getElementById("comment-form")
comment_form.addEventListener("submit",async(e)=>{

    e.preventDefault();
        
    const name = comment_form.name.value;
    const comment = comment_form.comment.value;

    const request = await fetch(`https://backend-rachel.up.railway.app/User/comment/${id}`, {
        // mode:"no-cors",        
        method: "POST",
        body: JSON.stringify({ name,comment }),
        headers: {'Content-Type':'application/json'}
    });
    
    const response = await request.json();
    // console.log(response)
    if(response.status == 200) {
        location.reload()
    } 
})
const renderComment = (comment)=>{
    let comment_section = document.getElementById("comment-section")
    let comments_container=document.createElement('div');
    let comment_container=document.createElement('div');
    let name=document.createElement('span');
    let comment_p=document.createElement('p');
    comment_container.classList.add("comment")
    name.innerHTML =comment.name
    comment_p.innerHTML =comment.comment
    comment_container.appendChild(name)
    comment_container.appendChild(comment_p)
    comments_container.appendChild(comment_container)
    comment_section.appendChild(comments_container)

}
const getPost= async ()=>{
    const request = await fetch(`https://backend-rachel.up.railway.app/Blog/getblog/${id}`, {
        // mode:"no-cors",
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        },
        method: "GET"
    });
    
    const response = await request.json();
    let title = document.getElementById("title")
    let content = document.getElementById("content")
    title.innerHTML = response.data.title
    content.innerHTML = response.data.content
    for(let i=0; i<response.data.comments.length; i++ ){
        renderComment(response.data.comments[i])
    }
}

getPost()