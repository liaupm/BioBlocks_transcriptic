/*
The MIT License (MIT)

Copyright (c) 2016 Universidad Polit�cnica de Madrid

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @file Special function of centrifugate. Include special inputs for the centrifugate function.
 * @author Vishal Gupta, Jes�s Irimia, Iv�n Pau, Alfonso Rodr�guez-Pat�n, �ngel Panizo <contactLIAUPM@gmail.com>
 */
Blockly.Blocks['centrifugation'] = {
	
	init: function() {
		
		/*Usual initialization of a common block*/
		this.setInputsInline(false);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(120);
		
		//Creating inputs.
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("CENTRIFUGATION")
		this.setTooltip('');
		
		this.appendValueInput("source")
		    .setCheck(["containerCheck", "containerList"])
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("container input");
		    
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("speed")
		    .appendField(new Blockly.FieldNumber("0"), "SPEED")
		    .appendField(" rpm");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("duration")
		    .appendField(new Blockly.FieldNumber("0"), "DURATION")
		    .appendField(new Blockly.FieldDropdown([["Minutes", "minutes"], ["Milliseconds", "milliseconds"], ["Seconds", "seconds"], ["Hours", "hours"]]), "Unit_Time");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("time of operation")
		    .appendField(new Blockly.FieldNumber("0"), "timeOfOperation");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("Temperature")
		    .appendField(new Blockly.FieldNumber("0"), "TEMPERATURE")
		    .appendField(new Blockly.FieldDropdown([["Celsius", "celsius"], ["Kelvin", "kelvin"]]), "Unit_Temp");          
	},
	//This is the extract of the code in JSON which is called by the Blockly.JavaScript['centrifugation'] function 	
	optionsDisplay_ : function(code, block) {
		var currentBlock = block; //local variable created to don't modify continuously another the first variable.
		var currentCode = code;  //local variable created to don't modify continuously another the first variable.
		
		if( this.getFieldValue('SPEED')!=null){ //If the option "SPEED" is displayed in this moment in the container block connected:
			currentCode= currentCode + '                 "speed": " ' +this.getFieldValue("SPEED") +'", \n';  // Write the next code added to the first code.
		}
		if(this.getFieldValue('TEMPERATURE')!=null){
			if(this.getFieldValue("Unit_Temp")=="celsius"){
				currentCode= currentCode + '                "temperature": "' +this.getFieldValue("TEMPERATURE")+':' +"celsius"+'", \n';
			}else{
				currentCode= currentCode + '                "temperature": "' +(Number(this.getFieldValue("TEMPERATURE"))+273)+':' +"Celsius"+'", \n';
			}
		}	
		if(this.getFieldValue('DURATION')!=null){
			currentCode= currentCode + '                 "duration": " ' +this.getFieldValue("DURATION")+':'+this.getFieldValue("Unit_Time") +'" \n';
		}
		return currentCode;
	},
	optionsDisplay_naturalLanguage : function(code, block) {
		var currentBlock = block; //local variable created to don't modify continuously another the first variable.
		var currentCode = code;  //local variable created to don't modify continuously another the first variable.
		
		if( this.getFieldValue('SPEED')!=null){ //If the option "SPEED" is displayed in this moment in the container block connected:
			currentCode= currentCode + ' with speed ' +this.getFieldValue("SPEED")+ ' rpm' +', ';  // Write the next code added to the first code.
		}	
		if( this.getFieldValue('DURATION')!=null){
			currentCode= currentCode + ' during ' +this.getFieldValue("DURATION") + " " + this.getFieldValue("Unit_Time")+"s" + " " ;
		}
		if(this.getFieldValue('TEMPERATURE')!=null){
			if(this.getFieldValue("Unit_Temp")=="celsius"){
				currentCode= currentCode + ', at temperature ' +this.getFieldValue("TEMPERATURE") + " " + this.getFieldValue("Unit_Temp") + " " ;
			}else{
				currentCode= currentCode + ', at temperature ' +(Number(this.getFieldValue("TEMPERATURE"))+273) + " " + this.getFieldValue("Unit_Temp") + " " ;
			}
		}
		if(this.getFieldValue('timeOfOperation')!=null){
			currentCode= currentCode + 'at the time of operation ' +this.getFieldValue("timeOfOperation");
		}
		return currentCode;
	}
};



