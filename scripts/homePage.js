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

/*
function getAllPosts() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/blog-post/get-all-posts");
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            for(let i = 0; i < xhr.response.length; i++){
                document.getElementById("blogPosts").innerHTML += '<div class="blogPostDiv"> <h3 class="postTitle">' + xhr.response[i].title + '</h3><br>' +
                                                                   '<p class="textContent">' + xhr.response[i].textContent + '</p><br>' +
                                                                   '<p class="dateContent">' + 'Date: ' + xhr.response[i].date + '</div>';
            }
        }
        else {
          console.log(`Error: ${xhr.status}`);
          document.getElementById("blogPosts").innerHTML = "Error something went wrong!"
        }
    };
}
*/


// VERSION UTAN SORT FUNGERING

function applySort() {
    const sortOption = document.getElementById('sortSelect').value; // Captures the selected sorting option
    getAllPosts(sortOption); // Calls getAllPosts with the selected sorting option
}

/*
function getAllPosts() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/blog-post/get-all-posts");
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("blogPosts").innerHTML = ''; // Clear existing posts
            for(let i = 0; i < xhr.response.length; i++){
                document.getElementById("blogPosts").innerHTML += `
                    <div class="blogPostDiv">
                        <h3 class="postTitle">${xhr.response[i].title}</h3>
                        <p class="postUsername">Posted by: ${xhr.response[i].username}</p> <!-- Include the username -->
                        <p class="textContent">${xhr.response[i].textContent}</p>
                        <p class="dateContent">Date: ${xhr.response[i].date}</p>
                    </div>`;
            }
        } else {
            console.log(`Error: ${xhr.status}`);
            document.getElementById("blogPosts").innerHTML = "Error something went wrong!";
        }
    };
}
*/

function getAllPosts(sortBy = 'dateNewest') {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/blog-post/get-all-posts");
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let posts = xhr.response;
            
            // Sort posts by date
            if (sortBy === 'dateNewest') {
                posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            } else if (sortBy === 'dateOldest') {
                posts.sort((a, b) => new Date(a.date) - new Date(b.date));
            } else if ( sortBy === 'username'){
                //posts.sort((a, b) => a.userName.localeCompare(b.userName));//TEST Sortera usenames.
               // posts.sort(function(a,b){return a.userName - b.userName});
                // console.log(a.userName);

            }



            document.getElementById("blogPosts").innerHTML = ''; // Clear existing posts
            for(let i = 0; i < posts.length; i++){

                const userXHR = new XMLHttpRequest();
                userXHR.open('GET', 'http://localhost:8080/user/byId?id=' + posts[i].userId);
                userXHR.send();
                userXHR.responseType = "json";
                
                userXHR.onload = () => {
                    if  (   userXHR.readyState == 4 && userXHR.status == 200){
                        let userName = userXHR.response.userName;

                        document.getElementById("blogPosts").innerHTML += '<div class="blogPostDiv"> <h3 class="postTitle">' + posts[i].title + '</h3><br>' +
                        '<p class="textContent">' + posts[i].textContent + '</p><br>' +
                        '<p class="postUsername">' + 'Posted by: ' + userName + '</p>' +
                        '<p class="dateContent">' + 'Date: ' + posts[i].date + '</div>';

                    }else {
                        console.log(`Error: ${xhr.status}`);
                        document.getElementById("blogPosts").innerHTML = "Error something went wrong!";
                    }


                }
            }

        };

    }

}

