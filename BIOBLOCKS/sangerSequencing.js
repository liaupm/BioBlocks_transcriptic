/*
The MIT License (MIT)

Copyright (c) 2016 Universidad Politécnica de Madrid

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @file Special function of sanger sequencing. Include special inputs for the sanger sequencing function.
 * @author Vishal Gupta, Jesús Irimia, Iván Pau, Alfonso Rodríguez-Patón, Ángel Panizo <contactLIAUPM@gmail.com>
 */

Blockly.Blocks['sangerSequencing'] = {
	
	init: function() {
		/*Usual initialization of a common block*/
		this.setInputsInline(false);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(120);
		
		//Creating inputs.
		this.appendDummyInput('SangerSequencer')
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("SANGER SEQUENCING")
		this.setTooltip('');
		
		this.appendValueInput("source")
		    .setCheck(["containerCheck", "containerList"])
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("container input");
		    
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("time of operation")
		    .appendField(new Blockly.FieldNumber("0"), "timeOfOperation");    
		
	},
	onchange: function() {
		/*var blockSource = this.getInputTargetBlock('source') //Get the block set in the source
    	if(blockSource!=null){
			var isList1 = blockSource.getInput('contListOption');
        	if(isList1){ //Check if it is a list
	        	var currentBlock
				for(var i=1;i<blockSource.getFieldValue('contListOptionValue')+1;i++){//Iterate over all inputs in the list
					var chain='contListOptionValueNum'+i//Name of the current block
					currentBlock = blockSource.getInputTargetBlock(chain);//Current block got with chain
					if(currentBlock!=null){
						if( currentBlock.getFieldValue('container_type_global')==201){//If it is  AGAROSE
							currentBlock.setParent(null);//Remove the parent of its own parameters
							var dx = Blockly.SNAP_RADIUS * (currentBlock.RTL ? -1 : 1);//calculate the movement of the block in x axis
						    var dy = Blockly.SNAP_RADIUS * 2;//calculate the movement of the block in x axis
						    currentBlock.moveBy(dx, dy); //Move the block with the measures gotten.						
						}
					}
				}
        	}else if(blockSource!=null){
	        	if(blockSource.getFieldValue('container_type_global')==201){//If it is  aGAROSE
	        		blockSource.setParent(null);//Remove the parent of its own parameters
					var dx = Blockly.SNAP_RADIUS * (blockSource.RTL ? -1 : 1);//calculate the movement of the block in x axis
				    var dy = Blockly.SNAP_RADIUS * 2;//calculate the movement of the block in x axis
				    blockSource.moveBy(dx, dy); //Move the block with the measures gotten.
			    }
    		}
		}*/
	},
		
	optionsDisplay_ : function(code, block) { //This is the extract of the code in JSON which is called by the Blockly.JavaScript['pipette'] function 
		var currentBlock = block; //local variable created to don't modify continuously another the first variable.
		var currentCode = code;  //local variable created to don't modify continuously another the first variable.
		
		if( currentBlock.getFieldValue('singlemultiwells')==1){
			currentCode= currentCode + '                "wells": " ' +currentBlock.getFieldValue("singlewelladdrinput") +'", \n'
		}
		if( currentBlock.getFieldValue('singlemultiwells')==2){
			if( currentBlock.getFieldValue('multipleWellAddrInput')!=null){
				currentCode= currentCode + '                "wells": " ' +currentBlock.getFieldValue("multipleWellAddrInput") +'", \n'
			}else {
				currentCode= currentCode + '                "wells": whole", \n'	
			}
		}
		
		if( currentBlock && currentBlock.getInputTargetBlock('datareference')!=null){
			var dataBlockValue = currentBlock.getInputTargetBlock('datareference').getFieldValue("TEXT");
			currentCode= currentCode + '                "data reference": " ' + dataBlockValue +'" \n'
		}
		
		return currentCode;
	},
	optionsDisplay_naturalLanguage : function(code, block) { //This is the extract of the code in JSON which is called by the Blockly.JavaScript['pipette'] function 
		var currentBlock = block; //local variable created to don't modify continuously another the first variable.
		var currentCode = code;  //local variable created to don't modify continuously another the first variable.
		
		if( currentBlock.getFieldValue('singlemultiwells')==1){
			currentCode= currentCode + ' in the single well addressed in ' +currentBlock.getFieldValue("singlewelladdrinput");
		}
		if( currentBlock.getFieldValue('singlemultiwells')==2){
			if( currentBlock.getFieldValue('multipleWellAddrInput')!=null){
				currentCode= currentCode + ' in the individual multiple wells addressed in ' +currentBlock.getFieldValue("multipleWellAddrInput");
			}else {
				currentCode= currentCode + ' in the whole well plate '	
			}
		}
		
		
		if( currentBlock && currentBlock.getInputTargetBlock('datareference')!=null){
			var dataBlockValue = currentBlock.getInputTargetBlock('datareference').getFieldValue("TEXT");
			currentCode= currentCode + ' with the data reference ' + dataBlockValue;
		}
		
		return currentCode;
	}
};

