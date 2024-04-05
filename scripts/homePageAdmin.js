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

function deletePost(postId){
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:8080/blog-post/delete-post?id=" + postId, true);
    console.log(postId);
    xhr.onload = () => {
        if (xhr.status == 200) {
            alert('Inlägget har raderats!');
            getLoggedInUsersPosts();
        } else {
            console.error(`Failed to delete the post: ${xhr.status} ${xhr.statusText}`);
            alert(`Det gick inte att ta bort inlägget: ${xhr.status}`);
        }
    };
    xhr.onerror = function() { // Om det uppstår ett nätverksfel
        console.error('Nätverksfel');
    };
    xhr.send();
}

function httpGet() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/blog-post/get-all-posts");
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const userPosts = xhr.response.filter(post => post.userId === 2);//UserId sätts här för att filtrera vilka inlägg som kan redigeras
            const postsHtml = userPosts.map(post => `
            <div style='margin-top:10px' data-title="${post.title}" data-date="${post.date}" data-userid="${post.userId}" id="post${post.id}">
            <h2>${post.title}</h2>
            <textarea id="postContent${post.id}">${post.textContent}</textarea>
            <p>Date: ${post.date}, id: ${post.id}, userId: ${post.userId}</p>
            <button onclick="editPost(${post.id})">Edit</button>
            <button onclick="deletePost(${post.id})">Delete</button>
            </div>
        
            `).join('');

            document.getElementById("testP").innerHTML = postsHtml;
        } else {
            console.log(`Error: ${xhr.status}`);
        }
    };
}