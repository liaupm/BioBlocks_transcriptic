/*
The MIT License (MIT)

Copyright (c) 2016 Universidad Politécnica de Madrid

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @file This file is used for translating the bioblocks to graphs.
 * @author Vishal Gupta, Jesús Irimia, Iván Pau, Alfonso Rodríguez-Patón, Ángel Panizo <contactLIAUPM@gmail.com>
 */

/**********************************************************************************************************/
/**********************************************************************************************************/
/***************************************OPERATIONAL REGULAR FUNCTION***************************************/
/**********************************************************************************************************/
/********************The most of the operational blocks use this function to write ************************/
/********************the intern JSON for graph code because keep the same structure************************/
/**********************************************************************************************************/

regularGraphTranslation_ = function (code, block) {
	var currentExecutingBlock = block;
	//initPositionY = initPositionY+75;
	initPositionY = initPositionY;
	/*Increase the position of the Y axis to print the next node*/
	if (currentExecutingBlock.getInputTargetBlock('source')) { //Get the block in the SOURCE input if exists
		blockSource = currentExecutingBlock.getInputTargetBlock('source')
			var isList = blockSource.getInput('contListOption'); //Check if it is a list
		var localInitPositionX = initPositionX /*Store the current position of Y, because a lot of changes could be done in the function, so finally return this value*/
			var localInitPositionY = initPositionY

			/*if it is a list of container attached to our function block*/
			if (isList) {
				var substring = 'contListOptionValueNum'; //Substring to complete with the number of the position of each block.
				var j = 0;
				for (var i = 0; i < blockSource.getFieldValue('contListOptionValue'); i++) {
					j++;
					var string = substring + j; //Creating the complete srting of the input where there is a container block.
					var currentBlock = blockSource.getInputTargetBlock(string)
						if (currentBlock != null) {

							var containerNameSource = currentBlock.getFieldValue('containerName');

							if ((currentBlock.getFieldValue("Destiny") == "Ambient") || (currentBlock.getFieldValue("Destiny") == "Minus80") || (currentBlock.getFieldValue("Destiny") == "Minus20") || (currentBlock.getFieldValue("Destiny") == "Four")) {
								var colorContainer = '#00FF00' /*Green color because is stored*/
							} else {
								var colorContainer = '#FF0000' /*Red color because is deleted*/
							}
							//IF parent is different of if, while, for module
							if (parentGroupControl == null) {
								/*If it parent is another function block*/
								if (currentExecutingBlock.getParent().getFieldValue("timeOfOperation") == null) {
									containerNameSourceID = renameContainerForTimingSecond(containerNameSource); //If parent is not function block add as <'> symbols as necessary
								} else {
									containerNameSourceID = renameContainerForTimingFirst(containerNameSource); //Else remove the last one <'>
								}
								//Adding this block as a node including in the JSON object elements all the variables, name, weight, colors...
								elements.nodes.push({
									data : {
										id : containerNameSourceID,
										name : containerNameSource,
										weight : 6500,
										faveColor : colorContainer,
										faveShape : 'rectangle',
										backgroundImage: containerPicture[(currentBlock.getFieldValue("container_type_global")) == null ? 0 : currentBlock.getFieldValue("container_type_global")],
										backgroundOpacity : 0,
										borderOpacity : 1
									},
									position : {
										x : initPositionX,
										y : initPositionY
									}
								});
								var containerNameSource2 = renameContainerForTimingSecond(containerNameSourceID);
								initPositionY = initPositionY + 75;
								elements.nodes.push({
									data : {
										id : containerNameSource2,
										name : containerNameSource,
										weight : 45,
										faveColor : colorContainer,
										faveShape : 'rectangle',
										backgroundImage : containerPicture[(currentBlock.getFieldValue("container_type_global")) == null ? 0 : currentBlock.getFieldValue("container_type_global")],
										backgroundOpacity : 0,
										borderOpacity : 1
									},
									position : {
										x : initPositionX,
										y : initPositionY
									}
								});
								//Also add the edge which comunicates the two states (Each node is a different state of the container) of the same container
								elements.edges.push({
									data : {
										name : code,
										source : containerNameSourceID,
										target : containerNameSource2,
										faveColor : '#0000FF',
										strength : 10
									}
								});
							}
							/*If the parent is logic or loop function*/
							else {
								if (currentExecutingBlock.getParent().getFieldValue("timeOfOperation") == null) {
									containerNameSourceID = renameContainerForTimingSecond(containerNameSource);
								} else {
									containerNameSourceID = renameContainerForTimingFirst(containerNameSource);
								}
								//Adding this block as a node including in the JSON object elements all the variables, name, weight, colors...
								elements.nodes.push({
									data : {
										id : containerNameSourceID,
										parent : parentGroupControlType + parentGroupControl,
										name : containerNameSource,
										weight : 6500,
										faveColor : colorContainer,
										faveShape : 'rectangle',
										backgroundImage : containerPicture[(currentBlock.getFieldValue("container_type_global")) == null ? 0 : currentBlock.getFieldValue("container_type_global")],
										backgroundOpacity : 0,
										borderOpacity : 1
									},
									position : {
										x : initPositionX,
										y : initPositionY
									}
								});
								if (currentExecutingBlock.getParent().getFieldValue('timeOfOperation') == null) {
									elements.edges.push({
										data : {
											name : "",
											source : "CONTROL" + parentGroupControlID,
											target : containerNameSourceID,
											faveColor : '#0000FF',
											strength : 10
										}
									});
								}
								var containerNameSource2 = renameContainerForTimingSecond(containerNameSourceID);
								initPositionY = initPositionY + 75;
								elements.nodes.push({
									data : {
										id : containerNameSource2,
										parent : parentGroupControlType + parentGroupControl,
										name : containerNameSource,
										weight : 45,
										faveColor : colorContainer,
										faveShape : 'rectangle',
										backgroundImage : containerPicture[(currentBlock.getFieldValue("container_type_global")) == null ? 0 : currentBlock.getFieldValue("container_type_global")],
										backgroundOpacity : 0,
										borderOpacity : 1
									},
									position : {
										x : initPositionX,
										y : initPositionY
									}
								});
								//Also add the edge which comunicates the two states (Each node is a different state of the container) of the same container
								elements.edges.push({
									data : {
										name : code,
										source : containerNameSourceID,
										target : containerNameSource2,
										faveColor : '#0000FF',
										strength : 10
									}
								});
							}

						}
						initPositionX = initPositionX + 150;
					initPositionY = localInitPositionY; //Restart the Y position for a new node of the same list
				}
				code = currentExecutingBlock.optionsDisplay_naturalLanguage(code, currentBlock);

			} else if (blockSource != null) { //If it exists child and it's just one.
				var containerNameSource = blockSource.getFieldValue('containerName');
				if ((blockSource.getFieldValue("Destiny") == "Ambient") || (blockSource.getFieldValue("Destiny") == "Minus80") || (blockSource.getFieldValue("Destiny") == "Minus20") || (blockSource.getFieldValue("Destiny") == "Four")) {
					var colorContainer = '#00FF00' /*Green color because is stored*/
				} else {
					var colorContainer = '#FF0000' /*Red color because is deleted*/
				}
				if (parentGroupControl == null) {
					if (currentExecutingBlock.getParent().getFieldValue("timeOfOperation") == null) {
						containerNameSourceID = renameContainerForTimingSecond(containerNameSource);
					} else {
						containerNameSourceID = renameContainerForTimingFirst(containerNameSource);
					}
					//Adding this block as a node including in the JSON object elements all the variables, name, weight, colors...
					elements.nodes.push({
						data : {
							id : containerNameSourceID,
							name : containerNameSource,
							weight : 6500,
							faveColor : colorContainer,
							faveShape : 'rectangle',
							backgroundImage : containerPicture[(blockSource.getFieldValue("container_type_global")) == null ? 0 : blockSource.getFieldValue("container_type_global")],
							backgroundOpacity : 0,
							borderOpacity : 1
						},
						position : {
							x : initPositionX,
							y : initPositionY
						}
					});
					var containerNameSource2 = renameContainerForTimingSecond(containerNameSourceID);
					initPositionY = initPositionY + 75;
					elements.nodes.push({
						data : {
							id : containerNameSource2,
							name : containerNameSource,
							weight : 45,
							faveColor : colorContainer,
							faveShape : 'rectangle',
							backgroundImage : containerPicture[(blockSource.getFieldValue("container_type_global")) == null ? 0 : blockSource.getFieldValue("container_type_global")],
							backgroundOpacity : 0,
							borderOpacity : 1
						},
						position : {
							x : initPositionX,
							y : initPositionY
						}
					});
					//Also add the edge which comunicates the two states (Each node is a different state of the container) of the same container
					elements.edges.push({
						data : {
							name : code,
							source : containerNameSourceID,
							target : containerNameSource2,
							faveColor : '#0000FF',
							strength : 10
						}
					});
				} else {
					if (currentExecutingBlock.getParent().getFieldValue("timeOfOperation") == null) {
						containerNameSourceID = renameContainerForTimingSecond(containerNameSource);
					} else {
						containerNameSourceID = renameContainerForTimingFirst(containerNameSource);
					}
					//Adding this block as a node including in the JSON object elements all the variables, name, weight, colors...
					elements.nodes.push({
						data : {
							id : containerNameSourceID,
							parent : parentGroupControlType + parentGroupControl,
							name : containerNameSource,
							weight : 6500,
							faveColor : colorContainer,
							faveShape : 'rectangle',
							backgroundImage : containerPicture[(blockSource.getFieldValue("container_type_global")) == null ? 0 : blockSource.getFieldValue("container_type_global")],
							backgroundOpacity : 0,
							borderOpacity : 1
						},
						position : {
							x : initPositionX,
							y : initPositionY
						}
					});
					if (currentExecutingBlock.getParent().getFieldValue('timeOfOperation') == null) {
						elements.edges.push({
							data : {
								name : "",
								source : "CONTROL" + parentGroupControlID,
								target : containerNameSourceID,
								faveColor : '#0000FF',
								strength : 10
							}
						});
					}
					var containerNameSource2 = renameContainerForTimingSecond(containerNameSourceID);
					initPositionY = initPositionY + 75;
					elements.nodes.push({
						data : {
							id : containerNameSource2,
							parent : parentGroupControlType + parentGroupControl,
							name : containerNameSource,
							weight : 45,
							faveColor : colorContainer,
							faveShape : 'rectangle',
							backgroundImage : containerPicture[(blockSource.getFieldValue("container_type_global")) == null ? 0 : blockSource.getFieldValue("container_type_global")],
							backgroundOpacity : 0,
							borderOpacity : 1
						},
						position : {
							x : initPositionX,
							y : initPositionY
						}
					});
					//Also add the edge which comunicates the two states (Each node is a different state of the container) of the same container
					elements.edges.push({
						data : {
							name : code,
							source : containerNameSourceID,
							target : containerNameSource2,
							faveColor : '#0000FF',
							strength : 10
						}
					});
				}

			}
	}
	return code;
};

