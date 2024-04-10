document.addEventListener("DOMContentLoaded", function() {
    footerMotto.updateMotto('loginPage');
});


const viewPageButton = document.getElementById("viewPageButton");
const loginButton = document.getElementById("loginButton");

viewPageButton.addEventListener("click", 
    function(event){
        event.preventDefault();
        window.location = "homePage.html";
    }
);

loginButton.addEventListener("click", login);

function login(event){
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username + "0" + password);
    const xhr = new XMLHttpRequest();
    // A post request to see if user can log in.
    xhr.open("POST", "http://localhost:8080/user/login?username=" + username + "&password=" + password, true);
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.status >= 400) {      
            alert("Error: Failed to log in!");
            window.location = "loginPage.html";
        }
        else if(xhr.status == 200) {
            const xhrUser = new XMLHttpRequest();
            // When login successed get user from database to get the userId.
            xhrUser.open("GET", "http://localhost:8080/user?username=" + username, true);
            xhrUser.send();
            xhrUser.responseType = "json";
            xhrUser.onload = () => {
                if(xhrUser.status >= 400){
                    alert("Error: Something went wrong!");
                    window.location = "loginPage.html";
                }
                else if(xhrUser.status == 200){
                    // Send userId the homeAdminPage.
                    sessionStorage.setItem("userid", xhrUser.response.id);
                    document.addEventListener("DOMContentLoaded", function() {
                        footerMotto.updateMotto('homePageAdmin');
                    });
                    // Redirect to homePageAdmin
                    window.location = "homePageAdmin.html";
                }
            };
        }
    };
}
