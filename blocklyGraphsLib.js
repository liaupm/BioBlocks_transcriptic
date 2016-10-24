/*
The MIT License (MIT)

Copyright (c) 2016 Universidad Politécnica de Madrid

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @file This file is used for translating the  blockly blocks to graphs.
 * @author Vishal Gupta, Jesús Irimia, Iván Pau, Alfonso Rodríguez-Patón, Ángel Panizo <contactLIAUPM@gmail.com>
 */

var parentGroupControl = null; //Variable to know the name of the parent (type of parent: if-while-for...)
var parentGroupControlType = null; //Variable to know the type of input is workinf in the parent (TRUE, FALSE, DO, DOi, ELSE...)
var parentGroupControlID = null; //Variable to store the ID of the parent block.

Blockly.Graph['controls_if'] = function (block) {
	var code = "IF: "
		var localInitPositionY = initPositionY; //Store the current Y position to restart when is necessary
	var localInitPositionX = initPositionX; //Store the current X position to restart when is necessary
	colorContainer = '#0000FF';
	initPositionY = initPositionY + 150; //To avoid overlap in two nodes.
	if (this.getParent().getFieldValue("timeOfOperation") != null) {
		if (this.getParent().getInputTargetBlock('source').getInput('contListOption') != null) { //Switch the condition to be list or not take a name direct from the block or through tthe list of block
			elements.edges.push({
				data: {
					name: "...",
					source: renameContainerForTimingFirst(this.getParent().getInputTargetBlock('source').getInputTargetBlock("contListOptionValueNum1").getFieldValue('containerName')),
					target: "CONTROL" + this.id,
					faveColor: '#0000FF',
					strength: 10
				}
			});
		} else {
			elements.edges.push({
				data : {
					name : "...",
					source : renameContainerForTimingFirst(this.getParent().getInputTargetBlock('source').getFieldValue('containerName')),
					target : "CONTROL" + this.id,
					faveColor : '#0000FF',
					strength : 10
				}
			});
		}
	}
	parentGroupControlID = this.id; //Store the ID to use in the child
	/********* IF CONDITION *******/
	var i = 0;
	elements.nodes.push({
		data : {
			id : "CONTROL" + this.id,
			name : code,
			weight : 45,
			faveColor : '#FF8000',
			faveShape : 'diamond',
			backgroundImage : containerPicture[0],
			backgroundOpacity : 1,
			borderOpacity : 0
		},
		position : {
			x : initPositionX,
			y : initPositionY
		}
	});
	while (this.getInput('DO' + i) != null) {
		parentGroupControlType = "TRUE";
		initPositionX = initPositionX + 150;
		initPositionY = localInitPositionY + 50;
		elements.nodes.push({
			data : {
				id : "TRUE" + this.id.toString() + i,
				name : this.getInputTargetBlock("IF" + i),
				weight : 45,
				faveColor : '#FF8000',
				faveShape : 'diamond',
				backgroundImage : containerPicture[0],
				backgroundOpacity : 1,
			borderOpacity : 0
			},
			position : {
				x : initPositionX,
				y : initPositionY
			}
		});
		parentGroupControl = this.id.toString() + i; //Assign the ID plus the current value we are working, to avoid conflicts.
		Blockly.Graph.blockToCode(this.getInputTargetBlock("DO" + i)); //Call the block which is attached to DOi position.
		parentGroupControl = null;
		i++;
	}

	/********* ELSE CONDITION *******/
	if (this.getInput('ELSE')) {
		initPositionY = localInitPositionY + 50;
		parentGroupControlType = "FALSE";
		initPositionX = initPositionX + 150;
		elements.nodes.push({
			data : {
				id : "FALSE" + this.id,
				name : "FALSE",
				weight : 45,
				faveColor : '#FF8000',
				faveShape : 'diamond',
				backgroundImage : containerPicture[0],
				backgroundOpacity : 1,
			borderOpacity : 0
			},
			position : {
				x : initPositionX,
				y : initPositionY
			}
		});
		parentGroupControl = this.id;
		Blockly.Graph.blockToCode(this.getInputTargetBlock("ELSE"));
		parentGroupControl = null;

	}
	//If it exists next block, we create the edges to connect them.
	if (this.getNextBlock() != null) {
		if (this.getNextBlock().getFieldValue("timeOfOperation") != null) {
			if (this.getNextBlock().getInputTargetBlock('source').getInput('contListOption')) {
				var nameTarget = this.getNextBlock().getInputTargetBlock('source').getInputTargetBlock("contListOptionValueNum1").getFieldValue('containerName')
			} else {
				var nameTarget = this.getNextBlock().getInputTargetBlock('source').getFieldValue('containerName')
			}
			elements.edges.push({
				data : {
					name : "CONTINUE",
					source : "CONTROL" + this.id,
					target : renameContainerForTimingSecond(nameTarget),
					faveColor : '#FF0000',
					strength : 10
				}
			});
			i = 0;
			while (this.getInput('DO' + i) != null) {
				elements.edges.push({
					data : {
						name : "CONTINUE",
						source : "TRUE" + this.id.toString() + i,
						target : renameContainerForTimingSecond(nameTarget),
						faveColor : '#FF0000',
						strength : 10
					}
				});
				i++;
			}
			if (this.getInput('ELSE')) {
				elements.edges.push({
					data : {
						name : "CONTINUE",
						source : "FALSE" + this.id,
						target : renameContainerForTimingSecond(nameTarget),
						faveColor : '#FF0000',
						strength : 10
					}
				});
			}
		} else {
			elements.edges.push({
				data : {
					name : "CONTINUE",
					source : "CONTROL" + this.id,
					target : "CONTROL" + this.getNextBlock().id,
					faveColor : '#FF0000',
					strength : 10
				}
			});
			i = 0;
			while (this.getInput('DO' + i) != null) {
				elements.edges.push({
					data : {
						name : "CONTINUE",
						source : "TRUE" + this.id.toString() + i,
						target : "CONTROL" + this.getNextBlock().id,
						faveColor : '#FF0000',
						strength : 10
					}
				});
				i++;
			}
			if (this.getInput('ELSE')) {
				elements.edges.push({
					data : {
						name : "CONTINUE",
						source : "FALSE" + this.id,
						target : "CONTROL" + this.getNextBlock().id,
						faveColor : '#FF0000',
						strength : 10
					}
				});
			}
		}
	}
	initPositionY = initPositionY + 100;
	initPositionX = localInitPositionX; //Restart X position
	return code;
};