/**********************************************************************************************************/
/**********************************************************************************************************/
/***************************************OPERATIONAL REGULAR BLOCKS*****************************************/
/**********************************************************************************************************/
/**********************Basicly choose the possibility of change the first sentence of the block************/
/**********************************************************************************************************/
/***All the comments are refered in the first function, the remaining has the same meaning and utilities***/

Blockly.Graph['centrifugation'] = function (block) {
	var code = "centrifugation at Time " + this.getFieldValue('timeOfOperation'); //Code to include in the edge of the graph
	var localInitPositionX = initPositionX;
	regularGraphTranslation_(code, this);
	initPositionX = localInitPositionX; //Inside of regularGraphsTranslation some changes are done in this variable, so we restart to recover the correct flow work
	return code;
}

Blockly.Graph['electrophoresis'] = function (block) {
	var code = "Electrophoresis at Time " + this.getFieldValue('timeOfOperation');
	var localInitPositionX = initPositionX;
	regularGraphTranslation_(code, this);
	initPositionX = localInitPositionX;
	return code;
};

Blockly.Graph['flashFreeze'] = function (block) {

	var code = "Flash Freeze at Time " + this.getFieldValue('timeOfOperation');
	var localInitPositionX = initPositionX;
	regularGraphTranslation_(code, this);
	initPositionX = localInitPositionX;
	return code;
};

