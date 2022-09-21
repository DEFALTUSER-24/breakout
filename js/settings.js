class Settings {
    constructor() {
        this.player_right_key = "";
        this.player_left_key = "";
        this.game_pause_key = "";

        this.sound = true;
        this.sound_volume = 50;
        this.music = true;
        this.music_volume = 10;

        this.language = "en";
    }

    //Load default settings from settings.json and save them to localStorage
    async #LoadDefaultSettings() {
        return await fetch("./default-settings.json")
            .then((response) => response.json())
            .then((data) => {

                this.player_right_key = data.player_right_key;
                this.player_left_key = data.player_left_key;
                this.game_pause_key = data.game_pause_key;

                this.language = data.language;

                this.sound = data.sound;
                this.sound_volume = data.sound_volume;
                this.music = data.music;
                this.music_volume = data.music_volume;

                this.saveSetting("player_right_key", this.player_right_key);
                this.saveSetting("player_left_key", this.player_left_key);
                this.saveSetting("game_pause_key", this.game_pause_key);
                this.saveSetting("language", this.language);
                this.saveSetting("sound", this.sound);
                this.saveSetting("sound_volume", this.sound_volume);
                this.saveSetting("music", this.music);
                this.saveSetting("music_volume", this.music_volume);

                return data;
            })
            .catch(console.error);
    }

    async LoadUserSettings() {
        let local_settings = JSON.parse(localStorage.getItem("settings"));

        if (local_settings === null)
            return await this.#LoadDefaultSettings();

        this.player_right_key = local_settings.player_right_key;
        this.player_left_key = local_settings.player_left_key;
        this.game_pause_key = local_settings.game_pause_key;

        this.language = local_settings.language;

        this.sound = local_settings.sound;
        this.sound_volume = local_settings.sound_volume;
        this.music = local_settings.music;
        this.music_volume = local_settings.music_volume;

        return {
            player_right_key: this.player_right_key,
            player_left_key: this.player_left_key,
            game_pause_key: this.game_pause_key,
            language: this.language,
            sound: this.sound,
            sound_volume: this.sound_volume,
            music: this.music,
            music_volume: this.music_volume
        };
    }

    saveSetting(key, value) {
        let local_settings = JSON.parse(localStorage.getItem("settings"));

        if (local_settings === null)
            local_settings = {};

        local_settings[key] = value;

        localStorage.setItem("settings", JSON.stringify(local_settings));
    }
}


