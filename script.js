function resDisplay(resDate, idDate, idResults) {
    if (resDate == 1) {
        document.getElementById(idDate).style.display = "none";
    } else {
        document.getElementById(idDate).style.display = "inline";
    }

    if (resDate <= 0) {
        document.getElementById("results-" + idResults).innerHTML = 0;
    } else {
        let i = 0;
        let final = resDate;
        let counter = setInterval(function() {
            i++;
            document.getElementById("results-" + idResults).innerHTML = i;
            if (i == final) {
                clearInterval(counter);
            }
        }, 70);
    }
}

function changeBorder(isVal, idVal) {
    if (isVal == false) {
        document.getElementById("input-" + idVal).style.borderColor = "var(--red-400)";
    } else {
        document.getElementById("input-" + idVal).style.borderColor = "var(--grey-200)";
    }
}

function valYear(inDay, inMonth, inYear, curDay, curMonth, curYear) {
    if (inYear > curYear 
    || (inYear == curYear && inMonth == curMonth && inDay > curDay)
    || (inYear == curYear && inMonth > curMonth)) {
        document.getElementById("error-yyyy").innerHTML = "Must be in the past.";
        isYear = false;
    } else if (inYear < 1900) {
        document.getElementById("error-yyyy").innerHTML = "Too old!";
        isYear = false;
    } else {
        document.getElementById("error-yyyy").innerHTML = "";
        isYear = true;
    }
    return isYear;
}

function valMonth(inMonth) {
    if (inMonth < 1 || inMonth > 12) {
        document.getElementById("error-mm").innerHTML = "Must be a valid month.";
        isMonth = false;
    } else {
        document.getElementById("error-mm").innerHTML = "";
        isMonth = true;
    }
    return isMonth;
}

function valDay(inDay, inMonth, inYear) {
    if (inDay < 1 || inDay > 31 || ((inMonth >= 1 || inMonth <= 7) && inMonth%2 == 0 && inDay > 31)
    || ((inMonth >= 8 || inMonth <= 12) && inMonth%2 != 0 && inDay > 31)
    || ((inMonth >= 4 || inMonth <= 6) && inMonth%2 != 0 && inDay > 30)
    || ((inMonth >= 9 || inMonth <= 11) && inMonth%2 == 0 && inDay > 30)
    || (inMonth == 2 && inYear%4 != 0 && inDay > 28)
    || (inMonth == 2 && inYear%4 == 0 && inDay > 29)) {
        document.getElementById("error-dd").innerHTML = "Must be a valid day.";
        isDay = false;
    } else {
        document.getElementById("error-dd").innerHTML = "";
        isDay = true;
    }
    return isDay;
}

function valNull(inVal, idVal) {
    if (inVal == "") {
        document.getElementById("error-" + idVal).innerHTML = "This field is required.";
        isVal = false;
    } else if (isNaN(inVal)) {
        document.getElementById("error-" + idVal).innerHTML = "Must be numeric.";
        isVal = false;
    } else {
        isVal = true;
    }
    return isVal;
}

function validate() {
    dd = "dd";
    mm = "mm";
    yyyy = "yyyy";

    inDay = +document.getElementById("input-dd").value;
    inMonth = +document.getElementById("input-mm").value;
    inYear = +document.getElementById("input-yyyy").value;

    const curDate = new Date();
    curDay = curDate.getDate();
    curMonth = curDate.getMonth() + 1;
    curYear = curDate.getFullYear();

    isDay = false;
    isMonth = false;
    isYear = false;

    const inData = [inDay, inMonth, inYear];
    const idData = [dd, mm, yyyy];
    const isData = [isDay, isMonth, isYear];

    for (let i = 0 ; i <= inData.length - 1 ; i++) {
        isData[i] = valNull(inData[i], idData[i]);
        if (isData[i] == true && i == 0) {
            isData[i] = valDay(inDay, inMonth, inYear);
        } else if (isData[i] == true && i == 1) {
            isData[i] = valMonth(inMonth);
        } else if (isData[i] == true && i == 2) {
            isData[i] = valYear(inDay, inMonth, inYear, curDay, curMonth, curYear);
        }
        changeBorder(isData[i], idData[i]);
    }

    try {
        if ((isDay == false && isMonth == false && isYear == false) && (inDay != "" || inMonth != "" || inYear != "" )) {
            document.getElementById("error-dd").innerHTML = "Must be a valid date.";
            document.getElementById("error-mm").innerHTML = "";
            document.getElementById("error-yyyy").innerHTML = "";
        }
    } catch(error) {
        console.log(`${error}.`);
    }

    try {
        if (isDay == true && isMonth == true && isYear == true) {
            const inDate = new Date(inYear, inMonth, inDay);
        
            resYear = curYear - inDate.getFullYear();
            resDisplay(resYear, "years", yyyy);

            resMonth = curMonth - inDate.getMonth();
            resDisplay(resMonth, "months", mm);

            resDay = curDay - inDate.getDate();
            resDisplay(resDay, "days", dd);          
        }
    }  catch(error) {
        console.log(`Calculation not executed.\n ${error}.`);
    }
}