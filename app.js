var gui = require("nw.gui"); 
var fs = require("fs");

var win = gui.Window.get();

win.focus();

//Code to type.
var code = fs.readFileSync("code", "utf8");

//How many characters to type per keypress. 
var speed = 3;
//Current place in code.
var index = 0;

//Tab character.
var tab = "&nbsp;&nbsp;&nbsp;&nbsp;";
//Space character.
var space = "&nbsp";
//Blinking caret character.
var caret = "\u2588";

var blinkTimer;

//App loaded.
$(function() 
{
	//Start with the caret.
    $("#console").html(caret);

    //Make it blink!
    blink();

    $("html").on("keydown", function(e)
    {
    	//Stop the blinking if we're typing.
    	clearInterval(blinkTimer);
        
    	if (e.keyCode === 8) //If backspace, delete code.
    	{
    		index = index - speed;
    	}
        else if (e.ctrlKey === true && e.keyCode === 67) //Control+C, clear code.
        {
            index = 0;
        }
    	else
    	{
    		index = index + speed;
    	}
    	
    	updateCode();
    	blink();
    	
    });
}); 

//Updates the console with the current code using the index, and scrolls to the bottom.
function updateCode()
{
	//Convert the code to HTML so it looks right.
	var type = code.substring(0, index)
    	.replace(/\n/g, "<br>")
    	.replace(/\t/g, tab)
    	.replace(/\s/g, space);

    $("#console").html(type + caret);

    window.scrollBy(0, 50); 
}

//Make the caret blink.
function blink()
{
 	blinkTimer = setInterval(function()
    {
    	//Get the current code in the console.
    	var currentCode = $("#console").html();
    	//Get the last character.
    	var last = currentCode.substring(currentCode.length-1, currentCode.length);

    	//If the last character is the caret, remove it, if it isn't add it! 
    	if (last === caret)
    	{
    		$("#console").html(currentCode.substring(0, currentCode.length-1));
    	}
    	else
    	{
    		$("#console").html(currentCode + caret);
    	}

    }, 500);
}