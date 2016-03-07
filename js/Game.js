var Game = (function() {
    var mat = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    var score = 0;
    var show2048dialog = false;
    var size = 4;

    function rotateMat() {
        var i, j, n = size;
        var tmp;
        for(i = 0; i < n/2; i++) {
          for(j = i; j < n - i - 1; j++) {
            tmp = mat[i][j];
            mat[i][j] = mat[j][n-i-1];
            mat[j][n-i-1] = mat[n-i-1][n-j-1];
            mat[n-i-1][n-j-1] = mat[n-j-1][i];
            mat[n-j-1][i] = tmp;
          }
        }
    }

    function killZeroes() {
        var i, j, k, tmp;
        for(k = 0; k < size; k++) {
          for(i = 0; i < 4; i++) {
            if(mat[k][i] === 0) {
              for(j = i + 1; j < 4; j++) {
                 if(mat[k][j] !== 0) {
                   tmp = mat[k][i];
                   mat[k][i] = mat[k][j];
                   mat[k][j] = tmp;
                   break;
                 }
              }
            }
          }
        }
    }



    function moveOn() {
        var row, col, col2;
        for (row = 0; row < 4; row++)
        {
          for (col = 0; col < 4; col++)
          {
            if (mat[row][col] !== 0)
            {
                for (col2 = col + 1; col2 < 4; col2++)
                {
                    if (mat[row][col2] !== 0)
                    {
                        if (mat[row][col] === mat[row][col2])
                        {
                            mat[row][col++] *= 2;
                            mat[row][col2] = 0;
                        }
                        break;
                    }
                }
            }
           }
        }

        killZeroes();
    }

    // function to change state of mat;
    // and set show2048dialog variable if required
    function moveLeft() {
        moveOn();
    }
    function moveRight() {
        rotateMat();
        rotateMat();
        moveOn();
        rotateMat();
        rotateMat();
    }
    function moveTop() {
        rotateMat();
        moveOn();
        rotateMat();
        rotateMat();
        rotateMat();
    }
    function moveDown() {
        rotateMat();
        rotateMat();
        rotateMat();
        moveOn();
        rotateMat();
    }

    function changeTileColor(str, val) {
        var ele = document.getElementById(str);
        if(val === 2)
            ele.style.backgroundColor = "rgba(102, 117, 127, 1)";
        else if(val === 4)
            ele.style.backgroundColor = "rgba(77, 172, 214, 1)";
        else if(val === 8)
            ele.style.backgroundColor = "rgba(237, 197, 63, 1)";
        else if(val === 16)
            ele.style.backgroundColor = "rgba(246, 94, 59, 1)";
        else if(val === 32)
            ele.style.backgroundColor = "rgba(255, 124, 135, 1)";
        else if(val === 64)
            ele.style.backgroundColor = "rgba(156, 216, 12, 1)";
        else if(val === 128)
            ele.style.backgroundColor = "rgba(146, 14, 214, 1)";
        else if(val === 256)
            ele.style.backgroundColor = "rgba(214, 14, 162, 1)";
        else if(val === 512)
            ele.style.backgroundColor = "rgba(238, 228, 218, 1)";
        else if(val === 1024)
            ele.style.backgroundColor = "rgba(255, 124, 135, 1)";
        else if(val === 2048)
            ele.style.backgroundColor = "rgba(77, 172, 214, 1)";
        else if(val === 4096)
            ele.style.backgroundColor = "rgba(255, 124, 135, 1)";
    }


    // reflect state of mat
    function redraw() {
        var i, j, str, myEl, x, val;
        for(i = 0; i < size; i++) {
            for(j = 0; j < size; j++) {
                x = 4*i + j;
                str = "" + x;
                myEl = document.getElementById(str);
                if(mat[i][j] !== 0) {
                    val = "" + mat[i][j];
                    myEl.innerHTML = val;
                    changeTileColor(str, mat[i][j]);
                }
                else {
                    val = "";
                    myEl.innerHTML = val;
                    myEl.style.backgroundColor = "rgb(205, 193, 180)";
                }
            }
        }        
    }

    // randomw number between 2 and 4
    function getRandomValue() {
      var x = Math.random();
      if(x > 0.7)
        x = 4;
      else
        x = 2;
      return x;
    }

    // returns x.y of a random empty cell
    function getRandomEmptyCell() {
      var max = 16, min = 0;
      var n = Math.floor(Math.random() * (max - min)) + min;
      var i = Math.floor(n / 4);
      var j = Math.floor(n % 4);
      var coord = {x : i, y : j};
      return coord;      
    }

    function fillOneRandomEmptyCell() {
        var value = getRandomValue();
        var coord;
        while(true) {
            coord = getRandomEmptyCell();
            if(mat[coord.x][coord.y] === 0)
                break;
        }
        mat[coord.x][coord.y] = value;
    }

    // checks if gameover
    function isGameOver() {
        for(var i = 0; i < size; i++) {
            for(var j = 0; j < size; j++) {
                if(mat[i][j] === 0)
                    return false; 
            }
        }
        return true;
    }

    // show Dialog for GameOver()
    function showGameOverDialog() {
        alert("Game Over!!");
    }

    // show dialog for 2048
    function show2048Dialog() {
        alert("2048 tile achieved!!");
    }

    function move(e) {
        //depending upon keypress you call the respective function
        e.preventDefault();
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38) {
            moveTop();
        } else if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 40) {
            moveDown();
        }
        fillOneRandomEmptyCell();
        redraw();
        if (isGameOver()) {
            showGameOverDialog();
        }
        if (show2048dialog === true) {
            show2048Dialog();
            show2048dialog = false;
        }
    }
    function reset(e) {
        if (e !== undefined) {
            e.preventDefault();
        }
        mat = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        score = 0;
        fillOneRandomEmptyCell();
        fillOneRandomEmptyCell();
        redraw();
    }
    function init() {
        reset();

        // add reset method on click actions of all the reset elements
        var resetButton = document.getElementById('reset');
        resetButton.addEventListener('click', reset);
        window.addEventListener('keydown', move);
    }
    return {
        init : init
    };
})();
