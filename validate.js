/*
File: init.js
GUI Assignment: #4, Making a dynamic table with multiple tabs
Garrett Bacon, UMass Lowell Computer Science, Garrett_Bacon@student.uml.edu
This file validates the user input and also handles tab creation
*/
$(document).ready(function(){
    

    //Take our error message fields and hide them until they are needed
    $("#errorTStart").hide();
    $("#errorTEnd").hide();
    $("#errorSStart").hide();
    $("#errorSEnd").hide();


    $("#LowTStart").hide();
    $("#LowTEnd").hide();
    $("#LowSStart").hide();
    $("#LowSEnd").hide();

    $("#HighTStart").hide();
    $("#HighTEnd").hide();
    $("#HighSStart").hide();
    $("#HighSEnd").hide();

    var currentTab=1;
    var numTabs=1;
    initializeTab();

    //initialize the sliders
    $("#tSSlider").slider({
        min: -75, //set the bounds for the slider
        max: 75,
        slide: function(event, ui) {
            $("#topStart").val(ui.value); // Update input field on slide
            validate(currentTab); //validates numbers and generates table
        }
    });

    //initialize the sliders
    $("#tESlider").slider({
        min: -75, //set the bounds for the slider
        max: 75,
        slide: function(event, ui) {
            $("#topEnd").val(ui.value); // Update input field on slide
            validate(currentTab); //validates numbers and generates table
        }
    });
    //initialize the sliders
    $("#sSSlider").slider({
        min: -75, //set the bounds for the slider
        max: 75,
        slide: function(event, ui) {
            $("#sideStart").val(ui.value); // Update input field on slide
            validate(currentTab); //validates numbers and generates table
        }
    });
    //initialize the sliders
    $("#sESlider").slider({
        min: -75, //set the bounds for the slider
        max: 75,
        slide: function(event, ui) {
            $("#sideEnd").val(ui.value); // Update input field on slide
            validate(currentTab); //validates numbers and generates table
        }
    });
    

    //Bounding the text input to the sliders
    $("#topStart").on("input", function(){
        if($("#topStart").val() < -75){
            $("#errorTStart").hide();
            $("#HighTStart").hide();
            $("#LowTStart").show();
        }
        else if($("#topStart").val() > 75){
            $("#LowTStart").hide();
            $("#errorTStart").hide();
            $("#HighTStart").show();
        }else{
            $("#LowTStart").hide();
            $("#HighTStart").hide();
            $("#errorTStart").hide();
            var value = $(this).val(); //pulls the value from our input
            $("#tSSlider").slider("value",value); //takes that value and updates the slider with it
            validate(currentTab); //validates numbers and generates table
        }
    });

    $("#topEnd").on("input", function(){
        if($("#topEnd").val() < -75){
            $("#errorTEnd").hide();
            $("#HighTEnd").hide();
            $("#LowTEnd").show();
        }
        else if($("#topEnd").val() > 75){
            $("#LowTEnd").hide();
            $("#errorTEnd").hide();
            $("#HighTEnd").show();
        }else{
            $("#HighTEnd").hide();
            $("#LowTEnd").hide();
            $("#errorTEnd").hide();
            var value = $(this).val(); //pulls the value from our input
            $("#tESlider").slider("value",value); //takes that value and updates the slider with it
            validate(currentTab); //validates numbers and generates table
        }
    });

    $("#sideStart").on("input", function(){
        if($("#sideStart").val() < -75){
            $("#errorSStart").hide();
            $("#HighSStart").hide();
            $("#LowSStart").show();
        }
        else if($("#sideStart").val() > 75){
            $("#LowSStart").hide();
            $("#errorSStart").hide();
            $("#HighSStart").show();
        }else{
            var value = $(this).val(); //pulls the value from our input
            $("#sSSlider").slider("value",value); //takes that value and updates the slider with it
            validate(currentTab); //validates numbers and generates table
        }
    });
    
    $("#sideEnd").on("input", function(){
        if($("#sideEnd").val() < -75){
            $("#errorSEnd").hide();
            $("#HighSEnd").hide();
            $("#LowSEnd").show();
        }
        else if($("#sideEnd").val() > 75){
            $("#LowSEnd").hide();
            $("#errorSEnd").hide();
            $("#HighSEnd").show();
        }else{
            var value = $(this).val(); //pulls the value from our input
            $("#sESlider").slider("value",value); //takes that value and updates the slider with it
            validate(currentTab); //validates numbers and generates table
        }
    });

    $("#tableGen").click(function(event){
        validate(currentTab); //validate our numbers and generate the table
    });

    //Save table being pressed takes the table data and makes a new tab with it, old tab is no longer modifiable
    $("#saveTable").click(function(event){
        //get the table html from where its stored
        var table = $(`#${currentTab}`).html();
        if(table){
            //create a new tab to house our dynamic table, current state of previous tab is saved
            var tabNum = currentTab + 1;
            var tabName = "Table "+tabNum;
            var tabID = tabNum;

            $("#tabList").append('<li><a href="#' + tabID + '">' + tabName + '</a> <span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span></li>');
            $("#tabs").append('<div id="' + tabID + '" class = "mult">' + table + '</div>');
            $("#tabs").tabs("refresh");
            currentTab++;
            numTabs++;
        } else{
            //throw an error if there is not a table (Depreciated edge case)
            $("#result").html("<h5>Please generate a table!<h5>");
        }
    });
    //Adds functionality to remove the tabs when the x button is clicked
    $("#tabList").on("click", ".ui-icon-close", function() {
        if(numTabs == 1){
            
        } else{
            var panelId = $(this).closest("li").remove().attr("aria-controls");
            $("#" + panelId).remove();
            //if the panel is the current working tab, update it to 
            if (panelId == currentTab){
                currentTab--;
            }
            $("#tabs").tabs("refresh"); 
            numTabs--; //decrement our tab number
        }

    });
    //when the clear tab button is pressed we get rid of all the tabs
    $("#clearTabs").click(function(event){
        //Functionality to destroy every tab and initialize a new blank tab
        $("#tabs").tabs("destroy");
        $("#tabs").empty();
        $("#tabs").append('<ul id="tabList"></ul>');
        initializeTab(); //create a first tab
        currentTab = 1; //reset the tab counter
        numTabs =1; //reduce our tabs number
    });
});

