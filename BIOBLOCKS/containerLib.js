/*
The MIT License (MIT)

Copyright (c) 2016 Universidad Politécnica de Madrid

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
		
/**
 * @file it contains all the functions to work with containers and their behaviour and changes swith the parent function
 * @author Vishal Gupta, Jesús Irimia, Iván Pau, Alfonso Rodríguez-Patón, Ángel Panizo <contactLIAUPM@gmail.com>
 */

/** 
 * Definition of the object which contains all the arrays of container parameters
 * */
var containerObject = {};
/**
 * The unit used for volume is milli-litres
 */
var containerList = {
	1 : "1.9", 
	2 : "5.9", 
	201 : "0.02", 
	202 : "49.7",
	301 : "0.18",
	302 : "0.18",
	4 : "149.7",
	5 : "149.7"	
};
/**
 * Path to the picture of each type of container
 */
var containerPicture = {
	0 : "images/empty.png",
	1 : "images/tube.png", 
	2 : "images/tube.png", 
	201 : "images/gel.png", 
	202 : "images/petri-dish.png",
	301 : "images/lab-wells.png",
	302 : "images/lab-wells.png",
	4 : "images/beaker.png",
	5 : "images/flask.png"
}

var tubeLikeContainersType = ["1", "2", "4", "5"]
var gelLikeContainerType = ["201"]
var petriDishLikeContainerType = ["202"]
var wellLikeContainerType = ["301", "302"]

