/*
The MIT License (MIT)

Copyright (c) 2016 Universidad Politécnica de Madrid

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @file Special function of measure. Include special inputs for the measurement function.
 * @author Vishal Gupta, Jesús Irimia, Iván Pau, Alfonso Rodríguez-Patón, Ángel Panizo <contactLIAUPM@gmail.com>
 */

/** 
 * Definition of the object which contains all the arrays of measure parameters
 * */
var measurementObject = {};

Blockly.Blocks['measurement'] = {
	
	init: function() {//Function to initialize the block
		/*Creating LOCAL array for this measurement block*/
		var measurementArray={};
		measurementArray['id']=this.id; 
		measurementObject[this.id]=measurementArray; //It adds the LOCAL array in the GLOBAL object with the key "id".
		
		/*Usual initialization of a common block*/
		this.setInputsInline(false);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(120);
		
		//Creating inputs.
		this.appendDummyInput("MEASUREMENT")
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("MEASUREMENT")
		this.setTooltip('');
		
		var dropdownType = new Blockly.FieldDropdown([["Absorbance", "1"], ["Fluorescence", "2"], ["Luminiscence", "3"], ["Volume", "4"], ["Temperature", "5"]], function(option){
			var measurementType = option;
			this.sourceBlock_.updateType_(measurementType);
		});
		
		this.appendDummyInput("DDMeasurement")
			.appendField("Measurement Type")
			.appendField(dropdownType, 'parameters');
		 
		this.appendValueInput("source")
		    .setCheck("containerCheck")
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("Container Input");
				   
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("Time of Operation")
		    .appendField(new Blockly.FieldNumber("0"), "timeOfOperation");
		
			
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("Duration")
		    .appendField(new Blockly.FieldNumber("0"), "DURATION")
		    .appendField(new Blockly.FieldDropdown([["Minutes", "minute"], ["Millisecond", "millisecond"], ["Seconds", "second"], ["Hours", "hour"]]), "Unit_Time");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("Measurement Frequency")
		    .appendField(new Blockly.FieldNumber("0"), "FREQUENCYOFMEASUREMENT")
			.appendField(new Blockly.FieldDropdown([["Hz", "hz"], ["kHz", "khz"], ["MHz", "mhz"]]), "unit_frequency");
		    	    
		this.appendDummyInput("measurement_input1")
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("wavelength num")
		    .appendField(new Blockly.FieldNumber("0"), "wavelengthnum");

		this.appendValueInput("data_reference")
			.setCheck("String")
			.setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("Data Reference")
		    //.appendField(new Blockly.FieldTextInput("---"), "DATAREFERENCE");
		            
	},
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/	
	/*This is a particular function of JS*/
	/*each change appeared in the workspace/context call to this function*/
	/*we are using it to set the shape, display parameters and similar matter*/
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/	
	onchange : function(){
		var myId = this.id;//we get our id, to locate us in the global array.
		myId=myId.toString()
		var currentArray=measurementObject[myId]; // We get access to the global array, and assign this array in the currentArray to work with a extern array. In this way we don't need access each change.
		
		var measurementtype=this.getFieldValue('parameters');
		switch (measurementtype){  //JS function to structure better the if-else sentences
			case'1':  //absorbance
				/*Save in the array object the fields if they were modified*/
				if ( this.getFieldValue('wavelengthnum') != null){
					currentArray['wavelengthnum']=this.getFieldValue('wavelengthnum');//If the input exists set the current value of this input.
				}
				
			break;
			case'2':  //fluorescence
				if ( this.getFieldValue('excitation') != null){		
					currentArray['excitation']=this.getFieldValue('excitation');
				}
				if ( this.getFieldValue('emission') != null){
					currentArray['emission']=this.getFieldValue('emission');
				}
				
			break;
			case'3':  //luminiscence
				
			break;
		}
	},
	//Function called from the dropdown menu to choose th different type of measure we want to do.
	updateType_ : function(measurementType){
		
		/*If exists some mutation input first is remove.*/
		// ANGEL: I think this was test code or at least deprecated one this inputs are not inserted anywhere....
		var inputExists = this.getInput('measurement_input1')
		if(inputExists){
			this.removeInput('measurement_input1');
		}

		var inputExists = this.getInput('measurement_input2')
		if(inputExists){
			this.removeInput('measurement_input2');
		}
		
		var inputExists = this.getInput('measurement_input3')
		if(inputExists){
			this.removeInput('measurement_input3');
		}
		
		
		var myId = this.id;//we get our id, to locate us in the global array.
		myId=myId.toString()
		var currentArray=measurementObject[myId]; // We get access to the global array, and assign this array in the currentArray to work with a extern array. In this way we don't need access each change.
		
		switch (measurementType){   //JS function to structure better the if-else sentences
			case '1': //absorbance
				// add inputs
				this.appendDummyInput("measurement_input1")
				    .setAlign(Blockly.ALIGN_RIGHT)
				    .appendField("wavelength num")
				    .appendField(new Blockly.FieldTextInput("0"), "wavelengthnum");
				if (currentArray["wavelengthnum"]!=null){//If exists some data in the array about this input
					this.setFieldValue(currentArray["wavelengthnum"],"wavelengthnum");   //Set the previous data in the field.
				}  
				
			break;
			
			case '2':  //fluorescence
				this.appendDummyInput("measurement_input2")
				    .setAlign(Blockly.ALIGN_RIGHT)
				    .appendField("excitation")
				    .appendField(new Blockly.FieldTextInput("0"), "excitation");
				this.appendDummyInput("measurement_input3")
				    .setAlign(Blockly.ALIGN_RIGHT)
				    .appendField("emission")
				    .appendField(new Blockly.FieldTextInput("0"), "emission");
				
				if (currentArray["excitation"]!=null){
					this.setFieldValue(currentArray["excitation"],"excitation");  
				}  
				if (currentArray["emission"]!=null){
					this.setFieldValue(currentArray["emission"],"emission");  
				}
			  
				
			break;
			
			case '3':  //luminiscence
				
			break;
			
		}
	},
	/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/	
	/*This function is called when we copy or save this block*/
	mutationToDom: function() {
		
		var container = document.createElement('mutation');//Creating a element which name is "mutation"
		container.setAttribute("parameters",this.getFieldValue("parameters"));
		
		var myId = this.id;//we get our id, to locate us in the global array.
		myId=myId.toString()
		var currentArray=measurementObject[myId];// We get access to the global array, and assign this array in the currentArray to work with a extern array. In this way we don't need access each change.
		
		if(currentArray.hasOwnProperty('wavelengthnum')){  //if exists the variable in the object 
			container.setAttribute("wavelengthnum",currentArray['wavelengthnum']); //save in the container element
		}
		if(currentArray.hasOwnProperty('excitation')){
			container.setAttribute("excitation",currentArray['excitation']);
		}
		if(currentArray.hasOwnProperty('emission')){
			container.setAttribute("emission",currentArray['emission']);
		}
		return container;
	},
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/
	/*This function is called when we paste or load the block.*/
	domToMutation: function(xmlElement) {
		
		var myId = this.id;//we get our id, to locate us in the global array.
		myId=myId.toString()
		var currentArray=measurementObject[myId];// We get access to the global array, and assign this array in the currentArray to work with a extern array. In this way we don't need access each change.
				
		if(xmlElement.getAttribute('wavelengthnum')!=null){
			currentArray['wavelengthnum']=xmlElement.getAttribute("wavelengthnum")//If the input exists set the current value of this input.
		}
		
		if(xmlElement.getAttribute('excitation')!=null){
			currentArray['excitation']=xmlElement.getAttribute("excitation")//If the input exists set the current value of this input.
		}
		if(xmlElement.getAttribute('emission')!=null){
			currentArray['emission']=xmlElement.getAttribute("emission")//If the input exists set the current value of this input.
		}
		
		this.updateType_(xmlElement.getAttribute('parameters'));
	},
	
	optionsDisplay_ : function(code, block) { //This is the extract of the code in JSON which is called by the Blockly.JavaScript['pipette'] function 
		var currentBlock = block;  //local variable created to don't modify continuously another the first variable.
		var currentCode = code;   //local variable created to don't modify continuously another the first variable.
		
		if( this.getFieldValue('timeOfOperation')!=null){ //If the option "SPEED" is displayed in this moment in the container block connected:
			currentCode= currentCode + '                "time of operation: " ' +this.getFieldValue("timeOfOperation") +'", \n';  // Write the next code added to the first code.
		}
		if( this.getInputTargetBlock('data_reference')!=null){ //If the option "SPEED" is displayed in this moment in the container block connected:
			var dataBlockValue = this.getInputTargetBlock('data_reference').getFieldValue("TEXT");
			currentCode= currentCode + '                "dataref: " ' + dataBlockValue +'", \n';  // Write the next code added to the first code.
		}
		if(this.getFieldValue('DURATION')!=null){
			currentCode= currentCode + '                 "duration": " ' +this.getFieldValue("DURATION")+':'+this.getFieldValue("Unit_Time") +'", \n';
		}
		if(this.getFieldValue('FREQUENCYOFMEASUREMENT')!=null){
			currentCode= currentCode + '                "frequency measurement": " ' +this.getFieldValue("FREQUENCYOFMEASUREMENT") + ":" + this.getFieldValue("unit_frequency") + '", \n';
		}	
		if(this.getFieldValue('wavelengthnum')!=null){
			currentCode= currentCode + '                "wavelength": " ' +this.getFieldValue("wavelengthnum") +'", \n';
		}
		if(this.getFieldValue('excitation')!=null){
			currentCode= currentCode + '                "excitation": " ' +this.getFieldValue("excitation") +'", \n';
		}	
		if(this.getFieldValue('emission')!=null){
			currentCode= currentCode + '                "emission": " ' +this.getFieldValue("emission") +'" \n';
		}
		
		
		return currentCode;
	},
	optionsDisplay_naturalLanguage : function(code, block) { //This is the extract of the code in JSON which is called by the Blockly.JavaScript['pipette'] function 
		var currentBlock = block;  //local variable created to don't modify continuously another the first variable.
		var currentCode = code;   //local variable created to don't modify continuously another the first variable.
		
		if( this.getFieldValue('timeOfOperation')!=null){ //If the option "SPEED" is displayed in this moment in the container block connected:
			currentCode= currentCode + ' on the time of operation ' +this.getFieldValue("timeOfOperation") ;  // Write the next code added to the first code.
		}
		if( this.getInputTargetBlock('data_reference')!=null){ //If the option "SPEED" is displayed in this moment in the container block connected:
			var dataBlockValue = this.getInputTargetBlock('data_reference').getFieldValue("TEXT");
			currentCode= currentCode + ', with dataref ' + dataBlockValue;  // Write the next code added to the first code.
		}
		if( this.getFieldValue('DURATION')!=null){
			currentCode= currentCode + ' during ' +this.getFieldValue("DURATION") + " " + this.getFieldValue("Unit_Time")+"s" + " " ;
		}
			
		if(this.getFieldValue('wavelengthnum')!=null){
			currentCode= currentCode + ', with wavelength ' +this.getFieldValue("wavelengthnum") ;
		}
		if(this.getFieldValue('excitation')!=null){
			currentCode= currentCode + ', with excitation ' +this.getFieldValue("excitation");
		}	
		if(this.getFieldValue('emission')!=null){
			currentCode= currentCode + ', with emission ' +this.getFieldValue("emission") ;
		}
		
		if(this.getFieldValue('FREQUENCYOFMEASUREMENT')!=null){
			currentCode= currentCode + ' and each ' + this.getFreqcuencyInSeconds() + ' s';
		}
		
		return currentCode;
	},

	getFreqcuencyInSeconds : function() {
		var frecuency = Number(this.getFieldValue("FREQUENCYOFMEASUREMENT"));

		if (this.getFieldValue("unit_frequency") == "khz") {
			frecuency = frecuency * 1000;
		} else if (this.getFieldValue("unit_frequency") == "mhz") {
			frecuency = frecuency * 1000000;
		}

		return 1/frecuency;
	}
	
};





