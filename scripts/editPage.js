document.addEventListener("DOMContentLoaded", function() {
    footerMotto.updateMotto('editPage');
  });


const goBackButton = document.getElementById("goBackButton");
goBackButton.addEventListener("click",
    function(event) {
        event.preventDefault();
        window.location = "homePageAdmin.html";
    }
);

function getBlogPost(){
    const id = sessionStorage.getItem("id");
    const title = document.getElementById("title");
    const textContent = document.getElementById("textContent");
    
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/blog-post?id=" + id);
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            title.value = xhr.response.title;
            textContent.value = xhr.response.textContent.replace(/<br\s*\/?>/gi, "\n");
            sessionStorage.setItem("date", xhr.response.date);
        }
        else {
          console.log(`Error: ${xhr.status}`);
          document.getElementById("blogPosts").innerHTML = "Error something went wrong!"
        }
    };
}

const updateButton = document.getElementById("updateButton");
updateButton.addEventListener("click", updateBlogPost);

function updateBlogPost(event){
    event.preventDefault();
    const id = sessionStorage.getItem("id");
    const titleForm = document.getElementById("title");
    const textContentForm = document.getElementById("textContent");
    const dateForm = sessionStorage.getItem("date");
    const userIdForm = sessionStorage.getItem("userid");
    let textContentToSend = textContentForm.value.replace(/(?:\r\n|\r|\n)/g, "<br>");
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://localhost:8080/blog-post/edit-post?id="+ id + "&title=" + titleForm.value + "&textContent=" + textContentToSend + "&date=" + dateForm + "&userId=" + userIdForm);
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.status >= 400 ) {
            alert('Failed to update the post: ${xhr.status}');
        }
    };
    alert(titleForm.value + ' has been updated!');
    xhr.send();
}



