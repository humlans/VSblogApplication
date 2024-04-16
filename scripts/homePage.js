
// Event listener to the document that triggers when the DOM content is fully loaded.
document.addEventListener("DOMContentLoaded", function() {
    // Updates the footer motto when the home page is loaded.
    footerMotto.updateMotto('homePage');
});

// Retrieves HTML elements by their ID to attach event listeners.
const homePage = document.getElementById("homePage");
const sortPosts = document.getElementById("sortPosts");
const diwaBody = document.getElementById("diwaBody");
const nextPageDiv = document.getElementById("nextPageDiv");

// Event listener that navigates to 'homePage.html' when clicked.
homePage.addEventListener("click",
    function() {
        window.location = "homePage.html";
    }
);

// Assigns the 'applySort' function to run when the 'diwaBody' element is loaded.
diwaBody.onload = applySort;

// Attaches an event listener to the 'sortPosts' element to trigger sorting when clicked.
sortPosts.addEventListener("click", applySort);


// The 'applySort' function prevents the default action, retrieves the sorting criteria,
// and calls the appropriate function based on the selected sort option.
function applySort(event) {
    // Prevents the default form submission behavior.
    event.preventDefault();
    clickLoadPageFunction(0);
    createButtonsForLoadNextPosts();
}

function createButtonsForLoadNextPosts () {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/blog-post/get-number-of-posts", true);
    xhr.responseType = "json";
    xhr.send();
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let amount = Math.floor(xhr.response/5)
            if(xhr.response%5 != 0) {
                amount += 1
            }

            const choosePageList = document.getElementById("choosePageList");
            choosePageList.innerHTML = "";
            for(let i = 0; i < amount; i++){
                choosePageList.innerHTML += "<li class='pagesElement'><button id='pageButton' value='" + i + "'>" + (i+1) + "</button></li>";
            }
        }
        else{
            console.log("Error:" + xhr.status);
            document.getElementById("blogPosts").innerHTML = "Error something went wrong!";
        }
    }
}

// Function to move between pages of posts with buttons.

nextPageDiv.addEventListener("click", function(event) {
    let target = event.target; 
    clickLoadPageFunction(target.value);    
});

// Function to sort correctly by calling the database.
// Fetches and displays posts with a general sorting criteria using an AJAX request.
function clickLoadPageFunction (pageNumber) {
    const sortBy = document.getElementById('sortSelect').value;
    if(sortBy == ""){
         // Defaults to sorting by the newest date if no sort option is selected.
        sortBy = 'dateNewest';
    }

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/blog-post/get-all-posts-by-page?sortBy=" + sortBy + "&page=" + pageNumber, true);
    xhr.responseType = "json";
    xhr.send();
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let posts = xhr.response;

            // Clear existing posts
            document.getElementById("blogPosts").innerHTML = '';
            
            for(let i = 0; i < posts.length; i++){            
                    document.getElementById("blogPosts").innerHTML += '<div class="blogPostDiv"> <h3 class="postTitle">' + posts[i].title + '</h3><br>' +
                    '<p class="textContent">' + posts[i].textContent + '</p><br>' +
                    '<p class="postUsername">' + 'Posted by: ' + posts[i].user.userName + '</p>' +
                    '<p class="dateContent">' + 'Date: ' + posts[i].date + '</div>';
            }           
        }
        else{
            console.log("Error:" + xhr.status);
            document.getElementById("blogPosts").innerHTML = "Error something went wrong!";
        }
    }
}