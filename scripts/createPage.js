document.addEventListener("DOMContentLoaded", function() {
  footerMotto.updateMotto('createPage');
});


const goBackButton = document.getElementById("goBackButton");

function createBlogPost(){
    const titleForm = document.getElementById("title");
    const textContentForm = document.getElementById("textContent");
    const dateForm = new Date().toDateString();
    const userIdForm = document.getElementById("userId");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/blog-post/create-post?title=" + titleForm.value + "&textContent=" + textContentForm.value + "&date=" + dateForm + "&userId=" + userIdForm);
    xhr.send();
    xhr.responseType = "json";

    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 201) {
          alert("Created blog post");
        }
        else {
          console.log(`Error: ${xhr.status}`);
          alert("Error something went wrong!");
        }
    };

}

goBackButton.addEventListener("click",
    function(event) {
        event.preventDefault();
        window.location = "homePageAdmin.html";
    }
);