Blockly.Graph['flowCitometry'] = function (block) {

	var code = "Flow Citometry at Time " + this.getFieldValue('timeOfOperation');
	var localInitPositionX = initPositionX;
	regularGraphTranslation_(code, this);
	initPositionX = localInitPositionX;
	return code;
};

Blockly.Graph['incubate'] = function (block) {

	var code = "Incubate at Time " + this.getFieldValue('timeOfOperation');
	var localInitPositionX = initPositionX;
	regularGraphTranslation_(code, this);
	initPositionX = localInitPositionX;
	return code;
};

Blockly.Graph['mix'] = function (block) {

	var code = "Mix at Time " + this.getFieldValue('timeOfOperation');
	var localInitPositionX = initPositionX;
	regularGraphTranslation_(code, this);
	initPositionX = localInitPositionX;
	return code;
};

Blockly.Graph['oligosynthesize'] = function (block) {

	var code = "Oligosynthesize at Time " + this.getFieldValue('timeOfOperation');
	var localInitPositionX = initPositionX;
	regularGraphTranslation_(code, this);
	initPositionX = localInitPositionX;
	return code;
};

Blockly.Graph['sangerSequencing'] = function (block) {

	var code = "Sanger Seq at Time " + this.getFieldValue('timeOfOperation');
	var localInitPositionX = initPositionX;
	regularGraphTranslation_(code, this);
	initPositionX = localInitPositionX;
	return code;
};

Blockly.Graph['thermocycling'] = function (block) {

	var code = "Thermocycle at Time " + this.getFieldValue('timeOfOperation'); ;
	var localInitPositionX = initPositionX;
	regularGraphTranslation_(code, this);
	initPositionX = localInitPositionX;
	return code;
};

Blockly.Graph['measurement'] = function (block) {
	var type_measure = block.getFieldValue('parameters');
	var localInitPositionX = initPositionX;
	switch (type_measure) { //This function is to get the real name of the different kinds of pipetting.
	case '1':
		type_measure = "Absorbance";
		break;
	case '2':
		type_measure = "Fluorescence";
		break;
	case '3':
		type_measure = "Luminiscence";
		break;
	case '4':
		type_measure = "Volume";
		break;
	case '5':
		type_measure = "Temperature";
		break;
	default:
		alert("Some error appeared translating language");
	}

	var code = type_measure + " measure at Time " + this.getFieldValue('timeOfOperation');
	regularGraphTranslation_(code, this);
	initPositionX = localInitPositionX;
	return code;
};

/**********************************************************************************************************/
/**********************************************************************************************************/
/***************************************OPERATIONAL SPECIAL BLOCKS*****************************************/
/**********************************************************************************************************/
/*****************They are special just because they have source and destination blocks********************/
/*********Particularly PIPETTE is the most complex because it can include lists in source and dest*********/
/**********************************************************************************************************/

//We can find the comments for this function on the TOP --> regularGraphTranslation_() function
Blockly.Graph['cellSpreading'] = function (block) {
	var code = "Cell Spreading at Time " + this.getFieldValue('timeOfOperation');
	initPositionY = initPositionY + 75;

	if (this.getInputTargetBlock('source') != null) { //Get the block in the SOURCE input if exists
		blockSource = this.getInputTargetBlock('source');
		var localInitPositionX = initPositionX
			var localInitPositionY = initPositionY
			var containerNameSource = this.getInputTargetBlock('source').getFieldValue('containerName');
		if ((blockSource.getFieldValue("Destiny") == "Ambient") || (blockSource.getFieldValue("Destiny") == "Minus80") || (blockSource.getFieldValue("Destiny") == "Minus20") || (blockSource.getFieldValue("Destiny") == "Four")) {
			var colorContainer = '#00FF00'
		} else {
			var colorContainer = '#FF0000'
		}
		if (this.getInputTargetBlock('destination') != null) {
			blockDestination = this.getInputTargetBlock('destination');
			if ((blockDestination.getFieldValue("Destiny") == "Ambient") || (blockDestination.getFieldValue("Destiny") == "Minus80") || (blockDestination.getFieldValue("Destiny") == "Minus20") || (blockDestination.getFieldValue("Destiny") == "Four")) {
				var colorContainerDestination = '#00FF00'
			} else {
				var colorContainerDestination = '#FF0000'
			}
		}
		/**************** WITHOUT CONDITIONAL PARENT *******************************/
		/***************************************************************************/
		if (parentGroupControl == null) {
			if (this.getParent().getFieldValue("timeOfOperation") == null) {
				containerNameSourceID = renameContainerForTimingSecond(containerNameSource);
			} else {
				containerNameSourceID = renameContainerForTimingFirst(containerNameSource);
			}
			elements.nodes.push({
				data : {
					id : containerNameSourceID,
					name : containerNameSource,
					weight : 6500,
					faveColor : colorContainer,
					faveShape : 'rectangle',
					backgroundImage : containerPicture[(blockSource.getFieldValue("container_type_global")) == null ? 0 : blockSource.getFieldValue("container_type_global")],
					backgroundOpacity : 0,
					borderOpacity : 1
				},
				position : {
					x : initPositionX,
					y : initPositionY
				}
			});
			/*************************DESTINATION************************************/
			if (this.getInputTargetBlock('destination') != null) { //Get the block in the DESTINATION input if exists
				initPositionY = initPositionY + 75;
				var containerNameDestination = this.getInputTargetBlock('destination').getFieldValue('containerName');
				containerNameDestination2 = renameContainerForTimingSecond(containerNameDestination);
				elements.nodes.push({
					data : {
						id : containerNameDestination2,
						name : containerNameDestination,
						weight : 45,
						faveColor : colorContainerDestination,
						faveShape : 'rectangle',
						backgroundImage : containerPicture[(blockDestination.getFieldValue("container_type_global")) == null ? 0 : blockDestination.getFieldValue("container_type_global")],
						backgroundOpacity : 0,
						borderOpacity : 1
					},
					position : {
						x : initPositionX,
						y : initPositionY
					}
				});
				elements.edges.push({
					data : {
						name : code,
						source : containerNameSourceID,
						target : containerNameDestination2,
						faveColor : '#0000FF',
						strength : 10
					}
				});
			}
		}
		/**************** ******* CONDITIONAL PARENT *******************************/
		/***************************************************************************/
		else {
			if (this.getParent().getFieldValue("timeOfOperation") == null) {
				containerNameSourceID = renameContainerForTimingSecond(containerNameSource);
			} else {
				containerNameSourceID = renameContainerForTimingFirst(containerNameSource);
			}
			elements.nodes.push({
				data : {
					id : containerNameSourceID,
					parent : parentGroupControlType + parentGroupControl,
					name : containerNameSource,
					weight : 6500,
					faveColor : colorContainer,
					faveShape : 'rectangle',
					backgroundImage : containerPicture[(blockSource.getFieldValue("container_type_global")) == null ? 0 : blockSource.getFieldValue("container_type_global")],
					backgroundOpacity : 0,
					borderOpacity : 1
				},
				position : {
					x : initPositionX,
					y : initPositionY
				}
			});
			if (this.getParent().getFieldValue('timeOfOperation') == null) {

				elements.edges.push({
					data : {
						name : "",
						source : "CONTROL" + parentGroupControlID,
						target : containerNameSourceID,
						faveColor : '#0000FF',
						strength : 10
					}
				});
			}
			var containerNameSource2 = renameContainerForTimingSecond(containerNameSourceID);
			/*************************DESTINATION************************************/
			if (this.getInputTargetBlock('destination') != null) {
				initPositionY = initPositionY + 75;
				var containerNameDestination = this.getInputTargetBlock('destination').getFieldValue('containerName');
				containerNameDestination2 = renameContainerForTimingSecond(containerNameDestination);
				elements.nodes.push({
					data : {
						id : containerNameDestination2,
						parent : parentGroupControlType + parentGroupControl,
						name : containerNameDestination,
						weight : 45,
						faveColor : colorContainerDestination,
						faveShape : 'rectangle',
						backgroundImage : containerPicture[(blockDestination.getFieldValue("container_type_global")) == null ? 0 : blockDestination.getFieldValue("container_type_global")],
						backgroundOpacity : 0,
						borderOpacity : 1
					},
					position : {
						x : initPositionX,
						y : initPositionY
					}
				});
				elements.edges.push({
					data : {
						name : code,
						source : containerNameSourceID,
						target : containerNameDestination2,
						faveColor : '#0000FF',
						strength : 10
					}
				});
			}
		}
	}
	return code;
};