Blockly.Graph['controls_repeat_ext'] = function (block) {
	var code = 'Repeat ';
	var localInitPositionY = initPositionY; //Store the current Y position to restart when is necessary
	var localInitPositionX = initPositionX; //Store the current X position to restart when is necessary
	colorContainer = '#0000FF';
	initPositionY = initPositionY + 50;
	elements.nodes.push({
		data : {
			id : "CONTROL" + this.id,
			name : code,
			weight : 45,
			faveColor : '#FF8000',
			faveShape : 'diamond',
			backgroundImage : containerPicture[0],
			backgroundOpacity : 1,
			borderOpacity : 0
		},
		position : {
			x : initPositionX,
			y : initPositionY
		}
	});
	if (this.getParent().getFieldValue("timeOfOperation") != null) {
		elements.edges.push({
			data : {
				name : "...",
				source : renameContainerForTimingFirst(this.getParent().getInputTargetBlock('source').getFieldValue('containerName')),
				target : "CONTROL" + this.id,
				faveColor : '#0000FF',
				strength : 10
			}
		});
	}
	parentGroupControlID = this.id;
	initPositionY = localInitPositionY - 50;
	parentGroupControlType = "DO";
	initPositionX = initPositionX + 150;
	elements.nodes.push({
		data : {
			id : "DO" + this.id,
			name : this.getInputTargetBlock('TIMES').getFieldValue("NUM") + " times",
			weight : 45,
			faveColor : '#FF8000',
			faveShape : 'diamond',
			backgroundImage : containerPicture[0],
			backgroundOpacity : 1,
			borderOpacity : 0
		},
		position : {
			x : initPositionX,
			y : initPositionY
		}
	});
	parentGroupControl = this.id;
	Blockly.Graph.blockToCode(this.getInputTargetBlock("DO"));
	parentGroupControl = null;

	if (this.getNextBlock() != null) {
		if (this.getNextBlock().getInputTargetBlock('source').getInput('contListOption')) {
			var nameTarget = this.getNextBlock().getInputTargetBlock('source').getInputTargetBlock("contListOptionValueNum1").getFieldValue('containerName')
		} else {
			var nameTarget = this.getNextBlock().getInputTargetBlock('source').getFieldValue('containerName')
		}
		if (this.getNextBlock().getFieldValue("timeOfOperation") != null) {
			elements.edges.push({
				data : {
					name : "CONTINUE",
					source : "CONTROL" + this.id,
					target : renameContainerForTimingSecond(nameTarget),
					faveColor : '#FF0000',
					strength : 10
				}
			});
		} else {
			elements.edges.push({
				data : {
					name : "CONTINUE",
					source : "CONTROL" + this.id,
					target : "CONTROL" + this.getNextBlock().id,
					faveColor : '#FF0000',
					strength : 10
				}
			});
		}
	}
	elements.edges.push({
		data : {
			name : "LOOP",
			source : "DO" + this.id,
			target : "CONTROL" + this.id,
			faveColor : '#FF0000',
			strength : 10
		}
	});
	initPositionY = initPositionY + 100;
	initPositionX = localInitPositionX;
	return code;
};

