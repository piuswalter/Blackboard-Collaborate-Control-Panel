var wrapper = document.querySelector('#pw-wrapper'),
controlPanel = document.querySelector('#pw-control-panel'),
mover = document.querySelector('.mover'),
x = 0,
y = 0,
mousedown = false;
var timeoutID = null;

mover.addEventListener('mousedown', function (e) {
	mousedown = true;
	x = controlPanel.offsetLeft - e.clientX;
	y = controlPanel.offsetTop - e.clientY;
	$('.move-index').css('z-index', '9996');
	$('#pw-wrapper').css('pointer-events','auto');
}, true);

wrapper.addEventListener('mouseup', function (e) {
	mousedown = false;
	$('.move-index').css('z-index', '9999');
	$('#pw-wrapper').css('pointer-events','none');
}, true);

wrapper.addEventListener('mousemove', function (e) {
	if (mousedown) {
		controlPanel.style.left = e.clientX + x + 'px';
		controlPanel.style.top = e.clientY + y + 'px';
	}
}, true);

function autoSmile(repetition) {
	if (timeoutID !== null) {
		stopAutoSmile(timeoutID);
	}
	$("#happy").click();
	timeoutID = setInterval(function() {
		$("#happy").click();
	}, repetition * 60 * 1000);
}

function stopAutoSmile() {
	clearTimeout(timeoutID);
	timeoutID = null;
}

function startEmojiEscalation() {
	if (timeoutID !== null) {
		stopAutoSmile(timeoutID);
	}
	
	timeoutID = setInterval(function() {
		$("#sad").click();
		$("#happy").click();
	}, 100);
}

function startHandEscalation() {
	if (timeoutID !== null) {
		stopAutoSmile(timeoutID);
	}
	timeoutID = setInterval(function() {
		$("#raise-hand").click();
	}, 100);
}
