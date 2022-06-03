
function diceroll(sides = 6){
    var randomNumber = Math.floor(Math.random() * sides) + 1;
    return randomNumber;
}

function rolld20(stat) {
    var roll = diceroll(20);
    var modifier = document.getElementById(stat).innerHTML;
    if (!modifier){
        var modifier = 0;
    } else {
        var modifier = parseInt(modifier);
    }
    var result = roll + modifier;
    printNumber(result);
    printDetails(roll, modifier);
    printHistory(stat, result);
}
  


function applyinputs(){
    var valori = ["attacco", "secondario", "iniziativa", "armatura", "fisico", "spirito"];

    var i, x, y;
    for (i = 0; i < valori.length; i++){
        x = document.getElementById(valori[i]);
        y = document.getElementById(valori[i] + "_inpt");
        if (!y.value){
            x.innerHTML = "0";    
        } else {
            x.innerHTML = y.value;
        }
    }
    document.getElementById('input_form').style.display='none';
}  



//Prints dice roll to the page

function printNumber(number) {
    var placeholder = document.getElementById('placeholder');
    placeholder.innerHTML = number;
}

function printDetails(roll, modifier){
    var fullresult = document.getElementById('fullresult');
    if (!modifier){
        fullresult.innerHTML = roll;
    } else {
        fullresult.innerHTML = roll + " + " + modifier;
    }
    
}

function printHistory(stat, result){
    var history = document.getElementById('history');
    history.innerHTML = stat + ": " + result + "\n" + history.innerHTML;
}
  

// Get the modal
var modal = document.getElementById('input_form');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}