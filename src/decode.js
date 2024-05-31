function getIdxOfChars(ltr, arr, isInvert) {
    return arr.map(function (x, i) {
        return (isInvert ? x !== ltr : x === ltr) ? i : -1;
    }).filter(function (i) { return i > -1});
}
function getStringOfValues(arr, value) {
    return arr.map(function (i) {
        return value[i];
    }).join('');
}

/**
 * decode the UUID to a number
 * @param {string} value UUID v4 format
 * @param {string} template template formate
 * @returns {numer}
 */
export default function decodeToFauxUUID(value, template = 'xxxxxxxx-xxxx-4lxx-yxxx-xxxxxlxxxxxx') {
    const tmplArr = template.split('')
        , idx = getIdxOfChars('x', tmplArr, true)
        , cntx = getIdxOfChars('l', tmplArr) 
        , idy = getIdxOfChars('y', tmplArr)
        , ng = 'ab'.indexOf(getStringOfValues(idy, value.toLowerCase())) > -1
        , cnt = parseInt(getStringOfValues(cntx, value), 10)
    ;

    const cleaned = value.toLowerCase().split('').reduce(function (p, c, i) {
        if (idx.indexOf(i) > -1) {
            return p;
        }
        return p + c;
    }, '').slice(0, cnt).split('').reverse().join('');
    let rtnValue = parseInt(cleaned, 16);
    return (ng ? -1 : 1) * rtnValue;
}