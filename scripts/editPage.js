const home = document.getElementById("home");
const homePage = document.getElementById("homePage");

homePage.addEventListener("click",
    function() {
        window.location = "homePage.html";
    }
);
home.addEventListener("click",
    function() {
        window.location = "homePage.html";
    }
);




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

function getBlogPost(){
    const id = sessionStorage.getItem("id");
    const title = document.getElementById("title");
    const userId = document.getElementById("userId");
    const textContent = document.getElementById("textContent");
    const date = document.getElementById("date");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/blog-post?id=" + id);
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            title.value = xhr.response.title;
            textContent.value = xhr.response.textContent;
            date.value = xhr.response.date;
            userId.value = xhr.response.userId;
        }
        else {
          console.log(`Error: ${xhr.status}`);
          document.getElementById("blogPosts").innerHTML = "Error something went wrong!"
        }
    };
}

function updateBlogPost(){
    const id = sessionStorage.getItem("id");
    const titleForm = document.getElementById("title");
    const textContentForm = document.getElementById("textContent");
    const dateForm = document.getElementById("date");
    const userIdForm = document.getElementById("userId");
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://localhost:8080/blog-post/edit-post?id="+ id + "&title=" + titleForm.value + "&textContent=" + textContentForm.value + "&date=" + dateForm.value + "&userId=" + userIdForm.value);
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.status >= 400 ) {
            console.error(`Failed to update the post: ${xhr.status} ${xhr.statusText}`);
            alert(`Det gick inte att uppdatera inlägget: ${xhr.status}`);
        }
    };
    alert('Inlägget har uppdaterats!');
    xhr.send();
}

//HÄMTA INLÄGG
function editPost(postId) {
    const postElement = document.getElementById(`post${postId}`);
    const postContent = document.getElementById(`postContent${postId}`).value;
    const title = postElement.getAttribute('data-title');
    const date = postElement.getAttribute('data-date');
    const userId = postElement.getAttribute('data-userid');

    const postData = {
        id: postId,
        title: title, // Använd faktiskt värde
        textContent: postContent,
        date: date, // Använd faktiskt värde
        userId: userId, // Använd faktiskt värde
    };


    //UPDATEA INLÄGG
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://localhost:8080/blog-post/edit-post", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        if (xhr.status == 200) {
            alert('Inlägget har uppdaterats!');
            httpGet();
        } else {
            console.error(`Failed to update the post: ${xhr.status} ${xhr.statusText}`);
            alert(`Det gick inte att uppdatera inlägget: ${xhr.status}`);
        }
    };
    xhr.onerror = function() { // Om det uppstår ett nätverksfel
        console.error('Nätverksfel');
    };
    xhr.send(JSON.stringify(postData)); // Skicka den uppdaterade posten som JSON
}

function deletePost(postId){
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:8080/blog-post/delete-post?id=" + postId, true);
    console.log(postId);
    xhr.onload = () => {
        if (xhr.status == 200) {
            alert('Inlägget har raderats!');
            httpGet();
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