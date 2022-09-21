class Localization {
    constructor() {
        this.language_data = {};
    }

    translate(language) {
        fetch ("./locale/" + language + ".json").then((response) => {
            return response.json();
        }).then((data) => {
            this.language_data = data;

            document.querySelectorAll('[localization-key]').forEach((element) => {
                element.innerText = this.getString(element.getAttribute('localization-key'));
            });

            window.title = this.getString("game-title");
        })
        .catch(console.error);
    }

    getString(key) {
        return this.language_data[key];
    }

    changeLanguage(new_language) {
        this.translate(new_language);
        return new_language;
    }
}