/*Start the container Block*/
Blockly.Blocks['container'] = {
	
	init: function () { //Function to initialize the block
		/*Creating LOCAL array for this container block, The first you create a container block this fucntion is called.*/
		var containerArray = {};
		containerArray['id'] = this.id;
		containerObject[this.id] = containerArray; //It adds the LOCAL array in the GLOBAL object with the key "id".

		/*Usual initialization of a common block*/
		this.setInputsInline(false);
		this.setOutput(true, "containerCheck");//Giving output type "containerCheck"
		this.setColour(210);
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("CONTAINER")
		this.setTooltip('');

		/*PARAMETERS*/
		this.appendDummyInput("containerName")
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField("Name")
			.appendField(new Blockly.FieldTextInput("Insert name"), "containerName");

		this.lastParent = null;
		this.lastType = "1";
		this.myType = "1";
		this.lastOperation = null;


		//Drop down menu	
		//We define the programm names with numbers to facilitate their interpretation in the function. 
		//From 1 to x is not multiple well plate neither agarose, from x to 1 is a multiple container...
		var dropdownType = new Blockly.FieldDropdown([["eppendorf tube 2.0 ml", "1"], ["eppendorf tube 6.0 ml", "2"], ["agarose gel", "201"], ["petri dish", "202"], ["96-well plate", "301"], ["192-well plate", "302"], ["beaker 150.0 ml", "4"], ["volumetric flask 150.0 ml", "5"]], function (option) {
			var containerTypeLocal = option;
			this.sourceBlock_.myType = containerTypeLocal;//Reserve the type in this variable to add from other function inside the same block, because else it is not addressable
			if (this.sourceBlock_.lastType != containerTypeLocal) {
				var parentBlockWork = this.sourceBlock_.getCorrectParent();
				this.sourceBlock_.updateBlockForOperation(parentBlockWork);
				this.sourceBlock_.lastType = containerTypeLocal;
			}
		});

		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField('Type')
			.appendField(dropdownType, 'container_type_global');

		/*this.appendDummyInput()
			.setAlign(Blockly.ALIGN_RIGHT)	
			.appendField("Initial volume")
			.appendField(new Blockly.FieldTextInput("0.0"), "initial_volume")
			.appendField(new Blockly.FieldDropdown([["Milliliter", "milliliter"], ["Microliter", "microliter"], ["Nanoliter", "nanoliter"]]), "initial_volume_unit");*/


		this.appendDummyInput("Destiny")
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField("Destiny")
			.appendField(new Blockly.FieldDropdown([["Store at Ambient", "Ambient"], ["Store at -80 deg.C", "Minus80"], ["Store at -20 deg.C", "minus20"], ["Store at 0 deg.C", "Zero"], ["Store at 4 deg.C", "Four"], ["Discard in Bio-Waste", "Bio-Waste"], ["Discard in Chemical-Waste", "Chemical-Waste"], ["Discard in Regular-Waste", "Regular-Waste"]]), "Destiny");
	},
		
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/			
	/*Currently this function is useless, In the future we could optimize this calling directly resetInputs() function. Also is just called from de dropdown menu above (dropdownType)*/
	updateType_ : function(containerTypeLocal){
		this.resetInputs_();
		if(this.getParent()!=null && containerTypeLocal==201){//Check if the block has parent and if it has parent pipette and the pipette hasn't parent.

		var parentBlockWork= this.getParent();//If parent assign it in parentBlockWork
			var isList = parentBlockWork.getInput('contListOption');//'contListOption' Is a special input of "LIST OF CONTAINER" blocks
        	if(isList){		
	        	if ( parentBlockWork.getParent() != null){									 //If contListOption exists it mean that the direct parent is a list.
	        	parentBlockWork = parentBlockWork.getParent();   //In this case we get the real parent block.
        	}
        	}
    		if (parentBlockWork.getFieldValue("pipetteTypeName")==3 || parentBlockWork.getFieldValue("pipetteTypeName")==4){
        		this.setParent(null);//Remove the parent of its own parameters
				var dx = Blockly.SNAP_RADIUS * (this.RTL ? -1 : 1);//calculate the movement of the block in x axis
			    var dy = Blockly.SNAP_RADIUS * 2;//calculate the movement of the block in x axis
			    this.moveBy(dx, dy); //Move the block with the measures gotten.
		    }
    	}
    	if(this.getParent()!=null && containerTypeLocal>300){//Check if the block has parent and if it has parent pipette and the pipette hasn't parent.
    
			var parentBlockWork= this.getParent();//If parent assign it in parentBlockWork
			var isList = parentBlockWork.getInput('contListOption');//'contListOption' Is a special input of "LIST OF CONTAINER" blocks
        	if(isList){	
	        	if ( parentBlockWork.getParent() != null){										 //If contListOption exists it mean that the direct parent is a list.
	        		parentBlockWork = parentBlockWork.getParent();   //In this case we get the real parent block.
        		}
        	}
    		if ( parentBlockWork.getFieldValue("pipetteTypeName")==4){
        		this.setParent(null);//Remove the parent of its own parameters
				var dx = Blockly.SNAP_RADIUS * (this.RTL ? -1 : 1);//calculate the movement of the block in x axis
			    var dy = Blockly.SNAP_RADIUS * 2;//calculate the movement of the block in x axis
			    this.moveBy(dx, dy); //Move the block with the measures gotten.
		    }
    	}
	},
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/				
	
	
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/	
	/*This function save all the changes in a LOCAL array of this block which is stored in a GLOBAL OBJECT of local arrays.*/
	updateArrayObject_ : function(){
		var myId=this.id;	//we get our id, to locate us in the global array.
		myId=myId.toString();
		var currentArray=containerObject[myId];// We get access to the global array, and assign this array in the currentArray to work with a extern array. In this way we don't need access each change.
		
		/*Space to add all the new information in the array*/
		
		currentArray['containerName']=this.getFieldValue('containerName');//Saving the value of parameter containerName, in the same space of the LOCAL array. This example is the same for the remaining parameters
		currentArray['Destiny']=this.getFieldValue('Destiny');
		//currentArray['SEAL-COVER']=this.getFieldValue('SEAL-COVER');
		
		var volumeBlock = this.getInputTargetBlock('volume');
		if (volumeBlock){//Check if this input exists
			var volumeValue = "unknow"; //If the option "volume" is displayed in this moment in the container block connected:

			if (volumeBlock.getFieldValue('VAR') == null) { // block is a number
				volumeValue = Blockly.JavaScript.valueToCode(this, 'volume', Blockly.JavaScript.ORDER_NONE);
			} else {
				volumeValue = s.getFieldValue('VAR');
			}
			currentArray['volume']=volumeValue;//If the input exists set the current value of this input.
			currentArray['unit_volume']=this.getFieldValue('unit_volume');//If the input exists set the current value of this input.
		}
		
		
		/*Special Sanger Sequencing */
		if (this.getInput("datareference")!=null){
			currentArray['datareference']=this.getFieldValue('datareference');
		}
		
		/*sanger sequencing and measurement with multiple well*/
		if (this.getInput("singlemultiwells")!=null){
			currentArray['singlemultiwells']=this.getFieldValue('singlemultiwells');
			if (this.getInput("singleWell")!=null){
				currentArray['singlewelladdrinput']=this.getFieldValue('singlewelladdrinput');
				
			}
			if (this.getInput("multipleswells")!=null){
				currentArray['multipleswells']=this.getFieldValue('multipleswells');
			}	
			if (this.getInput("multiwell")!=null){
				currentArray['multipleWellAddrInput']=this.getFieldValue('multipleWellAddrInput');
			}
		}
		if (this.getInput("singleWell")!=null){
			currentArray['singlewelladdrinput']=this.getFieldValue('singlewelladdrinput');
		}
		
		if (this.getInput("multiplewells")!=null){
			currentArray['multiplewells']=this.getFieldValue('multiplewells');
			for( var i=0; i<this.getFieldValue('multiplewells');i++){//Loop which switch the number of wells update the fill the corr3ect number of blanks 
				currentArray["multiplewelladdress"+i]=this.getFieldValue("multiplewelladdress"+i);
				currentArray["volume"+i]=this.getInputTargetBlock("volume"+i);
				currentArray["unit_volume"+i]=this.getFieldValue("unit_volume"+i);
			}	 
		}
			
		/*Special for Agarose*/
		if (this.getInput("gelcomposition")!=null){
			currentArray['gelcomposition']=this.getFieldValue('gelcomposition');
		}
		if (this.getInput("valueagarose")!=null){
			currentArray['gelcomposition']=this.getFieldValue('gelcomposition');
			currentArray['valueagarose']=this.getFieldValue('valueagarose');
			for( var i=0; i<this.getFieldValue('valueagarose');i++){//Loop which switch the number of wells update the fill the corr3ect number of blanks
				currentArray["gelwelladdress"+i]=this.getFieldValue("gelwelladdress"+i);
				currentArray["volumegel"+i]=this.getInputTargetBlock("volumegel"+i);
				currentArray["unit_volume_gel"+i]=this.getFieldValue("unit_volume_gel"+i);
			}	 
		}
		
		/*Special for eppendorf*/
		
		/*if (this.getInput("optionsCTMode")!=null){
			currentArray['flowrate']=this.getFieldValue('flowrate');
			currentArray['continuousmixing']=this.getFieldValue('continuousmixing');
		}
		if (this.getInput("optionsCTMode2")!=null){
			currentArray['continuousmixing']=this.getFieldValue('continuousmixing');
		}*/
		
		/*Special thermocycling*/
		if (this.getInput("steps")!=null){
			currentArray['steps']=this.getFieldValue('steps');
			for( var i=0; i<this.getFieldValue('steps');i++){//Loop which switch the number of steps update the fill the correct number of blanks
				currentArray["temperature"+i]=this.getFieldValue("temperature"+i);
				currentArray["temperature_units"+i]=this.getFieldValue("temperature_units"+i);
				currentArray["duration"+i]=this.getFieldValue("duration"+i);
				currentArray["duration_units"+i]=this.getFieldValue("duration_units"+i);
			}	 
		}
		
	},
	
	
	
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/	
	/*This function go over it own local array and update with the memo values.*/
	/*Also it is essential when we restart the programme or we save and load some blocks, because it need to recover all the array data*/
	updateFieldsFromArray_ : function(){
		var myId = this.id;//we get our id, to locate us in the global array.
		myId=myId.toString()
		
		var currentArray=containerObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
		
		/*update volume*/
		if (this.getInputTargetBlock("volume")!=null){//Check if the input exists
			if(currentArray.hasOwnProperty('volume')){ //Check if this parameters was previously stored in the local array to avoid errors.
				/*var volumeValue = currentArray['volume'];
				if (!isNaN(volumeValue)) {
					var block = new Blockly.Block(Blockly.mainWorkspace, "math_number", "");
					//var temp = block.getFieldValue('NUM');
					
					Blockly.mainWorkspace.addTopBlock(block);
					//this.getInputTargetBlock("volume").connections.connect(block.outputConnection);
				} else {

				}*/
			}
			if(currentArray.hasOwnProperty('unit_volume')){ //Check if this parameters was previously stored in the local array to avoid errors.
				this.setFieldValue(currentArray['unit_volume'],"unit_volume") //Set the value of the array in this input field
			}
		}
		if (this.getInput("datareference")!=null){
			if(currentArray.hasOwnProperty('datareference')){
				this.setFieldValue(currentArray['datareference'],"datareference");
			}
		}
		
		if (this.getInput("optionsCTMode")!=null){
			if(currentArray.hasOwnProperty('flowrate')){
				this.setFieldValue(currentArray['flowrate'],"flowrate");
			}
			if(currentArray.hasOwnProperty('continuousmixing')){
				this.setFieldValue(currentArray['continuousmixing'],"continuousmixing");
			}
		}
		if (this.getInput("optionsCTMode2")!=null){
			if(currentArray.hasOwnProperty('continuousmixing')){
				this.setFieldValue(currentArray['continuousmixing'],"continuousmixing")
			}
		}
		
		if (this.getInput("valueagarose")!=null){
			if(currentArray.hasOwnProperty('gelcomposition')){
				this.setFieldValue(currentArray['gelcomposition'],"gelcomposition")
			}
		}
		
		if (this.getInput("singleWell")!=null){
			if(currentArray.hasOwnProperty('singlewelladdrinput')){
				this.setFieldValue(currentArray['singlewelladdrinput'],"singlewelladdrinput")
			}
		}
		if (this.getInput("multiwell")!=null){
			
			if(currentArray.hasOwnProperty('multipleWellAddrInput')){
				this.setFieldValue(currentArray['multipleWellAddrInput'],"multipleWellAddrInput")
			}
		}
		
	},
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/	
	/*This is a particular function of JS*/
	/*each change appeared in the workspace/context call to this function*/
	/*we are using it to set the shape, display parameters and similar matter*/
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/
	onchange : function() {
		this.updateArrayObject_();
		this.checkChanges();	
	},

/****************************************************************************************************************************************************************/		
/* this functions checks if relevant changes has occurred to the block and change it acordingly
/****************************************************************************************************************************************************************/
	checkChanges : function() {
		var parentBlockWork = this.getCorrectParent();
		if (parentBlockWork == null) {
			if (this.lastParent != null) {
				this.resetInputs_();
				this.lastParent = null;
				this.lastOperation = null;
			}
		} else if (this.lastParent != parentBlockWork.getFieldValue()) {
			this.updateBlockForOperation(parentBlockWork);
			this.updateLastBlockStatus(parentBlockWork);
		} else {
			var operartion = this.getParentOperation(parentBlockWork);
			if (this.lastOperation != operartion) {
				this.updateBlockForOperation(parentBlockWork);
				this.updateLastBlockStatus(parentBlockWork);
			}
		}
		
	},
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/
	getCorrectParent : function() {
		var parentBlockWork = this.getParent();//If parent assign it in parentBlockWork
		if (parentBlockWork) {
			var isList = parentBlockWork.getInput('contListOption');//'contListOption' Is a special input of "LIST OF CONTAINER" blocks
			if (isList) {											 //If contListOption exists it mean that the direct parent is a list.
				parentBlockWork = parentBlockWork.getParent();   //In this case we get the real parent block.
			}
		}
		return parentBlockWork;
	},

	getCorrectInputContainer : function(parentBlock, inputName) {
		var correctInput = null;
		var inputBlock = parentBlock.getInputTargetBlock(inputName);

		if (inputBlock) {
			if (inputBlock.getInput('contListOption')) { //is containerList
				var listLength = inputBlock.getFieldValue("contListOptionValue");
				correctInput = null
				for (var i = 1; (correctInput == null) && (i < listLength + 1); i++) {
					var chain = 'contListOptionValueNum' + i//Name of the current block
					var currentBlock = inputBlock.getInputTargetBlock(chain);//Current block got with chain
					if (currentBlock != null && currentBlock == this) {
						correctInput = currentBlock;
					}
				}
			} else if (inputBlock == this) {
				correctInput = inputBlock;
			}
		}
		return correctInput;
	},

	getParentOperation : function (parentBlock) {
		var operartion = null;
		if (parentBlock) {
			switch (parentBlock.getFieldValue()) {
				case "PIPETTE":
					operartion = parentBlock.getFieldValue("pipetteTypeName");
					break;
				case "MEASUREMENT":
					operartion = parentBlock.getFieldValue("parameters");
					break;
			}
		}
		return operartion;
	},

	updateLastBlockStatus : function(parentBlockWork) {
		this.lastParent = parentBlockWork.getFieldValue();
		this.lastOperation = this.getParentOperation(parentBlockWork);
	},

	updateBlockForOperation : function(parentBlock) {
		if (parentBlock) {
			var parentTitle = parentBlock.getFieldValue();
			switch (parentTitle) {
				case "PIPETTE":
					this.attachedToPippete(parentBlock);
					break;
				case "ELECTROPHORESIS":
					this.attachedToElectrophoresis(parentBlock);
					break;
				case "CENTRIFUGATION":
					this.attachedToCentrifugation(parentBlock);
					break;
				case "THERMOCYCLING":
					this.attachedToThermocycling(parentBlock);
					break;
				case "MEASUREMENT":
					this.attachedToMeasurement(parentBlock);
					break;
				case "SANGER SEQUENCING":
					this.attachedToSanger(parentBlock);
					break;
				case "OLIGOSYNTHESIZE":
					this.attachedToOligosynthesize(parentBlock);
					break;
				case "COLONY PICKING":
					this.attachedToColonyPicking(parentBlock);
					break;
				case "CELL SPREADING":
					this.attachedToCellSpreading(parentBlock);
					break;
				case "FLASH FREEZE":
					this.attachedToFlashFreeze(parentBlock);
					break;
				case "MIX":
					this.attachedToMix(parentBlock);
					break;
				case "FLOW CITOMETRY":
					this.attachedToFlowCitometry(parentBlock);
					break;
				default:
					break;
			}
		}
	},

	attachedToFlowCitometry : function (flowCityBlock) {
		if (gelLikeContainerType.indexOf(this.myType) != -1 ||
			petriDishLikeContainerType.indexOf(this.myType) != -1)
		{
			this.unplugAndMove();
		}		
	},

	attachedToMix : function (mixBlock) {
		if (gelLikeContainerType.indexOf(this.myType) != -1 ||
			petriDishLikeContainerType.indexOf(this.myType) != -1 ||
			wellLikeContainerType.indexOf(this.myType) != -1)
		{
			this.unplugAndMove();
		}	
	},

	attachedToFlashFreeze : function (flashBlock) {
		if (gelLikeContainerType.indexOf(this.myType) != -1 ||
				petriDishLikeContainerType.indexOf(this.myType) != -1)
		{
			this.unplugAndMove();	
		}	
	},

	attachedToCellSpreading : function (cellSpreadingBlock) {
		var source = this.getCorrectInputContainer(cellSpreadingBlock, "source");
		var destination = this.getCorrectInputContainer(cellSpreadingBlock, "destination");

		this.resetInputs_();
		if (destination && destination == this) {
			if (tubeLikeContainersType.indexOf(this.myType) != -1 ||
				wellLikeContainerType.indexOf(this.myType) != -1)
			{
				this.unplugAndMove();
			} else if (gelLikeContainerType.indexOf(this.myType) != -1 ||
				petriDishLikeContainerType.indexOf(this.myType) != -1)
			{
				this.addVolumeInput();
			}
		} else if (source && source == this) {
			if (gelLikeContainerType.indexOf(this.myType) != -1 ||
				petriDishLikeContainerType.indexOf(this.myType) != -1)
			{
				this.unplugAndMove();
			}	
		}
	},

	attachedToColonyPicking : function (colonyBlock) {
		var source = this.getCorrectInputContainer(colonyBlock, "source");
		var destination = this.getCorrectInputContainer(colonyBlock, "destination");

		if (source && source == this) {
			if (tubeLikeContainersType.indexOf(this.myType) != -1 ||
				wellLikeContainerType.indexOf(this.myType) != -1)
			{
				this.unplugAndMove();
			}
		} else if (destination && destination == this) {
			if (gelLikeContainerType.indexOf(this.myType) != -1 ||
				petriDishLikeContainerType.indexOf(this.myType) != -1)
			{
				this.unplugAndMove();
			}	
		}
	},

	attachedToOligosynthesize : function (oligoBlock) {
		if (gelLikeContainerType.indexOf(this.myType) != -1 ||
			petriDishLikeContainerType.indexOf(this.myType) != -1) 
		{
			this.unplugAndMove();
		}
	},

	attachedToSanger: function (sangerBlock) {
		this.resetInputs_();
		if (gelLikeContainerType.indexOf(this.myType) != -1) {
			this.unplugAndMove();
		} else if (petriDishLikeContainerType.indexOf(this.myType) != -1 ||
			tubeLikeContainersType.indexOf(this.myType) != -1) 
		{
			this.addDatareferente();
		} else if (wellLikeContainerType.indexOf(this.myType) != -1) {
			this.addDatareferente();
			this.addWellMeasure();
		}
	},

	attachedToMeasurement : function (measureBlock) {
		this.resetInputs_();
		if (wellLikeContainerType.indexOf(this.myType) != -1) {
			this.addWellMeasure();
		} 
	},

	attachedToThermocycling : function (thermoBlock) {
		this.resetInputs_();
		if (petriDishLikeContainerType.indexOf(this.myType) != -1) {
			this.unplugAndMove();
		} else if (tubeLikeContainersType.indexOf(this.myType) != -1 ||
				gelLikeContainerType.indexOf(this.myType) != -1 ||
				wellLikeContainerType.indexOf(this.myType) != -1)
		{
			this.addThermocyclingSteps();
		}	
	},

	attachedToCentrifugation : function (centrifugationBlock) {
		if (petriDishLikeContainerType.indexOf(this.myType) != -1) {
			this.unplugAndMove();
		}	
	},

	attachedToElectrophoresis : function (electroBlock) {
		if (gelLikeContainerType.indexOf(this.myType) == -1) {
			this.unplugAndMove();
		}
	},
	
	attachedToPippete : function(pipetteBlock) {
		var containerType = this.myType;
		var destination = this.getCorrectInputContainer(pipetteBlock, "destination");
		var source =  this.getCorrectInputContainer(pipetteBlock, "source");
		
		if (tubeLikeContainersType.indexOf(containerType) != -1) {
			if (source && source == this) {
				this.attachedToPippete_isTubeSource(pipetteBlock);	
			} else if (destination && destination == this) {
				this.attachedToPippete_isTubeDestination(pipetteBlock);
			}
		} else if (gelLikeContainerType.indexOf(containerType) != -1) {
			if (source && source == this) {
				this.attachedToPippete_isGelSource(pipetteBlock);
			} else if (destination && destination == this) {
				this.attachedToPippete_isGelDestination(pipetteBlock);	
			}
		} else if (petriDishLikeContainerType.indexOf(containerType) != -1) {
			if (source && source == this) {
				this.attachedToPippete_isPetriDishSource(pipetteBlock);
			} else if (destination && destination == this) {
				this.attachedToPippete_isPetriDishDestination(pipetteBlock);	
			}
		} else if (wellLikeContainerType.indexOf(containerType) != -1) {
			if (source && source == this) {
				this.attachedToPippete_isWelSource(pipetteBlock);
			} else if (destination && destination == this) {
				this.attachedToPippete_isWelDestination(pipetteBlock);	
			}
		}
	},

	attachedToPippete_isTubeSource : function(pipetteBlock) {
		var pipetteType = pipetteBlock.getFieldValue("pipetteTypeName");
		if (pipetteType) {
			this.resetInputs_();
			if (pipetteType == "3") { //is consolidate
				this.addVolumeInput("volume");
			}
		} else {
			console.log("WARNING: pipette block without \"pipetteTypeName\" type");
		}	
	},

	attachedToPippete_isTubeDestination : function(pipetteBlock) {
		var pipetteType = pipetteBlock.getFieldValue("pipetteTypeName");
		if (pipetteType) {
			this.resetInputs_();
			if (pipetteType == "1" || pipetteType == "2") { //is transfer o distribute
				this.addVolumeInput("volume");
			} 
		} else {
			console.log("WARNING: pipette block without \"pipetteTypeName\" type");
		}	
	},

	attachedToPippete_isGelSource : function(pipetteBlock) {
		this.unplugAndMove();	
	},

	attachedToPippete_isGelDestination : function(pipetteBlock) {
		var pipetteType = pipetteBlock.getFieldValue("pipetteTypeName");
		if (pipetteType) {
			this.resetInputs_();
			if (pipetteType == "1" || pipetteType == "2") { //is transfer o distribute
				this.addGelInput();
			} else {
				this.unplugAndMove();
			}
		} else {
			console.log("WARNING: pipette block without \"pipetteTypeName\" type");
		}		
	},

	attachedToPippete_isWelSource : function(pipetteBlock) {
		var pipetteType = pipetteBlock.getFieldValue("pipetteTypeName");
		if (pipetteType) {
			this.resetInputs_();
			if (pipetteType == "1" || pipetteType == "2") { //is transfer o distribute
				this.addSingleWelInput();		
			} else if (pipetteType == "3") { // is consolidate
				this.addMultiwellInput();
			}
		} else {
			console.log("WARNING: pipette block without \"pipetteTypeName\" type");
		}			
	},

	attachedToPippete_isWelDestination: function(pipetteBlock) {
		var pipetteType = pipetteBlock.getFieldValue("pipetteTypeName");
		if (pipetteType) {
			this.resetInputs_();
			if (pipetteType == "1") { //is transfer o distribute
				this.addSingleWelInput();
				this.addVolumeInput();
			} else if (pipetteType == "2") { // is distribute
				this.addMultiwellInput();
			} else if (pipetteType == "3") { // is consolidate
				this.addSingleWelInput();
			}
		} else {
			console.log("WARNING: pipette block without \"pipetteTypeName\" type");
		}	
	},

	attachedToPippete_isPetriDishSource : function(pipetteBlock) {
		this.unplugAndMove();
	},

	attachedToPippete_isPetriDishDestination : function(pipetteBlock) {
		this.unplugAndMove();
	},

	addDatareferente: function () {
		if (this.getInput('datareference') == null) { //If the parent is SS and it has not the datareference input, it create it. Its so much important check if it exists because, this is checked each change.
			this.appendValueInput('datareference')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("data reference");
		}
	},

	addWellMeasure: function () {
		if (this.getInput("singlemultiwells") == null) {//Check if the input already exists, for not create again
			var dropdownSingleMultiple = new Blockly.FieldDropdown([["single well", "1"], ["multiple wells", "2"]], function (option) {
				var containerSingleMulti = option;
				this.sourceBlock_.updateSingleMultiple_(containerSingleMulti);//Call this function to start the DD menu
				this.previousSingleMulti = containerSingleMulti;
			});
			this.appendDummyInput('singlemultiwells')//The DD menu is created, but with thi line it appears in the block
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField(dropdownSingleMultiple, 'singlemultiwells')
			var myId = this.id;//we get our id, to locate us in the global array.
			myId = myId.toString()
			var currentArray = containerObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.

			if (currentArray.hasOwnProperty("singlemultiwells")) {
				this.updateSingleMultiple_(currentArray['singlemultiwells']);
				this.setFieldValue(currentArray['singlemultiwells'], "singlemultiwells");
			}
			if (this.getFieldValue("singlemultiwells") == 1) {
				if (this.getInput("singleWell") == null) {
					this.appendDummyInput("singleWell")
						.setAlign(Blockly.ALIGN_RIGHT)
						.appendField("Single well address")
						.appendField(new Blockly.FieldTextInput("e.g. A-1 or C-3"), "singlewelladdrinput");
				}
				if (currentArray.hasOwnProperty('singlewelladdrinput')) {
					this.setFieldValue("singlewelladdrinput");
				}
			}
		}
	},

	addThermocyclingSteps: function () {
		if (this.getInput("steps") == null) {//Check if the input already exists, for not create again
			var dropdownNumber2 = new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"]], function (option) {
				var numberChoose = option;
				this.actualValue = numberChoose;
				this.sourceBlock_.updateNumbersteps_(numberChoose);
			});
			var myId = this.id;//we get our id, to locate us in the global array.
			myId = myId.toString()

			var currentArray = containerObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
			this.appendDummyInput("steps")
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField(dropdownNumber2, 'steps')
				.appendField(" steps");
			
			if (currentArray.hasOwnProperty('steps')) {
				this.updateNumbersteps_(currentArray['steps']);
				for (var i = 0; i < currentArray['steps']; i++) {
					this.setFieldValue(currentArray['steps'], 'steps');
					this.setFieldValue(currentArray["temperature" + i], "temperature" + i);
					this.setFieldValue(currentArray["temperature_units" + i], "temperature_units" + i);
					this.setFieldValue(currentArray["duration" + i], "duration" + i);
					this.setFieldValue(currentArray["duration_units" + i], "duration_units" + i);
				}
			} else {
				this.updateFieldsFromArray_();
				this.appendDummyInput("valueTexts3")
					.setAlign(Blockly.ALIGN_RIGHT)
					.appendField("temperature")
					.appendField(new Blockly.FieldNumber("0"), "temperature0")
					.appendField(new Blockly.FieldDropdown([["Celsius", "celsius"], ["Kelvin", "kelvin"]]), "temperature_units0")
					.appendField("duration")
					.appendField(new Blockly.FieldNumber("0"), "duration0")
					.appendField(new Blockly.FieldDropdown([["Minutes", "minute"], ["Millisecond", "millisecond"], ["Seconds", "second"], ["Hours", "hour"]]), "duration_units0");
			}
		}
	},

	addVolumeInput : function () {
		if (!this.getInput("volume")) {
			this.appendValueInput("volume")
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("volume")
				.setCheck(["Number", "Variable"])
				.appendField(new Blockly.FieldDropdown([
					["Milliliter", "milliliter"],
					["Microliter", "microliter"],
					["Nanoliter", "nanoliter"]]),
				"unit_volume");
		}
	},

	addGelInput: function () {
		if (!this.getInput("valueagarose")) {
			var dropdownNumber = new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"]], function (option) {
				var numberChoose = option;
				this.actualValue = numberChoose;
				this.sourceBlock_.updateNumberWells_(numberChoose);
			});

			this.appendDummyInput("valueagarose")
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("gel composition (%)")
				.appendField(new Blockly.FieldTextInput("---"), "gelcomposition");

			this.appendDummyInput("valueagarose")
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("Number ")
				.appendField(dropdownNumber, 'numberOfwels');
		}

		if (!this.getInput("valueTexts")) {
			this.appendDummyInput("valueTexts")
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("gel well address1")
				.appendField(new Blockly.FieldTextInput("---"), "gelwelladdress0");
		}

		if (!this.getInput("volumegel0")) {
			this.appendValueInput("volumegel0")
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("volume")
				.setCheck(["Number", "Variable"])
				.appendField(new Blockly.FieldDropdown([
					["Milliliter", "milliliter"],
					["Microliter", "microliter"],
					["Nanoliter", "nanoliter"]]),
				"unit_volume_gel0");
		}
	},

	addSingleWelInput : function () {
		if (!this.getInput('singleWell')) {
			this.appendDummyInput('singleWell')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("Single well address")
				.appendField(new Blockly.FieldTextInput("e.g. A-1 or C-3"), "singlewelladdrinput");
		}
	},

	addMultiwellInput: function () {
		if (this.getInput("multiplewells") == null) {//Check if the input already exists, for not create again
			var dropdownNumber2 = new Blockly.FieldDropdown([["same", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"]], function (option) {
				var numberChoose = option;
				this.actualValue = numberChoose;
				this.sourceBlock_.updateNumberWells2_(numberChoose);
			});

			this.appendDummyInput("multiplewells")
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField(dropdownNumber2, 'multiplewells')
				.appendField(" addresses");

			this.appendDummyInput("valueTexts2")
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("multiple well address")
				.appendField(new Blockly.FieldTextInput("---"), "multiplewelladdress0")
			
			this.appendValueInput("volume0")
				.setAlign(Blockly.ALIGN_RIGHT)
				.setCheck(["Number", "Variable"])
				.appendField("volume")
				.appendField(new Blockly.FieldDropdown([["Milliliter", "milliliter"], ["Microliter", "microliter"], ["Nanoliter", "nanoliter"]]), "unit_volume0");
		}
	},

	unplugAndMove : function() {
		var dx = Blockly.SNAP_RADIUS * (this.RTL ? -1 : 1);//calculate the movement of the block in x axis
		var dy = Blockly.SNAP_RADIUS * 2;//calculate the movement of the block in x axis
		//this.setParent(null);
		if (this.outputConnection) {
			if (this.outputConnection.isConnected()) {
				// Disconnect from any superior block.
				this.outputConnection.disconnect();
			}
		}
		this.moveBy(dx, dy); //Move the block with the measures gotten.
		
		this.setParent(null);
		this.lastParent = null;
		this.lastOperation = null;
	},
/*****************************************************************************************************************************************************************/		
/*****************************************************************************************************************************************************************/		
	/**
	 * Checks if the initial volume of the container blocks is not bigger than the 
	 * actual capacity of the container
	 */
	checkInitialValue : function(){
		/*if (this.getFieldValue("initial_volume")) {
			var currentVolume = Number(this.getFieldValue("initial_volume"))
			if(this.getFieldValue("initial_volume_unit")=="nanoliter"){
				currentVolume = currentVolume/1000000;
			}else if(this.getFieldValue("initial_volume_unit")=="microliter"){
				currentVolume = currentVolume/1000;
			}

			if (currentVolume > Number(containerList[this.getFieldValue("container_type_global")])) {
				alert("WARNING: The initial volume of the container can't be bigger than the container's capacity");
			}		
		}*/
	},


/*This function was created to know what is the connection beteween this block and it pipette parent in the case.*/	
/******Input: none; ***  output: integer     *******************************/
/****** INFO about output: SOURCE=0,1; DESTINATION=2,3; THERE ISN'T PARENT PIPETTE=4 ****/

	sourceOrDest_ : function(){
		parentCurrentBlock=this.getParent();//Obtain the parent
		var isList = parentCurrentBlock.getInput('contListOption');//Check if it has the "contListOption" parameter, only included in "List of Container" block
		/*IF IS LIST*/
		if(isList){
			parentCurrentBlock2 = parentCurrentBlock.getParent();//If is a list get the parent
			if(parentCurrentBlock2!=null){
				if(parentCurrentBlock2.getInputTargetBlock('source')==parentCurrentBlock){
				//parentcurrentBlock2 is the pipette the function obtain the child connected in source, if this child is the same of parentcurrentBlock(the list), then return SOURCE	 
					var sod = 1;return sod;
				}else if(parentCurrentBlock2.getInputTargetBlock('destination')==parentCurrentBlock){
				//parentcurrentBlock2 is the pipette the function obtain the child connected in destination, if this child is the same of parentcurrentBlock(the list), then return DESTINATION
					var sod=3;return sod;
				}
			}else{sod=4;return sod;}/*If the parent of the list not exists*/
		/*IF IS NOT LIST*/
		}else{
			if (parentCurrentBlock.getInputTargetBlock('source') == this ||
				parentCurrentBlock.getInputTargetBlock('media') == this || //values for trubidostat
				parentCurrentBlock.getInputTargetBlock('cellCulture') == this ||
				parentCurrentBlock.getInputTargetBlock('waste') == this) 
			{
				var sod = 0; return sod;
			} else if (parentCurrentBlock.getInputTargetBlock('destination') == this) {
				var sod = 2; return sod;
			} else { alert("Warning. Error appeared in sourceOrDest_()"); }
		}	
	},
/*****************************************************************************************************************************************************************/		
/*****************************************************************************************************************************************************************/		
/*Function to update the number of different wells with a concrete volume gel and the gel well address for an agarose gel.*/
	updateNumberWells_ : function(numberChoose){
		
		if(this.getInput('valueTexts')){//First step to update the number of wells it's delete the actual inputs for an easier way.
			do{
				this.removeInput('valueTexts');//Remove the input if it exists.
			}while(this.getInput('valueTexts'));//Remove all the inputs.

			var i = 0;
			while(this.getInput("volumegel" + i)) {
				this.removeInput("volumegel" + i);
				i++;
			}
		}
		
		for (var i = 0; i< numberChoose; i++){//Loop to create as many inputs needed
			this.appendDummyInput("valueTexts")
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("gel well address"+(i+1))
				.appendField(new Blockly.FieldTextInput("---"), "gelwelladdress"+i);
			this.appendValueInput("volumegel" + i)
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("volume")
				.setCheck(["Number", "Variable"])
				.appendField(new Blockly.FieldDropdown([
					["Milliliter", "milliliter"],
					["Microliter", "microliter"],
					["Nanoliter", "nanoliter"]]),
				"unit_volume_gel" + i);
		}

		// UPDATE LOCAL ARRAY
		var myId = this.id;//we get our id, to locate us in the global array.
		myId=myId.toString()
		var currentArray=containerObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
		if(currentArray.hasOwnProperty('valueagarose') && numberChoose !=0 ){
			for(var i=0; i<numberChoose;i++){
				if(currentArray.hasOwnProperty("gelwelladdress"+i) ){
					this.setFieldValue(currentArray["gelwelladdress"+i],"gelwelladdress"+i);
				}
				if(currentArray.hasOwnProperty("volumegel"+i)){
					this.setFieldValue(currentArray["volumegel"+i],"volumegel"+i)
					this.setFieldValue(currentArray["unit_volume_gel"+i],"unit_volume_gel"+i);
				}
			}
		}
	},
/*Function to update the number of different wells with a concrete volume  and the well address for multiple well plate.*/
	updateNumberWells2_ : function(numberChoose){
		
		if(this.getInput('valueTexts2')){//First step to update the number of wells it's delete the actual inputs for an easier way.
			do{
				this.removeInput('valueTexts2');//Remove the input if it exists.
			}while(this.getInput('valueTexts2'));//Remove all the inputs.

			var i = 0;
			while(this.getInput("volume" + i)) {
				this.removeInput("volume" + i);
				i++;
			}
		}
		for (var i = 0; i< numberChoose; i++){//Loop to create as many inputs needed
			this.appendDummyInput("valueTexts2")
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("multiple well address"+(i+1))
				.appendField(new Blockly.FieldTextInput("---"), "multiplewelladdress"+i)
			this.appendValueInput("volume" + i)
				.setAlign(Blockly.ALIGN_RIGHT)
				.setCheck(["Number", "Variable"])
				.appendField("volume"+(i+1))
				.appendField(new Blockly.FieldDropdown([["Milliliter", "milliliter"], ["Microliter", "microliter"], ["Nanoliter", "nanoliter"]]), "unit_volume"+i);
		}
		var myId = this.id;//we get our id, to locate us in the global array.
		myId=myId.toString()
		var currentArray=containerObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
		if(currentArray.hasOwnProperty('multiplewells') && numberChoose !=0 ){
			for(var i=0; i<numberChoose;i++){
				if(currentArray.hasOwnProperty("multiplewelladdress"+i) ){
					this.setFieldValue(currentArray["multiplewelladdress"+i],"multiplewelladdress"+i);
				}
				if(currentArray.hasOwnProperty("volume"+i)){
					this.setFieldValue(currentArray["volume"+i],"volume"+i);
					this.setFieldValue(currentArray["unit_volume"+i],"unit_volume"+i);
				}
			}
		}
		
	},
/*Function to update the number of different steps ina a thermocycling function, with a concret temperature and duration of the function .*/	
	updateNumbersteps_ : function(numberChoose){
	
		if(this.getInput('valueTexts3')){//First step to update the number of wells it's delete the actual inputs for an easier way.
			do{
				this.removeInput('valueTexts3');//Remove the input if it exists.
			
			}while(this.getInput('valueTexts3'));//Remove all the inputs.
		}
		
		for (var i = 0; i< numberChoose; i++){//Loop to create as many inputs needed
			this.appendDummyInput("valueTexts3")
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("temperature"+(i+1))
				.appendField(new Blockly.FieldNumber("0"), "temperature"+i)
				.appendField(new Blockly.FieldDropdown([["Celsius", "celsius"], ["Kelvin", "kelvin"]]), "temperature_units" + i)
				.appendField("duration"+(i+1))
				.appendField(new Blockly.FieldNumber("0"), "duration"+i)
				.appendField(new Blockly.FieldDropdown([["Minutes", "minute"], ["Millisecond", "millisecond"], ["Seconds", "second"], ["Hours", "hour"]]), "duration_units" + i);
		}
		
		var myId = this.id;//we get our id, to locate us in the global array.
		myId=myId.toString()
		var currentArray=containerObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
		if(currentArray.hasOwnProperty('steps') && numberChoose !=0 ){
			for(var i=0; i<numberChoose;i++){
				if(currentArray.hasOwnProperty("temperature" + i) ){
					this.setFieldValue(currentArray["temperature" + i],"temperature" + i);
					this.setFieldValue(currentArray["temperature_units" + i],"temperature_units" + i);
				}
				if(currentArray.hasOwnProperty("duration" + i)){
					this.setFieldValue(currentArray["duration" + i],"duration" + i);
					this.setFieldValue(currentArray["duration_units" + i],"duration_units" + i);
				}
			}
		}
	},

/*Function to update a container block which is able to be single well or multiple well from a dropdown menu.*/	
	updateSingleMultiple_ : function(containerSingleMulti){
		var myId = this.id;//we get our id, to locate us in the global array.
		myId=myId.toString()
		var currentArray=containerObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
		
		if (containerSingleMulti==1){/*If choice is single well*/
			/*Remove inputs of multiwell if it exists*/
			var inputExists = this.getInput('multiwell')
			if(inputExists){
				this.removeInput('multiwell');
			}
			var inputExists = this.getInput('multipleswells')
			if(inputExists){
				this.removeInput('multipleswells');
			}
			/*Create single well input if not exists*/
			if (this.getInput('singleWell')==null){
				this.appendDummyInput('singleWell')
					.setAlign(Blockly.ALIGN_RIGHT)
					.appendField("Single well address")
					.appendField(new Blockly.FieldTextInput("e.g. A-1 or C-3"), "singlewelladdrinput");
			}
			if(currentArray.hasOwnProperty("singlewelladdrinput")){
				this.setFieldValue(currentArray["singlewelladdrinput"],"singlewelladdrinput");
			}
		}
		/*If choice is multi well*/
		else{
			/*Remove inputs of singlewell if it exists*/
			var inputExists = this.getInput('singleWell')
			if(inputExists){
					this.removeInput('singleWell');
			}
			/*Create multi well input if not exists which is a new dropdown menu*/
			if (this.getInput('multipleswells')==null){
				var dropdownmultiwells = new Blockly.FieldDropdown([["whole plate", "1"], ["individual multiple wells", "2"]], function(option){
					var containerMultiMulti = option;
					this.sourceBlock_.updateMultipleMultiple_(containerMultiMulti);
				});
				this.appendDummyInput('multipleswells')
					.setAlign(Blockly.ALIGN_RIGHT)
					.appendField(dropdownmultiwells,'multipleswells');
				
				if(currentArray.hasOwnProperty("multipleswells")){
					this.updateMultipleMultiple_(currentArray['multipleswells']);
					this.setFieldValue(currentArray['multipleswells'],"multipleswells");
					
				}	
				if (this.getFieldValue("multipleswells")==2){
					if (this.getInput("multiwell")==null){
						this.appendDummyInput("multiwell")
							.setAlign(Blockly.ALIGN_RIGHT)
							.appendField("multiple well address")
							.appendField(new Blockly.FieldTextInput("e.g. A-1,C-3 or A-3,B-12 or A-1:B-6"), "multipleWellAddrInput");
						}
					if (currentArray.hasOwnProperty('multipleWellAddrInput')){
						this.setFieldValue("multipleWellAddrInput");
					}
				}	
			}
			
			
		}
	},
/*Function to update the whole plate or individual plates if the choice is multiple well in the updateSingleMultiple_() function*/	
	updateMultipleMultiple_ : function(containerMultiMulti){
		var choose = Number(containerMultiMulti);
		
		if (choose == 2){//If choice == individual multiple wells
			if ( this.getInput('multiwell') == null){//Check if the input already exists, for not create again
				this.appendDummyInput('multiwell')
					.setAlign(Blockly.ALIGN_RIGHT)
					.appendField("multiple well address")
					.appendField(new Blockly.FieldTextInput("e.g. A-1,C-3 or A-3,B-12 or A-1:B-6"), "multipleWellAddrInput");
			}
			var myId = this.id;//we get our id, to locate us in the global array.
			myId=myId.toString()
			var currentArray=containerObject[myId]; // Assigning the local array in this variable, to work with them without call it each time.
			if(currentArray.hasOwnProperty("multipleWellAddrInput")){
				this.setFieldValue(currentArray["multipleWellAddrInput"],"multipleWellAddrInput");
			}
		}else {this.removeInput('multiwell');}//If the choice is whole well plate
	},
/*****************************************************************************************************************************************************************/		
/*****************************************************************************************************************************************************************/					
	/*This function remove all the inputs in the container block. It is used when detach the block from the functions, and in special moment*/
	resetInputs_ : function(){
		
		var inputExists = this.getInput('singleWell')
		if(inputExists){
			this.removeInput('singleWell');
		}
		if (this.getInput("multiplewells")!=null){
			this.updateNumberWells2_(0);
		}
		var inputExists = this.getInput('multiplewells')
		if(inputExists){
			this.removeInput('multiplewells');
		}
		var inputExists = this.getInput('volume')
		if(inputExists){
			this.removeInput('volume');
			this.removeInput('unit_volume');
		}
		if (this.getInput("valueagarose")!=null){
			this.updateNumberWells_(0);
		}
		var inputExists = this.getInput('valueagarose')
		if(inputExists){
			for(var i=0; i<2;i++){
				this.removeInput('valueagarose');
			}
		}
		
		var inputExists = this.getInput('optionsCTMode')
		if(inputExists){
			this.removeInput('optionsCTMode');
		}

		if (this.getInput('flowrate')) {
			this.removeInput('flowrate');
		}

		var inputExists = this.getInput('optionsCTMode2')
		if(inputExists){
			this.removeInput('optionsCTMode2');
		}
		if (this.getInput("steps")!=null){
			this.updateNumbersteps_(0);
		}
		var inputExists = this.getInput('steps')
		if(inputExists){
			this.removeInput('steps');
		}
		var inputExists = this.getInput('singleWell')
		if(inputExists){
				this.removeInput('singleWell');
		}
		var inputExists = this.getInput('multiwell')
		if(inputExists){
			this.removeInput('multiwell');
		}
		var inputExists = this.getInput('multipleswells')
		if(inputExists){
			this.removeInput('multipleswells');
		}
		var inputExists = this.getInput('singlemultiwells')
		if(inputExists){
			this.removeInput('singlemultiwells');
		}
		var inputExists = this.getInput('datareference')
		if(inputExists){
			this.removeInput('datareference');
		}
		
		
	},
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/
	/*This function is called when we copy or save this block*/
	mutationToDom: function() {
		var myId = this.id;//we get our id, to locate us in the global array.
		myId=myId.toString()
		var currentArray=containerObject[myId];//Access to the local array.
		var container = document.createElement('mutation');//Creating a elemtn which name is "mutation" where save the parameters of the array
		for (var k in currentArray){//Loop to go over the array
			if (currentArray.hasOwnProperty(k)) {//Checking if the name contains data
				container.setAttribute(k,currentArray[k]);
			}
		}
		
		container.setAttribute("last_parent", this.lastParent);
		container.setAttribute("last_operation", this.lastOperation);
		container.setAttribute("last_type", this.lastType);

		return container;//return the container to the xml document created ach time we copy or save the block.

	},
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/
		/*This function is called when we paste or load the block.*/
		domToMutation: function(xmlElement) {
			
		var myId = this.id;//we get our id, to locate us in the global array.
		myId=myId.toString()
		var currentArray=containerObject[myId];//Access to the local array.
		
		if(xmlElement.getAttribute('last_parent')!=null){
			this.lastParent = xmlElement.getAttribute('last_parent');
		}

		if(xmlElement.getAttribute('last_operation')!=null){
			this.lastOperation = xmlElement.getAttribute('last_operation');
		}

		if(xmlElement.getAttribute('last_type')!=null){
			this.lastType = xmlElement.getAttribute('last_type');
		}

		if(xmlElement.getAttribute('volume')!=null){
			//var childBlock = Blockly.Block.obtain(Blockly.getMainWorkspace(), 'math_number');
			//childBlock.setFieldValue(xmlElement.getAttribute('volume'), 'NUM');
			//childBlock.initSvg();
			//childBlock.render();
			
			if (!this.getInput("volume")) {
				this.appendValueInput("volume")
				.setAlign(Blockly.ALIGN_RIGHT)
				.setCheck(["Number", "Variable"])
				.appendField("volume")
				.appendField(new Blockly.FieldDropdown([["Milliliter", "milliliter"], ["Microliter", "microliter"], ["Nanoliter", "nanoliter"]]), "unit_volume");	
			}
			//this.getInput('volume').connection.connect(childBlock.outputConnection);

			currentArray['volume']=  xmlElement.getAttribute('volume');//It search the attribute in the xml document, and it assign in the local array.
			currentArray['unit_volume']=  xmlElement.getAttribute('unit_volume');
		}

		/*if (xmlElement.getAttribute("container_type_global")) {
			this.setFieldValue("container_type_global", xmlElement.getAttribute("container_type_global"));
		}*/

		if(xmlElement.getAttribute('datareference')!=null){	
			currentArray['datareference']=  xmlElement.getAttribute('datareference');//The same explanation
		}
		if(xmlElement.getAttribute('singlemultiwells')!=null){
			currentArray['singlemultiwells']=  xmlElement.getAttribute('singlemultiwells');
		}
		if(xmlElement.getAttribute('singlewelladdrinput')!=null){
			currentArray['singlewelladdrinput']=  xmlElement.getAttribute('singlewelladdrinput');
		}
		if(xmlElement.getAttribute('multipleswells')!=null){
			currentArray['multipleswells']=  xmlElement.getAttribute('multipleswells');
		}
		if(xmlElement.getAttribute('multipleWellAddrInput')!=null){
			currentArray['multipleWellAddrInput']=  xmlElement.getAttribute('multipleWellAddrInput');
		}
		if(xmlElement.getAttribute('flowrate')!=null){
			currentArray['flowrate']=  xmlElement.getAttribute('flowrate');
		}
		if(xmlElement.getAttribute('continuousmixing')!=null){
			currentArray['continuousmixing']=  xmlElement.getAttribute('continuousmixing');
		}
		if(xmlElement.getAttribute('valueagarose')!=null){
			currentArray['gelcomposition']=  xmlElement.getAttribute('gelcomposition');
		}
		if(xmlElement.getAttribute('valueagarose')!=null){
			currentArray['valueagarose']=  xmlElement.getAttribute('valueagarose');
			for(var i=0;i<xmlElement.getAttribute('valueagarose');i++){//It is onlyt saved the number of multiplewells, if we want save the remaining values, loop searching multiplewelladdress+i. Problem: if you choose one time X wells, they always appear.
				currentArray["gelwelladdress"+i]=  xmlElement.getAttribute("gelwelladdress"+i);
				currentArray['volumegel'+i]=  xmlElement.getAttribute('volumegel'+i);
				currentArray['unit_volume_gel'+i]=  xmlElement.getAttribute('unit_volume_gel'+i);
			}
		}
		if(xmlElement.getAttribute('multiplewells')!=null){
			currentArray['multiplewells']=  xmlElement.getAttribute('multiplewells');
			for(var i=0;i<xmlElement.getAttribute('multiplewells');i++){//It is onlyt saved the number of multiplewells, if we want save the remaining values, loop searching multiplewelladdress+i. Problem: if you choose one time X wells, they always appear.
				currentArray["multiplewelladdress"+i]=  xmlElement.getAttribute("multiplewelladdress"+i);
				currentArray['volume'+i]=  xmlElement.getAttribute('volume'+i);
				currentArray['unit_volume'+i]=  xmlElement.getAttribute('unit_volume'+i);
			}
		}
		if(xmlElement.getAttribute('steps')!=null){
			currentArray['steps']=  xmlElement.getAttribute('steps');
			for(var i=0;i<xmlElement.getAttribute('steps');i++){
				currentArray["temperature"+i]=  xmlElement.getAttribute("temperature"+i);
				currentArray['duration'+i]=  xmlElement.getAttribute('duration'+i);
			}
		}
	}
	
};

