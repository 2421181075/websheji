/*
* @Author: admin
* @Date:   2019-09-17 19:24:27
* @Last Modified by:   admin
* @Last Modified time: 2019-09-23 20:52:14
*/

$(function(){
	$('#divs>div').click(function(event) {
		$(this).addClass('tabcurrent');
		$(this).siblings('div').removeClass('tabcurrent');
	});
})


var searchConts=document.getElementById('searchConts').children;
var divs=document.getElementById('divs').children;

for(var i=0;i<searchConts.length;i++){

    divs[i].setAttribute('index',i);
    divs[i].onclick=function(){
        var a=this.getAttribute('index');
        for(var j=0;j<searchConts.length;j++){
            searchConts[j].style.display = 'none';  
            searchConts[a].style.display = 'block';              
        }
        
    }
}


$(function(){
	$('#about7').click(function(event) {
		$('#hdiv7').slideToggle('slow');
	});
	$('#about8').click(function(event) {
		$('#hdiv8').slideToggle('slow');
	});
	$('#about9').click(function(event) {
		$('#hdiv9').slideToggle('slow');
	});
})



var section=document.getElementById('a03').children;
var divs=document.getElementById('a04').children;

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


var section2=document.getElementById('a05').children;
var divs2=document.getElementById('a06').children;

for(var i=0;i<section2.length;i++){

    section2[i].setAttribute('index',i);
    section2[i].onclick=function(){
        var a=this.getAttribute('index');
        for(var j=0;j<section2.length;j++){
            section2[j].removeAttribute('class','active');
            section2[a].setAttribute('class','active');
            
            divs2[j].style.display = 'none';  
            divs2[a].style.display = 'block';              
        }
        
    }
}


var section3=document.getElementById('a07').children;
var divs3=document.getElementById('a08').children;

for(var i=0;i<section3.length;i++){

    section3[i].setAttribute('index',i);
    section3[i].onclick=function(){
        var a=this.getAttribute('index');
        for(var j=0;j<section3.length;j++){
            section3[j].removeAttribute('class','active');
            section3[a].setAttribute('class','active');
            
            divs3[j].style.display = 'none';  
            divs3[a].style.display = 'block';              
        }
        
    }
}

var section4=document.getElementById('a09').children;
var divs4=document.getElementById('a10').children;

for(var i=0;i<section4.length;i++){

    section4[i].setAttribute('index',i);
    section4[i].onclick=function(){
        var a=this.getAttribute('index');
        for(var j=0;j<section4.length;j++){
            section4[j].removeAttribute('class','active');
            section4[a].setAttribute('class','active');
            
            divs4[j].style.display = 'none';  
            divs4[a].style.display = 'block';              
        }
        
    }
}

var section5=document.getElementById('a11').children;
var divs5=document.getElementById('a12').children;

for(var i=0;i<section5.length;i++){

    section5[i].setAttribute('index',i);
    section5[i].onclick=function(){
        var a=this.getAttribute('index');
        for(var j=0;j<section5.length;j++){
            section5[j].removeAttribute('class','active');
            section5[a].setAttribute('class','active');
            
            divs5[j].style.display = 'none';  
            divs5[a].style.display = 'block';              
        }
        
    }
}