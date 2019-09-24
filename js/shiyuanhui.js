/*
* @Author: admin
* @Date:   2019-09-23 15:27:18
* @Last Modified by:   admin
* @Last Modified time: 2019-09-23 17:33:44
*/
window.onload=function(){
	var num=0;
	var timer;
	function cc(){
		timer=setInterval(function(){						
			start1.style.marginLeft=num*(-1000)+'px';					
			
			for(var j=0;j<cl.children.length;j++){
				cl.children[j].setAttribute('class','cc');
			}
			cl.children[num].setAttribute('class','current');
			/*console.log(cl.children[num]);*/
			num++;
			if(num>1){
				num=0;
			}
		},2000);
	}
	cc();
	con04.onmouseenter=function(){
			clearInterval(timer);
		}
	con04.onmouseleave=function(){
		cc();
	}	

	lef.onclick=function(){
		num--;
		if(num<0){
			num=1;
		}
		start1.style.marginLeft=num*(-1000)+'px';
		for(var j=0;j<cl.children.length;j++){
			cl.children[j].className='';
		}
		cl.children[num].className='current';			
	}

	rig.onclick=function(){
		num++;
		if(num>1){
			num=0;
		}	
		start1.style.marginLeft=num*(-1000)+'px';
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
			/*console.log(num);*/
			start1.style.marginLeft=num*(-1000)+'px';
		}
		
	}

	// 轮播2
	var num2=0;
	var timer2;
	function dd(){
		timer2=setInterval(function(){						
			start2.style.marginLeft=num2*(-942)+'px';					
			
			for(var j=0;j<cl2.children.length;j++){
				cl2.children[j].setAttribute('class','dd');
			}
			cl2.children[num2].setAttribute('class','current2');
			/*console.log(cl.children[num2]);*/
			num2++;
			if(num2>1){
				num2=0;
			}
		},2000);
	}
	dd();
	con06.onmouseenter=function(){
			clearInterval(timer2);
		}
	con06.onmouseleave=function(){
		dd();
	}	

	lef2.onclick=function(){
		num2--;
		if(num2<0){
			num2=1;
		}
		start2.style.marginLeft=num2*(-942)+'px';
		for(var j=0;j<cl2.children.length;j++){
			cl2.children[j].className='';
		}
		cl2.children[num2].className='current2';			
	}

	rig2.onclick=function(){
		num2++;
		if(num2>1){
			num2=0;
		}	
		start2.style.marginLeft=num2*(-942)+'px';
		for(var j=0;j<cl2.children.length;j++){
			cl2.children[j].className='';
		}
		cl2.children[num2].className='current2';					
	}


	// console.log(cl.children.length);
	for(var i=0;i<cl.children.length;i++){
		cl2.children[i].setAttribute('index',i);

		cl2.children[i].onclick=function(){
			// console.log(i);
			for(var j=0;j<cl.children.length;j++){
				cl2.children[j].className='';
			}
			this.className='current2';
			num2=this.getAttribute('index');
			/*console.log(num2);*/
			start2.style.marginLeft=num2*(-942)+'px';
		}
		
	}
}

$(function(){
	var wrapper00=$('.wrapper00').offset().top-$(window).height();
	console.log($('.wrapper00').offset());
    var wrapper01=$('.wrapper01').offset().top-$(window).height();
    var wrapper02=$('.wrapper02').offset().top-$(window).height();
    var wrapper03=$('.wrapper03').offset().top-$(window).height();
    var wrapper04=$('.wrapper04').offset().top-$(window).height();
    var wrapper05=$('.wrapper05').offset().top-$(window).height();
    var wrapper06=$('.wrapper06').offset().top-$(window).height();
    $(window).scroll(function(event) {
        if($(window).scrollTop()>200){
            // $('.box').css('display', 'block');
            $('.side-nav').fadeIn();
        }else{
            // $('.box').css('display', 'none');
            $('.side-nav').fadeOut();
        }
        if($(this).scrollTop()>wrapper06){
            $('.side-nav li span').eq(6).css('background', 'lime');
            $('.side-nav li span').eq(6).parent().siblings('li').children('span').css('background', '#000');
        }else if($(this).scrollTop()>wrapper05){
            $('.side-nav li span').eq(5).css('background', 'lime');
            $('.side-nav li span').eq(5).parent().siblings('li').children('span').css('background', '#000');
        }else if($(this).scrollTop()>wrapper04){
            $('.side-nav li span').eq(4).css('background', 'lime');
             $('.side-nav li span').eq(4).parent().siblings('li').children('span').css('background', '#000');
        }else if($(this).scrollTop()>wrapper03){
            $('.side-nav li span').eq(3).css('background', 'lime');
             $('.side-nav li span').eq(3).parent().siblings('li').children('span').css('background', '#000');
        }else if($(this).scrollTop()>wrapper02){
            $('.side-nav li span').eq(2).css('background', 'lime');
            $('.side-nav li span').eq(2).parent().siblings('li').children('span').css('background', '#000');
        }else if($(this).scrollTop()>wrapper01){
            $('.side-nav li span').eq(1).css('background', 'lime');
            $('.side-nav li span').eq(1).parent().siblings('li').children('span').css('background', '#000');
        }else if($(this).scrollTop()>wrapper00){
            $('.side-nav li span').eq(0).css('background', 'lime');
            $('.side-nav li span').eq(0).parent().siblings('li').children('span').css('background', '#000');
        }
    });
})