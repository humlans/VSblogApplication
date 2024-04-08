const goBackButton = document.getElementById("goBackButton");

function createBlogPost(){
    const titleForm = document.getElementById("title");
    const textContentForm = document.getElementById("textContent");
    const dateForm = new Date().toDateString();
    const userIdForm = sessionStorage.getItem("userid");
    const messageResponse = document.getElementById("messageResponse");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/blog-post/create-post?title=" + titleForm.value + "&textContent=" + textContentForm.value + "&date=" + dateForm + "&userId=" + userIdForm);
    xhr.send();
    xhr.responseType = "json";

    //Do not work correctly
    xhr.onload = () => alert(xhr.response);
    /*xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log(xhr.response);
          messageResponse.innerHTML = "Created blog post";
        }
        else {
          console.log(`Error: ${xhr.status}`);
          messageResponse.innerHTML = "Error something went wrong!";
        }
    };*/

}

goBackButton.addEventListener("click",
    function(event) {
        event.preventDefault();
        window.location = "homePageAdmin.html";
    }
);