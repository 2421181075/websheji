/*
* @Author: admin
* @Date:   2019-09-23 09:23:40
* @Last Modified by:   admin
* @Last Modified time: 2019-09-24 14:46:07
*/
window.onload=function(){

var num=0;
var timer;
function aa(){
	timer=setInterval(function(){						
		start1.style.marginLeft=num*(-1980)+'px';					
		
		for(var j=0;j<cl.children.length;j++){
			cl.children[j].setAttribute('class','aa');
		}
		cl.children[num].setAttribute('class','current');
		console.log(cl.children[num]);
		num++;
		if(num>2){
			num=0;
		}
	},2000);
}
aa();
swiper.onmouseenter=function(){
		clearInterval(timer);
	}
swiper.onmouseleave=function(){
	aa();
}	

lef.onclick=function(){
	num--;
	if(num<0){
		num=2;
	}
	start1.style.marginLeft=num*(-1980)+'px';
	for(var j=0;j<cl.children.length;j++){
		cl.children[j].className='';
	}
	cl.children[num].className='current';			
}

rig.onclick=function(){
	num++;
	if(num>2){
		num=0;
	}	
	start1.style.marginLeft=num*(-1980)+'px';
	for(var j=0;j<cl.children.length;j++){
		cl.children[j].className='';
	}
	cl.children[num].className='current';					
}


// console.log(cl.children.length);
for(var i=0;i<cl.children.length;i++){
	cl.children[i].setAttribute('index',i);

	cl.children[i].onclick=function(){
		// console.log(i);
		for(var j=0;j<cl.children.length;j++){
			cl.children[j].className='';
		}
		this.className='current';
		num=this.getAttribute('index');
		console.log(num);
		start1.style.marginLeft=num*(-1980)+'px';
	}
	
}
// 2
var num1=0;
var timer1;
function bb(){
	timer1=setInterval(function(){						
		start2.style.marginLeft=num1*(-340)+'px';					
		
		for(var j=0;j<cl1.children.length;j++){
			cl1.children[j].setAttribute('class','bb');
		}
		cl1.children[num1].setAttribute('class','current1');
		console.log(cl1.children[num1]);
		num1++;
		if(num1>2){
			num1=0;
		}
	},2000);
}
bb();
slider1.onmouseenter=function(){
		clearInterval(timer1);
	}
slider1.onmouseleave=function(){
	bb();
}
// console.log(cl.children.length);
for(var i=0;i<cl1.children.length;i++){
	cl1.children[i].setAttribute('index',i);

	cl1.children[i].onclick=function(){
		for(var j=0;j<cl1.children.length;j++){
			cl1.children[j].className='';
		}
		this.className='current';
		num1=this.getAttribute('index');
		console.log(num1);
		start2.style.marginLeft=num1*(-340)+'px';
	}
	
}

}

