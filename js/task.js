var timeline = []
var rw = 1
var instruction_picker = 1
var trial_counter = 1
var trial_counter_block = 0
var tutorial_help_flag = 1
var block_score = 0

/* init connection with pavlovia.org */
var pavlovia_init = {
    type: "pavlovia",
    command: "init"
};
timeline.push(pavlovia_init);

var jsFileLocation = $('script[src*=task]').attr('src');
var parentFolder = jsFileLocation.replace('task.js', '') + '../';

const base_message = 'Press the UP arrow key to select the top flowerbed and the DOWN arrow key to select the bottom flowerbed'

var script_picker = Math.floor((Math.random() * 999) + 0)


XYData = $ .get(parentFolder + `../stimuli/stimuli_${script_picker}.csv`, function(){
    XYActual = Papa.parse(XYData.responseText, {
	dynamicTyping: true
    })
})

TrainingData1 = $ .get(parentFolder + `../training/training_1.csv`, function(){
    TrainingActual1 = Papa.parse(TrainingData1.responseText, {
	dynamicTyping: true
    })
})

TrainingData2 = $ .get(parentFolder + `../training/training_2.csv`, function(){
    TrainingActual2 = Papa.parse(TrainingData2.responseText, {
	dynamicTyping: true
    })
})

/* consent */
var check_consent = function(elem) {
    if ($('#consent_checkbox').is(':checked')) {
	return true;
    }
    else {
	alert("If you wish to participate, you must check the box next to the statement 'I agree to participate in this study.'");
	return false;
    }
    return false;
};

var consent = {
    type:'external-html', 
    url: parentFolder + "consent.html", 
    cont_btn: "start", 
    check_fn: check_consent
}
timeline.push(consent)

var instruction_trial = {
    type: 'image-keyboard-response',
    stimulus: '',
    choices: ['downarrow'],
    stimulus_height: 800,
    stimulus_width: 800,
    on_start: function(trial){
	var tutorialFolder = parentFolder + 'tutorial/'
	if (instruction_picker == 46 || instruction_picker == 47){
	    tutorialFolder = tutorialFolder + task_type + '/' 
	}
	trial.stimulus =  tutorialFolder + 'tutorial' + instruction_picker + '.png'
    },
    on_finish: function(trial){
	instruction_picker += 1
    }
};


function centered_message(message) {
    return '<div class="container" style="height:800px;width:800px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;font-weight:normal;font-family:Arial;font-size:20px">' + message + '<div>'
}

var Load_trial = {
    type: 'html-keyboard-response',
    //	 stimulus: '<p style="font-family:Arial;text-align:center;width:800px;font-size:20px">Loading episode&hellip;</p>',
    stimulus: centered_message('<p>Loading episode&hellip;</p>'),
    choices: ['spacebar'],
    prompt: '<p style="font-family:Arial;text-align:center;width:800px;font-size:20px">&hellip;done. Press the SPACEBAR to continue.</p>'
};


var tutorial_trial_help = {
    type: 'canvas-keyboard-response',
    stimulus: [],
    stimulus_height: 800,
    stimulus_width: 800,
    choices: ['uparrow', 'downarrow'],
    prompt: '<p style="text-align:center;width:800px">' + base_message + '</p>',
    on_start: function(trial){
        trial.stimulus = rw
	trial.data = TrainingActual1.data[rw]
    },
    on_finish: function(trial){
	
	trial_counter_block += 1
	if( TrainingActual1.data[rw][1] === 0 && trial.key_press === 38){
	    block_score += 1
	}
        if( TrainingActual1.data[rw][1] === 1 && trial.key_press === 40){
	    block_score += 1
	    
	}
	
	rw += 1  
    }
}    
var tutorial_trial_no_help = {
    type: 'canvas-keyboard-response',
    stimulus: [],
    stimulus_height: 800,
    stimulus_width: 800,
    choices: ['uparrow', 'downarrow'],
    prompt: '<p style="font-family:Arial;text-align:center;width:800px">' + base_message + '</p>',
    on_start: function(trial){
        trial.stimulus = rw
	trial.data = TrainingActual2.data[rw]
    },
    on_finish: function(trial){

	trial_counter_block += 1
	if( TrainingActual2.data[rw][1] === 0 && trial.key_press === 38){
	    block_score += 1
	}
        if( TrainingActual2.data[rw][1] === 1 && trial.key_press === 40){
	    block_score += 1
	}
	rw += 1  
    }
}    

