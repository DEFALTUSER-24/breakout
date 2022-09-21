class Player {
    constructor(width = 10, height = 20) {
        this.movingRight = false;
        this.movingLeft = false;
        this.width = width; //The less the bigger the player will be.
        this.height = height; //Player height in pixels.
        this.lives = 0;
        this.movement_speed = 0;

        this.key_left = "";
        this.key_right = "";
        this.key_pause = "";
    }

    #getPlayer() {
        return document.querySelector(".player");
    }

    show() {
        this.#getPlayer().style.display = "block";
        this.#getPlayer().style.width = window.innerWidth / this.width + "px";
        this.#getPlayer().style.height = this.height + "px";

        this.#getPlayer().style.left = (window.innerWidth / 2) - (parseInt(this.#getPlayer().style.width) / 2) + "px";
    }

    update () {
        this.#getPlayer().style.width = window.innerWidth / this.width + "px";

        if (this.#isOutOfBounds())
            this.#getPlayer().style.left = window.innerWidth - parseInt(this.#getPlayer().style.width) - 10 - this.movement_speed + "px";

        if (this.movingLeft) {
            this.#moveLeft();
        }

        if (this.movingRight) {
            this.#moveRight();
        }
    }

    #moveRight() {
        if (this.#isOutOfBounds())
            return;

        this.#getPlayer().style.left = parseInt(this.#getPlayer().style.left) + (1 * this.movement_speed) + "px";
    }

    #moveLeft() {
        if (this.#getPlayer().style.left <= "0px")
            return;

        this.#getPlayer().style.left = parseInt(this.#getPlayer().style.left) - (1 * this.movement_speed) + "px";
    }

    #isOutOfBounds() {
        return parseInt(this.#getPlayer().style.left) + parseInt(this.#getPlayer().style.width) >= window.innerWidth;
    }
}