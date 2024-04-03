const edit = document.getElementById("edit");
const homePage = document.getElementById("homePage");
const create = document.getElementById("create");
//TEST
homePage.addEventListener("click",
    function() {
        window.location = "homePage.html";
    }
);
edit.addEventListener("click",
    function() {
        window.location = "editPage.html";
    }
);
create.addEventListener("click",
    function() {
        console.log("test");
        window.location = "createpage.html";
    }
);

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