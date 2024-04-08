const userid = sessionStorage.getItem("userid");
getLoggedInUsersPosts();

function getLoggedInUsersPosts(){
    if(userid != null){    
        // If userId is send from login page use that id the get that users posts.
        const xhr = new XMLHttpRequest();
        // Send a GET-request to get all posts.
        xhr.open("GET", "http://localhost:8080/blog-post/get-all-posts");
        xhr.send();
        xhr.responseType = "json";
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // If GET-request successed reset blogPost-div.
                document.getElementById("blogPosts").innerHTML = "";
                for(let i = 0; i < xhr.response.length; i++){
                    // Fill in blogPost-div with blogPost that the logged in user have made.
                    if(xhr.response[i].userId == userid){
                        // Layout of the blogPost-div to the main of the homePageAdmin.html-page.
                        document.getElementById("blogPosts").innerHTML += "<div class='editPostDiv'><h3 class='postTitle'>" + xhr.response[i].title + "</h3><br>" +
                                                                        "<p class='textContent'>" + xhr.response[i].textContent + "</p><br>" +
                                                                        "<p class='dateContent'>" + "Date: " + xhr.response[i].date +
                                                                        ", ID: " + xhr.response[i].id +
                                                                        ", userId: " + xhr.response[i].userId + "</p>"+
                                                                        "<div class='buttonsDiv'><button style='margin-left:5px;' onclick='goToEditPost("+ xhr.response[i].id + ")'>Edit</button>"+
                                                                        "<button style='margin-left:5px;' onclick='deletePost("+ xhr.response[i].id + ")'>Delete</button></div></div><br><br>";
                }
            }
            } else {
                // If GET-request failed print error code to console.
                console.log(`Error: ${xhr.status}`);
            }
        };
    }
}
function goToEditPost(postId) {
    // Save  blogPost id in sessionStorage to use at editPage.
    sessionStorage.setItem("id", postId);
    // Save user id in sessionStorage to use ar editPage.
    sessionStorage.setItem("userid", userid);
    // Redirect to editPage.
    window.location = "editPage.html";
}

function deletePost(postId){
    const xhr = new XMLHttpRequest();
    // Make a DELETE request to delete post.
    xhr.open("DELETE", "http://localhost:8080/blog-post/delete-post?id=" + postId, true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            // If DELETE request successed alert message to user.
            alert('Inlägget har raderats!');
            // Reload post.
            getLoggedInUsersPosts();
        } else {
            // If DELETE request fails print error code and text to console.
            console.error(`Failed to delete the post: ${xhr.status} ${xhr.statusText}`);
            // Alert user what happend.
            alert(`Det gick inte att ta bort inlägget: ${xhr.status}`);
        }
    };
    xhr.onerror = function() { // Om det uppstår ett nätverksfel
        console.error('Nätverksfel');
    };
    xhr.send();
}