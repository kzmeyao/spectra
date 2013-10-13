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

$('#freq-input').val(defaultFreq/1000);

function attachDelete() {
	var $lastColor = $('.colors').last();
	$lastColor.find('.delete-color').on('click', function(){
		$(this).parent().remove();
	});
}

function addInactiveColor() {
	$('.colors').append(
			'<li class="color-block inactive">' +
			'<a class="delete-color">x</a>' +
			'<input class="colors-input" type="text" value="add" /></li>');
	$spec = $('.colors-input', $('.color-block.inactive'));
	attachSpectrum($spec);
	attachDelete();
}

function attachSpectrum($spec) {
	$spec.spectrum({
			showInput: true,
			hide: function(color) {
				if($(this).val() == 'add') {
					return;
				}
				$parent = $(this).parent();
                $parent.css('background-color', color);
                if($parent.hasClass('inactive')) {
                	$parent.removeClass('inactive');
                	$parent.addClass('active');
                	addInactiveColor();	
                }
            }
		});
	$spec.show();
}

function populateColors(colors) {
	$('.colors').empty();
	$.each(colors, function() {
		$('.colors').append(
			'<li class="color-block active"' +
			'style="background-color: ' + this + '">' + 
			'<a class="delete-color">x</a>' +
			'<input class="colors-input" type="text" value="' + this + '" /></li>');
		attachDelete();	
	});
	
	addInactiveColor();			
	
	$('.color-block.active').each(function(){
		$spec = $('.colors-input', this);
		attachSpectrum($spec);
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
		$('.panel').animate({ 'margin-left' : '-10em' });
		refreshSettings();
		$(this).text('edit');
		$(this).removeClass('on');
	} else {
		$('.panel').animate({ 'margin-left' : '0em' }); 
		$(this).addClass('on');
		$(this).text('done');
	}		
}); 

var presets = {
	"presets" : [
		{"name" : "default", "colors": ['#87FC70', '#55EFCB', '#5BCAFF', '#1AD6FD'] },
		{"name" : "ocean", "colors": ['#1AD6FD', '#1D62F0'] },
		{"name" : "cosmos", "colors": ['#EF4DB6', '#C643FC'] },
		{"name" : "rising", "colors": ['#FFDB4C', '#FF9500', '#FF5E3A', '#FF5E3A', '#FF2A68'] },
		{"name" : "galaxy", "colors": ['#20374A', '#44718D', '#B3CCD3'] },
		{"name" : "cave", "colors": ['#F24332', '#B93B3B', '#401A1A', '#080404'] },
		{"name" : "halcyon", "colors": ['#00D7FF', '#36ACF4', '#EC94E6', '#FFBAFA'] },
		{"name" : "jolly", "colors": ['#F458C0', '#EAE630', '#1FEC4D', '#1DE4E8'] },
		{"name" : "trench", "colors": ['#37A6DB', '#167B90', '#032222'] },
		{"name" : "golden", "colors": ['#E5C100', '#FBF26D', '#FDD600'] },
		{"name" : "alien", "colors": ['#00FF00', '#8C46B0', '#00B218'] },
		{"name" : "soft", "colors": ['#70FCAE', '#CEF77A', '#F7CB81', '#DBA9FF'] },
		{"name" : "ultra", "colors": ['#FFFFFF', '#FF00B5'] },
		{"name" : "icyhot", "colors": ['#00ADFF', '#FD1A1A'] },
		{"name" : "fading", "colors": ['#F61B1B', '#FFFFFF'] },
		{"name" : "jungle", "colors": ['#00B200', '#C16700', '#AA5B00'] }
	]
}

function populatePresets(presets) {
	$.each(presets.presets, function() {
		$('.presets ul').append('<li></li>');
		gradText = "linear-gradient(" + this.colors.toString() + ")";
   		$.each(['', '-o-', '-moz-', '-webkit-', '-ms-'], function() {
        	$('.presets li').last().css({ 'background': this + gradText });
    	});
    });
    
    $('.presets li').each(function() {
    	$(this).on('click', function() {
			var index = $('.presets li').index($(this));
			populateColors(presets.presets[index].colors);
    	});
    });
}

populatePresets(presets);