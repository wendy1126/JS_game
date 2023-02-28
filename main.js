// canvas 사용하기 위한 최소한의 기본 코드 시작
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
// canvas 사용하기 위한 최소한의 기본 코드 끝

var img2 = new Image();
img2.src = 'dinosaur.png';

// 등장 캐릭터의 속성부터 object 자료에 저장해두면 편리
var dino = { 
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green'; // 초록색 네모를 그려주세요
        // ctx.fillRect(this.x, this.y, this.width, this.height); // 왼쪽 위에서부터 this.x,this.y 좌표에 this.width, this.height 사이즈의 네모
        ctx.drawImage(img1, this.x, this.y);
    }
}

var img1 = new Image();
img1.src = 'cactus.png';


// 장애물 : width, height 이런게 각각 다를 수도 -> 비슷한 object 많이 필요할듯 -> class로 만듦
class Cactus {
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red'; 
        // ctx.fillRect(this.x, this.y, this.width, this.height); 네모는 일명 hitbox(충돌여부확인)
        ctx.drawImage(img1, this.x, this.y);
    }
}
// var cactus = new Cactus();
// cactus.draw();


var timer = 0;
// 장애물 만들때마다 array에 담아서 보관하기(장애물 여러개 관리하기)
var cactus여러개 = [];
var 점프timer = 0;
var animation;

function 프레임마다실행할거(){ // 1초에 60번 코드 실행하기
    animation = requestAnimationFrame(프레임마다실행할거);
    timer++;

    ctx.clearRect(0,0, canvas.width, canvas.height)

    if(timer % 200 ===0){
        var cactus = new Cactus();
        cactus여러개.push(cactus);
    }

    cactus여러개.forEach((a, i, o)=>{
        //x좌표가 0미만이면 array에서 제거
        if(a.x<0){
            o.splice(i,1)
        }
        a.x--; // 움직이는지 테스트
        충돌하냐(dino, a); // 주인공과 모든 장애물 충돌체크 해야함

        cactus.draw();
    })

    if(점프중 == true){
        dino.y-=2.5;
        점프timer++;
    }

    if(점프중 == false){
        if(dino.y < 200){
        dino.y++;
        }
    }

    if(점프timer>100){
        점프중 = false;
        점프timer = 0;
    }
    dino.draw();
}

프레임마다실행할거();

// 충돌확인 
function 충돌하냐(dino, cactus){
    var x축차이 = cactus.x - (dino.x+dino.width);
    var y축차이 = cactus.y - (dino.y+dino.height);
    if(x축차이 < 0 && y축차이 < 0){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        cancelAnimationFrame(animation) // 게임중단
    } 
}

// 120 프레임마다 장애물 생성 하고, array에 집어 넣음
// array에 있던거 다 draw() 해줌
var 점프중 = false;
document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        점프중 = true;
    }
})