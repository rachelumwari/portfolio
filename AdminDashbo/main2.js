let array =JSON.parse(localStorage.getItem("Blogs") || "[]") 
function addingblog(){
    var title= document.getElementById('title').value;
    var pic = document.getElementById('picture');   
    var picture = pic.files[0].name;
    var content= document.getElementById('content').value;


    var blog={
        title:title,
        picture:picture,
        content:content,
    };
    array.push(blog)
    // var json= JSON.stringify(arr);
    
    localStorage.setItem("Blogs", JSON.stringify(array));

    alert("Blog Added")
    // window.location.href="./AdminBlog.html"
}


function Displayblog(){
    let Blog =JSON.parse(window.localStorage.getItem("Blogs"))
    var table =document.getElementById("blogtable");
   
    for(let i=0; i < Blog.length; i++){


        let title = document.createTextNode(Blog[i].title);
        let pic= document.createElement("img");
        const picture = "./pictures/" + Blog[i].picture 
        pic.src=picture;
        let content= document.createTextNode(Blog[i].content);

        var newRow = table.insertRow(-1);
        cell0 =newRow.insertCell(0).appendChild(title);
        cell0.innerHtml=Blog[i].title;

        cell2 =newRow.insertCell(1).appendChild(pic);
        cell2.innerHtml=Blog[i].picture;

        cell2 =newRow.insertCell(2).appendChild(content);
        cell2.innerHtml=Blog[i].content;

    }

}

function logOut(){
    let list = document.querySelector(".contact_list")
    while(list.firstChild){
        list.removeChild(list.firstChild)
    }
    var storedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (storedContacts != null){
        storedContacts.forEach((contact,index) => {
            let div = document.createElement("div");
            var h3 = document.createElement("h3");
            div.addEventListener("click",displayDetails)
            h3.innerHTML = contact.name;
            h3.setAttribute("id",`${index}_${index}`)
            h3.addEventListener("click",details)
            div.setAttribute("id",`${index}`);
            div.setAttribute("class",`contact`);
            div.appendChild(h3);
            list.appendChild(div);
        });
    }

}