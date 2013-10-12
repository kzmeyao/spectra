function gradientWall($elem, colors, freq) {
    
    var animateBackward = function(){
        $elem.animate({'background-position-y': '0%'}, freq, 'linear', function(){animateForward()});
    }
    var animateForward = function(){
        $elem.animate({'background-position-y': "100%"}, freq, 'linear', function(){animateBackward();});
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

$('.edit-button').on('click', function(){
	if ($(this).hasClass('on')) {
		$('.panel').animate({ 'margin-left' : '-10em' });
		$(this).text('edit');
		$(this).removeClass('on');
	} else {
		$('.panel').animate({ 'margin-left' : '0em' }); 
		$(this).addClass('on');
		$(this).text('done');
	}		
}); 