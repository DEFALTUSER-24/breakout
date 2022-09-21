/*
    This function creates the level inside the level-grid div.
    It takes the level number as a parameter and loads the level from the "levels" folder.
    The level is created using the JSON file.

    The JSON file contains the following properties:

    - bricks: This is a 2D array that contains the bricks of the level. There's a max of 10 bricks per row.
    - level_properties: This is an object that contains the properties of the level.

    The "level_properties" object contains the following properties:
    - ball_speed: The speed of the ball.
    - player_speed: The speed of the player.
    - player_lives: The number of lives of the player.

    The 2D array "bricks" works as follows:

    - -1: Unbreakable brick.
    - 0: Empty space.
    - >= 1: Brick. The amount of hits required to break the brick is equal to the number.

    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // First row full of blocks with 1 hit to break.
        [2, 0, 0, 0, 3, 3, 0, 0, 0, 2], // Second row with some empty spaces and some blocks with 2 and 3 hits to break.
        [0, 0, 0, 0, -1, -1, 0, 0, 0, 0], // Third row with indestructible blocks and empty spaces
    ]

    By default, bricks have a maximum of 5 hits. If you want to add more, just copy/paste the "brick" class and change the "hits" property (see css final lines).

 */

async function LoadLevel(level)
{
    if (level === undefined) {
        return console.error("No level specified");
    }

    let level_panel = document.querySelector(".level-grid");

    level_panel.innerHTML = "";

    return await fetch(level).then((response) => {
       return response.json();
    }).then((data) => {

        data.bricks.forEach((row, row_index) => {
            let child_row = level_panel.appendChild(document.createElement("div"));
            child_row.classList.add("brick-row");
            row.forEach((brick, brick_index) => {
                let new_brick = child_row.appendChild(document.createElement("div"));
                new_brick.setAttribute("hits", brick);
                new_brick.setAttribute("class", "brick");
            });
        });
        return data;
    })
    .catch(console.error);
}