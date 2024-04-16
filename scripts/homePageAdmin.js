document.addEventListener("DOMContentLoaded", function() {
    footerMotto.updateMotto('homePageAdmin');
});

// Retrieves HTML elements by their ID to attach event listeners.
const userid = sessionStorage.getItem("userid");
const logOutButton = document.getElementById("logOutButton");
const username = document.getElementById("username");
const goToCreatePageButton = document.getElementById("goToCreatePage");

getLoggedInUsersPosts();

function getLoggedInUsersPosts(){
    if(userid != null){    
        logOutButton.style.display = "block";
        // If userId is send from login page use that id the get that users posts.
        const xhr = new XMLHttpRequest();
        // Send a GET-request to get all posts.
        xhr.open("GET", "http://localhost:8080/blog-post/get-all-posts", true);
        xhr.send();
        xhr.responseType = "json";
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // If GET-request successed reset blogPost-div.
                document.getElementById("blogPosts").innerHTML = "";
                for(let i = 0; i < xhr.response.length; i++){
                    // Fill in blogPost-div with blogPost that the logged in user have made.
                    if(xhr.response[i].user.id == userid){
                        // Layout of the blogPost-div to the main of the homePageAdmin.html-page.
                        document.getElementById("blogPosts").innerHTML += "<div class='blogPostDiv'><h3 class='postTitle' id='title'>" + xhr.response[i].title + "</h3><br>" +
                                                                        "<p class='textContent'>" + xhr.response[i].textContent + "</p><br>" +
                                                                        "<p class='dateContent'>" + "Date: " + xhr.response[i].date + "</p>"+
                                                                        "<div class='buttonsDiv'><button style='margin-left:5px;' onclick='goToEditPost("+ xhr.response[i].id + ")'>Edit</button>"+
                                                                        "<button style='margin-left:5px;' onclick='deletePost("+ xhr.response[i].id + ")'>Delete</button></div></div><br><br>";
                }
            }
            } else {
                // If GET-request failed print error code to console.
                console.log("Error:" + xhr.status);
            }
        };
        const xhrUser = new XMLHttpRequest();
        xhrUser.open("GET", "http://localhost:8080/user/byId?id=" + userid, true);
        xhrUser.send();
        xhrUser.responseType = "json";
        xhrUser.onload = () => {
            if (xhrUser.readyState == 4 && xhrUser.status == 200) {
                username.innerHTML = "<p id='userNameField'>" + xhrUser.response.userName + "</p>";
            }

        };
    }
    else{
        logOutButton.style.display = "none";
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


goToCreatePageButton.addEventListener("click", goToCreatePage); 
function goToCreatePage() {
    sessionStorage.setItem("userid", userid);
    window.location = "createPage.html";
}

function deletePost(postId){
    if (window.confirm("Do you want to delete the post?")){
        const xhr = new XMLHttpRequest();
        // Make a DELETE request to delete post.
        xhr.open("DELETE", "http://localhost:8080/blog-post/delete-post?id=" + postId, true);
        xhr.onload = () => {
            if (xhr.status == 200) {
                // If DELETE request successed alert message to user.
                alert('The post has been deleted!');
                // Reload post.
                getLoggedInUsersPosts();
            } else {
                // Alert user what happend.
                alert('Failed to delete the post: ${xhr.status}');
            }
        };
        xhr.send();
    }
}

logOutButton.addEventListener("click", logOut);
function logOut(event) {
    event.preventDefault;
    if (window.confirm("Do you want to log out?")) {
        sessionStorage.clear();
        window.location = "loginPage.html";
    }
}
