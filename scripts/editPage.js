const home = document.getElementById("home");
const homePage = document.getElementById("homePage");

homePage.addEventListener("click",
    function() {
        window.location = "homePage.html";
    }
);
home.addEventListener("click",
    function() {
        window.location = "homePage.html";
    }
);

function httpGet(){
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "http://localhost:8080/blog-post?id=1");
      xhr.send();
      xhr.responseType = "json";
      xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log(xhr.response);
          document.getElementById("testP").innerHTML = "<div style='margin-top:10px'><h2>" + xhr.response.title + "</h2>" +
                                                        "<p>" + xhr.response.textContent + "</p>"+
                                                        "<p>Date: " + xhr.response.date + ", id: " +
                                                        xhr.response.id + ", userId: " + xhr.response.userId
                                                        + "</p></div>";
        }
        else {
          console.log(`Error: ${xhr.status}`);
        }
    };
}