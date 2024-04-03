const edit = document.getElementById("edit");
const homePage = document.getElementById("homePage");
const create = document.getElementById("create");
const home = document.getElementById("home");
//TEST
homePage.addEventListener("click",
    function() {
        window.location = "homePage.html";
    }
);
edit.addEventListener("click",
    function() {
        window.location = "editpage.html";
    }
);
create.addEventListener("click",
    function() {
        console.log("test");
        window.location = "createpage.html";
    }
);
home.addEventListener("click",
    function() {
        window.location = "homePage.html";
    }
);