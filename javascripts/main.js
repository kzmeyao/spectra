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

$('#freq-input').val(defaultFreq/1000);

function populateColors(colors) {
	$.each(colors, function() {
		$('.colors').append(
			'<div class="color-block active"' +
			'style="background-color: ' + this + '">' + 
			'<input class="colors-input" type="text" value="' + this + '" /></div>');	
	});
	
	$('.colors').append(
			'<div class="color-block inactive">' +
			'<input class="colors-input" type="text" value="add" /></div>');
			
	$('.color-block').each(function(){
		$spec = $('.colors-input', this);
		$spec.spectrum({
			showInput: true,
			hide: function(color) {
                $(this).parent().css('background-color', color);
            }
		});
		$spec.show();
	});
}

populateColors(defaultColors);

function refreshSettings(){
	var freq = parseFloat($('#freq-input').val()) * 1000;
	var colors = [];
	$('.active').each(function(){
		colors.push($('input', this).val());
	});
	$('#your-container').stop();
	gradientWall($('#your-container'), colors, freq);
}

$('.edit-button').on('click', function(){
	if ($(this).hasClass('on')) {
		$('.panel').animate({ 'margin-left' : '-12em' });
		refreshSettings();
		$(this).text('edit');
		$(this).removeClass('on');
	} else {
		$('.panel').animate({ 'margin-left' : '0em' }); 
		$(this).addClass('on');
		$(this).text('done');
	}		
}); 