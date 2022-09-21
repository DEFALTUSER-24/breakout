class Game {
    #game_time_timer;
    #game_update_timer;

    constructor() {
        this.playing = false;
        this.paused = false;
        this.points = 0;

        this.seconds = 0;
        this.minutes = 0;

        this.pointsPerBlock = 0;
    }

    #update(func) {
        if (this.paused)
            return;

        func();
    }

    start(func) {
        this.playing = true;
        this.paused = false;
        this.points = 0;
        this.seconds = 0;
        this.minutes = 0;

        this.#game_time_timer = setInterval(() => {
            if (!this.playing)
                return;

            this.#gameTime();
        }, 1000);

        this.#game_update_timer = setInterval(() => {
            if (!this.playing)
                return;

            this.#update(func);
        }, 1);
    }

    stop() {
        this.playing = false;
        this.paused = false;
        this.points = 0;
        this.seconds = 0;
        this.minutes = 0;

        clearInterval(this.#game_time_timer);
        clearInterval(this.#game_update_timer);
    }

    #gameTime() {
        if (this.paused)
            return;

        this.seconds++;
        if (this.seconds === 60) {
            this.minutes++;
            this.seconds = 0;
        }

        document.querySelector("#level-time").innerHTML = this.minutes.toString().padStart(2, "0") + ":" + this.seconds.toString().padStart(2, "0");
    }
}