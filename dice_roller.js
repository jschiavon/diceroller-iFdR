const results = [];


function diceroll(sides = 6){
    let randomNumber = Math.floor(Math.random() * sides) + 1;
    return randomNumber;
}

function rolld20(stat) {
    let roll = diceroll(20);
    let modifier = document.getElementById(stat).innerHTML;
    if (!modifier){
        var mod = 0;
    } else {
        var mod = parseInt(modifier);
    }
    var result = {
        rolled: roll, 
        modifier: mod,
        stat: stat
    };
    results.push(result);
    printNumber(result);
    printDetails(result);
    printHistory(results);
    printAverage(results);
}

function applyinputs(){
    let valori = ["attacco", "secondario", "iniziativa", "armatura", "fisico", "spirito", "fortuna"];

    let i, x, y;
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

function printNumber(result) {
    let placeholder = document.getElementById('placeholder');
    placeholder.innerHTML = result.rolled + result.modifier;
}

function printDetails(result) {
    let fullresult = document.getElementById('fullresult');
    if (!result.modifier){
        fullresult.innerHTML = result.rolled;
    } else {
        fullresult.innerHTML = result.rolled + " + " + result.modifier;
    }
    
}

function printHistory(results) {
    let history = document.getElementById('history');
    history.innerHTML = '';
    for (let i = results.length -1; i >= 0;i--) {
        history.innerHTML += format_roll(results[i]) + "\n";
    }
}

function printAverage(results) {
    let average = document.getElementById('average');
    let avg = 0;
    for (let i = 0; i < results.length; i++) {
        res = results[i];
        avg += res.rolled;
    }
    avg = avg / results.length;
    average.innerHTML = Number(avg).toFixed(2);
}

function format_roll(result) {
    roll = result.rolled;
    mod = result.modifier;
    tot = roll + mod;
    let res = "";
    if (!mod){
        res = result.stat + ": " + roll;
    } else {
        res = result.stat + ": " + roll + " + " + mod + " = " + tot;
    }
    return res;
}


// Get the modal
var modal = document.getElementById('input_form');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}