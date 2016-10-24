/*
The MIT License (MIT)

Copyright (c) 2016 Universidad Politécnica de Madrid

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @file This file is used for translation of blocks to JSON.
 * @author Vishal Gupta, Jesús Irimia, Iván Pau, Alfonso Rodríguez-Patón, Ángel Panizo <contactLIAUPM@gmail.com>
 */

/**********************************************************************************************************/
/**********************************************************************************************************/
/***************************************OPERATIONAL REGULAR FUNCTION*****************************************/
/**********************************************************************************************************/
/**********************************************************************************************************/

regularJSONTranslation_ = function(block) {
	var currentExecutingBlock=block
	

	//Loop to get the real number of container blocks connected to the centrifugation, because is the centrifugation that extract the info of each container block.
	var numberOfBlocks = 1;
	if(currentExecutingBlock.getInputTargetBlock('source') ){ //Get the block in the SOURCE input if exists
		blockSource = currentExecutingBlock.getInputTargetBlock('source') 
		var isList = blockSource.getInput('contListOption');//Check if it is a list
		/*FOR LIST CASE*/
		if(isList){
			var substring='contListOptionValueNum';  //Substring to complete with the number of the position of each block.
			var j = 0;
			for(var i = 0; i < blockSource.getFieldValue('contListOptionValue'); i++){
				j++;
				var string = substring+j;  //Creating the complete srting of the input where there is a container block.
				var currentBlock = blockSource.getInputTargetBlock(string)
				if(currentBlock!=null){
					JSONcode = JSONcode + '                "object":  "' + blockSource.getFieldValue("containerName") +'",\n'; 
				}	
			}
			JSONcode = currentExecutingBlock.optionsDisplay_(JSONcode, currentBlock);  //Call the function optionsDisplay_ which it exists in each function block, with their own parameters.
			
		/*CASE NOT LIST*/
		}else if ( numberOfBlocks == 1 && blockSource!=null){//If it exists child and it's just one.
			JSONcode = JSONcode + '                "object":  "' + blockSource.getFieldValue("containerName") +'",\n'; 
			JSONcode = currentExecutingBlock.optionsDisplay_(JSONcode,blockSource);  //Call the function optionsDisplay_ which it exists in each function block, with their own parameters.

		}
	}	
};


/**********************************************************************************************************/
/**********************************************************************************************************/
/***************************************OPERATIONAL REGULAR BLOCKS*****************************************/
/**********************************************************************************************************/
/**********************Basicly choose the possibility of change the first sentence of the block************/
/**********************************************************************************************************/

Blockly.JavaScript['centrifugation'] = function(block) {
	JSONcode = JSONcode + '             {\n                "op": "spin",\n'; 
	regularJSONTranslation_(this)
}

Blockly.JavaScript['electrophoresis'] = function(block) {
	JSONcode = JSONcode + '             {\n                "op": "gel_separate",\n';   
	regularJSONTranslation_(this)
}

Blockly.JavaScript['flashFreeze'] = function(block) {
	JSONcode = JSONcode + '             {\n                "op": "flash_freeze",\n';     
	regularJSONTranslation_(this)
}

Blockly.JavaScript['flowCitometry'] = function(block) {
	JSONcode = JSONcode + '             {\n                "op": "flow_analyze",\n';     
	regularJSONTranslation_(this)
}

Blockly.JavaScript['incubate'] = function(block) {	
	JSONcode = JSONcode + '             {\n                "op": "incubate",\n';     
	regularJSONTranslation_(this)
}

Blockly.JavaScript['mix'] = function(block) {
	JSONcode = JSONcode + '             {\n                "op": "mix",\n';    
	regularJSONTranslation_(this)
}
	
Blockly.JavaScript['oligosynthesize'] = function(block) {
	JSONcode = JSONcode + '             {\n                "op": "oligosynthesize",\n';     
	regularJSONTranslation_(this)
}
	
