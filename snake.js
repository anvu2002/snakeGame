class Snake{
    constructor(x,y,size){
        this.x = x
        this.y = y
        this.size = size // độ mập béo, width and height
        //Snake starts out with 1 square ONLY
        //this.tail = [{đốt 1},{đốt 2},{đốt 3}, ...]
        this.tail = [{x:this.x, y:this.y}];
        this.rotateX = 1
    }

    move(){
        var newRect;
        if(this.rotateX == 1){
            //dictionary newRect{}
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length -1 ].y
            }
        } else if(this.rotateX == -1){ //leftARrow
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            }
        }else if(this.rotateY == 1){
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            }
        }else if(this.rotateY == -1){
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size
            }
        }

        //chặt đầu và thêm đuôi để move 😁
        this.tail.shift()
        
        //add to the end of the Snake's tail[] array
        this.tail.push(newRect)
    }
}

class Apple{
    constructor(){
        var isTouching;
        //set up Apple(x,y) and check the snake has touched the Apple
        while (true) {
            this.color = "pink";
            this.size = snake.size; // a pink square same size as that of snake

            isTouching = false;
            //setting up random (x,y) positions of the apple
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size;
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size;    

            //Check if the snake has touched the Apple
            //The loop is for going through toàn bộ đốt 😁 của con rắn
            for(var i = 0; i < snake.tail.length; i++){
                if (snake.tail[i].x == this.x && snake.tail[i].y == this.y) {
                    isTouching = true;
                    console.log("touched!");
                }
            }
            if(!isTouching){
                break;
            } 
        }
    }
}

//Graphic holder
var canvas = document.getElementById("canvas")

var snake = new Snake(20,20,20);

var apple = new Apple();

var canvasContext = canvas.getContext('2d'); // 2d graphics for game in the <canvas> graphic container

window.onload = ()=>{
    gameLoop();
}

function gameLoop(){
    setInterval(show, 1000/15) //15 is fps value
}

function update(){
    canvasContext.clearRect(0,0, canvas.width, canvas.height)
    snake.move();
    console.log("update");
    eatApple()
}

function checkHitWall(){
    //đầu con rắn {x:val, y:val}
    
}

function eatApple(){
    if(snake.tail[snake.tail.length - 1].x == apple.x && 
         snake.tail[snake.tail.length - 1].y == apple.y){
            //gán vào đốt cuối tail[]
            snake.tail[snake.tail.length] = {x:apple.x, y:apple.y}
            //tạo thêm táo mới chỗ khác
            apple = new Apple();
            
    }
}
//tạo 1 hình chữ nhật
function createRect(x,y,width,height,color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x,y,width,height);
}

function draw() {
    //a full black BackGround
    createRect(0,0,canvas.width, canvas.height, "black");
    createRect(0,0,canvas.width, canvas.height);

    //draw snake
    //vẽ n đốt hình vuông đến khi chạm hết this.tail[{đốt 1}, {đốt 2}, ...]
    for(var i = 0 ; i < snake.tail.length; i++){
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5,
             snake.size - 5, snake.size - 5, "white")
    }
    //ScoreText
    //NOTE: SHOULD USE HTML ELEMENTS và intergated cái template học từ Udemy
    canvasContext.font = "bold 20px serif"
    canvasContext.fillStyle = "green"
    canvasContext.fillText("Score: ", (snake.tail.length + 1),
     canvas.width - 120, 18);
    
    //draw Apple
    createRect(apple.x, apple.y, apple.size, apple.size, apple.color);
}

//Detecting Key
// Event Handler
//keyCode == 37 leftArrow <--
//         == 38 Up, 39 Right, 40 Down
window.addEventListener("keydown", (event) =>{
    setTimeout(()=>{
        if(event.keyCode == 37 && snake.rotateX != 1){
            console.log("leftArrow");
            snake.rotateX = -1;
            snake.rotateY = 0;
        } else if(event.keyCode == 38 && snake.rotateY != 1){
            snake.rotateX = 0;
            snake.rotateY = -1 ;
        } else if(event.keyCode == 39 && snake.rotateX != -1){
            snake.rotateX = 1;
            snake.rotateY = 0;
        } else if(event.keyCode == 40 && snake.rotateY != -1){
            snake.rotateX = 0;
            snake.rotateY = 1;
        }
    }, 1)
})



//LET'S START THE GAME!
function show(){
    update();
    draw();    
}