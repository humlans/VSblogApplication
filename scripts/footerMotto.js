// Defines a class for managing the footer motto based on the current page.
class FooterMotto {
    // Constructor takes an object of page mottos as its argument.
    constructor(pageMottos) {
        // Stores the page-specific mottos.
        this.pageMottos = pageMottos;
        // Sets a default motto for pages without a specific motto.
        this.defaultMotto = "Welcome to our site!";
    }

    // Method to update the motto displayed in the footer based on the current page.
    updateMotto(currentPage) {
        // Retrieves the motto for the current page from pageMottos; uses defaultMotto if not found.
        const motto = this.pageMottos[currentPage] || this.defaultMotto;
        // Updates the text content of the 'footerMotto' element with the retrieved motto.
        document.getElementById('footerMotto').textContent = motto;
        // Saves the current motto to sessionStorage for quick retrieval.
        sessionStorage.setItem('currentMotto', motto);
    }
}

// Defines an object containing mottos for different pages.
const pageMottos = {
    homePage: "Express yourself, feel inspired, informed, and, above all, welcomed!",
    aboutPage: "Learn more about us",
    createPage: "Share your story with us",
    editPage: "Make your stories even better",
    loginPage: "Register or login for full experience",
    homePageAdmin: "The power of admin in your hands"
};

// Creates an instance of the FooterMotto class with the defined page mottos.
const footerMotto = new FooterMotto(pageMottos);
