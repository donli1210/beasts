function addZero(numberArr, precision) {

    var preProcessArr = [];
    for (var i = 0; i <= (numberArr.indexOf('.') + precision); i++) {
        if (numberArr[i]) {
            preProcessArr.push(numberArr[i]);
        } else {
            preProcessArr.push('0');
        }
    }
    numberArr = preProcessArr;

    return numberArr;

}

function getFinalStrArr(numberArrNoDecimal, finalDecimalPosition) {

    var finalStrArr = [];

    for (var j = 0; j <= numberArrNoDecimal.length; j++) {

        if (j === finalDecimalPosition) {
            finalStrArr.push('.');
        }

        if (numberArrNoDecimal[j]) {
            finalStrArr.push(numberArrNoDecimal[j]);
        }
    }

    return finalStrArr;

}

function noDecimal(numberStr, precision) {

    var numberArr = numberStr.split('');

    var numberArrWithPrcision = [];

    for (i = 0; i < (numberArr.length + precision); i++) {
        if (numberArr[i]) {
            numberArrWithPrcision.push(numberArr[i]);
        } else {
            numberArrWithPrcision.push('0');
        }
    }

    finalNumStr = numberArrWithPrcision.join('');

    return finalNumStr;

}

function withDecimal(numberStr, precision) {

    // 2. move the dot from 1.165 => 116.5 

    var numberArr = numberStr.split('');

    // If total digits less than precision, need to add 0 at the end
    if (( /* total digits */ numberArr.length - numberArr.indexOf('.') - 1) < precision) {
        numberArr = addZero(numberArr, precision);
    }

    var numberArrNoDecimal = [];

    for (var i = 0; i < numberArr.length; i++) {

        if (numberArr[i] === '.') {

            var decimalPosition = i;

        } else {

            numberArrNoDecimal.push(numberArr[i]);
        }
    }

    if (decimalPosition) {

        var finalDecimalPosition = decimalPosition + precision;

    }

    var finalStrArr = [];

    if (finalDecimalPosition && finalDecimalPosition !== numberArrNoDecimal.length) {

        finalStrArr = getFinalStrArr(numberArrNoDecimal, finalDecimalPosition);

    }

    // Example : '111.'

    if (finalDecimalPosition === numberArrNoDecimal.length) {
        finalStrArr = numberArrNoDecimal;
    }

    return finalStrArr.join('');


}

function toFixed(number, precision) {

    var power = Math.pow(10, precision);

    var finalNumStr;

    // 1. transfer number to string
    var numberStr = number + '';

    // If number contains decimal.
    if (numberStr.indexOf('.') !== -1) {

        finalNumStr = withDecimal(numberStr, precision);

    } else {
        // number without decimal.
        finalNumStr = noDecimal(numberStr, precision);

    }

    // 3. transfer result string from step 2 to number. round the number using JS native function Math.round()
    // 4. Result from step 4 * precision
    return (Math.round(Number(finalNumStr)) / power).toFixed(precision);

}