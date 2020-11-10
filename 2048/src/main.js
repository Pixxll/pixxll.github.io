const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;


let game = [
    [0, 0, 32, 0],
    [8, 0, 0, 0],
    [4, 0, 0, 0],
    [0, 0, 2, 0]
]

function drawLine(x, y, x2, y2, color='black') {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
}

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

    get x() {
        return this._x;
    }

    set x(x) {
        ctx.clearRect(this._x - this._sx / 2, this._y - this._sy / 2, this._sx, this._sy);
        this._x = x;
        ctx.fillStyle = this._color;
        ctx.fillRect(this._x - this._sx / 2, this._y - this._sy / 2, this._sx, this._sy);
    }

    get y() {
        return this._y;
    }

    set y(y) {
        ctx.clearRect(this._x - this._sx / 2, this._y - this._sy / 2, this._sx, this._sy);
        this._y = y;
        ctx.fillStyle = this._color;
        ctx.fillRect(this._x - this._sx / 2, this._y - this._sy / 2, this._sx, this._sy);
    }

    draw() {

        switch (this._value) {
            case 2:
            case 4:
                ctx.fillStyle = '#a8ff80';
                break;
            case 8:
            case 16:
                ctx.fillStyle = '#ffec80';
                break;
            case 32:
            case 64:
                ctx.fillStyle = '#ffc680';
                break;
            case 128:
            case 256:
            case 512:
            case 1024:
                ctx.fillStyle = '#ff8080';
                break;
            case 2048:
                ctx.fillStyle = '#80e1ff';
                break;
        }


        
        ctx.fillRect(this._x - this._sx / 2, this._y - this._sy / 2 , this._sx, this._sy);

        ctx.font = "40px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(this._value, this._x, this._y);
    }
}

const grid = new Grid(4, 4, width / 2, height / 2);



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

draw();
console.log(game);

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowUp") {

        for (let i = 0; i < game.length; i++) {

            for (let j = 0; j < game[i].length; j++) {

                if (game[j][i] != 0) {

                    for (let k = 0; k < game[i].length; k++) {

                        if (game[k][i] === 0) {

                            game[k][i] = game[j][i];
                            game[j][i] = 0;

                        }

                    }

                }

            }

        }

    } else if (e.code === "ArrowDown") {

        for (let i = 0; i < game.length; i++) {

            for (let j = game[i].length - 1; j >= 0; j--) {

                if (game[j][i] != 0) {

                    for (let k = game[i].length - 1; k >= 0; k--) {

                        if (game[k][i] === 0) {

                            game[k][i] = game[j][i];
                            game[j][i] = 0;

                        }

                    }

                }

            }

        }

    } else if (e.code === "ArrowRight") {

        for (let i = 0; i < game.length; i++) {

            for (let j = game[i].length - 1; j >= 0; j--) {
                
                if (game[i][j] != 0) {
                    
                    for (let k = game[i].length - 1; k >= 0; k--) {

                        if (game[i][k] === 0) {

                            game[i][k] = game[i][j];
                            game[i][j] = 0;

                        }

                    }

                }

            }

        }

    } else if (e.code === "ArrowLeft") {

        for (let i = 0; i < game.length; i++) {

            for (let j = 0; j < game[i].length; j++) {
                
                if (game[i][j] != 0) {
                    
                    for (let k = 0; k < game[i].length; k++) {

                        if (game[i][k] === 0) {

                            game[i][k] = game[i][j];
                            game[i][j] = 0;

                        }

                    }

                }

            }

        }

    }
    draw();
    console.log(game);
});




