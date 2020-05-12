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
    originY : 'center'
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
    originY : 'center'    
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
    originY : 'center'
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
        originY : 'center'
        });

/*
------Unflipped parabola-------
Start: [382.01926263 305.04815658]
Control: [400.         394.95184342]
End: [417.98073737 305.04815658]
*/
var line_top = new fabric.Path('M 382 305 Q 400, 395, 418, 305', { fill: '', stroke: 'black', objectCaching: false, strokeWidth: 5 });
line_top.selectable = false;
 
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
    originY : 'center'
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
    originY : 'center'
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
    originY : 'center'
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
        originY : 'center'
        });

/*
------Flipped parabola------
Start: [382.01926263 494.95184342]
Control: [400.         405.04815658]
End: [417.98073737 494.95184342]
*/
var line_bottom = new fabric.Path('M 382 495 Q 400, 405, 418, 495', { fill: '', stroke: 'black', objectCaching: false, strokeWidth: 5 });
line_bottom.selectable = false;

      var orientation = trial.data[0]
      
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
  }
      

      // if we are in an "assisted tutorial" trial, show the true location of the flower
      if (tutorial_help_flag) {
	  var ball_helper = new fabric.Circle({
	      radius: 7,
	      fill: 'orange',
	      left:  trial.data[2],
	      top: trial.data[3],
	      originX : 'center',
	      originY : 'center'
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
      	      left:  trial.data[4+2*i],
      	      top: trial.data[5+2*i],
      	      originX : 'center',
      	      originY : 'center'
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
