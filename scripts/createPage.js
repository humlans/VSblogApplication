document.addEventListener("DOMContentLoaded", function() {
  footerMotto.updateMotto('createPage');
});

const goBackButton = document.getElementById("goBackButton");
goBackButton.addEventListener("click",
    function(event) {
        event.preventDefault();
        window.location = "homePageAdmin.html";
    }
);

const createPostButton = document.getElementById("createButton");
createPostButton.addEventListener("click", createBlogPost);

// Function to create a new blog post.
function createBlogPost(event){
  event.preventDefault();
  const titleForm = document.getElementById("title");
  const textContentForm = document.getElementById("textContent");
  const dateForm = new Date().toISOString().split('T')[0];
  const userIdForm = sessionStorage.getItem("userid");
  // Creates a new XMLHttpRequest for server communication.
  const xhr = new XMLHttpRequest();
  // Converts newline characters in the text content to HTML line breaks.
  let textContentToSend = textContentForm.value.replace(/(?:\r\n|\r|\n)/g, "<br>");
  // Configures the request to POST the new blog data, including the user inputs and current date.
  xhr.open("POST", "http://localhost:8080/blog-post/create-post?title=" + titleForm.value + "&textContent=" + textContentToSend + "&date=" + dateForm + "&userId=" + userIdForm, true);
  xhr.send();
  xhr.responseType = "json";
  // Defines what happens once the server responds.
  xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status == 201) {
        if (window.confirm("Created blog post. Would you like to see your posts?")) {
          window.location = "homePageAdmin.html";
          textContentForm.value = "";
          titleForm.value = "";
        }
        else {
          textContentForm.value = "";
          titleForm.value = "";
        }
      }
      else {
        console.log("Error:" + xhr.status);
        alert("Error something went wrong!");
      }
  };
  

}

function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = (element.scrollHeight) + "px";
}



