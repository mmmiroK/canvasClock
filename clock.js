/**
 * Created by miroK on 2016/11/21.
 */
var dom=document.getElementById('canvas');
var plate=dom.getContext('2d');
var width=dom.width;
var height=dom.height;
var r=width/2;
function drawBackground(){
    plate.save();
    plate.translate(r,r);
    plate.beginPath();
    plate.lineWidth=10;
    plate.arc(0,0,r-5,0,2*Math.PI,false);
    plate.stroke();

    var hourNumber=[3,4,5,6,7,8,9,10,11,12,1,2];
    plate.font='18px arial';
    plate.textAlign='center';
    plate.textBaseline='middle';
    hourNumber.forEach(function(number,i){
        var rad=2*Math.PI/12*i;
        var x=Math.cos(rad)*(r-30);
        var y=Math.sin(rad)*(r-30);
        plate.fillText(number,x,y);
    });
    for(i=0;i<60;i++){
        var rad_=Math.PI*2/60*i;
        var x_=Math.cos(rad_)*(r-15);
        var y_=Math.sin(rad_)*(r-15);
        plate.beginPath();
        if(i%5==0){
            plate.fillStyle='#000';
        }else{
            plate.fillStyle='#ddd';
        }
        plate.arc(x_,y_,3,0,2*Math.PI,false);
        plate.fill();
    }
}
function drawHour(h,m){
    plate.save();
    var rad=2*Math.PI/12*h+m/60*2*Math.PI/12;
    plate.rotate(rad);
    plate.beginPath();
    plate.lineWidth=6;
    plate.lineCap='round';
    plate.moveTo(0,10);//是真的尾巴
    plate.lineTo(0,-r/2);
    plate.stroke();
    plate.restore();
}
function drawMinute(m,s){
    plate.save();
    var rad=2*Math.PI/60*m+s/60*2*Math.PI/60;
    plate.rotate(rad);
    plate.beginPath();
    plate.lineWidth=4;
    plate.lineCap='round';
    plate.moveTo(0,10);//是真的尾巴
    plate.lineTo(0,-(r/2+10));
    plate.stroke();
    plate.restore();
}
function drawSecond(s){
    plate.save();
    var rad=2*Math.PI/60*s;
    plate.rotate(rad);
    plate.beginPath();
    plate.moveTo(-2,20);//是真的尾巴
    plate.lineTo(2,20);
    plate.lineTo(1,-(r/2+20));
    plate.lineTo(-1,-(r/2+20));
    plate.fill();
    plate.restore();
}
function drawDot(){
    plate.beginPath();
    plate.arc(0,0,5,0,2*Math.PI,false);
    plate.fillStyle='#000';
    plate.fill();
}
function draw(){
    plate.clearRect(0,0,width,height);
    var date=new Date();
    drawBackground();
    drawDot();
    drawHour(date.getHours(),date.getMinutes());
    drawMinute(date.getMinutes(),date.getSeconds());
    drawSecond(date.getSeconds());
    plate.restore();
}
setInterval(draw,1000);