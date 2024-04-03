function getAllPosts() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/blog-post/get-all-posts");
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            for(let i = 0; i < xhr.response.length; i++){
                document.getElementById("blogPosts").innerHTML += "<h3>" + xhr.response[i].title + "</h3><br>" +
                                                                   "<p class='textContent'>" + xhr.response[i].textContent + "</p><br>" +
                                                                   "<p>" + "Date: " + xhr.response[i].date +
                                                                   ", ID: " + xhr.response[i].id +
                                                                   ", userId: " + xhr.response[i].userId + "</p><br><br>";
            }
        }
        else {
          console.log(`Error: ${xhr.status}`);
          document.getElementById("blogPosts").innerHTML = "Error something went wrong!"
        }
    };
}