//We can find the comments for this function on the TOP --> regularGraphTranslation_() function
Blockly.Graph['colonyPicking'] = function (block) {

	var code = "Colony Picking at Time " + this.getFieldValue('timeOfOperation');

	initPositionY = initPositionY + 75;

	if (this.getInputTargetBlock('source') != null) { //Get the block in the SOURCE input if exists
		blockSource = this.getInputTargetBlock('source');
		var localInitPositionX = initPositionX
			var localInitPositionY = initPositionY
			var containerNameSource = this.getInputTargetBlock('source').getFieldValue('containerName');
		if ((blockSource.getFieldValue("Destiny") == "Ambient") || (blockSource.getFieldValue("Destiny") == "Minus80") || (blockSource.getFieldValue("Destiny") == "Minus20") || (blockSource.getFieldValue("Destiny") == "Four")) {
			var colorContainer = '#00FF00'
		} else {
			var colorContainer = '#FF0000'
		}
		if (this.getInputTargetBlock('destination') != null) {
			blockDestination = this.getInputTargetBlock('destination');
			if ((blockDestination.getFieldValue("Destiny") == "Ambient") || (blockDestination.getFieldValue("Destiny") == "Minus80") || (blockDestination.getFieldValue("Destiny") == "Minus20") || (blockDestination.getFieldValue("Destiny") == "Four")) {
				var colorContainerDestination = '#00FF00'
			} else {
				var colorContainerDestination = '#FF0000'
			}
		}
		/**************** WITHOUT CONDITIONAL PARENT *******************************/
		/***************************************************************************/
		if (parentGroupControl == null) {
			if (this.getParent().getFieldValue("timeOfOperation") == null) {
				containerNameSourceID = renameContainerForTimingSecond(containerNameSource);
			} else {
				containerNameSourceID = renameContainerForTimingFirst(containerNameSource);
			}
			elements.nodes.push({
				data : {
					id : containerNameSourceID,
					name : containerNameSource,
					weight : 6500,
					faveColor : colorContainer,
					faveShape : 'rectangle',
					backgroundImage : containerPicture[(blockSource.getFieldValue("container_type_global")) == null ? 0 : blockSource.getFieldValue("container_type_global")],
					backgroundOpacity : 0,
					borderOpacity : 1
				},
				position : {
					x : initPositionX,
					y : initPositionY
				}
			});
			/*************************DESTINATION************************************/
			if (this.getInputTargetBlock('destination') != null) { //Get the block in the DESTINATION input if exists
				initPositionY = initPositionY + 75;
				var containerNameDestination = this.getInputTargetBlock('destination').getFieldValue('containerName');
				containerNameDestination2 = renameContainerForTimingSecond(containerNameDestination);
				elements.nodes.push({
					data : {
						id : containerNameDestination2,
						name : containerNameDestination,
						weight : 45,
						faveColor : colorContainerDestination,
						faveShape : 'rectangle',
						backgroundImage : containerPicture[(blockDestination.getFieldValue("container_type_global")) == null ? 0 : blockDestination.getFieldValue("container_type_global")],
						backgroundOpacity : 0,
						borderOpacity : 1
					},
					position : {
						x : initPositionX,
						y : initPositionY
					}
				});
				elements.edges.push({
					data : {
						name : code,
						source : containerNameSourceID,
						target : containerNameDestination2,
						faveColor : '#0000FF',
						strength : 10
					}
				});
			}
		}
		/************************ CONDITIONAL PARENT *******************************/
		/***************************************************************************/
		else {
			if (this.getParent().getFieldValue("timeOfOperation") == null) {
				containerNameSourceID = renameContainerForTimingSecond(containerNameSource);
			} else {
				containerNameSourceID = renameContainerForTimingFirst(containerNameSource);
			}
			elements.nodes.push({
				data : {
					id : containerNameSourceID,
					parent : parentGroupControlType + parentGroupControl,
					name : containerNameSource,
					weight : 6500,
					faveColor : colorContainer,
					faveShape : 'rectangle',
					backgroundImage : containerPicture[(blockSource.getFieldValue("container_type_global")) == null ? 0 : blockSource.getFieldValue("container_type_global")],
					backgroundOpacity : 0,
					borderOpacity : 1
				},
				position : {
					x : initPositionX,
					y : initPositionY
				}
			});
			if (this.getParent().getFieldValue('timeOfOperation') == null) {

				elements.edges.push({
					data : {
						name : "",
						source : "CONTROL" + parentGroupControlID,
						target : containerNameSourceID,
						faveColor : '#0000FF',
						strength : 10
					}
				});
			}
			var containerNameSource2 = renameContainerForTimingSecond(containerNameSourceID);
			/*************************DESTINATION************************************/
			if (this.getInputTargetBlock('destination') != null) {
				initPositionY = initPositionY + 75;
				var containerNameDestination = this.getInputTargetBlock('destination').getFieldValue('containerName');
				containerNameDestination2 = renameContainerForTimingSecond(containerNameDestination);
				elements.nodes.push({
					data : {
						id : containerNameDestination2,
						parent : parentGroupControlType + parentGroupControl,
						name : containerNameDestination,
						weight : 45,
						faveColor : colorContainerDestination,
						faveShape : 'rectangle',
						backgroundImage : containerPicture[(blockDestination.getFieldValue("container_type_global")) == null ? 0 : blockDestination.getFieldValue("container_type_global")],
						backgroundOpacity : 0,
						borderOpacity : 1
					},
					position : {
						x : initPositionX,
						y : initPositionY
					}
				});
				elements.edges.push({
					data : {
						name : code,
						source : containerNameSourceID,
						target : containerNameDestination2,
						faveColor : '#0000FF',
						strength : 10
					}
				});
			}
		}
	}
	return code;
};

