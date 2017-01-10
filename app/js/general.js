$(function () {
var forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};

var hamburgers = document.querySelectorAll(".hamburger");
	if (hamburgers.length > 0) {
		forEach(hamburgers, function(hamburger) {
			hamburger.addEventListener("click", function() {
			this.classList.toggle("is-active");
		}, false);
	});
}


    //array of colors to demonstrate the background filling effect
    var colors = ["#d35400","#c0392b","#2980b9","#f39c12","#34495e","#3498db"];

    //select random color from the color array
    var items = Math.floor(Math.random() * colors.length);
    var color = colors.splice(items, 1);

    //set a random color on document load
    $(".green input[type='checkbox']:checked + label span").css({"background-color":color});
    $(".green input[type='radio']:checked + label span").css({"background-color":color});

    //on click switch between background colors
    $(".green .checkbox").on("click", function(){
        if($(".green input[type='checkbox']").is(":checked")){
            $(".green input[type='checkbox']:checked + label span").css({"background-color":"#ecf0f1"});
        }else{
            $(".green input[type='checkbox'] + label span").css({"background-color":color});
        }
    });

});
