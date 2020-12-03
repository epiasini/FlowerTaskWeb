jsPsych.plugins["canvas-keyboard-response"] = (function() {

    var plugin = {};

    jsPsych.pluginAPI.registerPreload('canvas-keyboard-response', 'stimulus', 'image');

    plugin.info = {
	name: 'canvas-keyboard-response',
	description: '',
	parameters: {
	    stimulus: {
		type: jsPsych.plugins.parameterType.HTML_STRING,
		pretty_name: 'Stimulus',
		default: undefined,
		description: 'The image to be displayed'
	    },
	    stimulus_height: {
		type: jsPsych.plugins.parameterType.INT,
		pretty_name: 'Image height',
		default: null,
		description: 'Set the image height in pixels'
	    },
	    stimulus_width: {
		type: jsPsych.plugins.parameterType.INT,
		pretty_name: 'Image width',
		default: null,
		description: 'Set the image width in pixels'
	    },
	    maintain_aspect_ratio: {
		type: jsPsych.plugins.parameterType.BOOL,
		pretty_name: 'Maintain aspect ratio',
		default: true,
		description: 'Maintain the aspect ratio after setting width or height'
	    },
	    choices: {
		type: jsPsych.plugins.parameterType.KEYCODE,
		array: true,
		pretty_name: 'Choices',
		default: jsPsych.ALL_KEYS,
		description: 'The keys the subject is allowed to press to respond to the stimulus.'
	    },
	    prompt: {
		type: jsPsych.plugins.parameterType.STRING,
		pretty_name: 'Prompt',
		default: null,
		description: 'Any content here will be displayed below the stimulus.'
	    },
	    stimulus_duration: {
		type: jsPsych.plugins.parameterType.INT,
		pretty_name: 'Stimulus duration',
		default: null,
		description: 'How long to hide the stimulus.'
	    },
	    trial_duration: {
		type: jsPsych.plugins.parameterType.INT,
		pretty_name: 'Trial duration',
		default: null,
		description: 'How long to show trial before it ends.'
	    },
	    response_ends_trial: {
		type: jsPsych.plugins.parameterType.BOOL,
		pretty_name: 'Response ends trial',
		default: true,
		description: 'If true, trial will end when subject makes a response.'
	    },
	}
    }

    plugin.trial = function(display_element, trial) {

	// display stimulus
	var html = '<canvas id="jspsych-canvas-keyboard-response-stimulus" width="800" height="800" style="border:1px solid;">' + trial.stimulus + '</canvas>';

	// add prompt
	if (trial.prompt !== null){
	    html += trial.prompt;
	}

	// render
	display_element.innerHTML = html;

	
	
	
	// store response
	var response = {
	    rt: null,
	    key: null
	};
	
	var ctx = document.getElementById('jspsych-canvas-keyboard-response-stimulus')
	var canvas = new fabric.Canvas('jspsych-canvas-keyboard-response-stimulus');    
	
	// THIS IS WHERE THE LINES ARE DRAW- XSTART,YSTART,XEND,YEND

	/*
	  ------Flipped base-------
	  Start: [350. 350.]
	  End: [450. 350.]
	*/
	base_top = new fabric.Line([350,350,450,350],{
	    strokeWidth: 5,
	    fill: 'black',
	    stroke: 'black',
	    originX : 'center',
	    originY : 'center',
	    selectable: false
	});

	/*
	  -----Unflipped horizontal-------
	  Start: [250. 350.]
	  End: [550. 350.]
	*/
	horizontal_top = new fabric.Line([250,350,550,350],{
	    strokeWidth: 5,
	    fill: 'black',
	    stroke: 'black',
	    originX : 'center',
	    originY : 'center',
	    selectable: false
	});

	/*
	  -----Unflipped vertical-------
	  Start: [400. 350.]
	  End: [400. 250.]
	*/
	vertical_top = new fabric.Line([400,350,400,250],{
	    strokeWidth: 5,
	    fill: 'black',
	    stroke: 'black',
	    originX : 'center',
	    originY : 'center',
	    selectable: false
	});

	/*
	  ------Unflipped point-------
	  Location: [400. 350.]
	*/
	point_top = new fabric.Circle({
            radius: 4,
            fill: 'black',
            left: 400,
            top: 350,
            originX : 'center',
            originY : 'center',
	    selectable: false
        });

	/*
	  ------Unflipped parabola-------
	  Start: [382.01926263 305.04815658]
	  Control: [400.         394.95184342]
	  End: [417.98073737 305.04815658]
	*/
	var line_top = new fabric.Path(
	    'M 382 305 Q 400, 395, 418, 305',
	    {fill: '',
	     stroke: 'black',
	     objectCaching: false,
	     strokeWidth: 5,
	     selectable: false
	    });
	

	/*
	  -------Unflipped circular arc--------
	  Center: [400.         318.16901138]
	  Radius: 31.830988618379024

	  Note that 'angle' is in degrees but 'startAngle' and 'endAngle' are in radians!!!!
	*/
	var circle_top = new fabric.Circle({
	    radius: 32,
	    left: 400,
	    top: 318,
	    angle: 90,
	    startAngle: -Math.PI / 2,
	    endAngle: Math.PI / 2,
	    stroke: 'black',
	    strokeWidth: 5,
	    fill: '',
	    originX: 'center',
	    originY: 'center',
	    selectable: false
	});

	/*
	------Unflipped rounded-------
	Start left: [331.85042093 316.26523329]
	Joint left: [359.54914916 354.38926204]
	Joint right: [440.45085084 354.38926204]
	End right: [468.14957907 316.26523329]
	Circle center: [400. 325.]
	Circle radius: 50.0
	Circle angle/π: 0.6
	Base circle center: [400. 325.]
	Base circle radius: 100.0
	Base circle angle/π: 0.6
	*/

	var rounded_top = [];
	rounded_top.push(new fabric.Line([331.85,316.27,359.55,354.39],{
	    strokeWidth: 5,
	    fill: 'black',
	    stroke: 'black',
	    originX : 'center',
	    originY : 'center',
	    selectable: false
	}));
	rounded_top.push(new fabric.Circle({
	    radius: 50,
	    left: 400,
	    top: 325,
	    angle: 90,
	    startAngle: -0.6* Math.PI / 2,
	    endAngle: 0.6*Math.PI / 2,
	    stroke: 'black',
	    strokeWidth: 5,
	    fill: '',
	    originX: 'center',
	    originY: 'center',
	    selectable: false
	}));
	rounded_top.push(new fabric.Line([440.45,354.39,468.15,316.27],{
	    strokeWidth: 5,
	    fill: 'black',
	    stroke: 'black',
	    originX : 'center',
	    originY : 'center',
	    selectable: false
	}));

	var rounded_base_bottom = new fabric.Circle({
	    radius: 100,
	    left: 400,
	    top: 325,
	    angle: 90,
	    startAngle: -0.6* Math.PI / 2,
	    endAngle: 0.6*Math.PI / 2,
	    stroke: 'black',
	    strokeWidth: 5,
	    fill: '',
	    originX: 'center',
	    originY: 'center',
	    selectable: false
	}); 

	/*
	------Flipped rounded-------
	Start left: [331.85042093 483.73476671]
	Joint left: [359.54914916 445.61073796]
	Joint right: [440.45085084 445.61073796]
	End right: [468.14957907 483.73476671]
	Circle center: [400. 475.]
	Circle radius: 50.0
	Circle angle/π: 0.6
	Base circle center: [400. 475.]
	Base circle radius: 100.0
	Base circle angle/π: 0.6
	*/

	var rounded_bottom = [];
	rounded_bottom.push(new fabric.Line([331.85,483.73,359.55,445.61],{
	    strokeWidth: 5,
	    fill: 'black',
	    stroke: 'black',
	    originX : 'center',
	    originY : 'center',
	    selectable: false
	}));
	rounded_bottom.push(new fabric.Circle({
	    radius: 50,
	    left: 400,
	    top: 475,
	    angle: -90,
	    startAngle: -0.6* Math.PI / 2,
	    endAngle: 0.6*Math.PI / 2,
	    stroke: 'black',
	    strokeWidth: 5,
	    fill: '',
	    originX: 'center',
	    originY: 'center',
	    selectable: false
	}));
	rounded_bottom.push(new fabric.Line([440.45,445.61,468.15,483.73],{
	    strokeWidth: 5,
	    fill: 'black',
	    stroke: 'black',
	    originX : 'center',
	    originY : 'center',
	    selectable: false
	}));

	var rounded_base_top = new fabric.Circle({
	    radius: 100,
	    left: 400,
	    top: 475,
	    angle: -90,
	    startAngle: -0.6* Math.PI / 2,
	    endAngle: 0.6*Math.PI / 2,
	    stroke: 'black',
	    strokeWidth: 5,
	    fill: '',
	    originX: 'center',
	    originY: 'center',
	    selectable: false
	}); 

	/*
	  ------Unflipped base-------
	  Start: [350. 450.]
	  End: [450. 450.]
	*/
	base_bottom = new fabric.Line([350,450,450,450],{
	    strokeWidth: 5,
	    fill: 'black',
	    stroke: 'black',
	    originX : 'center',
	    originY : 'center',
	    selectable: false
	});

	/*
	  ------Flipped horizontal-------
	  Start: [250. 450.]
	  End: [550. 450.]
	*/
	horizontal_bottom = new fabric.Line([250,450,550,450],{
	    strokeWidth: 5,
	    fill: 'black',
	    stroke: 'black',
	    originX : 'center',
	    originY : 'center',
	    selectable: false
	});

	/*
	  ------Flipped vertical-------
	  Start: [400. 450.]
	  End: [400. 550.]
	*/
	vertical_bottom = new fabric.Line([400,450,400,550],{
	    strokeWidth: 5,
	    fill: 'black',
	    stroke: 'black',
	    originX : 'center',
	    originY : 'center',
	    selectable: false
	});

	/*
	  ------Flipped point-------
	  Location: [400. 450.]
	*/
	point_bottom = new fabric.Circle({
            radius: 4,
            fill: 'black',
            left: 400,
            top: 450,
            originX : 'center',
            originY : 'center',
	    selectable: false
        });

	/*
	  ------Flipped parabola------
	  Start: [382.01926263 494.95184342]
	  Control: [400.         405.04815658]
	  End: [417.98073737 494.95184342]
	*/
	var line_bottom = new fabric.Path(
	    'M 382 495 Q 400, 405, 418, 495',
	    {fill: '',
	     stroke: 'black',
	     objectCaching: false,
	     strokeWidth: 5,
	     selectable: false
	    });

	/*
	  -------Flipped circular arc--------
	  ------Flipped circle-------
	  Center: [400.         481.83098862]
	  Radius: 31.830988618379024

	  Note that 'angle' is in degrees but 'startAngle' and 'endAngle' are in radians!!!!
	*/
	var circle_bottom = new fabric.Circle({
	    radius: 32,
	    left: 400,
	    top: 482,
	    angle: -90,
	    startAngle: -Math.PI / 2,
	    endAngle: Math.PI / 2,
	    stroke: 'black',
	    strokeWidth: 5,
	    fill: '',
	    originX: 'center',
	    originY: 'center',
	    selectable: false
	});


	/*
	  trial.data contains the following columns:

	  0. TrueLocationParameter
	  1. Configuration
	  2. TrueModelUpDown
	  3. TrueLocationP
	  4. TrueLocationQ
	  5. P0
	  6. Q0
	  7. P1
	  8. Q1
	  ...
	  23. P9
	  24. Q9

	  Note that TrueLocationParameter is only included for reference and is not required for running the experiment.

	*/

	var orientation = trial.data[1]
	
	switch(orientation){
        case 0:
	    canvas.add(base_top)   
	    canvas.add(horizontal_bottom) 
            break;
            
	case 1:
	    canvas.add(base_bottom) 
	    canvas.add(horizontal_top)
	    break;    
            
        case 2:
	    canvas.add(base_top)   
	    canvas.add(vertical_bottom) 
            break;
            
	case 3:
	    canvas.add(base_bottom) 
	    canvas.add(vertical_top)
	    break;  
            
	case 4:
	    canvas.add(base_top)   
	    canvas.add(point_bottom) 
            break;
            
	case 5:
	    canvas.add(base_bottom) 
	    canvas.add(point_top)
	    break;  
	    
	case 6:
	    canvas.add(base_top)   
	    canvas.add(line_bottom) 
            break;
            
	case 7:
	    canvas.add(base_bottom) 
	    canvas.add(line_top)
	    break;  

	case 8:
	    canvas.add(base_top)
	    canvas.add(circle_bottom)
	    break;

	case 9:
	    canvas.add(base_bottom)
	    canvas.add(circle_top)
	    break;

	case 10:
	    canvas.add(rounded_base_top)
	    canvas.add(...rounded_bottom)
	    break;
	    
	case 11:
	    canvas.add(rounded_base_bottom)
	    canvas.add(...rounded_top)
	    break;
	}
	

	// if we are in an "assisted tutorial" trial, show the true location of the flower
	if (tutorial_help_flag) {
	    var ball_helper = new fabric.Circle({
		radius: 7,
		fill: 'orange',
		left:  trial.data[3],
		top: trial.data[4],
		originX : 'center',
		originY : 'center',
		selectable: false
	    }); 
	    canvas.add(ball_helper)
	}

	// create array of seed markers and add them to the canvas
	const n_seeds = 10;
	var seeds = [];
	for (i = 0; i < n_seeds; i++) {
	    seeds.push(new fabric.Circle({
      		radius: 5,
      		fill: 'red',
      		left:  trial.data[5+2*i],
      		top: trial.data[6+2*i],
      		originX : 'center',
      		originY : 'center',
		selectable: false
	    }));
	}
	canvas.add(...seeds)
	
	// function to end trial when it is time
	var end_trial = function() {

	    // kill any remaining setTimeout handlers
	    jsPsych.pluginAPI.clearAllTimeouts();

	    // kill keyboard listeners
	    if (typeof keyboardListener !== 'undefined') {
		jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
	    }

	    // gather the data to store for the trial
	    var trial_data = {
		"rt": response.rt,
		"stimulus": trial.stimulus,
		"key_press": response.key,
	    };
	    
	    // clear the display
	    display_element.innerHTML = '';

	    // move on to the next trial
	    jsPsych.finishTrial(trial_data);
	};

	// function to handle responses by the subject
	var after_response = function(info) {

	    // after a valid response, the stimulus will have the CSS class 'responded'
	    // which can be used to provide visual feedback that a response was recorded
	    display_element.querySelector('#jspsych-canvas-keyboard-response-stimulus').className += ' responded';

	    // only record the first response
	    if (response.key == null) {
		response = info;
	    }

	    if (trial.response_ends_trial) {
		end_trial();
	    }
	};

	// start the response listener
	if (trial.choices != jsPsych.NO_KEYS) {
	    var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
		callback_function: after_response,
		valid_responses: trial.choices,
		rt_method: 'performance',
		persist: false,
		allow_held_key: false
	    });
	}

	// hide stimulus if stimulus_duration is set
	if (trial.stimulus_duration !== null) {
	    jsPsych.pluginAPI.setTimeout(function() {
		display_element.querySelector('#jspsych-canvas-keyboard-response-stimulus').style.visibility = 'hidden';
	    }, trial.stimulus_duration);
	}

	// end trial if trial_duration is set
	if (trial.trial_duration !== null) {
	    jsPsych.pluginAPI.setTimeout(function() {
		end_trial();
	    }, trial.trial_duration);
	}

    };

    return plugin;
})();
