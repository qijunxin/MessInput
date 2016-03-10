$(function(){
	var done = false,
	cycleCount = 10,
	cycleCurrent = 0,
	chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+{}|[]\\;\':<>?,.`~'.split(''),
	charsCount = chars.length,
	letters = $('.message').lettering().find('span'),
	letterCount = letters.length,
	letterCurrent = 0;

	letters.each(function(){
		var $this = $(this);
		$this.attr('data-text',$this.text());
		$this.text('');
	});

	var getChar = function(){
		return chars[Math.floor(Math.random()*charsCount)];
	}

	var reset = function(){
		done = false;
		cycleCurrent = 0;
		letterCurrent = 0;
		letters.each(function(){
			var $this = $(this);
			$this.text($this.attr('data-text'));
			$this.removeClass('done');
		});
		loop();
	}

	var loop = function(){
		letters.each(function(index,elem){
			var $elem = $(elem);
			if(index >= letterCurrent){
				$elem.text(getChar());
				$elem.css('opacity',Math.random());
			}
		});

		if(cycleCurrent<cycleCount){
			cycleCurrent++;
		}else if (letterCurrent<letterCount) {
			var current = letters.eq(letterCurrent);
			cycleCurrent = 0;
			current.text(current.attr('data-text')).css('opacity','1').addClass('done');
			letterCurrent++;
		}else{
			done = true;
		};

		if(!done){
			requestAnimationFrame(loop);
		}else {
			setTimeout(reset, 1000);
		};
	}
	reset();
})