Blockly.JavaScript['sangerSequencing'] = function(block) {
	JSONcode = JSONcode + '             {\n                "op": "sanger_sequence",\n';
	regularJSONTranslation_(this)
}		

Blockly.JavaScript['thermocycling'] = function(block) {
	JSONcode = JSONcode + '             {\n                "op": "thermocycle",\n';
	regularJSONTranslation_(this)
}	

Blockly.JavaScript['measurement'] = function(block) {
	
	var type_measure = block.getFieldValue('parameters');
	switch (type_measure){//This function is to get the real name of the different kinds of measuring.
		case '1':
			type_measure="absorbance";
		break;
		case '2':
			type_measure="fluorescence";
		break;
		case '3':
			type_measure="luminiscence";
		break;
		case '4':
			type_measure="volume";
		break;
		case '5':
			type_measure="temperature";
		break;
		default:
		alert("Some error appeared translating language");
	}
	//Creating general code of PIPETTE function and its type
	JSONcode = JSONcode + '             {\n                "op": "' +type_measure +'",\n' ;
	regularJSONTranslation_(this)
}
	
/**********************************************************************************************************/
/**********************************************************************************************************/
/***************************************OPERATIONAL SPECIAL BLOCKS*****************************************/
/**********************************************************************************************************/
/*****************They are special just because they have source and destination blocks********************/
/*********Particularly PIPETTE is the most complex because it can include lists in source and dest*********/
/**********************************************************************************************************/
/**********************************************************************************************************/

/*This function is called by de runJS function which really calls the Blockly.JavaScript.workspaceToCode() function.*/
Blockly.JavaScript['cellSpreading'] = function(block) {
	
	JSONcode =JSONcode+ '             {\n                "op": "spread",\n';     //initialize the code for incubate function
	
	//Loop to get the real number of container blocks connected to the centrifugation, because is the centrifugation that extract the info of each container block.
	var numberOfBlocks = 1;
	if(this.getInputTargetBlock('source') ){ //Get the block in the SOURCE input if exists
		blockSource = this.getInputTargetBlock('source');
		blockDestination = this.getInputTargetBlock('destination');
		var isList = blockSource.getInput('contListOption');//Check if it is a list
		if ( numberOfBlocks == 1 && blockSource!=null){  //If it exists child and it's just one.
			JSONcode = JSONcode + '                "from":  "' + blockSource.getFieldValue("containerName")+'", \n'; 
			if(this.getInputTargetBlock('destination')!=null){
				JSONcode = JSONcode + '                "to":  "' + blockDestination.getFieldValue("containerName") +'", \n';
			JSONcode = this.optionsDisplay_(JSONcode,blockDestination); //Call the function optionsDisplay_ which it exists in each function block, with their own parameters.
			}
		}
	}	
};

/*This function is called by de runJS function which really calls the Blockly.JavaScript.workspaceToCode() function.*/
Blockly.JavaScript['colonyPicking'] = function(block) {
	
	JSONcode = JSONcode + '             {\n                "op": "autopick",\n';     //initialize the code for incubate function
	
	//Loop to get the real number of container blocks connected to the centrifugation, because is the centrifugation that extract the info of each container block.
	var numberOfBlocks = 1;
	if(this.getInputTargetBlock('source') ){ //Get the block in the SOURCE input if exists
		blockSource = this.getInputTargetBlock('source') ;
		blockDestination = this.getInputTargetBlock('destination');
		if ( numberOfBlocks == 1 && blockSource!=null){  //If it exists child and it's just one.
			JSONcode = JSONcode + '                "from":  "' + blockSource.getFieldValue("containerName")+'", \n'; 
			if(this.getInputTargetBlock('destination')){
				JSONcode = JSONcode + '                "to":  "' + blockDestination.getFieldValue("containerName")+'", \n';
			}	
			JSONcode = this.optionsDisplay_(JSONcode,blockSource); //Call the function optionsDisplay_ which it exists in each function block, with their own parameters.
		}
	}
	
};



