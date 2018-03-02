var canvas = document.getElementById("map");
var ctx = canvas.getContext("2d");

var mas = [];
var count = 0;
var timer;

canvas.onclick = function(event) 
{
    var x = event.offsetX;
    var y = event.offsetY;
    
    console.log(x);
    console.log(y);
    
    x = Math.floor(x/10); //500/10 = 50
    y = Math.floor(y/10); //500/10 = 50
    
    mas[y][x] = 1;
    console.log(mas);
    
    drawField();
}
    
function goLine() 
{
    var n=50, m=50;
        for (var i=0; i<m; i++){
            mas[i]=[];
                for (var j=0; j<n; j++){
                    mas[i][j]=0;
                }
        }
}

goLine();

function drawField(){
    ctx.clearRect(0, 0, 500, 500);
    
    for (var i=0; i<50; i++){
        for (var j=0; j<50; j++){
            if(mas[i][j]==1)
            {
                ctx.fillRect(j*10, i*10, 10, 10);
            }
        }
    }
}

function startLife(){
    //моделирование жизни
    var mas2 = [];
    for (var i=0; i<50; i++){
            mas2[i]=[];
                for (var j=0; j<50; j++){
                    var pixel = 0;
                    if(mas[fpm(i)-1][j]==1) {pixel++;}//up
                    if(mas[i][fpp(j)+1]==1) {pixel++;}//right
                    if(mas[fpp(i)+1][j]==1) {pixel++;}//bottom
                    if(mas[i][fpm(j)-1]==1) {pixel++;}//left
                    if(mas[fpm(i)-1][fpp(j)+1]==1) {pixel++;}
                    if(mas[fpp(i)+1][fpp(j)+1]==1) {pixel++;}
                    if(mas[fpp(i)+1][fpm(j)-1]==1) {pixel++;}
                    if(mas[fpm(i)-1][fpm(j)-1]==1) {pixel++;}
                    
                    if(pixel==2 || pixel==3) {mas2[i][j]=1;}
                    else {mas2[i][j]=0;}
                }
        }
    
    mas = mas2;
    drawField();
    
    count++;
    document.getElementById("count").innerHTML = count;
    
    timer = setTimeout(startLife, 200);
}

function fpm(i){
    if(i==0) {return 50;}
    else {return i;}
}

function fpp(i){
    if(i==49) {return -1;}
    else {return i;}
}

document.getElementById("start").onclick = startLife;