class Ball {
    #direction;
    #position;
    #audio;

    constructor(width = 20, height = 20) {
        this.speed = 0;
        this.#direction = [-1, -1]; //x y

        this.#position = [0, 0]; // x y
        this.width = width;
        this.height = height;

        this.#audio = new Audio();
    }

    #getBall() {
        return document.querySelector(".ball");
    }

    show(playerHeight) {
        this.#getBall().style.display = "block";
        this.#getBall().style.width = this.width + "px";
        this.#getBall().style.height = this.height + "px";

        this.#position[0] = (window.innerWidth / 2) - (this.width / 2);
        this.#position[1] = window.innerHeight - playerHeight - this.height;

        this.#getBall().style.left = this.#position[0] + "px";
        this.#getBall().style.top = this.#position[1] + "px";
    }

    update() {

        if (this.#ballCollideWithScreenBorders().player_died) {
            return { player_died: true };
        }

        this.#position[0] = this.#position[0] + 1 * this.#direction[0] * this.speed;
        this.#position[1] = this.#position[1] + 1 * this.#direction[1] * this.speed;

        this.#getBall().style.left = this.#position[0] + "px";
        this.#getBall().style.top = this.#position[1] + "px";

        let playerCollisionData = this.#getCollisionData(document.querySelector(".player"));

        if (this.#objectsCollided(playerCollisionData.ball, playerCollisionData.object)) {

            this.#setYDirection( this.#direction[1] * -1);
            this.#playPlayerHit();

            if (playerCollisionData.ball.left < playerCollisionData.object.left) {
                this.#setXDirection( this.#direction[0] * -1);
            }

            if (playerCollisionData.ball.right > playerCollisionData.object.right) {
                this.#setXDirection( this.#direction[0] * -1);
            }
        }

        let bricks = document.querySelectorAll(".brick");

        for (let i = 0; i < bricks.length; i++) {
            let brickCollisionData = this.#getCollisionData(bricks[i]);

            if (parseInt(bricks[i].getAttribute("hits")) === 0) {
                continue;
            }

            if (this.#objectsCollided(brickCollisionData.ball, brickCollisionData.object)) {

                //if collision is from left or right, just change x direction
                if (brickCollisionData.ball.left < brickCollisionData.object.left || brickCollisionData.ball.right > brickCollisionData.object.right) {
                    this.#setXDirection( this.#direction[0] * -1);
                }
                else {
                    this.#setYDirection( this.#direction[1] * -1);
                }

                this.#playBlockHit();

                if (parseInt(bricks[i].getAttribute("hits")) === -1) {
                    continue;
                }

                bricks[i].setAttribute("hits", parseInt(bricks[i].getAttribute("hits") - 1));

                if (bricks[i].getAttribute("hits") === "0") {
                    return { block_destroyed: true };
                }
            }
        }
    }

    #setXDirection(direction) {
        this.#direction[0] = direction;
    }

    #setYDirection(direction) {
        this.#direction[1] = direction;
    }

    #ballCollideWithScreenBorders() {
        if (this.#position[1] > (window.innerHeight + this.height * 2)) {
            this.#setYDirection( this.#direction[1] * -1);
            this.#playPlayerHit();
            return { player_died: true };
        }

        if (this.#position[1] < document.querySelector(".level-info").getBoundingClientRect().height) {
            this.#setYDirection( this.#direction[1] * -1);
            this.#playBlockHit();
            return { player_died: false };
        }

        if (this.#position[0] > (window.innerWidth - this.width) || this.#position[0] < 0) {
            this.#setXDirection( this.#direction[0] * -1);
            this.#playBlockHit();
        }
        return { player_died: false };
    }

    #playBlockHit() {
        if (this.#getSetting("sound")) {
            this.#audio.src = "./audio/ball-hit-block.mp3";
            this.#audio.volume = this.#getSetting("sound_volume") / 100;
            this.#audio.play();
        }
    }

    #playPlayerHit() {
        if (this.#getSetting("sound")) {
            this.#audio.src = "./audio/ball-hit-player.mp3";
            this.#audio.volume = this.#getSetting("sound_volume") / 100;
            this.#audio.play();
        }
    }

    #getSetting(key) {
        let local_settings = JSON.parse(localStorage.getItem("settings"));

        if (local_settings === null)
            return null;

        return local_settings[key];
    }

    #getCollisionData(object) {
        let ball = this.#getBall(),
            ballRect = ball.getBoundingClientRect(),
            objectRect = object.getBoundingClientRect();

        return {
            ball: ballRect,
            object: objectRect,
        }
    }

    #objectsCollided(ball, object) {
        return ball.left < object.right &&
            ball.right > object.left &&
            ball.top < object.bottom &&
            ball.bottom > object.top;
    }
}