//We can find the comments for this function on the TOP --> regularGraphTranslation_() function
Blockly.Graph['pipette'] = function (block) {
	var type_pipette = block.getFieldValue('pipetteTypeName');
	switch (type_pipette) { //This function is to get the real name of the different kinds of pipetting.
	case '1':
		type_pipette = "Transfer";
		break;
	case '2':
		type_pipette = "Distribute";
		break;
	case '3':
		type_pipette = "Consolidate";
		break;
	case '4':
		type_pipette = "Continuous transfer";
		break;
	default:
		alert("Some error appeared translating language");
	}
	var code = type_pipette + " pipetting at Time " + this.getFieldValue('timeOfOperation');

	initPositionY = initPositionY + 75;
	if (this.getInputTargetBlock('source') != null) { //Get the block in the SOURCE input if exists
		blockSource = this.getInputTargetBlock('source')
			var isList = blockSource.getInput('contListOption'); //Check if it is a list
		var localInitPositionX = initPositionX
			var localInitPositionY = initPositionY

			/************************ CASE SOURCE LIST *******************************/
			/***************************************************************************/
			if (isList) { //Case Source list-Destination not list
				var substring = 'contListOptionValueNum'; //Substring to complete with the number of the position of each block.

				var j = 0;
				var timesInLoop = 0;
				for (var i = 0; i < blockSource.getFieldValue('contListOptionValue'); i++) {
					j++;
					initPositionY = localInitPositionY
						var string = substring + j //Creating the complete srting of the input where there is a container block.
						var currentBlock = blockSource.getInputTargetBlock(string)
						if (currentBlock != null) {
							if ((currentBlock.getFieldValue("Destiny") == "Ambient") || (currentBlock.getFieldValue("Destiny") == "Minus80") || (currentBlock.getFieldValue("Destiny") == "Minus20") || (currentBlock.getFieldValue("Destiny") == "Four")) {
								var colorContainer = '#00FF00'
							} else {
								var colorContainer = '#FF0000'
							}

							var containerNameSource = currentBlock.getFieldValue('containerName');
							/************************WITHOUT CONDITIONAL PARENT *******************************/
							/***************************************************************************/

							if (parentGroupControl == null) {
								if (this.getParent() != null) {
									if (this.getParent().getFieldValue("timeOfOperation") == null) {
										containerNameSourceID = renameContainerForTimingSecond(containerNameSource);
									}
								} else {
									containerNameSourceID = renameContainerForTimingFirst(containerNameSource);
								}
								elements.nodes.push({
									data : {
										id : containerNameSourceID,
										name : containerNameSource,
										weight : 6500,
										faveColor : colorContainer,
										faveShape : 'rectangle',
										backgroundImage : containerPicture[(currentBlock.getFieldValue("container_type_global")) == null ? 0 : currentBlock.getFieldValue("container_type_global")],
										backgroundOpacity : 0,
										borderOpacity : 1
									},
									position : {
										x : initPositionX,
										y : initPositionY
									}
								});
								/********************destination****************/
								if (this.getInputTargetBlock('destination') != null) { //Get the block in the DESTINATION input if exists
									blockDestination = this.getInputTargetBlock('destination');
									if ((blockDestination.getFieldValue("Destiny") == "Ambient") || (blockDestination.getFieldValue("Destiny") == "Minus80") || (blockDestination.getFieldValue("Destiny") == "Minus20") || (blockDestination.getFieldValue("Destiny") == "Four")) {
										var colorContainerDestination = '#00FF00'
									} else {
										var colorContainerDestination = '#FF0000'
									}

									initPositionY = initPositionY + 75;
									var containerNameDestination = this.getInputTargetBlock('destination').getFieldValue('containerName');
									if (timesInLoop == 0) {
										containerNameDestination2 = renameContainerForTimingSecond(containerNameDestination);
										timesInLoop = 1;
									} else {
										containerNameDestination2 = renameContainerForTimingFirst(containerNameDestination);
									}
									elements.nodes.push({
										data : {
											id : containerNameDestination2,
											name : containerNameDestination,
											weight : 45,
											faveColor : colorContainerDestination,
											faveShape : 'rectangle',
											backgroundImage : containerPicture[this.getInputTargetBlock('destination').getFieldValue('container_type_global')],
											backgroundOpacity : 0,
											borderOpacity : 1
										},
										position : {
											x : initPositionX,
											y : initPositionY
										}
									});

									if (this.getFieldValue("pipetteTypeName") == 4) { //DOTTED IF IT IS CONTINUOUS TRANSFER
										elements.edges.push({
											data : {
												name : code,
												source : containerNameSourceID,
												target : containerNameDestination2,
												faveColor : '#0000FF',
												strength : 10
											},
											classes : 'questionable'
										});
									} else {
										elements.edges.push({
											data : {
												name : code,
												source : containerNameSourceID,
												target : containerNameDestination2,
												faveColor : '#0000FF',
												strength : 10
											}
										});
									}
								}
							}
							/************************ CONDITIONAL PARENT *******************************/
							/***************************************************************************/
							else {
								if (this.getParent().getFieldValue("timeOfOperation") == null) {
									containerNameSourceID = renameContainerForTimingSecond(containerNameSource);
								} else {
									containerNameSourceID = renameContainerForTimingFirst(containerNameSource);
								}
								elements.nodes.push({
									data : {
										id : containerNameSourceID,
										parent : parentGroupControlType + parentGroupControl,
										name : containerNameSource,
										weight : 6500,
										faveColor : colorContainer,
										faveShape : 'rectangle',
										backgroundImage : containerPicture[(currentBlock.getFieldValue("container_type_global")) == null ? 0 : currentBlock.getFieldValue("container_type_global")],
										backgroundOpacity : 0,
										borderOpacity : 1
									},
									position : {
										x : initPositionX,
										y : initPositionY
									}
								});
								/********************destination****************/

								if (this.getInputTargetBlock('destination') != null) { //Get the block in the DESTINATION input if exists
									blockDestination = this.getInputTargetBlock('destination');
									if ((blockDestination.getFieldValue("Destiny") == "Ambient") || (blockDestination.getFieldValue("Destiny") == "Minus80") || (blockDestination.getFieldValue("Destiny") == "Minus20") || (blockDestination.getFieldValue("Destiny") == "Four")) {
										var colorContainerDestination = '#00FF00'
									} else {
										var colorContainerDestination = '#FF0000'
									}
									
									initPositionY = initPositionY + 75;
									var containerNameDestination = this.getInputTargetBlock('destination').getFieldValue('containerName');
									if (timesInLoop == 0) {
										containerNameDestination2 = renameContainerForTimingSecond(containerNameDestination);
										timesInLoop = 1;
										if (this.getParent().getFieldValue('timeOfOperation') == null) {

											elements.edges.push({
												data : {
													name : "",
													source : "CONTROL" + parentGroupControlID,
													target : containerNameSourceID,
													faveColor : '#0000FF',
													strength : 10,
													backgroundImage : actualImagenDestination
												}
											});
										}
									} else {
										containerNameDestination2 = renameContainerForTimingFirst(containerNameDestination);
									}
									elements.nodes.push({
										data : {
											id : containerNameDestination2,
											parent : parentGroupControlType + parentGroupControl,
											name : containerNameDestination,
											weight : 45,
											faveColor : colorContainerDestination,
											faveShape : 'rectangle',
											backgroundImage : containerPicture[(blockDestination.getFieldValue("container_type_global")) == null ? 0 : blockDestination.getFieldValue("container_type_global")],
											backgroundOpacity : 0,
											borderOpacity : 1
										},
										position : {
											x : initPositionX,
											y : initPositionY
										}
									});
									if (this.getFieldValue("pipetteTypeName") == 4) { //DOTTED IF IT IS CONTINUOUS TRANSFER
										elements.edges.push({
											data : {
												name : code,
												source : containerNameSourceID,
												target : containerNameDestination2,
												faveColor : '#0000FF',
												strength : 10
											},
											classes : 'questionable'
										});
									} else {
										elements.edges.push({
											data : {
												name : code,
												source : containerNameSourceID,
												target : containerNameDestination2,
												faveColor : '#0000FF',
												strength : 10
											}
										});
									}
								}
							}
							initPositionX = initPositionX + 150;
						}
				}
			}

			/************************ CASE DESTINATION LIST *******************************/
			/***************************************************************************/
			else if (blockSource != null) {

				if (this.getInputTargetBlock('destination')) {
					blockDestination = this.getInputTargetBlock('destination')
						var isList = blockDestination.getInput('contListOption'); //Check if it is a list
					if (isList) { //Case Source Not list- Destination list
						var substring = 'contListOptionValueNum'; //Substring to complete with the number of the position of each block.
						var j = 0;
						var containerNameSource = blockSource.getFieldValue('containerName');
						containerNameSourceID = renameContainerForTimingFirst(containerNameSource);

						if ((blockSource.getFieldValue("Destiny") == "Ambient") || (blockSource.getFieldValue("Destiny") == "Minus80") || (blockSource.getFieldValue("Destiny") == "Minus20") || (blockSource.getFieldValue("Destiny") == "Four")) {
							var colorContainer = '#00FF00'
						} else {
							var colorContainer = '#FF0000'
						}
						
						if (parentGroupControl == null) {
							elements.nodes.push({
								data : {
									id : containerNameSourceID,
									name : containerNameSource,
									weight : 6500,
									faveColor : colorContainer,
									faveShape : 'rectangle',
									backgroundImage : containerPicture[(blockSource.getFieldValue("container_type_global")) == null ? 0 : blockSource.getFieldValue("container_type_global")],
									backgroundOpacity : 0,
									borderOpacity : 1
								},
								position : {
									x : initPositionX,
									y : initPositionY
								}
							});
						} else {
							elements.nodes.push({
								data : {
									id : containerNameSourceID,
									parent : parentGroupControlType + parentGroupControl,
									name : containerNameSource,
									weight : 6500,
									faveColor : colorContainer,
									faveShape : 'rectangle',
									backgroundImage : containerPicture[(blockSource.getFieldValue("container_type_global")) == null ? 0 : blockSource.getFieldValue("container_type_global")],
									backgroundOpacity : 0,
									borderOpacity : 1
								},
								position : {
									x : initPositionX,
									y : initPositionY
								}
							});
						}
						initPositionY = initPositionY + 75;

						for (var i = 0; i < blockDestination.getFieldValue('contListOptionValue'); i++) {
							j++;
							var string = substring + j //Creating the complete srting of the input where there is a container block.
								var currentBlock = blockDestination.getInputTargetBlock(string)
								if (currentBlock != null) {
									var containerNameDestination = currentBlock.getFieldValue('containerName');
									containerNameDestination2 = renameContainerForTimingSecond(containerNameDestination);

									if ((currentBlock.getFieldValue("Destiny") == "Ambient") || (currentBlock.getFieldValue("Destiny") == "Minus80") || (currentBlock.getFieldValue("Destiny") == "Minus20") || (currentBlock.getFieldValue("Destiny") == "Four")) {
										var colorContainer = '#00FF00'
									} else {
										var colorContainer = '#FF0000'
									}
									
									if (parentGroupControl == null) {
										elements.nodes.push({
											data : {
												id : containerNameDestination2,
												name : containerNameDestination,
												weight : 45,
												faveColor : colorContainer,
												faveShape : 'rectangle',
												backgroundImage : containerPicture[(currentBlock.getFieldValue("container_type_global")) == null ? 0 : currentBlock.getFieldValue("container_type_global")],
												backgroundOpacity : 0,
												borderOpacity : 1
											},
											position : {
												x : initPositionX,
												y : initPositionY
											}
										});
										if (this.getFieldValue("pipetteTypeName") == 4) { //DOTTED IF IT IS CONTINUOUS TRANSFER
											elements.edges.push({
												data : {
													name : code,
													source : containerNameSourceID,
													target : containerNameDestination2,
													faveColor : '#0000FF',
													strength : 10
												},
												classes : 'questionable'
											});
										} else {
											elements.edges.push({
												data : {
													name : code,
													source : containerNameSourceID,
													target : containerNameDestination2,
													faveColor : '#0000FF',
													strength : 10
												}
											});
										}
									} else {
										elements.nodes.push({
											data : {
												id : containerNameDestination2,
												parent : parentGroupControlType + parentGroupControl,
												name : containerNameDestination,
												weight : 45,
												faveColor : colorContainer,
												faveShape : 'rectangle',
												backgroundImage : containerPicture[(currentBlock.getFieldValue("container_type_global")) == null ? 0 : currentBlock.getFieldValue("container_type_global")],
												backgroundOpacity : 0,
												borderOpacity : 1
											},
											position : {
												x : initPositionX,
												y : initPositionY
											}
										});

										if (this.getFieldValue("pipetteTypeName") == 4) { //DOTTED IF IT IS CONTINUOUS TRANSFER
											elements.edges.push({
												data : {
													name : code,
													source : containerNameSourceID,
													target : containerNameDestination2,
													faveColor : '#0000FF',
													strength : 10
												},
												classes : 'questionable'
											});
										} else {
											elements.edges.push({
												data : {
													name : code,
													source : containerNameSourceID,
													target : containerNameDestination2,
													faveColor : '#0000FF',
													strength : 10
												}
											});
										}
									}
								}
								initPositionX = initPositionX + 150;
						}
						if (this.getParent() && this.getParent().getFieldValue('timeOfOperation') == null && this.getParent().getInput("Experiment") == null && this.getParent().getFieldValue('step') != null) {

							elements.edges.push({
								data : {
									name : "",
									source : "CONTROL" + parentGroupControlID,
									target : containerNameSourceID,
									faveColor : '#0000FF',
									strength : 10
								}
							});
						}
					}

					/************************ CASE SOURCE NOT list *******************************/
					/***************************************************************************/
					else if (blockDestination != null) { //Case without list
						initPositionY = initPositionY + 75;

						if (this.getInputTargetBlock('source') != null) { //Get the block in the SOURCE input if exists
							blockSource = this.getInputTargetBlock('source');
							var localInitPositionX = initPositionX
								var localInitPositionY = initPositionY
								var containerNameSource = this.getInputTargetBlock('source').getFieldValue('containerName');
							if ((blockSource.getFieldValue("Destiny") == "Ambient") || (blockSource.getFieldValue("Destiny") == "Minus80") || (blockSource.getFieldValue("Destiny") == "Minus20") || (blockSource.getFieldValue("Destiny") == "Four")) {
								var colorContainer = '#00FF00'
							} else {
								var colorContainer = '#FF0000'
							}

							if (this.getInputTargetBlock('destination') != null) {
								blockDestination = this.getInputTargetBlock('destination');
								if ((blockDestination.getFieldValue("Destiny") == "Ambient") || (blockDestination.getFieldValue("Destiny") == "Minus80") || (blockDestination.getFieldValue("Destiny") == "Minus20") || (blockDestination.getFieldValue("Destiny") == "Four")) {
									var colorContainerDestination = '#00FF00'
								} else {
									var colorContainerDestination = '#FF0000'
								}

							}
							/**************** WITHOUT CONDITIONAL PARENT *******************************/
							/***************************************************************************/
							if (parentGroupControl == null) {
								if (this.getParent().getFieldValue("timeOfOperation") == null) {
									containerNameSourceID = renameContainerForTimingSecond(containerNameSource);
								} else {
									containerNameSourceID = renameContainerForTimingFirst(containerNameSource);
								}
								elements.nodes.push({
									data : {
										id : containerNameSourceID,
										name : containerNameSource,
										weight : 6500,
										faveColor : colorContainer,
										faveShape : 'rectangle',
										backgroundImage : containerPicture[(blockSource.getFieldValue("container_type_global")) == null ? 0 : blockSource.getFieldValue("container_type_global")],
										backgroundOpacity : 0,
										borderOpacity : 1
									},
									position : {
										x : initPositionX,
										y : initPositionY
									}
								});
								/*************************DESTINATION************************************/
								if (this.getInputTargetBlock('destination') != null) { //Get the block in the DESTINATION input if exists
									initPositionY = initPositionY + 75;
									var containerNameDestination = this.getInputTargetBlock('destination').getFieldValue('containerName');
									containerNameDestination2 = renameContainerForTimingSecond(containerNameDestination);
									
									elements.nodes.push({
										data : {
											id : containerNameDestination2,
											name : containerNameDestination,
											weight : 45,
											faveColor : colorContainerDestination,
											faveShape : 'rectangle',
											backgroundImage : containerPicture[(blockDestination.getFieldValue("container_type_global")) == null ? 0 : blockDestination.getFieldValue("container_type_global")],
											backgroundOpacity : 0,
											borderOpacity : 1
										},
										position : {
											x : initPositionX,
											y : initPositionY
										}
									});
									if (this.getFieldValue("pipetteTypeName") == 4) { //DOTTED IF IT IS CONTINUOUS TRANSFER
										elements.edges.push({
											data : {
												name : code,
												source : containerNameSourceID,
												target : containerNameDestination2,
												faveColor : '#0000FF',
												strength : 10
											},
											classes : 'questionable'
										});
									} else {
										elements.edges.push({
											data : {
												name : code,
												source : containerNameSourceID,
												target : containerNameDestination2,
												faveColor : '#0000FF',
												strength : 10
											}
										});
									}
								}
							}
							/************************ CONDITIONAL PARENT *******************************/
							/***************************************************************************/
							else {
								if (this.getParent().getFieldValue("timeOfOperation") == null) {
									containerNameSourceID = renameContainerForTimingSecond(containerNameSource);
								} else {
									containerNameSourceID = renameContainerForTimingFirst(containerNameSource);
								}
								elements.nodes.push({
									data : {
										id : containerNameSourceID,
										parent : parentGroupControlType + parentGroupControl,
										name : containerNameSource,
										weight : 6500,
										faveColor : colorContainer,
										faveShape : 'rectangle',
										backgroundImage : containerPicture[(blockSource.getFieldValue("container_type_global")) == null ? 0 : blockSource.getFieldValue("container_type_global")],
										backgroundOpacity : 0,
										borderOpacity : 1
									},
									position : {
										x : initPositionX,
										y : initPositionY
									}
								});
								if (this.getParent().getFieldValue('timeOfOperation') == null) {

									elements.edges.push({
										data : {
											name : "",
											source : "CONTROL" + parentGroupControlID,
											target : containerNameSourceID,
											faveColor : '#0000FF',
											strength : 10
										}
									});
								}
								var containerNameSource2 = renameContainerForTimingSecond(containerNameSourceID);
								/*************************DESTINATION************************************/
								if (this.getInputTargetBlock('destination') != null) {
									initPositionY = initPositionY + 75;
									var containerNameDestination = this.getInputTargetBlock('destination').getFieldValue('containerName');
									containerNameDestination2 = renameContainerForTimingSecond(containerNameDestination);
									elements.nodes.push({
										data : {
											id : containerNameDestination2,
											parent : parentGroupControlType + parentGroupControl,
											name : containerNameDestination,
											weight : 45,
											faveColor : colorContainerDestination,
											faveShape : 'rectangle',
											backgroundImage : containerPicture[(blockDestination.getFieldValue("container_type_global")) == null ? 0 : blockDestination.getFieldValue("container_type_global")],
											backgroundOpacity : 0,
											borderOpacity : 1
										},
										position : {
											x : initPositionX,
											y : initPositionY
										}
									});
									if (this.getFieldValue("pipetteTypeName") == 4) { //DOTTED IF IT IS CONTINUOUS TRANSFER
										elements.edges.push({
											data : {
												name : code,
												source : containerNameSourceID,
												target : containerNameDestination2,
												faveColor : '#0000FF',
												strength : 10
											},
											classes : 'questionable'
										});
									} else {
										elements.edges.push({
											data : {
												name : code,
												source : containerNameSourceID,
												target : containerNameDestination2,
												faveColor : '#0000FF',
												strength : 10
											}
										});
									}
								}
							}
						}
					}
				}
			}
	}
	code = "pipette";
	initPositionX = localInitPositionX;
	return code;
};