//up = 0 down = 1

var test_trial = {
    type: 'canvas-keyboard-response',
    stimulus: [],
    stimulus_height: 800,
    stimulus_width: 800,
    choices: ['uparrow', 'downarrow'],
    prompt: '',
    on_start: function(trial){
        trial.stimulus = rw
	trial.data = XYActual.data[rw]     
        
        trial.prompt = '<p style="font-family:Arial;text-align:center;width:800px">' + base_message + '<br>Screens completed: ' + `${trial_counter - 1}/500` 
    },
    on_finish: function(trial){

        trial_counter = trial_counter + 1
	trial_counter_block += 1
	
	if( XYActual.data[rw][1] === 0 && trial.key_press === 38){
	    block_score += 1
	}
        if( XYActual.data[rw][1] === 1 && trial.key_press === 40){
	    block_score += 1
	}
	rw += 1   
    }
}

var training_help_reset_trial = {
    type: 'html-keyboard-response',
    stimulus: '',
    choices: ['spacebar'],
    prompt: '',
    on_start: function(trial){
	trial.prompt = centered_message(`<p>End of the first practice episode.<br>Your score in this episode was: <strong>${100*block_score/trial_counter_block}%</strong><p style="font-size:18px">The second practice episode will be just like those in the real game, only shorter.<br>Your performance will not count towards your final score.<p>Press SPACEBAR to continue to the second practice episode`)
    },
    on_finish: function(trial){
        block_score = 0
	trial_counter_block = 0
	rw = 1
        tutorial_help_flag = 0
    }
};

var training_no_help_reset_trial = {
    type: 'html-keyboard-response',
    stimulus: '',
    choices: ['spacebar'],
    prompt: '',
    on_start: function(trial){
	trial.prompt = centered_message(`<p>End of the second practice episode.<br>Your score in this episode was: <strong>${100*block_score/trial_counter_block}%</strong><p>Your training is over.<p style="font-weight:bold">Are you ready?<p>Press SPACEBAR to start the game!</div>`)
    },
    on_finish: function(trial){
        block_score = 0
	trial_counter_block = 0
	rw = 1
        tutorial_help_flag = 0
    }
};

var reset_trial = {
    type: 'html-keyboard-response',
    stimulus: '',
    choices: ['spacebar'],
    prompt: '',
    on_start: function(trial){
	trial.prompt = centered_message(`<p>End of the episode.<br>Your score in this episode was: <strong>${100*block_score/trial_counter_block}%</strong><p>Press SPACEBAR to continue</div>`)
    },
    on_finish: function(trial){
        block_score = 0
	trial_counter_block = 0
        tutorial_help_flag = 0
    }
};

// 38 = uparrow. 40 = downarrow
var instruction_block = {
    timeline: [instruction_trial],
    repetitions: 48}

var tutorial_block_help = {
    timeline: [tutorial_trial_help],
    repetitions: 25}

var tutorial_block_no_help = {
    timeline: [tutorial_trial_no_help],
    repetitions: 25}

var experiment_block = {
    timeline: [test_trial],
    repetitions: 100}

var reset_block = {
    timeline: [reset_trial],
    repetitions: 1
}

var experiment_reset_block = {
    timeline: [experiment_block, reset_block],
    repetitions: 5
}

timeline.push(instruction_block)
timeline.push(Load_trial)
timeline.push(tutorial_block_help)
timeline.push(training_help_reset_trial)
timeline.push(tutorial_block_no_help)
timeline.push(training_no_help_reset_trial)
//timeline.push(experiment_block)
//timeline.push(reset_block)
timeline.push(experiment_reset_block)

var pavlovia_finish = {
    type: "pavlovia",
    command: "finish"
};
timeline.push(pavlovia_finish); 

jsPsych.init({
    timeline: timeline,
    preload: [XYData, TrainingData1, TrainingData2],
    on_data_update: function(data){
	jsPsych.data.get().addToLast({Script_Picker: script_picker})},


    on_finish: function() {
        document.body.innerHTML = '<p> Please wait. You will be redirected back to Prolific in a few moments.</p>'
        setTimeout(function () { location.href = prolific_href }, 5000)
    },
    default_iti: 0
});     
