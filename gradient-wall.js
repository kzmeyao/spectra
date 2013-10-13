function gradientWall($elem, colors, freq) {
    
   var animateBackward = function(){
        $elem.animate({
            'border-spacing': 0
        },
        {
             step: function(now, fx) {
                $(fx.elem).css("background-position", "0% " + now + "%");
             },
             complete: function() {
             	animateForward();
             },
             duration: freq
        });
    }
    var animateForward = function(){
        $elem.animate({
            'border-spacing': 100
        },
        {
             step: function(now, fx) {
                $(fx.elem).css("background-position", "0% " + now + "%");
             },
             complete: function() {
             	animateBackward();
             },
             duration: freq
        });
    }
    
    gradText = "linear-gradient(" + colors.toString() + ")";
    $.each(['', '-o-', '-moz-', '-webkit-', '-ms-'], function() {
        $elem.css({ 'background': this + gradText });
    });
    $elem.css({'background-size' : '1% ' + colors.length * 100 + '%'});
    animateForward();
}

var defaultColors = ['#87FC70', '#55EFCB', '#5BCAFF', '#1AD6FD'];           
var defaultFreq = 5000;
   
gradientWall($('#your-container'), defaultColors, defaultFreq);
