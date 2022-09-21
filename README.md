# breakout

This is a simple "breakout" based on the original Atari game from 1976.

---

## Content

- Written in HTML and JavaScript without any library or framework (not even jQuery).
- It automatically adapts to any screen size[^1].
- Possibility to change language (see [Options menu](#options)).
- Possibility to enable/disable sound effects and music, also control the volume (see [Options menu](#options)).
- Possibility to play define custom keys for the player to move the paddle and to pause the game (see [Options menu](#options)).
- Anyone can create their custom levels and language add them into the game very easily (see [Custom content](#custom-content)).

## Sound effects and music

Sound effects were created by me using FL Studio 20, and the music was downloaded from [YouTube](https://www.youtube.com/watch?v=N3fLSxHrtJI).

## Installation

You can play the game directly from your browser[^2]. Due to CORS Policy block issues you MUST install a program like [XAMPP](https://www.apachefriends.org/es/index.html) in order to play.
<br>Clone the repository into your htdocs folder and run the game from xampp's "localhost" page. 

## How to play

- By default, the player can move the paddle with the left and right arrow and pause with Escape.
- Player can change the keys in the [Options menu](#options).
- On main menu, select "Play" to enter the level selection menu.
- Select a number and the game starts.

## Options

The game comes with different options:
- Language: English or Spanish (english by default).
- Sound effects: enable/disable (enabled by default).
- Sound effects volume: from 0% to 100% (50% by default).
- Music: enable/disable (enabled by default, plays only when a level is loaded).
- Music volume: from 0% to 100% (10% by default).
- Player keys: change the keys to move the paddle and pause the game (left arrow, right arrow and Escape by default).

## Custom content

You are able to create your own custom levels and add them into the game. You can also add a new language into the game.

---

###### How to create new languages and add them into the game

- Create a new file in the "locale" folder with the name of the language (e.g. "fr.json").
- Translate every string inside the file.
- Search for `id="settings-language"` in the `index.html` file and add the new language to the options list without the `.json` extension.

---

###### How to create a custom level and add it into the game

Level files have the following structure:

```json
{
  "bricks": [
    [1, 2, 3, 4, 5, 4, 3, 2, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 0, 1, 1, 1, 0]
  ],
  "level_properties": {
    "level_number": 1,
    "ball_speed": 1,
    "player_speed": 2,
    "player_lives": 5,
    "points_per_block": 1000
  }
}
```

- `bricks`: 2D array of numbers, maximum 10 per row. Each number represents how many hits the block needs to be destroyed. The number 0 means that there is no brick in that position, -1 means the block is indestructible. By default, the game has maximum 5 hits per block, but you can add more if you want by going into `css/style.css` and add more classes below `brick[hits="5"]`.
- `level_properties`:
  - `level_number`: number of the level. It is used to show the level number in the game.
  - `ball_speed`: movement speed of the ball.
  - `player_speed`: movement speed of the player.
  - `player_lives`: number of lives of the player. When reaching 0, the game is over.
  - `points_per_block`: number of points per block. When a block gets hit, this amount will be added to game points.

---

- Create a new file in the `levels` folder with any name you want (e.g. `level1.json`).
- Copy the structure above and fill it with the values you want.
- Search for `class="level-selector"` in the `index.html` file and add a new button below the `<div class="buttons">` element. Keep in mind that 5 levels per row are shown, so you will need to add a new `<div>` element if you want to add more levels (follow the actual commented example inside `index.html`). The new button must have `level-path` attribute with the path to the level file (e.g. `level-path="levels/level1.json"`).

## License and credits

- The game is licensed under the [MIT License]
- Thanks to [Atari] for the original game.
- Thanks to [Youtube] for the music.

[^1]: Not tested on mobile devices. If resized during gameplay the game might throw errors.
[^2]: Tested on Google Chrome only.
