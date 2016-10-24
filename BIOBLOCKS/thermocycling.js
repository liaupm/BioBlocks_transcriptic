/*
The MIT License (MIT)

Copyright (c) 2016 Universidad Politécnica de Madrid

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @file Special function of thermocycling.. Include special inputs for the thermocycling. function.
 * @author Vishal Gupta, Jesús Irimia, Iván Pau, Alfonso Rodríguez-Patón, Ángel Panizo <contactLIAUPM@gmail.com>
 */

Blockly.Blocks['thermocycling'] = {
	
	init: function() {
		/*Usual initialization of a common block*/
		this.setInputsInline(false);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(120);
		
		//Creating inputs.
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("THERMOCYCLING")
		this.setTooltip('');
		
		this.appendValueInput("source")
		    .setCheck(["containerCheck", "containerList"])
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("container input");
		
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("Time of operation")
		    .appendField(new Blockly.FieldNumber("0"), "timeOfOperation");  
		this.appendDummyInput("cycles")
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("cycles")
		    .appendField(new Blockly.FieldNumber("0"), "CYCLES");
		
		          
	},
	
	optionsDisplay_ : function(code, block) { //This is the extract of the code in JSON which is called by the Blockly.JavaScript['pipette'] function 
		var currentBlock = block; //local variable created to don't modify continuously another the first variable.
		var currentCode = code;  //local variable created to don't modify continuously another the first variable.
		//alert("HEHRH");
		/*Special thermocycling*/
				
		if( currentBlock.getFieldValue('steps')!=null){
			currentCode= currentCode + '                "groups": [{\n                    "cycles": ' + this.getFieldValue('CYCLES')+',\n                    "steps: [{\n'
			for( var i=0; i<currentBlock.getFieldValue('steps');i++){//Loop which switch the number of wells update the fill the corr3ect number of blanks 
				currentCode= currentCode + '                             "duration": " ' + currentBlock.getFieldValue("duration"+i) + ":" + currentBlock.getFieldValue("duration_units"+i) + '", \n'	
				currentCode= currentCode + '                             "temperature": " ' +currentBlock.getFieldValue("temperature"+i) + ":" + currentBlock.getFieldValue("temperature_units"+i) +'"\n                    },{ \n'
			}
			currentCode = currentCode.substring(0,currentCode.length-5);
			currentCode = currentCode + '}]\n                  }]\n';
		}
		return currentCode;
		
	},
	optionsDisplay_naturalLanguage : function(code, block) { //This is the extract of the code in JSON which is called by the Blockly.JavaScript['pipette'] function 
		var currentBlock = block; //local variable created to don't modify continuously another the first variable.
		var currentCode = code;  //local variable created to don't modify continuously another the first variable.
		//alert("HEHRH");
		/*Special thermocycling*/
		
		if( currentBlock.getFieldValue('steps')!=null){
			currentCode= currentCode + ' with ' + this.getFieldValue('CYCLES')+' cycles with the following steps:'
			for( var i=0; i<currentBlock.getFieldValue('steps');i++){//Loop which switch the number of wells update the fill the corr3ect number of blanks 
				currentCode= currentCode +" step "+ (i+1) +': duration ' + currentBlock.getFieldValue("duration"+i) + " " + currentBlock.getFieldValue("duration_units"+i);	
				currentCode= currentCode + ' and ' + currentBlock.getFieldValue("temperature"+i) + " " + currentBlock.getFieldValue("temperature_units"+i);
			}
		}
		return currentCode;
	}
};


