class GameUI {
    #main_menu;
    #level_selector;
    #level_screen;
    #game_over_screen;
    #settings;
    #options_key_error;
    #credits;
    #pause_menu;

    constructor() {
        this.#main_menu = document.querySelector(".main-menu");
        this.#level_selector = document.querySelector(".level-selector");
        this.#level_screen = document.querySelector(".level");
        this.#game_over_screen = document.querySelector(".game-over");
        this.#settings = document.querySelector(".options-menu");
        this.#options_key_error = document.querySelector(".options-key-error");
        this.#credits = document.querySelector(".credits-menu");
        this.#pause_menu = document.querySelector(".pause-menu");
    }

    showMainMenu() {
        this.#main_menu.style.display = "flex";
    }

    hideMainMenu() {
        this.#main_menu.style.display = "none";
    }

    showOptionsMenu() {
        this.#settings.style.display = "flex";
    }

    hideOptionsMenu() {
        this.#settings.style.display = "none";
        this.hideOptionsKeyError();
    }

    showOptionsKeyError() {
        this.#options_key_error.style.display = "block";
    }

    hideOptionsKeyError() {
        this.#options_key_error.style.display = "none";
    }

    showLevelSelector() {
        this.#level_selector.style.display = "flex";
    }

    hideLevelSelector() {
        this.#level_selector.style.display = "none";
    }

    showLevelElements() {
        this.#level_screen.style.display = "flex";
    }

    hideLevelElements() {
        this.#level_screen.style.display = "none";
    }

    showGameOverScreen(final_score) {
        this.#game_over_screen.style.display = "flex";
        document.querySelector("#final-score").innerHTML = final_score;
    }

    hideGameOverScreen() {
        this.#game_over_screen.style.display = "none";
    }

    showPauseMenu() {
        this.#pause_menu.style.display = "flex";
    }

    hidePauseMenu() {
        this.#pause_menu.style.display = "none";
    }

    showCredits() {
        this.#credits.style.display = "flex";
    }

    hideCredits() {
        this.#credits.style.display = "none";
    }

    updateLevelNumber(amount) {
        document.querySelector("#level-number").innerHTML = amount;
    }

    updatePlayerLives(amount) {
        document.querySelector("#player-lives").innerHTML = amount;
    }

    updatePlayerScore(amount) {
        document.querySelector("#level-points").innerHTML = amount;
    }
}