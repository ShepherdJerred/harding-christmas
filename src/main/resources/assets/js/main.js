var christmas = new Date(new Date().getFullYear(), 11, 25);
var lightingDay = new Date(new Date().getFullYear(), 10, 28);
var lastChange = -1;

document.addEventListener('DOMContentLoaded', function () {
    countdown(christmas, updateChristmasTime);
    countdown(lightingDay, updateLightingTime);
    updateFact();
}, false);

function updateChristmasTime(ts) {
    document.querySelector('#christmasTime .days').innerHTML = ts.days + ts.months * 30;
    document.querySelector('#christmasTime .hours').innerHTML = ts.hours;
    document.querySelector('#christmasTime .minutes').innerHTML = ts.minutes;
    document.querySelector('#christmasTime .seconds').innerHTML = ts.seconds;
    if (ts.minutes == 0 && lastChange != ts.hours) {
        updateFact();
        lastChange = ts.hours;
    }
}

function updateLightingTime(ts) {
    if (ts.days == 0) {
        document.querySelector('#lightingTime .days').innerHTML = "The lighting is today!";
        document.querySelector('#lightingTime p').style.display = "none";
        document.querySelector('#lightingTime .days').style.fontSize = "40px";
    } else if (ts.days > 0) {
        if (lightingDay < new Date()) {
            document.querySelector('#lightingTime').style.display = "none";
            return;
        }
        document.querySelector('#lightingTime .days').innerHTML = ts.days + ts.months * 30;
    }
}

function showNotification() {

}

/*
 Facts from
 http://www.factretriever.com/christmas-facts
 http://list25.com/25-bizarre-interesting-facts-christmas
 http://www.goodreads.com/quotes/tag/christmas
 */

function updateFact() {
    var request = new XMLHttpRequest();
    request.onload = function () {
        var fileContent = this.responseText;
        var fileContentLines = fileContent.split('\n');
        var randomLineIndex = Math.floor(Math.random() * fileContentLines.length);
        var randomLine = fileContentLines[randomLineIndex];
        document.getElementById('fact').innerHTML = randomLine;
    };
    request.open('GET', '/js/facts.txt', true);
    request.send();
}