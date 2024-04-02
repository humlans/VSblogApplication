const home = document.getElementById("home");
const homePage = document.getElementById("homePage");


home.addEventListener("click", function() {
  window.location.href = "homePage.html"; // Ändra här till rätt filnamn om det behövs
});

homePage.addEventListener("click",
    function() {
        window.location = "homePage.html";
    }
);



function createBlogPost(){
    const titleForm = document.getElementById("title");
    const textContentForm = document.getElementById("textContent");
    const dateForm = document.getElementById("date");
    const userIdForm = document.getElementById("userId");
    const messageResponse = document.getElementById("messageResponse");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/blog-post/create-post?title=" + titleForm.value + "&textContent=" + textContentForm.value + "&date=" + dateForm.value + "&userId=" + userIdForm.value);
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


function loadPostForEdit() {
  // Hämta inläggets ID från localStorage eller URL
  const postId = new URLSearchParams(window.location.search).get('postId') || localStorage.getItem('editPostId');
  
  if (postId) {
      fetch(`http://localhost:8080/blog-post/get-post/${postId}`)
      .then(response => response.json())
      .then(post => {
          document.getElementById('title').value = post.title;
          document.getElementById('textContent').value = post.textContent;
          // och så vidare för andra fält
      })
      .catch(error => console.error('Error:', error));
  }
}

document.addEventListener('DOMContentLoaded', loadPostForEdit);



