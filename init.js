/*
File: init.js
GUI Assignment: #3, Adding a multiplication table to a website
Garrett Bacon, UMass Lowell Computer Science, Garrett_Bacon@student.uml.edu
This file validates the user input and uses it to create a html table that displays multiplication
*/


//function to take parameter values and generate a table
function generateTable(xStart, xEnd, yStart,yEnd){
    //get the divs for our message boxes to use for display
    const xmessageDiv = document.getElementById('xmessage');
    const ymessageDiv = document.getElementById('ymessage');

    const xStartDiv = document.getElementById("topStart");
    const xEndDiv = document.getElementById("topEnd");
    const yStartDiv = document.getElementById("sideStart");
    const yEndDiv = document.getElementById("sideEnd");

    //initialzes the message boxes to an empty string
    xmessageDiv.innerText = '';
    ymessageDiv.innerText = '';

    //if the user has used a decimal number, we swap to an integer and display the new result
    if(!Number.isInteger(xStart)){
        xStart = parseInt(xStart);
        xStartDiv.value = xStart.toString();
    }
    if(!Number.isInteger(xEnd)){
        xEnd = parseInt(xEnd);
        xEndDiv.value = xEnd.toString();
    }
    if(!Number.isInteger(yStart)){
        yStart = parseInt(yStart);
        yStartDiv.value = yStart.toString();
    }
    if(!Number.isInteger(yEnd)){
        yEnd = parseInt(yEnd);
        yEndDiv.value = yEnd.toString();
    }


    //Check to see if the bounds are backwards, if so swap them and display the values in their new spots in the form
    //also displays a message letting the user know the bounds have been swapped
    if(xStart>xEnd){
        var temp = xStart;
        xStart = xEnd;
        xEnd = temp;
        xStartDiv.value = xStart.toString();
        xEndDiv.value = xEnd.toString();
        xmessageDiv.innerText = 'Detected starting x bound greater than end, swapping values';
    }
    if(yStart>yEnd){
        var temp = yStart;
        yStart = yEnd;
        yEnd = temp;
        yStartDiv.value = yStart.toString();
        yEndDiv.value = yEnd.toString();
        ymessageDiv.innerText = 'Detected starting  y bound greater than end, swapping values';
    }

    //get the div used to display the result
    const resultDiv = document.getElementById('result');
    //initialize table html object
    let table = '<table><thead><tr><th>-</th>';
    //create the top row of the table ${} allows us to include the var in our text
    for (i = xStart; i <= xEnd; i++){
        table += `<th> ${i} </th>`;
    }
    table+='</tr></thead><tbody>';

    //double for loop to generate the inside of the table
    //first loop creates the y axis
    for(i = yStart; i <= yEnd; i++){
        table+=`<tr><th>${i}</th>`;
        //second loop creates the multiplied number inside the table
        for(j = xStart; j<=xEnd; j++){
            table += `<td>${i*j}</td>`;
        }
        //terminate the row
        table +='</tbody></tr>'
    }
    resultDiv.innerHTML = ''; //clear html for resultdiv
    resultDiv.innerHTML = table; //display our newly generated table
}