

// var submit=document.getElementById('submit');
function signup(e){

    e.preventDefault();
    
    var name =document.getElementById('name').value;
    var email =document.getElementById('email').value;
    var password =document.getElementById('pwd').value;
    
    
    var user ={
        name:name,
        email:email,
        password:password
    
    };
    
    // var json = JSON.stringify(user);
    // localStorage.setItem(name, json);

    localStorage.setItem('user',JSON.stringify(user))
    // JSON.parse(localStorage.getItem('user'))
    console.log(user);
    
    }
// submit.addEventListener('click',signup())
// document.getElementById('submit').addEventListener('click',signup)


function login(e){
    e.preventDefault();
    
    var email =document.getElementById('email').value;
    var password =document.getElementById('password').value;

    var data = JSON.parse(localStorage.getItem('user'))
    console.log(data);
    
}

document.getElementById('login')?.addEventListener('click',login)
document.getElementById('submit')?.addEventListener('click',signup)

// location.assign("/Capstone/AdminPanel/add_post.html")

