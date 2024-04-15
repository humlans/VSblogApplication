
// Event listener to the document that executes once the HTML content is fully loaded.
document.addEventListener("DOMContentLoaded", function() {
    footerMotto.updateMotto('editPage');
  });


const goBackButton = document.getElementById("goBackButton");

// Event listener to the 'goBackButton' that prevents the default form submission and redirects the user to the admin home page when clicked.
goBackButton.addEventListener("click",
    function(event) {
        event.preventDefault();
        window.location = "homePageAdmin.html";
    }
);

// Function to retrieve a blog post's data from the server using it's ID.
function getBlogPost(){
    const id = sessionStorage.getItem("id");
    const title = document.getElementById("title");
    const textContent = document.getElementById("textContent");
    
    
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/blog-post?id=" + id);
    xhr.send();
    xhr.responseType = "json";
    // Sets up what to do when the response is loaded.
    xhr.onload = () => {
        // Checks if the request was successful.
        if (xhr.readyState == 4 && xhr.status == 200) {
             // Updates the title input field with the title from the response.
            title.value = xhr.response.title;
            // Converts HTML line breaks in the content to newline characters for the textarea.
            textContent.value = xhr.response.textContent.replace(/<br\s*\/?>/gi, "\n");
            // Stores the date of the post in session storage.
            sessionStorage.setItem("date", xhr.response.date);
        }
        // Logs any errors and displays an error message on the webpage.
        else {
          console.log("Error:" + xhr.status);
          document.getElementById("blogPosts").innerHTML = "Error something went wrong!"
        }
    };
}

const updateButton = document.getElementById("updateButton");
updateButton.addEventListener("click", updateBlogPost);

// Function to update a blog post using the data entered in the form.
function updateBlogPost(event){
    // Prevents the default action of the event.
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

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}

