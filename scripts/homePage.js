
// Event listener to the document that triggers when the DOM content is fully loaded.
document.addEventListener("DOMContentLoaded", function() {
    // Updates the footer motto when the home page is loaded.
    footerMotto.updateMotto('homePage');
});

// Retrieves HTML elements by their ID to attach event listeners.
const edit = document.getElementById("edit");
const homePage = document.getElementById("homePage");
const create = document.getElementById("create");

// Event listener that navigates to 'homePage.html' when clicked.
homePage.addEventListener("click",
    function() {
        window.location = "homePage.html";
    }
);

// Element retrievals for sorting functionality and the main content body.
const sortPosts = document.getElementById("sortPosts");
const diwaBody = document.getElementById("diwaBody");

// Assigns the 'applySort' function to run when the 'diwaBody' element is loaded.
diwaBody.onload = applySort;

// Attaches an event listener to the 'sortPosts' element to trigger sorting when clicked.
sortPosts.addEventListener("click", applySort);


// The 'applySort' function prevents the default action, retrieves the sorting criteria,
// and calls the appropriate function based on the selected sort option.
function applySort(event) {
    // Prevents the default form submission behavior.
    event.preventDefault();
    // Retrieves the value of the sorting option.
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

// Fetches and displays posts sorted by user ID using an AJAX request.
function getAllPostSortedByUserId(event){
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    // Send a GET-request to get all posts sorted by users.
    xhr.open("GET", "http://localhost:8080/blog-post/get-all-posts-userId", true);
    xhr.responseType = "json";
    xhr.send();
    xhr.onload = () => {
        // Checks if the request is successful.
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Stores the response data.
            let posts = xhr.response;
            // Clear existing posts
            document.getElementById("blogPosts").innerHTML = '';
            // Iterates through each post and adds it to the display element.
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
// Fetches and displays posts with a general sorting criteria using an AJAX request.
function getAllPosts(event) {
    const sortBy = document.getElementById('sortSelect').value;
    if(sortBy == ""){
         // Defaults to sorting by the newest date if no sort option is selected.
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
            // Iterates through sorted posts and adds them to the display element.
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
