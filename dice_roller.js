const results = [];
const valori = {
    attacco: 0,
    secondario: 0,
    iniziativa: 0,
    armatura: 0,
    fisico: 0,
    spirito: 0,
    fortuna: 0
}
const names_valori = ["attacco", "secondario", "iniziativa", "armatura", "fisico", "spirito", "fortuna"];



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


// Functions to manage valori data structure

function setValori() {
    for (key in valori) {
        if (!valori[key]) {
            document.getElementById(key).innerHTML = "0";
        } else {
            document.getElementById(key).innerHTML = valori[key];
        }    
    }
}

function openDialog() {
    for (key in valori) {
        elem = document.getElementById(key + "_inpt")
        if (!valori[key]) {
            elem.placeholder = "Inserisci il valore di " + key + ", comprensivo di livello."    
        } else {
            elem.value = valori[key];
        }       
    }
    document.getElementById('input_form').style.display='block';
}

function applyDialog() {
    for (key in valori){
        val = document.getElementById(key + "_inpt").value;
        if (!val) {
            valori[key] = 0;
        } else {
            valori[key] = val;
        }
    }
    document.getElementById('input_form').style.display='none';
    setValori();
}

function exportValori() {
    for (key in valori) {
        localStorage.setItem(key, valori[key]);
    }
}

function importValori() {
    for (key in valori) {
        console.log(key + ": " + valori[key] + " <- " + localStorage[key]);
        valori[key] = localStorage[key];
    }
    setValori();
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
    results.forEach(function myFunc(value, index, array){
        history.innerHTML += format_roll(value) + "\n";
    });
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