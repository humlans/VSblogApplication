class FooterMotto {
    constructor(pageMottos) {
        this.pageMottos = pageMottos;
        this.defaultMotto = "Welcome to our site!";
    }

    updateMotto(currentPage) {
        // Hämta motto från pageMottos baserat på currentPage
        const motto = this.pageMottos[currentPage] || this.defaultMotto;
        document.getElementById('footerMotto').textContent = motto;
        
        // Spara nuvarande sidas motto i sessionStorage för snabb återhämtning
        sessionStorage.setItem('currentMotto', motto);
    }
}

// Definiera motton för olika sidor
const pageMottos = {
    homePage: "Express yourself, feel inspired, informed, and, above all, welcomed!",
    aboutPage: "Learn more about us",
    createPage: "Share your story with us",
    editPage: "Make your stories even better",
    loginPage: "Register or login for full experience",
    homePageAdmin: "The power of admin in your hands"
};

// Skapa en instans av FooterMotto-klassen med sidmotton
const footerMotto = new FooterMotto(pageMottos);
