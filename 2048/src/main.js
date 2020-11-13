//Variables
const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');
const endscreen = document.getElementById('endscreen');

const width = canvas.width;
const height = canvas.height;
let grid;

let score = 0;

let game;

//Functions
function drawLine(x, y, x2, y2, color='black') {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
}

function isFull(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {

        if (arr[i].indexOf(0) === -1) {

            count += 1;

        }

    }

    if (count === arr.length) {
        return true;
    } else {
        return false;
    }
}

function newBlock() {
    while (!isFull(game)) {
        let newBlock = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
        if (game[newBlock[0]][newBlock[1]] === 0) {
            
            game[newBlock[0]][newBlock[1]] = 2;
            break;

        }
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    grid.draw();
    for (let i = 0; i < 4; i++) {

        for (let j = 0; j < 4; j++) {
    
            if (game[i][j] != 0) {
    
                let block = new Block(width / 4 / 2 + (j * width / 4), height / 4 / 2 + (i * height / 4), width / 4 - 10, height / 4 - 10, game[i][j])
                block.draw();
    
            }
           
        }
    
    }

}

function reset() {
    score = 0;
    game = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    grid = new Grid(4, 4, width / 2, height / 2);
    newBlock();
    newBlock();
    draw();
    endscreen.style.visibility = 'hidden';

    document.getElementById('score').innerHTML = score;
}

//Classes
class Grid {
    constructor(sx, sy, cx, cy) {
        this._sx = sx;
        this._sy = sy;
        this._cx = cx;
        this._cy = cy;
    }

    draw() {
        for (let i = 1; i < this._sx; i++) {
            drawLine(width / this._sx * i, 0, width / this._sx * i, height, 'grey');
        }
        for (let i = 1; i < this._sy; i++) {
            drawLine(0, height / this._sy * i, width, height / this._sy * i, 'grey');
        }
    }
}


class Block {
    constructor(x, y, sx, sy, value=2) {
        this._sx = sx;
        this._sy = sy;
        this._x = x;
        this._y = y;
        this._value = value;
    }

    draw() {

        switch (this._value) {
            case 2:
                ctx.fillStyle = '#dbdbdb';
                break;
            case 4:
                ctx.fillStyle = '#82ecff';
                break;
            case 8:
                ctx.fillStyle = '#85ffc2';
                break;
            case 16:
                ctx.fillStyle = '#9bff85';
                break;
            case 32:
                ctx.fillStyle = '#fff385';
                break;
            case 64:
                ctx.fillStyle = '#ffd085';
                break;
            case 128:
            case 256:
            case 512:
            case 1024:
                ctx.fillStyle = '#ff7a7a';
                break;
            case 2048:
                ctx.fillStyle = '#000000';
                break;
        }

        ctx.fillRect(this._x - this._sx / 2, this._y - this._sy / 2 , this._sx, this._sy);

        if (this._value === 2048) {
            ctx.fillStyle = "white";
        } else {
            ctx.fillStyle = "black";
        }
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this._value, this._x, this._y);
    }
}




//Code
reset();



//Listener
document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowUp") {

        let newGame = [];

        for (let i = 0; i < 4; i++) {

            newGame.push([]);

            for (let j = 0; j < 4; j++) {

                newGame[i].push(game[j][i]);

            }

        }

        for (let i = 0; i < newGame.length; i++) {

            newGame[i] = newGame[i].filter(item => item !== 0);
            
            if (newGame[i].length >= 2) {
                
                for (let j = 0; j < 4; j ++) {

                    if (newGame[i][j] === newGame[i][j - 1]) {

                        newGame[i][j - 1] = newGame[i][j] * 2;

                        if (!isNaN(newGame[i][j - 1])) {
                            score += newGame[i][j - 1];
                        }

                        newGame[i].splice(j, 1);

                    }

                }

            }

            newGame[i] = newGame[i].filter(item => isNaN(item) === false);

            while (newGame[i].length !== 4) {
                newGame[i].push(0);
            }

        }

        game = [];

        for (let i = 0; i < 4; i++) {

            game.push([]);

            for (let j = 0; j < 4; j++) {

                game[i].push(newGame[j][i]);

            }

        }

    } else if (e.code === "ArrowDown") {

        let newGame = [];

        for (let i = 0; i < 4; i++) {

            newGame.push([]);

            for (let j = 0; j < 4; j++) {

                newGame[i].push(game[j][i]);

            }

        }

        for (let i = 0; i < newGame.length; i++) {
            
            newGame[i] = newGame[i].filter(item => item !== 0);

            if (newGame[i].length >= 2) {
                
                for (let j = 3; j >= 0; j --) {

                    if (newGame[i][j] === newGame[i][j + 1]) {

                        newGame[i][j + 1] = newGame[i][j] * 2;
                        
                        if (!isNaN(newGame[i][j + 1])) {
                            score += newGame[i][j + 1];
                        }

                        newGame[i].splice(j, 1);

                    }

                }

            }

            newGame[i] = newGame[i].filter(item => isNaN(item) === false);

            while (newGame[i].length !== 4) {
                newGame[i].unshift(0);
            }
            
        }

        game = [];

        for (let i = 0; i < 4; i++) {

            game.push([]);

            for (let j = 0; j < 4; j++) {

                game[i].push(newGame[j][i]);

            }

        }

    } else if (e.code === "ArrowRight") {

        for (let i = 0; i < game.length; i++) {
            
            game[i] = game[i].filter(item => item !== 0);

            if (game[i].length >= 2) {
                
                for (let j = 3; j >= 0; j --) {

                    if (game[i][j] === game[i][j + 1]) {

                        game[i][j + 1] = game[i][j] * 2;

                        if (!isNaN(game[i][j + 1])) {
                            score += game[i][j + 1];
                        }

                        game[i].splice(j, 1);

                    }

                }

            }

            game[i] = game[i].filter(item => isNaN(item) === false);

            while (game[i].length !== 4) {
                game[i].unshift(0);
            }
            
        }

    } else if (e.code === "ArrowLeft") {

        for (let i = 0; i < game.length; i++) {

            game[i] = game[i].filter(item => item !== 0);
            
            if (game[i].length >= 2) {
                
                for (let j = 0; j < 4; j ++) {

                    if (game[i][j] === game[i][j - 1]) {

                        game[i][j - 1] = game[i][j] * 2;

                        if (!isNaN(game[i][j - 1])) {
                            score += game[i][j - 1];
                        }

                        game[i].splice(j, 1);

                    }

                }

            }

            game[i] = game[i].filter(item => isNaN(item) === false);

            while (game[i].length !== 4) {
                game[i].push(0);
            }

        }

    }
    
    newBlock();

    draw();
    document.getElementById('score').innerHTML = score;
});