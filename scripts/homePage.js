document.addEventListener("DOMContentLoaded", function() {
    footerMotto.updateMotto('homePage');
});

const edit = document.getElementById("edit");
const homePage = document.getElementById("homePage");
const create = document.getElementById("create");

homePage.addEventListener("click",
    function() {
        window.location = "homePage.html";
    }
);
const sortPosts = document.getElementById("sortPosts");
const diwaBody = document.getElementById("diwaBody");

diwaBody.onload = applySort;
sortPosts.addEventListener("click", applySort);

function applySort(event) {
    event.preventDefault();
    const sortBy = document.getElementById('sortSelect').value;
    if(sortBy == "username"){
        // Calls getAllPostSortedByUserId to sort post by users
        getAllPostSortedByUserId(event);
    }
    else{
        // Calls getAllPosts with the selected sorting option
        getAllPosts(event); 
    }
}
function getAllPostSortedByUserId(event){
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    // Send a GET-request to get all posts sorted by users.
    xhr.open("GET", "http://localhost:8080/blog-post/get-all-posts-userId", true);
    xhr.responseType = "json";
    xhr.send();
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let posts = xhr.response;
            // Clear existing posts
            document.getElementById("blogPosts").innerHTML = ''; 
            for(let i = 0; i < posts.length; i++){            
                if  ( xhr.readyState == 4 && xhr.status == 200){
                    document.getElementById("blogPosts").innerHTML += '<div class="blogPostDiv"> <h3 class="postTitle">' + posts[i].title + '</h3><br>' +
                    '<p class="textContent">' + posts[i].textContent + '</p><br>' +
                    '<p class="postUsername">' + 'Posted by: ' + posts[i].user.userName + '</p>' +
                    '<p class="dateContent">' + 'Date: ' + posts[i].date + '</div>';
                }
                else {
                    console.log(`Error: ${xhr.status}`);
                    document.getElementById("blogPosts").innerHTML = "Error something went wrong!";
                }
            }
                
        }
    };
}

function getAllPosts(event) {
    const sortBy = document.getElementById('sortSelect').value;
    if(sortBy == ""){
        sortBy = 'dateNewest';
    }
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/blog-post/get-all-posts-userId", true);
    xhr.responseType = "json";
    xhr.send();
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let posts = xhr.response;
            // Sort posts by date
            if (sortBy === 'dateNewest') {
                posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            } 
            else if (sortBy === 'dateOldest') {
                posts.sort((a, b) => new Date(a.date) - new Date(b.date));
            }
            // Clear existing posts
            document.getElementById("blogPosts").innerHTML = ''; 
            for(let i = 0; i < posts.length; i++){
                const userXHR = new XMLHttpRequest();
                userXHR.open('GET', 'http://localhost:8080/user/byId?id=' + posts[i].userId, true);
                userXHR.send();
                userXHR.responseType = "json";
                userXHR.onload = () => {
                    if  ( userXHR.readyState == 4 && userXHR.status == 200){
                        let userName = userXHR.response.userName;
                        document.getElementById("blogPosts").innerHTML += '<div class="blogPostDiv"> <h3 class="postTitle">' + posts[i].title + '</h3><br>' +
                        '<p class="textContent">' + posts[i].textContent + '</p><br>' +
                        '<p class="postUsername">' + 'Posted by: ' + userName + '</p>' +
                        '<p class="dateContent">' + 'Date: ' + posts[i].date + '</div>';
                    }
                    else {
                        console.log(`Error: ${xhr.status}`);
                        document.getElementById("blogPosts").innerHTML = "Error something went wrong!";
                    }
                    
                }
                
            }
            
        }
    };
}