Blockly.Graph['controls_whileUntil'] = function (block) {
	var code = this.getFieldValue("MODE");
	var localInitPositionY = initPositionY; //Store the current Y position to restart when is necessary
	var localInitPositionX = initPositionX; //Store the current X position to restart when is necessary
	colorContainer = '#0000FF';
	initPositionY = initPositionY + 50;
	elements.nodes.push({
		data : {
			id : "CONTROL" + this.id,
			name : code,
			weight : 45,
			faveColor : '#FF8000',
			faveShape : 'diamond',
			backgroundImage : containerPicture[0],
			backgroundOpacity : 1,
			borderOpacity : 0
		},
		position : {
			x : initPositionX,
			y : initPositionY
		}
	});
	if (this.getParent().getFieldValue("timeOfOperation") != null) {
		elements.edges.push({
			data : {
				name : "...",
				source : renameContainerForTimingFirst(this.getParent().getInputTargetBlock('source').getFieldValue('containerName')),
				target : "CONTROL" + this.id,
				faveColor : '#0000FF',
				strength : 10
			}
		});
	}
	parentGroupControlID = this.id;
	initPositionY = localInitPositionY - 50;
	parentGroupControlType = "DO";
	initPositionX = initPositionX + 150;
	if (this.getInputTargetBlock('BOOL') != null) {
		elements.nodes.push({
			data : {
				id : "DO" + this.id,
				name : this.getInputTargetBlock('BOOL'),
				weight : 45,
				faveColor : '#FF8000',
				faveShape : 'diamond',
				backgroundImage : containerPicture[0],
				backgroundOpacity : 1,
			borderOpacity : 0
			},
			position : {
				x : initPositionX,
				y : initPositionY
			}
		});
	} else {
		elements.nodes.push({
			data : {
				id : "DO" + this.id,
				name : "CHOOSE BOOLEAN",
				weight : 45,
				faveColor : '#FF8000',
				faveShape : 'diamond',
				backgroundImage : containerPicture[0],
				backgroundOpacity : 1,
			borderOpacity : 0
			},
			position : {
				x : initPositionX,
				y : initPositionY
			}
		});
	}
	parentGroupControl = this.id;
	Blockly.Graph.blockToCode(this.getInputTargetBlock("DO"));
	parentGroupControl = null;

	if (this.getNextBlock() != null) {
		if (this.getNextBlock().getInputTargetBlock('source').getInput('contListOption')) {
			var nameTarget = this.getNextBlock().getInputTargetBlock('source').getInputTargetBlock("contListOptionValueNum1").getFieldValue('containerName')
		} else {
			var nameTarget = this.getNextBlock().getInputTargetBlock('source').getFieldValue('containerName')
		}
		if (this.getNextBlock().getFieldValue("timeOfOperation") != null) {
			elements.edges.push({
				data : {
					name : "CONTINUE",
					source : "CONTROL" + this.id,
					target : renameContainerForTimingSecond(nameTarget),
					faveColor : '#FF0000',
					strength : 10
				}
			});
		} else {
			elements.edges.push({
				data : {
					name : "CONTINUE",
					source : "CONTROL" + this.id,
					target : "CONTROL" + this.getNextBlock().id,
					faveColor : '#FF0000',
					strength : 10
				}
			});
		}
	}
	elements.edges.push({
		data : {
			name : "LOOP",
			source : "DO" + this.id,
			target : "CONTROL" + this.id,
			faveColor : '#FF0000',
			strength : 10
		}
	});
	initPositionY = initPositionY + 100;
	initPositionX = localInitPositionX;
	return code;
};

