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

function createBlogPost(event){
  event.preventDefault();
  const titleForm = document.getElementById("title");
  const textContentForm = document.getElementById("textContent");
  const dateForm = new Date().toDateString();
  const userIdForm = sessionStorage.getItem("userid");
  const xhr = new XMLHttpRequest();
  let textContentToSend = textContentForm.value.replace(/(?:\r\n|\r|\n)/g, "<br>");
  xhr.open("POST", "http://localhost:8080/blog-post/create-post?title=" + titleForm.value + "&textContent=" + textContentToSend + "&date=" + dateForm + "&userId=" + userIdForm, true);
  xhr.send();
  xhr.responseType = "json";
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
        console.log('Error: ${xhr.status}');
        alert("Error something went wrong!");
      }
  };
  

}

function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = (element.scrollHeight) + "px";
}



