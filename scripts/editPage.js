const goBackButton = document.getElementById("goBackButton");

function getBlogPost(){
    const id = sessionStorage.getItem("id");
    const title = document.getElementById("title");
    const textContent = document.getElementById("textContent");
    
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/blog-post?id=" + id);
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            title.value = xhr.response.title;
            textContent.value = xhr.response.textContent;
            sessionStorage.setItem("date", xhr.response.date);
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
    const dateForm = sessionStorage.getItem("date");
    const userIdForm = sessionStorage.getItem("userid");
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://localhost:8080/blog-post/edit-post?id="+ id + "&title=" + titleForm.value + "&textContent=" + textContentForm.value + "&date=" + dateForm + "&userId=" + userIdForm);
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

goBackButton.addEventListener("click",
    function(event) {
        event.preventDefault();
        window.location = "homePageAdmin.html";
    }
);

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