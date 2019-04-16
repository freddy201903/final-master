

var paddleLeftX1 = 0;//浮板1位置
var paddleLeftY1 = 150;
var paddleRightX2 =485;//浮板2位置
var paddleRightY2 = 150;
var score1 = 0;
var score2 = 0;

$(function(){
    // this is the same as document.getElementById('canvas');
    var canvas = $('#canvas')[0];
    // different browsers support different contexts. All support 2d
    var context = canvas.getContext('2d');
    //浮板長寬
    var paddleWidth = 15;
    var paddleHeight = 100;
    //浮板移動的x,y變數
    var paddleDeltaY = 0;
    var paddleDeltaY = 0;
    //繪製浮板
    function drawPaddle() {
        if (paddleLeftY1 < 0) {
            paddleLeftY1 = 0
        } else if (paddleLeftY1 > canvas.height) {
            paddleLeftY1 = canvas.height
        }
        if (paddleRightY2 < 0) {
            paddleRightY2 = 0
        } else if (paddleRightY2 > canvas.height) {
            paddleRightY2 = canvas.height
        }

        context.fillRect(paddleLeftX1, paddleLeftY1, paddleWidth, paddleHeight);
        context.fillRect(paddleRightX2, paddleRightY2, paddleWidth, paddleHeight);
    }

    drawPaddle();
    
    //球的位置及半徑
    var ballX = 300;//圓心X
    var ballY = 300;//圓心Y
    var ballRadius = 10;
    //繪製球體
    function drawBall() {
        // Context.beginPath when you draw primitive shapes
        context.beginPath();

        // Draw arc at center ballX, ballY with radius ballRadius,
        // From 0 to 2xPI radians (full circle)
        context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, true);

        // Fill up the path that you just drew
        context.fill();
    }

    drawBall();
    
    //繪製記分板
            
    function displayScoreBoard() {
        //Set the text font and color
        context.fillStyle = 'rgb(50,100,50)';
        context.font = "20px Times New Roman";

        //Clear the bottom 30 pixels of the canvas
        context.clearRect(0, canvas.height - 30, canvas.width, 30);
        // Write Text 5 pixels from the bottom of the canvas
        context.fillText('Score1: ' + score1, 10, canvas.height - 5);

        //Clear the bottom 30 pixels of the canvas
        context.clearRect(0, 0, canvas.width, 30);
        // Write Text 5 pixels from the bottom of the canvas
        context.fillText('Score2: ' + score2, 10, 15);
    }
    
    displayScoreBoard();
    
    var ballDeltaX;//球移動的X變量
    var ballDeltaY;//球移動的Y變量

    function moveBall() {
        // First check if we will bump into something 若球有碰到東西，球會反彈

        // If top of the ball touches the top then reverse Y direction
        //若球碰到最上方，改變球Y的位置
        if (ballY + ballDeltaY - ballRadius <= 0) {
            ballDeltaY = -ballDeltaY;
        }
        //若球碰到最下方，改變球Y的位置
        if (ballY + ballDeltaY + ballRadius >= canvas.height) {
            ballDeltaY = -ballDeltaY;
        }

        // If the bottom of the ball touches the bottom of the screen then end the game
        //球碰到最下方，遊戲結束
        // if (ballY + ballDeltaY + ballRadius > canvas.height) {
        //     endGame();
        // } //球碰到最上方，遊戲結束
        // if (ballY + ballDeltaY - ballRadius < 0) {
        //     endGame();
        // }

        // If side of ball touches either side of the wall then reverse X direction
        //接下來，若球碰到左右方的牆壁，改變球的X方向

        //left of ball moves too far left//球碰到最左方的牆壁      
        if ((ballX + ballDeltaX - ballRadius <0) ||
            //or right side of ball moves too far right//或是球碰到最右方牆壁
            (ballX + ballDeltaX + ballRadius > canvas.width)) {
            ballDeltaX = -ballDeltaX;//改變球X方向
        }

        // if bottom of ball reaches the top of paddle,//當球Y座標碰到左方的浮板1
        if ((ballY + ballDeltaY + ballRadius >= paddleLeftY1)) {
            // and it is positioned between the two ends of the paddle (is on top)
            if (ballX + ballDeltaX >= paddleLeftX1 && //當球的X座標在浮板之間(表示有接到球)
                ballX + ballDeltaX <= paddleLeftX1 + paddleWidth) {
                ballDeltaY = - ballDeltaY;//球會反彈回去
                //bouncingSound.play();
            }
        }
        
        // if bottom of ball reaches the top of paddle,//當球X座標碰到左方的浮板1
        if (ballX + ballDeltaX - ballRadius <= paddleLeftX1+paddleWidth) {
            // and it is positioned between the two ends of the paddle (is on top)
            if (ballY + ballDeltaY >= paddleLeftY1 && //當球的Y座標在浮板之間(表示有接到球)
                ballY + ballDeltaY <= paddleLeftY1 + paddleHeight) {
                ballDeltaX = - ballDeltaX;//球會反彈回去
                //bouncingSound.play();
            }
        }

        //if bottom of ball reaches the top of paddle,//當球Y座標碰到上方的浮板2
        if (ballY + ballDeltaY - ballRadius <= paddleRightY2 + paddleHeight) {
            // and it is positioned between the two ends of the paddle (is on top)
            if (ballX + ballDeltaX >= paddleRightX2 && //當球的X座標在浮板之間(表示有接到球)
                ballX + ballDeltaX <= paddleRightX2 + paddleWidth) {
                ballDeltaY = - ballDeltaY;//球會反彈回去
                //bouncingSound.play();
            }
        }
        
        // if bottom of ball reaches the top of paddle,//當球X座標碰到右方的浮板2
        if (ballX + ballDeltaX + ballRadius >= paddleRightX2) {
            // and it is positioned between the two ends of the paddle (is on top)
            if (ballY + ballDeltaY >= paddleRightY2 && //當球的Y座標在浮板之間(表示有接到球)
                ballY + ballDeltaY <= paddleRightY2 + paddleHeight) {
                ballDeltaX = - ballDeltaX;//球會反彈回去
                //bouncingSound.play();
            }
        }

        // Move the ball
        ballX = ballX + ballDeltaX;//球下一次X的位置=現在X位置+X變量
        ballY = ballY + ballDeltaY;//球下一次Y的位置=現在Y位置+Y變量
    }
    

    var paddleDeltaY; //浮板移動的X變量
    var paddleSpeedY = 10; //浮板每次移動的距離
    //浮板1
    function movePaddle1() {
        if (paddleMove1 == 'UP') {
            paddleDeltaY = -paddleSpeedY;
        } else if (paddleMove1 == 'DOWN') {
            paddleDeltaY = paddleSpeedY;
        } else {
            paddleDeltaY = 0;
        }
        // If paddle reaches the ends, then don't let it move
        //如果浮板碰到牆壁，則不能再移動
        if (paddleLeftY1 + paddleDeltaY < 0 || paddleLeftY1 + paddleDeltaY + paddleHeight > canvas.height) {
            paddleDeltaY = 0;
        }
        paddleLeftY1 = paddleLeftY1 + paddleDeltaY;
    }
    //浮板2
    function movePaddle2() {
        if (paddleMove2 == 'UP') {
            paddleDeltaY = -paddleSpeedY;
        } else if (paddleMove2 == 'DOWN') {
            paddleDeltaY = paddleSpeedY;
        } else {
            paddleDeltaY = 0;
        }
        // If paddle reaches the ends, then don't let it move
        if (paddleRightY2 + paddleDeltaY < 0 || paddleRightY2 + paddleDeltaY + paddleHeight > canvas.height) {
            paddleDeltaY = 0;
        }
        paddleRightY2 = paddleRightY2 + paddleDeltaY;
    }

    
    //產生動畫
    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);//清空畫面
        displayScoreBoard();//繪製記分板
        moveBall();//球體移動
        movePaddle1();//浮板1移動
        movePaddle2()//浮板2移動
        drawPaddle(); //畫出移動位置後的浮板
        drawBall();//畫出移動位置後的球體
        requestAnimationFrame(animate);
    }
    
    var gameLoop; 
    var paddleMove1;//浮板1移動的狀態(左移右移不動)
    var paddleMove2;//浮板2移動的狀態(左移右移不動)
    //遊戲開始
    function startGame() {
        //球體開始移動
        ballDeltaY = -5;
        ballDeltaX = -3;
        
        // //浮板一開始不動
        // paddleMove = 'NONE';
        // paddleDeltaY = 0;
        requestAnimationFrame(animate);
        
        // Start Tracking Keystokes
        //當鍵盤按下，控制浮板1移動
        $(document).keydown(function (evt) {
            if (evt.keyCode == 38) {
                paddleMove1 = 'UP';
            } else if (evt.keyCode == 40) {
                paddleMove1 = 'DOWN';
            }
        });
        $(document).keyup(function (evt) {
            if (evt.keyCode == 38) {
                paddleMove1 = 'NONE';
            } else if (evt.keyCode == 40) {
                paddleMove1 = 'NONE';
            }
        });

        //當鍵盤按下，控制浮板2移動
        $(document).keydown(function (evt) {
            if (evt.keyCode == 81) {
                paddleMove2 = 'UP';
            } else if (evt.keyCode == 65) {
                paddleMove2 = 'DOWN';
            }
        });
        $(document).keyup(function (evt) {
            if (evt.keyCode == 81) {
                paddleMove2 = 'NONE';
            } else if (evt.keyCode == 65) {
                paddleMove2 = 'NONE';
            }
        });
    }
    
    startGame();


})