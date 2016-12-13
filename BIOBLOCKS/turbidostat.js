/*
The MIT License (MIT)

Copyright (c) 2016 Universidad Polit�cnica de Madrid

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @file Special function of turbidostat. Include special inputs for the turbidostat. function.
 * @author Vishal Gupta, Jes�s Irimia, Iv�n Pau, Alfonso Rodr�guez-Pat�n, �ngel Panizo <contactLIAUPM@gmail.com>
 */

Blockly.Blocks['turbidostat'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Turbidostat");
        this.appendValueInput("media")
            .setCheck("containerCheck")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Media");
        this.appendValueInput("cellCulture")
            .setCheck("containerCheck")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Cell culture");
        this.appendValueInput("waste")
            .setCheck("containerCheck")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Waste");
        this.appendValueInput("flowrate")
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck(["Number", "Variable"])
            .appendField("Flow rate")
            .appendField(new Blockly.FieldDropdown([["Milliliter", "milliliter"], ["Microliter", "microliter"], ["Nanoliter", "nanoliter"]]), "flowrate_units_volume")
            .appendField("/")
            .appendField(new Blockly.FieldDropdown([["Minutes", "minutes"], ["Milliseconds", "milliseconds"], ["Seconds", "seconds"], ["Hours", "hours"]]), "flowrate_units_time");

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Time of operation")
            .appendField(new Blockly.FieldTextInput("0"), "timeOfOperation");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Duration")
            .appendField(new Blockly.FieldTextInput("0"), "duration")
            .appendField(new Blockly.FieldDropdown([["Hours", "hours"], ["Minutes", "minutes"], ["Seconds", "seconds"], ["Milliseconds", "milliseconds"]]), "Unit_Time");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Frequency")
            .appendField(new Blockly.FieldTextInput("0"), "FREQUENCYOFMEASUREMENT");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Wavelength")
            .appendField(new Blockly.FieldTextInput("0"), "wavelengthnum");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Mantain OD")
            .appendField(new Blockly.FieldDropdown([["Algorithm 1", "algorithm1"], ["Algorithm 2", "algorithm2"], ["Algorithm 3", "algorithm3"]]), "update_algorithm");
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    },

    optionsDisplay_: function (code, block) { //This is the extract of the code in JSON which is called by the Blockly.JavaScript['pipette'] function 

    },

    optionsDisplay_naturalLanguage: function (code, block) { //This is the extract of the code in JSON which is called by the Blockly.JavaScript['pipette'] function 

    }
};