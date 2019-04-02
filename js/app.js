// height each image box
let Height_Image = 83;

// width each image box
let Width_Image = 101;

// Minimum left
let left_Min = 0;
//Maximum right
let right_Max = 400;
//Maximum up for enemy
let up_Max = 80;
//Minimum down
var down_Min = 400;



class Enemy {


    // set x , y  and  sprite  the enemy
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = Math.floor(Math.random() * 300 + 50); // set speed enemy random
        // The image/sprite for our enemies, this uses
        this.sprite = 'images/enemy-bug.png';

    }

    //update postion enemy in xis
    update(dt) {
        if (this.x < right_Max + 100) {
            this.x = this.x + this.speed * dt;
        } else {
            this.x = -(Math.floor(Math.random() * 50) + 30);
        }

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
}


class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = "images/char-boy.png";
    }

    update() {

        for(let en =0; en<allEnemies.length; en++){
            if (this.x <= (allEnemies[en].x + 50) && allEnemies[en].x <= (this.x + 30) && this.y <= (allEnemies[en].y + 40) && allEnemies[en].y <= (this.y + 30)) {
                this.reset();
            }
        }

    }

    // Set  placement of player on canvas
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }

    reset() {
        this.x = 200;
        this.y = 400;
    }

//Every time the player reaches the water called survival
    survival() {
        this.x = 200;
        this.y = 400;
        let numberOfsurvival = $("#survival").text();
        numberOfsurvival++;
        $("#survival").text(numberOfsurvival);

    }

    handleInput(allowedKeys) {
        switch (allowedKeys) {
            case 'left':
                if (this.x > left_Min)
                    this.x -= Width_Image;
                break;
            case 'right':
                if (this.x < right_Max)
                    this.x += Width_Image;
                break;
            case 'up':
                if (this.y > up_Max)
                    this.y -= Height_Image;
                else player.survival();
                break;
            case 'down':
                if (this.y < down_Min)
                    this.y += Height_Image;
                break;
            default:
                return;
        }
    }

}

// Place all enemy objects in an array called allEnemies
let allEnemies = [];

for (let en = 0; en < 6; en++) {
    let enmey = new Enemy(-(Math.floor(Math.random() * 50) + 30), (Math.floor(Math.random() * 220) + 50));
    allEnemies.push(enmey);
}


var player = new Player(200, 400); // Set initial placement of player on canvas //


document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