Blockly.Graph['controls_for'] = function (block) {
	var code = 'for ' + this.getFieldValue('VAR') + " from " + this.getInputTargetBlock('FROM').getFieldValue("NUM") + " to " + this.getInputTargetBlock('TO').getFieldValue("NUM") + " by " + this.getInputTargetBlock('BY').getFieldValue("NUM") + " step";
	var localInitPositionY = initPositionY; //Store the current Y position to restart when is necessary
	var localInitPositionX = initPositionX; //Store the current X position to restart when is necessary
	colorContainer = '#0000FF';
	initPositionY = initPositionY + 50;
	elements.nodes.push({
		data : {
			id : "CONTROL" + this.id,
			name : code,
			weight : 45,
			faveColor : '#FF8000',
			faveShape : 'diamond',
			backgroundImage : containerPicture[0],
			backgroundOpacity : 1,
			borderOpacity : 0
		},
		position : {
			x : initPositionX,
			y : initPositionY
		}
	});
	if (this.getParent().getFieldValue("timeOfOperation") != null) {
		elements.edges.push({
			data : {
				name : "...",
				source : renameContainerForTimingFirst(this.getParent().getInputTargetBlock('source').getFieldValue('containerName')),
				target : "CONTROL" + this.id,
				faveColor : '#0000FF',
				strength : 10
			}
		});
	}
	parentGroupControlID = this.id;
	initPositionY = localInitPositionY - 50;
	parentGroupControlType = "DO";
	initPositionX = initPositionX + 150;
	elements.nodes.push({
		data : {
			id : "DO" + this.id,
			name : " DO ",
			weight : 45,
			faveColor : '#FF8000',
			faveShape : 'diamond',
			backgroundImage : containerPicture[0],
			backgroundOpacity : 1,
			borderOpacity : 0
		},
		position : {
			x : initPositionX,
			y : initPositionY
		}
	});
	parentGroupControl = this.id;
	Blockly.Graph.blockToCode(this.getInputTargetBlock("DO"));
	parentGroupControl = null;

	if (this.getNextBlock() != null) {
		if (this.getNextBlock().getInputTargetBlock('source').getInput('contListOption')) {
			var nameTarget = this.getNextBlock().getInputTargetBlock('source').getInputTargetBlock("contListOptionValueNum1").getFieldValue('containerName')
		} else {
			var nameTarget = this.getNextBlock().getInputTargetBlock('source').getFieldValue('containerName')
		}
		if (this.getNextBlock().getFieldValue("timeOfOperation") != null) {
			elements.edges.push({
				data : {
					name : "CONTINUE",
					source : "CONTROL" + this.id,
					target : renameContainerForTimingSecond(nameTarget),
					faveColor : '#FF0000',
					strength : 10
				}
			});
		} else {
			elements.edges.push({
				data : {
					name : "CONTINUE",
					source : "CONTROL" + this.id,
					target : "CONTROL" + this.getNextBlock().id,
					faveColor : '#FF0000',
					strength : 10
				}
			});
		}
	}
	elements.edges.push({
		data : {
			name : "LOOP",
			source : "DO" + this.id,
			target : "CONTROL" + this.id,
			faveColor : '#FF0000',
			strength : 10
		}
	});
	initPositionY = initPositionY + 100;
	initPositionX = localInitPositionX;
	return code;
};

