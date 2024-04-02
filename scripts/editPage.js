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
            </div>
        
            `).join('');

            document.getElementById("testP").innerHTML = postsHtml;
        } else {
            console.log(`Error: ${xhr.status}`);
        }
    };
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

