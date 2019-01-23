/* 
CSC 337 - YONGBAEK CHO   
2 / 16 / 2018

This Javascript document controls the responsive behavior of a page containing a Speedreader. 
The page controls the start and stop buttons for the speedreader, speed at that the words are
displayed, and text size. */



(function() {
	"use strict";
	
	var timer = null;
	var currentFrame = 0;
	var words;
	var speed = 171;
	
	
	// Creates event listeners for all of the UI
	window.onload = function(){
		//playback
		document.getElementById("start").onclick = startOutput;
		document.getElementById("stop").onclick = stopOutput;
		//font size
		document.getElementById("medium").onclick = changeFont;
		document.getElementById("big").onclick = changeFont;
		document.getElementById("bigger").onclick = changeFont;
		//text speed
		document.getElementById("speed").onchange = changeSpeed;
	};
	
	// Gets the user input from the textArea and generates a set of frames for the output to display.
	// Words that end in punctuation are given extra frames so that they appear longer on the screen.
	// Disables the play button and reinables the stop button
	// Starts the sequence of frames to write to the output at the specified speed.
	function startOutput(){
		flipPlayControls();
		var input = document.getElementById("input").value;		
		words = input.split(/[ \t\n]+/);
		// words that end in punctuation are given an extra frame so that they appear  twice as long on the output
		for(var i = words.length - 1; i >= 0; i--){ 
			if(words[i].endsWith(".") || words[i].endsWith(",") || words[i].endsWith(";") || 
			words[i].endsWith(":") || words[i].endsWith("!") || words[i].endsWith("?")){
					words[i] = words[i].substring(0, words[i].length - 1);
					words.splice(i + 1, 0, words[i]);
			}
		}
		if (timer === null) {
			timer = setInterval(writeTooOutput, speed);
		}
	}
	
	// switches the start and stop buttons disabled state to opposite
	function flipPlayControls(){
		document.getElementById("start").disabled = !document.getElementById("start").disabled;
		document.getElementById("stop").disabled = !document.getElementById("stop").disabled;
	}
	
	// Stops the animation in the output from playing
	// Reinables the start button and disables the stop button
	// If the user hits play again, the animation completely starts
	function stopOutput(){
		flipPlayControls();
		clearInterval(timer);
		timer = null;
		currentFrame = 0;
		document.getElementById("output").innerHTML = "";
	}
	
	// Write a frame to output an increments the next output to the next frame
	// If no more frames, it stops the animation
	function writeTooOutput(){
		document.getElementById("output").innerHTML = words[currentFrame];
		currentFrame++;
		if(currentFrame > words.length - 1){
			stopOutput();
		}
	}
	
	// Changes the speed of the output animation based on a given value
	function changeSpeed(){
		var num = parseInt(this.value, 10);
		speed = num;
		clearInterval(timer);
		if(currentFrame != 0){
			timer = null;
			timer = setInterval(writeTooOutput, speed);
		}
	}
	
	
	// Changes the font of the output animation based on a given value
	function changeFont(){
			document.getElementById("output").className = this.value;
	}
})();