/*This function is called by de runJS function which really calls the Blockly.JavaScript.workspaceToCode() function.*/
Blockly.JavaScript['pipette'] = function(block) {
	
	var type_pipette = block.getFieldValue('pipetteTypeName');
	switch (type_pipette){//This function is to get the real name of the different kinds of pipetting.
		case '1':
			type_pipette="transfer";
		break;
		case '2':
			type_pipette="distribute";
		break;
		case '3':
			type_pipette="consolidate";
		break;
		case '4':
			type_pipette="continuous transfer";
		break;
		default:
		alert("Some error appeared translating language");
	}
	//Creating general code of PIPETTE function and its type
	JSONcode = JSONcode + '             {\n                "op": "pipette",\n                    "groups" : [{ "' +type_pipette +'" :{ \n                        "from": ';
	
	//SOURCE operations:****************************************************************************************************************************
	//Loop to get the real number of container blocks connected to the pipette, because is the pipette that extract the info of each container block.
	var numberOfBlocks = 1; 
	if(this.getInputTargetBlock('source') ){ //Get the block in the SOURCE input if exists
		blockSource = this.getInputTargetBlock('source') 
		var isList = blockSource.getInput('contListOption');//Check if it is a list
		if(isList){
				JSONcode = JSONcode + "[\n			"
			var substring='contListOptionValueNum'; //Substring to complete with the number of the position of each block.
		
			var j = 0;
			for(var i = 0; i < blockSource.getFieldValue('contListOptionValue'); i++){
				j++;
				var string = substring+j //Creating the complete srting of the input where there is a container block.
				var currentBlock = blockSource.getInputTargetBlock(string)
				if (currentBlock != null){
					JSONcode = JSONcode + "                           {";
					JSONcode = JSONcode + '"well": ' + ' " ' +currentBlock.getFieldValue("containerName")+'" \n'
					
					JSONcode = this.optionsDisplay_(JSONcode, currentBlock); //Call the function optionsDisplay_ which it exists in each function block, with their own parameters.
					JSONcode = JSONcode.substring(0,JSONcode.length-2); //Remove the last two characters to rewrite properly the end of the sentence
					JSONcode = JSONcode + '}\n';
				}
			}
			JSONcode = JSONcode.substring(0,JSONcode.length-2); //Remove the last two characters to rewrite properly the end of the sentence
			JSONcode = JSONcode + "\n                           ]\n			";
		}
	
	
		/*CASE only one block in source*/
		else if ( numberOfBlocks == 1 && blockSource!=null){//If it exists child and it's just one.
			if ( blockSource.getInput('volume') || blockSource.getInput('datareference') || blockSource.getInput('singlewelladdrinput') || blockSource.getInput('singleWell') || blockSource.getInput('multipleWellAddrInput') || blockSource.getInput('multiplewells') || blockSource.getInput('gelcomposition') || blockSource.getInput('valueagarose') || blockSource.getInput('optionsCTMode') || blockSource.getInput('optionsCTMode2') || blockSource.getInput('steps')  ){
				JSONcode = JSONcode + '{';
				JSONcode = JSONcode + '"well" : "' + blockSource.getFieldValue("containerName") +'" \n'; 
				JSONcode = this.optionsDisplay_(JSONcode,blockSource);  //Call the function optionsDisplay_ which it exists in each function block, with their own parameters.
				JSONcode = JSONcode.substring(0,JSONcode.length-2); //Remove the last two characters to rewrite properly the end of the sentence
				JSONcode = JSONcode + '}\n';
			}else{
				JSONcode = JSONcode + '"' + blockSource.getFieldValue("containerName") +'" \n';
			}
		}
	}
	
	//DESTINATION operations:****************************************************************************************************************************
	//Loop to get the real number of container blocks connected to the pipette, because is the pipette that extract the info of each container block.
	JSONcode = JSONcode+ '                        ,"to": ';
	var numberOfBlocks = 1; 
	if(this.getInputTargetBlock('destination') ){ //Get the block in the SOURCE input if exists
		blockDestination = this.getInputTargetBlock('destination') 
		var isList = blockDestination.getInput('contListOption');//Check if it is a list
		if(isList){
			JSONcode = JSONcode + "[\n			"
			var substring='contListOptionValueNum'; //Substring to complete with the number of the position of each block.
			var j = 0;
			for(var i = 0; i < blockDestination.getFieldValue('contListOptionValue'); i++){
				j++;
				var string = substring+j //Creating the complete srting of the input where there is a container block.
				var currentBlock = blockDestination.getInputTargetBlock(string)
				if (currentBlock != null){
					JSONcode = JSONcode + "                           {";
					JSONcode= JSONcode + '"well": ' + ' " ' +currentBlock.getFieldValue("containerName") +'" \n'
					
					JSONcode = this.optionsDisplay_(JSONcode, currentBlock); //Call the function optionsDisplay_ which it exists in each function block, with their own parameters.
					JSONcode = JSONcode.substring(0,JSONcode.length-2); //Remove the last two characters to rewrite properly the end of the sentence
					JSONcode = JSONcode + '},\n';
				}
			}
			JSONcode = JSONcode.substring(0,JSONcode.length-2); //Remove the last two characters to rewrite properly the end of the sentence
			JSONcode = JSONcode + "\n                ]\n			"	
		} 
		/*CASE only one block in destination*/
		else if ( numberOfBlocks == 1 && blockDestination!=null){//If it exists child and it's just one.
			if ( blockDestination.getInput('volume') || blockDestination.getInput('datareference') || blockDestination.getInput('singlewelladdrinput') || blockDestination.getInput('singleWell') || blockDestination.getInput('multipleWellAddrInput') || blockDestination.getInput('multiplewells') || blockDestination.getInput('gelcomposition') || blockDestination.getInput('valueagarose') || blockDestination.getInput('optionsCTMode') || blockDestination.getInput('optionsCTMode2') || blockDestination.getInput('steps')  ){
				//JSONcode = JSONcode + '{';
				JSONcode = JSONcode + '"' + blockDestination.getFieldValue("containerName")+'" \n'; 
				JSONcode = this.optionsDisplay_(JSONcode,blockDestination);   //Call the function optionsDisplay_ which it exists in each function block, with their own parameters.
				//JSONcode = JSONcode.substring(0,JSONcode.length-2); //Remove the last two characters to rewrite properly the end of the sentence
				//JSONcode = JSONcode + '},\n';
			}else{
				JSONcode = JSONcode + '"' + blockDestination.getFieldValue("containerName")+'" \n';
			}
		}
	}
	JSONcode = JSONcode.substring(0,JSONcode.length-2); //Remove the last two characters to rewrite properly the end of the sentence
			
	JSONcode = JSONcode + "            }}]\n			"
	
};

Blockly.JavaScript['turbidostat'] = function(block) {

};

/**********************************************************************************************************/
/**********************************************************************************************************/
/***************************************************GENERAL BLOCKS*****************************************/
/**********************************************************************************************************/
/**********************************************************************************************************/

/*Although it is empty is necessary to create this functions to avoid errors*/
Blockly.JavaScript['experiment'] = function(block) {
	
};

/*Although it is empty is necessary to create this functions to avoid errors*/
Blockly.JavaScript['step'] = function(block) {
	
};

/*Although it is empty is necessary to create this functions to avoid errors*/
Blockly.JavaScript['container'] = function(block) {	
	
};

/*Although it is empty is necessary to create this functions to avoid errors*/
Blockly.JavaScript['containerList'] = function(block) {	
	
};


