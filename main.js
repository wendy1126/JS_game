// canvas 사용하기 위한 최소한의 기본 코드 시작
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
// canvas 사용하기 위한 최소한의 기본 코드 끝


// 등장 캐릭터의 속성부터 object 자료에 저장해두면 편리
var dino = { 
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green'; // 초록색 네모를 그려주세요
        ctx.fillRect(this.x, this.y, this.width, this.height); // 왼쪽 위에서부터 this.x,this.y 좌표에 this.width, this.height 사이즈의 네모
    }
}
// dino.draw();

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
        ctx.fillRect(this.x, this.y, this.width, this.height); 
    }
}
// var cactus = new Cactus();
// cactus.draw();


var timer = 0;
// 장애물 만들때마다 array에 담아서 보관하기(장애물 여러개 관리하기)
var cactus여러개 = [];

function 프레임마다실행할거(){ // 1초에 60번 코드 실행하기
    requestAnimationFrame(프레임마다실행할거);
    timer++;

    ctx.clearRect(0,0, canvas.width, canvas.height)

    if(timer % 120 ===0){
        var cactus = new Cactus();
        cactus여러개.push(cactus);
    }
    cactus여러개.forEach((a)=>{
        a.x--;
        cactus.draw();
    })
    // dino.x++; // 테스트
    dino.draw();
}
프레임마다실행할거();

// 120 프레임마다 장애물 생성 하고, array에 집어 넣음
// array에 있던거 다 draw() 해줌