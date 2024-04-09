const goBackButton = document.getElementById("goBackButton");

function createBlogPost(){
    const titleForm = document.getElementById("title");
    const textContentForm = document.getElementById("textContent");
    const dateForm = new Date().toDateString();
    const userIdForm = sessionStorage.getItem("userid");
    const messageResponse = document.getElementById("messageResponse");
    const xhr = new XMLHttpRequest();
    // HTML textarea preserves the line breaks. It is here that it disappears because we turn it into a string. 
    //I think it's saved as /n here but when reading the html we need the <br> but that is not secure from 
    //attacking and sending in working code in the database...
    xhr.open("POST", "http://localhost:8080/blog-post/create-post?title=" + titleForm.value + "&textContent=" + textContentForm.value + "&date=" + dateForm + "&userId=" + userIdForm);
    xhr.send();
    xhr.responseType = "json";

    console.log(+ titleForm.value + "&textContent=" + textContentForm.value + "&date=" + dateForm + "&userId=" + userIdForm);

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