Blockly.Graph['turbidostat'] = function (block) {
	return "";
}

/**********************************************************************************************************/
/**********************************************************************************************************/
/***************************************************GENERAL BLOCKS*****************************************/
/**********************************************************************************************************/
/**********************************************************************************************************/

Blockly.Graph['experiment'] = function (block) {
	var code = '';
	code = Blockly.Graph.blockToCode(this.getInputTargetBlock('inputOfExperiment')); //Just call the children blocks and create the code string
	return code;
};

Blockly.Graph['step'] = function (block) {
	var code = Blockly.Graph.blockToCode(this.getInputTargetBlock('inputOfExperiment')); //Just call the children blocks
	return code
};

/*Although it is empty is necessary to create this functions to avoid errors*/
Blockly.Graph['container'] = function (block) {};

/*Although it is empty is necessary to create this functions to avoid errors*/
Blockly.Graph['containerList'] = function (block) {};

/**********************************************************************************************************/
/**********************************************************************************************************/
/***************************************PARTICULAR FUNCTIONS***********************************************/
/**********************************************************************************************************/
/**********************************************************************************************************/

/*Function to rename the current container we are working, to display the different steps*/
renameContainerForTimingFirst = function (code) {
	var currentCode = code;
	var modified = 0; //Boolean to know if it exists previously the current name/code in the elements object
	while (modified == 0) { //This loop allow check if it exists the name, and the name with more ' values, as times as possible.
		modified = 1;
		for (var k = 0; k < elements.nodes.length; k++) { //Iterate all the id in the element.nodes object
			if (elements.nodes[k].data.id == currentCode) {
				currentCode = currentCode + "'"; //add to the current name a ' character
				modified = 0; //As the name was modified change this value, to restart the loop.
			}
		}
	}
	if (currentCode[currentCode.length - 1] == "'") { //The last time we add the ' character is removed
		currentCode = currentCode.substring(0, currentCode.length - 1)
	}

	return currentCode;
}
/*Function to rename the current container we are working, to display the different steps. In this function the last ' character is not removed*/
renameContainerForTimingSecond = function (code) {

	var currentCode = code;
	var modified = 0; //Boolean to know if it exists previously the current name/code in the elements object
	while (modified == 0) { //This loop allow check if it exists the name, and the name with more ' values, as times as possible.
		modified = 1;
		for (var k = 0; k < elements.nodes.length; k++) { //Iterate all the id in the element.nodes object
			if (elements.nodes[k].data.id == currentCode) {
				currentCode = currentCode + "'"; //add to the current name a ' character
				modified = 0; //As the name was modified change this value, to restart the loop.
			}
		}
	}

	return currentCode;
}
