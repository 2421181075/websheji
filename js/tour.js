/*
* @Author: admin
* @Date:   2019-09-22 23:17:57
* @Last Modified by:   admin
* @Last Modified time: 2019-09-23 14:33:18
*/
var section=document.getElementById('a02').children;
var divs=document.getElementById('a01').children;

for(var i=0;i<section.length;i++){

    section[i].setAttribute('index',i);
    section[i].onclick=function(){
        var a=this.getAttribute('index');
        for(var j=0;j<section.length;j++){
            section[j].removeAttribute('class','active');
            section[a].setAttribute('class','active');
            
            divs[j].style.display = 'none';  
            divs[a].style.display = 'block';              
        }
        
    }
}


var secs=document.getElementById('a03').children;

for(var i=0;i<secs.length;i++){

    secs[i].setAttribute('index',i);
    secs[i].onclick=function(){
        var a=this.getAttribute('index');
        for(var j=0;j<secs.length;j++){
            secs[j].removeAttribute('class','active');
            secs[a].setAttribute('class','active');            
        }  
    }
}


$(function(){
    var one1=$('.one1').offset().top-$(window).height();
    var one2=$('.one2').offset().top-$(window).height();
    var one3=$('.one3').offset().top-$(window).height();
    var one4=$('.one4').offset().top-$(window).height();
    var one5=$('.one5').offset().top-$(window).height();
    var one6=$('.one6').offset().top-$(window).height();
    var one7=$('.one7').offset().top-$(window).height();
    var one8=$('.one8').offset().top-$(window).height();
    var one9=$('.one9').offset().top-$(window).height();
    var one10=$('.one10').offset().top-$(window).height();
    var one11=$('.one11').offset().top-$(window).height();
    var one12=$('.one12').offset().top-$(window).height();
    $(window).scroll(function(event) {

        if($(this).scrollTop()>one12){
            secs[10].removeAttribute('class','active');
            secs[11].setAttribute('class','active');  
        }else if($(this).scrollTop()>one11){
            secs[9].removeAttribute('class','active');
            secs[10].setAttribute('class','active');  
        }else if($(this).scrollTop()>one10){
            secs[8].removeAttribute('class','active');
            secs[9].setAttribute('class','active');  
        }else if($(this).scrollTop()>one9){
            secs[7].removeAttribute('class','active');
            secs[8].setAttribute('class','active');  
        }else if($(this).scrollTop()>one8){
            secs[6].removeAttribute('class','active');
            secs[7].setAttribute('class','active');  
        }else if($(this).scrollTop()>one7){
            secs[5].removeAttribute('class','active');
            secs[6].setAttribute('class','active');  
        }else if($(this).scrollTop()>one6){
            secs[4].removeAttribute('class','active');
            secs[5].setAttribute('class','active');  
        }else if($(this).scrollTop()>one5){
            secs[3].removeAttribute('class','active');
            secs[4].setAttribute('class','active');  
        }else if($(this).scrollTop()>one4){
            secs[2].removeAttribute('class','active');
            secs[3].setAttribute('class','active');  
        }else if($(this).scrollTop()>one3){
            secs[1].removeAttribute('class','active');
            secs[2].setAttribute('class','active');  
        }else if($(this).scrollTop()>one2){
            secs[0].removeAttribute('class','active');
            secs[1].setAttribute('class','active'); 
             
        }else if($(this).scrollTop()>one1){
            secs[0].setAttribute('class','active');  
        }
    });
})