//initialize our tabs
function initializeTab(){
    //creates a blank tab
    $("#tabs").tabs();
    var tabNum = 1;
    var tabName = "Table "+tabNum;
    var tabID = tabNum;

    $("#tabList").append('<li><a href="#' + tabID + '">' + tabName + '</a> <span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span></li>');
    $("#tabs").append('<div id="' + tabID + '" class = "mult"></div>');
    $("#tabs").tabs("refresh");

    $("#tabs").tabs("option", "active", tabNum);
}

//moved validation to its own function to clean up code, checks for four valid inputs before generating
function validate(currentTab){
    var validNum = 0;
    if(parseInt($("#topStart").val()) < -75){
        $("#errorTStart").hide();
        $("#HighTStart").hide();
        $("#LowTStart").show();
    }
    else if($("#topStart").val() > 75){
        $("#LowTStart").hide();
        $("#errorTStart").hide();
        $("#HighTStart").show();
    }
    else if($("#topStart").val() ==""){
        $("#LowTStart").hide();
        $("#HighTStart").hide();
        $("#errorTStart").show();
    }
    else{
        validNum++;
        $("#LowTStart").hide();
        $("#HighTStart").hide();
        $("#errorTStart").hide();
    }

    if($("#topEnd").val() < -75){
        $("#errorTEnd").hide();
        $("#HighTEnd").hide();
        $("#LowTEnd").show();
    }
    else if($("#topEnd").val() > 75){
        $("#LowTEnd").hide();
        $("#errorTEnd").hide();
        $("#HighTEnd").show();
    }
    else if($("#topEnd").val() ==""){
        $("#HighTEnd").hide();
        $("#LowTEnd").hide();
        $("#errorTEnd").show();
    }
    else{
        validNum++;
        $("#HighTEnd").hide();
        $("#LowTEnd").hide();
        $("#errorTEnd").hide();
    } 

    if($("#sideStart").val() < -75){
        $("#errorSStart").hide();
        $("#HighSStart").hide();
        $("#LowSStart").show();
    }
    else if($("#sideStart").val() > 75){
        $("#LowSStart").hide();
        $("#errorSStart").hide();
        $("#HighSStart").show();
    }
    else if($("#sideStart").val() ==""){
        $("#HighSStart").hide();
        $("#LowSStart").hide();
        $("#errorSStart").show();
    }
    else{
        validNum++;
        $("#HighSStart").hide();
        $("#LowSStart").hide();
        $("#errorSStart").hide();
    } 


    if($("#sideEnd").val() < -75){
        $("#errorSEnd").hide();
        $("#HighSEnd").hide();
        $("#LowSEnd").show();
    }
    else if($("#sideEnd").val() > 75){
        $("#LowSEnd").hide();
        $("#errorSEnd").hide();
        $("#HighSEnd").show();
    }
    else if($("#sideEnd").val() ==""){
        $("#HighSEnd").hide();
        $("#LowSEnd").hide();
        $("#errorSEnd").show();
    }
    else{
        validNum++;
        $("#HighSEnd").hide();
        $("#LowSEnd").hide();
        $("#errorSEnd").hide();
    } 

    if (validNum == 4){
        //initialize data to be generated in the table
        const tStart = $("#topStart").val();
        const tEnd = $("#topEnd").val();
        const sStart = $("#sideStart").val();
        const sEnd = $("#sideEnd").val();
        generateTable(tStart,tEnd,sStart,sEnd, currentTab);
    }
}