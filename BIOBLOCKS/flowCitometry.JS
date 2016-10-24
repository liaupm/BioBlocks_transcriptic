/*
The MIT License (MIT)

Copyright (c) 2016 Universidad Politécnica de Madrid

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @file Special function of flowCitometry. Include special inputs for the electrophoresis function.
 * @author Vishal Gupta, Jesús Irimia, Iván Pau, Alfonso Rodríguez-Patón, Ángel Panizo <contactLIAUPM@gmail.com>
 */
Blockly.Blocks['flowCitometry'] = {
	
	init: function() {
		/*Usual initialization of a common block*/
		this.setInputsInline(false);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(120);
		
		//Creating inputs.
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("FLOW CITOMETRY")
		this.setTooltip('');
		
		this.appendValueInput("source")
		    .setCheck(["containerCheck", "containerList"])
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("container input");
		    
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("time_of_operation")
		    .appendField(new Blockly.FieldNumber("0"), "timeOfOperation");
		this.appendValueInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("data_reference");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("channels_FSC _voltage_ range _low")
		    .appendField(new Blockly.FieldTextInput("---"), "channels_FSC_voltage_range_low");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("channels_FSC _voltage_ range _high")
		    .appendField(new Blockly.FieldTextInput("---"), "channels_FSC_voltage_range_high"); 
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("channels_FSC_area")
		    .appendField(new Blockly.FieldTextInput("---"), "channels_FSC_area"); 
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("channels_FSC_height")
		    .appendField(new Blockly.FieldTextInput("---"), "channels_FSC_height"); 
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("channels_FSC_width")
		    .appendField(new Blockly.FieldTextInput("---"), "channels_FSC_width");  
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("channels_SSC_voltage_range_low")
		    .appendField(new Blockly.FieldTextInput("---"), "channels_SSC_voltage_range_low"); 
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("channels_SSC_voltage_range_high")
		    .appendField(new Blockly.FieldTextInput("---"), "channels_SSC_voltage_range_high"); 
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("channels_SSC_area")
		    .appendField(new Blockly.FieldTextInput("---"), "channels_SSC_area"); 
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("channels_SSC_height")
		    .appendField(new Blockly.FieldTextInput("---"), "channels_SSC_height"); 
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("channels_SSC_width")
		    .appendField(new Blockly.FieldTextInput("---"), "channels_SSC_width"); 
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("colors_name")
		    .appendField(new Blockly.FieldTextInput("---"), "colors_name"); 
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("colors_emission_wavelength")
		    .appendField(new Blockly.FieldTextInput("---"), "colors_emission_wavelength"); 
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("colors_excitation_wavelength")
		    .appendField(new Blockly.FieldTextInput("---"), "colors_excitation_wavelength");                         
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("colors_voltage_range_low")
		    .appendField(new Blockly.FieldTextInput("---"), "colors_voltage_range_low");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("colors_voltage_range_high")
		    .appendField(new Blockly.FieldTextInput("---"), "colors_voltage_range_high");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("colors_area")
		    .appendField(new Blockly.FieldTextInput("---"), "colors_area");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("colors_height")
		    .appendField(new Blockly.FieldTextInput("---"), "colors_height");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("colors_weight")
		    .appendField(new Blockly.FieldTextInput("---"), "colors_weight");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("negative_controls_well")
		    .appendField(new Blockly.FieldTextInput("---"), "negative_controls_well");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("negative_controls_volume")
		    .appendField(new Blockly.FieldTextInput("---"), "negative_controls_volume");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("negative_controls_captured_events")
		    .appendField(new Blockly.FieldTextInput("---"), "negative_controls_captured_events");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("negative_controls_channel")
		    .appendField(new Blockly.FieldTextInput("---"), "negative_controls_channel");   
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("positive_controls_well")
		    .appendField(new Blockly.FieldTextInput("---"), "positive_controls_well");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("positive_controls_volume")
		    .appendField(new Blockly.FieldTextInput("---"), "positive_controls_volume");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("positive_controls_captured_events")
		    .appendField(new Blockly.FieldTextInput("---"), "positive_controls_captured_events");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("positive_controls_channel")
		    .appendField(new Blockly.FieldTextInput("---"), "positive_controls_channel");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("positive_controls_minimize_bleed_from")
		    .appendField(new Blockly.FieldTextInput("---"), "positive_controls_minimize_bleed_from");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("positive_controls_minimize_bleed_to")
		    .appendField(new Blockly.FieldTextInput("---"), "positive_controls_minimize_bleed_to");             
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("volume")
		    .appendField(new Blockly.FieldTextInput("---"), "volume");
		this.appendDummyInput()
		    .setAlign(Blockly.ALIGN_RIGHT)
		    .appendField("captured_events")
		    .appendField(new Blockly.FieldTextInput("---"), "captured_events");             
		                                 
		    
		                                 
	},
	/*****************************************************************************************************************************************************************/		
/*****************************************************************************************************************************************************************/	
	
	//This is the extract of the code in JSON which is called by the Blockly.JavaScript['pipette'] function 
	optionsDisplay_ : function(code, block) {
		var currentBlock = block; //local variable created to don't modify continuously another the first variable.
		var currentCode = code;  //local variable created to don't modify continuously another the first variable.
		
		currentCode= currentCode + '                     "channels": {\n                         "FSC": {\n';  // Write the next code added to the first code.
		currentCode= currentCode + '                             "voltage_range": {\n';  // Write the next code added to the first code.
		
		if( this.getFieldValue('channels_FSC_voltage_range_low')!=null){  //If the option "SPEED" is displayed in this moment in the container block connected:
			currentCode= currentCode + '                                 "low": "' +this.getFieldValue("channels_FSC_voltage_range_low") +'", \n';  // Write the next code added to the first code.
		}	
		if( this.getFieldValue('channels_FSC_voltage_range_high')!=null){
			currentCode= currentCode + '                                 "high": " ' +this.getFieldValue("channels_FSC_voltage_range_high") +'"\n                             },\n';
		}
		if(this.getFieldValue('channels_FSC_area')!=null){
			currentCode= currentCode + '                             "area": "' +this.getFieldValue("channels_FSC_area") + '", \n';
		}
		if(this.getFieldValue('channels_FSC_height')!=null){
			currentCode= currentCode + '                             "height": "' +this.getFieldValue("channels_FSC_height") +'", \n';
		}
		if(this.getFieldValue('channels_FSC_width')!=null){
			currentCode= currentCode + '                             "width": "' +this.getFieldValue("channels_FSC_width") +'"\n                         },\n';
		}
		currentCode = currentCode + '                         "SSC": {\n';
		currentCode= currentCode + '                             "voltage_range": {\n';  // Write the next code added to the first code.
		if( this.getFieldValue('channels_SSC_voltage_range_low')!=null){  //If the option "SPEED" is displayed in this moment in the container block connected:
			currentCode= currentCode + '                                 "low": "' +this.getFieldValue("channels_SSC_voltage_range_low") +'", \n';  // Write the next code added to the first code.
		}	
		if( this.getFieldValue('channels_SSC_voltage_range_high')!=null){
			currentCode= currentCode + '                                 "high": " ' +this.getFieldValue("channels_SSC_voltage_range_high") +'"\n                             },\n';
		}
		if(this.getFieldValue('channels_SSC_area')!=null){
			currentCode= currentCode + '                             "area": "' +this.getFieldValue("channels_SSC_area") + '", \n';
		}
		if(this.getFieldValue('channels_SSC_height')!=null){
			currentCode= currentCode + '                             "height": "' +this.getFieldValue("channels_SSC_height") +'", \n';
		}
		if(this.getFieldValue('channels_SSC_width')!=null){
			currentCode= currentCode + '                             "width": "' +this.getFieldValue("channels_SSC_width") +'"\n                         },\n';
		}
		currentCode = currentCode + '                         "colors":[{\n';
		if(this.getFieldValue('colors_name')!=null){
			currentCode= currentCode + '                             "name": "' +this.getFieldValue("colors_name") + '", \n';
		}
		if(this.getFieldValue('colors_emission_wavelength')!=null){
			currentCode= currentCode + '                             "emission_wavelength": "' +this.getFieldValue("colors_emission_wavelength") +'", \n';
		}
		if(this.getFieldValue('colors_excitation_wavelength')!=null){
			currentCode= currentCode + '                             "excitation_wavelength": ' +this.getFieldValue("colors_excitation_wavelength") +'"\n                         },\n';
		}
		currentCode= currentCode + '                             "voltage_range": {\n';  // Write the next code added to the first code.
		if( this.getFieldValue('colors_voltage_range_low')!=null){  //If the option "SPEED" is displayed in this moment in the container block connected:
			currentCode= currentCode + '                                 "low": " ' +this.getFieldValue("colors_voltage_range_low") +'", \n';  // Write the next code added to the first code.
		}	
		if( this.getFieldValue('colors_voltage_range_high')!=null){
			currentCode= currentCode + '                                 "high": " ' +this.getFieldValue("colors_voltage_range_high") +'"\n                             },\n';
		}
		if(this.getFieldValue('colors_area')!=null){
			currentCode= currentCode + '                             "area": "' +this.getFieldValue("colors_area") + '", \n';
		}
		if(this.getFieldValue('colors_height')!=null){
			currentCode= currentCode + '                             "height": "' +this.getFieldValue("colors_height") +'", \n';
		}
		if(this.getFieldValue('colors_width')!=null){
			currentCode= currentCode + '                             "width": "' +this.getFieldValue("colors_width") +'"\n                         },]\n                     },';
		}
		currentCode= currentCode + '                     "negative_controls": [{\n';  // Write the next code added to the first code.
		if(this.getFieldValue('negative_controls_well')!=null){
			currentCode= currentCode + '                         "well": "' +this.getFieldValue("negative_controls_well") +'", \n';
		}
		if(this.getFieldValue('negative_controls_volume')!=null){
			currentCode= currentCode + '                         "volume": "' +this.getFieldValue("negative_controls_volume") +'", \n';
		}
		if(this.getFieldValue('negative_controls_captured_events')!=null){
			currentCode= currentCode + '                         "captured_events": "' +this.getFieldValue("negative_controls_captured_events") +'", \n';
		}		
		if(this.getFieldValue('negative_controls_captured_channel')!=null){
			currentCode= currentCode + '                         "channel": [' +this.getFieldValue("negative_controls_channel") +'] \n                     }],\n';
		}
		currentCode= currentCode + '                     "positive_controls": [{\n';  // Write the next code added to the first code.
		if(this.getFieldValue('positive_controls_well')!=null){
			currentCode= currentCode + '                         "well": "' +this.getFieldValue("positive_controls_well") +'", \n';
		}
		if(this.getFieldValue('positive_controls_volume')!=null){
			currentCode= currentCode + '                         "volume": "' +this.getFieldValue("positive_controls_volume") +'", \n';
		}
		if(this.getFieldValue('positive_controls_captured_events')!=null){
			currentCode= currentCode + '                         "captured_events": "' +this.getFieldValue("positive_controls_captured_events") +'", \n';
		}		
		if(this.getFieldValue('positive_controls_captured_channel')!=null){
			currentCode= currentCode + '                         "channel": [' +this.getFieldValue("positive_controls_channel") +'] \n';
		}
		currentCode= currentCode + '                         "minimize_bleed": [{\n';  // Write the next code added to the first code.
		
		if(this.getFieldValue('positive_controls_minimize_bleed_from')!=null){
			currentCode= currentCode + '                             "from": "' +this.getFieldValue("positive_controls_minimize_bleed_from") +'", \n';
		}
		if(this.getFieldValue('positive_controls_minimize_bleed_to')!=null){
			currentCode= currentCode + '                             "to": [' +this.getFieldValue("positive_controls_minimize_bleed_to") +'] \n                     },]\n                     }],\n';
		}
		currentCode= currentCode + '                     "samples": [{\n';  // Write the next code added to the first code.
		if(this.getFieldValue('negative_controls_well')!=null){
			currentCode= currentCode + '                         "well": "' +currentBlock.getFieldValue("containerName") +'", \n';
		}
		if(this.getFieldValue('volume')!=null){
			currentCode= currentCode + '                         "volume": "' +this.getFieldValue("volume") +'", \n';
		}
		if(this.getFieldValue('captured_events')!=null){
			currentCode= currentCode + '                         "captured_events": "' +this.getFieldValue("captured_events") +'" \n';
		}	
		
		
		
		return currentCode;
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
						if( currentBlock.getFieldValue('container_type_global')>200){//If it is  AGAROSE
							currentBlock.setParent(null);//Remove the parent of its own parameters
							var dx = Blockly.SNAP_RADIUS * (currentBlock.RTL ? -1 : 1);//calculate the movement of the block in x axis
						    var dy = Blockly.SNAP_RADIUS * 2;//calculate the movement of the block in x axis
						    currentBlock.moveBy(dx, dy); //Move the block with the measures gotten.						
						}
					}
				}
        	}else if(blockSource!=null){
	        	if(blockSource.getFieldValue('container_type_global')>200){//If it is  a list 
	        		blockSource.setParent(null);//Remove the parent of its own parameters
					var dx = Blockly.SNAP_RADIUS * (blockSource.RTL ? -1 : 1);//calculate the movement of the block in x axis
				    var dy = Blockly.SNAP_RADIUS * 2;//calculate the movement of the block in x axis
				    blockSource.moveBy(dx, dy); //Move the block with the measures gotten.
			    }
    		}
		}*/
	}
};