/*****************************************************************************************************************************************************************/		
/*****************************************************************************************************************************************************************/	

/*****************************************************************************************************************************************************************/		
/*****************************************************************************************************************************************************************/	

/*****************************************************************************************************************************************************************/		
/*****************************************************************************************************************************************************************/	

/*****************************************************************************************************************************************************************/		
/*****************************************************************************************************************************************************************/	

/***************************************************************************************************************************************************************/
/* Block Name.js																																			   */
/* Developer: Jesï¿½s Irimia																																	   */
/* Function: It allow join some container block in line, to add in a input of a function block							                                       */	
/*																																							   */
/*																																				               */
/***************************************************************************************************************************************************************/		
/***************************************************************************************************************************************************************/

Blockly.Blocks['containerList'] = {
	init: function() {
		
		/*Usual initialization of a common block*/
		this.setInputsInline(true);
		this.setColour(210);
		this.setTooltip('');
		this.quantity=2;	
		this.previousAmount=2;
		this.setOutput(true, "containerList");
		this.previousParent = null;
		
		/*Dropdown menu to choose the number of block that we want atach to some function*/		
		var dropdownQuantity = new Blockly.FieldDropdown([["2", "2"], ["3", "3"], ["4", "4"],["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"],["10", "10"], ["11", "11"], ["12", "12"]],function(optionQ) {
			var contListOptionValueLocal = optionQ;		
			var variables = this.sourceBlock_.updateNumberType_(contListOptionValueLocal);
		});
		this.appendDummyInput("contListOption")
			.appendField("CONTAINER LIST")
			.appendField(dropdownQuantity, 'contListOptionValue');
		/*Input for atach JUST a container. Just one for default*/	
		this.appendValueInput('contListOptionValueNum1')
			.setCheck("containerCheck")
		this.appendValueInput('contListOptionValueNum2')
			.setCheck("containerCheck")	
		
	},
	
/*Function to updatethe number of blocks we are able to atach in the list of blocks*/
/*It works just removing the needed blocks, not removing all and regenerating, because this would detach automatically the container blocks in the list*/	
	updateNumberType_ : function(contListOptionValueLocal){
		this.quantity=Number(contListOptionValueLocal);
		
		if(this.quantity<this.previousAmount){/*if actual choice is less than previous choice, then REMOVE*/
			for (i=0;i<(this.previousAmount-this.quantity);i++){
					var chain = 'contListOptionValueNum'+(this.previousAmount-i); //Variable created to access the input and be able to remove it.
					this.removeInput(chain);
				}
		}else if(this.quantity>this.previousAmount){/*if actual choice is more than previous choice, then CREATE*/
			for (i = 0; i < (this.quantity-this.previousAmount); i++){
				var chain='contListOptionValueNum'+(this.previousAmount+1+i);
				this.appendValueInput(chain)
					.setCheck("containerCheck")
			}
			
		}	
		this.previousAmount=this.quantity;// This variable is to store the CURRENT value, and use it in the next call of the function. 
	},
	
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/	
	/*This is a particular function of JS*/
	/*each change appeared in the workspace/context call to this function*/
	/*we are using it to set the shape, display parameters and similar matter*/
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/	
	onchange: function() {		
		this.checkChanges();	
	},

	checkChanges : function() {
		if (this.previousParent != this.getParent()) {
			var currentBlock //The block we are working with
			for (var i = 1; i < this.getFieldValue('contListOptionValue') + 1; i++) {/*Iterate over all inputs in the list*/
				var chain = 'contListOptionValueNum' + i//Name of the current block
				currentBlock = this.getInputTargetBlock(chain);//Current block got with chain
				if (currentBlock != null) {
					if (currentBlock.checkChanges) {
						currentBlock.checkChanges();
					}
				}
			}
			this.previousParent = this.getParent();
		}
	},
	
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/
	/*How it own name say this function is used to detach a block from his parent	*/
	detach_ : function(blockDetach){
		var dx = Blockly.SNAP_RADIUS * (this.RTL ? -1 : 1);//calculate the movement of the block in x axis
		var dy = Blockly.SNAP_RADIUS * 2;//calculate the movement of the block in x axis
		//this.setParent(null);
		if (blockDetach.outputConnection) {
			if (blockDetach.outputConnection.isConnected()) {
				// Disconnect from any superior block.
				blockDetach.outputConnection.disconnect();
			}
		}
		blockDetach.moveBy(dx, dy); //Move the block with the measures gotten.
		blockDetach.setParent(null);
	},
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/	
	/*This function is called when we copy or save this block*/
	mutationToDom: function() {
		var container = document.createElement('mutation');//Creating a element which name is "mutation" where save the parameters of the array
		container.setAttribute("contListOptionValue",this.getFieldValue("contListOptionValue"));
		return container;//return the container to the xml document created ach time we copy or save the block.
		
	},
/****************************************************************************************************************************************************************/		
/****************************************************************************************************************************************************************/
	/*This function is called when we paste or load the block.*/
	domToMutation: function(xmlElement) {
		if(xmlElement.getAttribute('contListOptionValue')!=null){
			this.setFieldValue(xmlElement.getAttribute('contListOptionValue'),"contListOptionValue");
			this.updateNumberType_(xmlElement.getAttribute('contListOptionValue'));
		}
		this.previousParent = this.getParent();
	}
};
