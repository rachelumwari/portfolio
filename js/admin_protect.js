let token = localStorage.getItem("token")
let role = localStorage.getItem("role")
if (token != ""){
    if( role !="Admin"){
        location.href = "/login.html"
    }
}else{
    location.href = "/login.html"
}