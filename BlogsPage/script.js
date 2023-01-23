const like = document.getElementById('like')
const share = document.getElementById('share')
const comment = document.getElementById('comment')
const commentText = document.getElementById('comment-text')
const commentBtn = document.getElementById('comment-btn')
const commentSection = document.getElementById('comment-section')
let counter = 0

const login_link = document.getElementById('login_link')
const signup_link = document.getElementById('signup_link')
const logout_link = document.getElementById('logout_link')

let token = localStorage.getItem("token")
let role = localStorage.getItem("role")
logout_link.addEventListener("click",()=>{
    localStorage.setItem("token","")
    location.assign("login.html")
})
if(token!=""){
    login_link.style = "display:none"
    signup_link.style = "display:none"
}else{
    logout_link.style = "display:none"
}

const likeArticle = (e) => {
    e.preventDefault()
    counter++
    like.innerHTML = `
    <i class="fa-solid fa-heart"></i>
    ${counter}
    `
    like.style.color = 'red'
}

const giveComment = (e) => {
    e.preventDefault()
    commentSection.innerHTML += `
    <div class="comment">
        <span>User007</span>
        <p>${commentText?.value}</p>
    </div>
    `
}

like?.addEventListener('click', likeArticle)
commentBtn?.addEventListener('click', giveComment)


function renderPosts(post){
    let article = document.createElement('article');
    let blogs = document.getElementById("container-blogs")
    let blog_card=document.createElement('div');
    let header=document.createElement('div');
    let image=document.createElement('img');
    let text=document.createElement('div');
    let title=document.createElement('span');
    let date=document.createElement('span');
    let body=document.createElement('p');
    let footer=document.createElement('div');
    let like=document.createElement('button');
    let comment=document.createElement('button');
    let share=document.createElement('button');
    let like_i=document.createElement('i');
    let share_i=document.createElement('i');
    let comment_i=document.createElement('i');
    let comment_a=document.createElement('a');
    let readme_a=document.createElement('a');
    let btn_container=document.createElement('div');
    let delete_btn=document.createElement('button');
    let update_btn=document.createElement('button');

    delete_btn.innerHTML= "Delete"
    update_btn.innerHTML = "Update"
    delete_btn.classList.add("btn")
    update_btn.classList.add("btn")
    delete_btn.classList.add("delete")
    update_btn.classList.add("update")

    var likes = JSON.parse(localStorage.getItem('likes'))
    if (likes){
        for(let i=0;i<likes.length;i++){
            if(parseInt(likes[i]) == post.id){
                like.style="color: red;"
            }
        }
    }
    like.addEventListener("click",async()=>{
        like.style="color: red;"
        const request = await fetch(`https://backend-rachel.up.railway.app/User/like/${post.id}`, {
            // mode:"no-cors",
            headers:{
                Authorization:`Bearer ${token}`,
                'Content-Type':'application/json'
            },
            method: "POST"
        });
        const response = await request.json();
        console.log(response)
        if(response.status == 200) {
            var data = JSON.parse(localStorage.getItem('likes'))
            if(data){
                data.push(post.id)
            }else{
                data = []
                data.push(post.id)
            }
            localStorage.setItem('likes',JSON.stringify(data))
        } 
    })
    delete_btn.addEventListener("click",async(e)=>{
        const request = await fetch(`https://backend-rachel.up.railway.app/Blog/deleteblog/${post.id}`, {
            // mode:"no-cors",
            headers:{
                Authorization:`Bearer ${token}`,
                'Content-Type':'application/json'
            },
            method: "DELETE"
        });
        const response = await request.json();
        if(response.status == 200) {
            location.reload()
        } 
    })

    update_btn.addEventListener("click",(e)=>{
        location.href = `AdminDashbo/blogdashboard.html#${post.id}_updata`
    })
    btn_container.appendChild(delete_btn)
    btn_container.appendChild(update_btn)

    blog_card.classList.add('cardd')
    header.classList.add('headerr')
    image.src="./pictures/picture3.jpeg";
    image.alt="title";

    text.classList.add("headerr-text")
    title.classList.add("title")
    title.innerHTML = post.title
    date.classList.add("date")
    date.innerHTML = "Wed, 7th December 2022, 30 min ago"
    text.appendChild(title)
    text.appendChild(date)
    body.classList.add("bodyy")
    body.innerHTML = post.content.length>50?post.content.substring(0,50):post.content

    like.classList.add("like")
    like.id = `like_${post.id}`
    like_i.classList.add("fa-regular")
    like_i.classList.add("fa-heart")
    like.appendChild(like_i)

    comment.classList.add("comment")
    comment.id = `comment_${post.id}`
    comment_i.classList.add("fa-regular")
    comment_i.classList.add("fa-comment")
    comment_a.href = `./BlogsPage/article.html#${post.id}`
    comment_a.appendChild(comment_i)
    comment.appendChild(comment_a)

    share.classList.add("share")
    share.id = `share_${post.id}`
    share_i.classList.add("fa-solid")
    share_i.classList.add("fa-share-nodes")
    share.appendChild(share_i)

    readme_a.href = `./BlogsPage/article.html#${post.id}`
    readme_a.innerHTML = "Read More"

    header.appendChild(image)
    header.appendChild(text)
    if(token!="" && role == "Admin"){
        header.appendChild(btn_container)
    }
    
    footer.classList.add("footerr")
    footer.appendChild(like)
    footer.appendChild(comment)
    footer.appendChild(share)
    footer.appendChild(readme_a)

    blog_card.appendChild(header)
    blog_card.appendChild(body)
    blog_card.appendChild(footer)

    blogs.appendChild(blog_card)
}

const getPosts = async ()=>{
    const request = await fetch('https://backend-rachel.up.railway.app/Blog/getblog', {
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        },
        method: "GET"
        // mode:'no-cors'
    });
    
    const response = await request.json();
    
    for(let i=0; i<response.data.length; i++ ){
        renderPosts(response.data[i])
    }
}

getPosts()