Blockly.Graph['controls_forEach'] = function (block) {
	var code = "for each item " + this.getFieldValue("VAR") + " in list ";
	if (this.getInputTargetBlock("LIST") != null) {
		code = code + this.getInputTargetBlock("LIST");
	} else {
		code = code + "insert LIST";
	}
	var localInitPositionY = initPositionY; //Store the current Y position to restart when is necessary
	var localInitPositionX = initPositionX; //Store the current X position to restart when is necessary
	colorContainer = '#0000FF';
	initPositionY = initPositionY + 50;
	elements.nodes.push({
		data : {
			id : "CONTROL" + this.id,
			name : code,
			weight : 45,
			faveColor : '#FF8000',
			faveShape : 'diamond',
			backgroundImage : containerPicture[0],
			backgroundOpacity : 1,
			borderOpacity : 0
		},
		position : {
			x : initPositionX,
			y : initPositionY
		}
	});
	if (this.getParent().getFieldValue("timeOfOperation") != null) {
		elements.edges.push({
			data : {
				name : "...",
				source : renameContainerForTimingFirst(this.getParent().getInputTargetBlock('source').getFieldValue('containerName')),
				target : "CONTROL" + this.id,
				faveColor : '#0000FF',
				strength : 10
			}
		});
	}
	parentGroupControlID = this.id;
	initPositionY = localInitPositionY - 50;
	parentGroupControlType = "DO";
	initPositionX = initPositionX + 150;
	elements.nodes.push({
		data : {
			id : "DO" + this.id,
			name : "DO",
			weight : 45,
			faveColor : '#FF8000',
			faveShape : 'diamond',
			backgroundImage : containerPicture[0],
			backgroundOpacity : 1,
			borderOpacity : 0
		},
		position : {
			x : initPositionX,
			y : initPositionY
		}
	});
	parentGroupControl = this.id;
	Blockly.Graph.blockToCode(this.getInputTargetBlock("DO"));
	parentGroupControl = null;

	if (this.getNextBlock() != null) {
		if (this.getNextBlock().getInputTargetBlock('source').getInput('contListOption')) {
			var nameTarget = this.getNextBlock().getInputTargetBlock('source').getInputTargetBlock("contListOptionValueNum1").getFieldValue('containerName')
		} else {
			var nameTarget = this.getNextBlock().getInputTargetBlock('source').getFieldValue('containerName')
		}
		if (this.getNextBlock().getFieldValue("timeOfOperation") != null) {
			elements.edges.push({
				data : {
					name : "CONTINUE",
					source : "CONTROL" + this.id,
					target : renameContainerForTimingSecond(nameTarget),
					faveColor : '#FF0000',
					strength : 10
				}
			});
		} else {
			elements.edges.push({
				data : {
					name : "CONTINUE",
					source : "CONTROL" + this.id,
					target : "CONTROL" + this.getNextBlock().id,
					faveColor : '#FF0000',
					strength : 10
				}
			});

		}
	}
	elements.edges.push({
		data : {
			name : "LOOP",
			source : "DO" + this.id,
			target : "CONTROL" + this.id,
			faveColor : '#FF0000',
			strength : 10
		}
	});
	initPositionY = initPositionY + 100;
	initPositionX = localInitPositionX;
	return code;
};

/*Although it is empty is necessary to create this functions to avoid errors*/
Blockly.Graph['controls_flow_statements'] = function (block) {};
