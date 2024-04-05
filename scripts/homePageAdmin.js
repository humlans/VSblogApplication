function getLoggedInUsersPosts() {
    const userid  = document.getElementById("userButton");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/blog-post/get-all-posts");
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("blogPosts").innerHTML = "";
            for(let i = 0; i < xhr.response.length; i++){
                if(xhr.response[i].userId == userid.value){
                    document.getElementById("blogPosts").innerHTML += "<div class='editPostDiv'><h3 class='postTitle'>" + xhr.response[i].title + "</h3><br>" +
                                                                    "<p class='textContent'>" + xhr.response[i].textContent + "</p><br>" +
                                                                    "<p class='dateContent'>" + "Date: " + xhr.response[i].date +
                                                                    ", ID: " + xhr.response[i].id +
                                                                    ", userId: " + xhr.response[i].userId + "</p>"+
                                                                    "<div class='buttonsDiv'><button onclick='goToEditPost("+ xhr.response[i].id + ")'>Edit</button>"+
                                                                    "<button onclick='deletePost("+ xhr.response[i].id + ")'>Delete</button></div></div><br><br>";
            }
        }
        } else {
            console.log(`Error: ${xhr.status}`);
        }
    };
}

//HÄMTA INLÄGG
function goToEditPost(postId) {
    console.log(postId);
    sessionStorage.setItem("id", postId);
    window.location = "editPage.html";
}