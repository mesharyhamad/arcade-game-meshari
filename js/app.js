let heightImage = 83; // Game tile height //
let widthImage = 101; // Game tile width //
let leftMin = 0; // x axis "Left" limit of canvas //
let rightMax = 400; // x axis "Right" limit of canvas //
let upMax = 80; // y axis "Up" limit of canvas //
var downLimit = 400; // y axis "Down" limit of canvas //

class Enemy {
    constructor(x, y) {
        this.x = x; // Sets (x,y) enemy position on canvas //
        this.y = y;
        this.speed = Math.floor(Math.random() * 350 + 50); // Sets random initial speed
        this.sprite = 'images/enemy-bug.png';

    }

    update(dt) {
        if (this.x < rightMax + 100) {
            this.x = this.x + this.speed * dt;
        }
        else {
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
        for (let enemy = 0; enemy < allEnemies.length; enemy++) {
            if (player.x <= (allEnemies[enemy].x + 50) && allEnemies[enemy].x <= (player.x + 30) && player.y <= (allEnemies[enemy].y + 40) && allEnemies[enemy].y <= (player.y + 30)) {
                player.reset();
            }
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }

    reset() {
        this.x = 200;
        this.y = 400;
    }
    survival(){
        this.x = 200;
        this.y = 400;
        let numberOfsurvival=$( "#survival" ).text();
        numberOfsurvival++;
        $( "#survival" ).text(numberOfsurvival);

    }

    handleInput(allowedKeys) {
        switch (allowedKeys) {
            case 'left':
                if (this.x > leftMin)
                    this.x -= widthImage;
                break;
            case 'right':
                if (this.x < rightMax)
                    this.x += widthImage;
                break;
            case 'up':
                if (this.y > upMax)
                    this.y -= heightImage;
                else player.survival();
                break;
            case 'down':
                if (this.y < downLimit)
                    this.y += heightImage;
                break;
            default:
                return;
        }
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];

for(let en =0; en <6; en++){
    let enmey =new Enemy(-(Math.floor(Math.random() * 50) + 30), (Math.floor(Math.random() * 220) + 50));
    allEnemies.push(enmey);
}


// Place the player object in a variable called player
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

