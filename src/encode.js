/**
 * Encodes a number into a faux uuid number.
 * @param {number} value 
 * @param {string} template uuid template
 * @returns {string}
 */
export default function encodeToFauxUUID(value, template = 'xxxxxxxx-xxxx-4lxx-yxxx-xxxxxlxxxxxx') {
    if (value === 0) {
        return template.replaceAll(/[^-]/ig, '0');
    }
    const ng = value < 0;
    const processValue = (ng ? -1 : 1) * value;
    const charYOptions = ng ? '89' : 'AB' ;

    let baseEncPadded = processValue.toString(16).split('').reverse().join('');
    let contentLength = baseEncPadded.length;
    while (baseEncPadded.length < 36) {
        baseEncPadded += (processValue * baseEncPadded.length).toString(16);
    }

    let uuid = '';
    let baseIndex = 0;
    for (let i = 0; i < template.length; i++) {
        if (template[i] === 'x') {
            if (baseIndex < baseEncPadded.length) {
                uuid += baseEncPadded[baseIndex++];
            } else {
                uuid += '0';
            }
        } else {
            uuid += template[i];
        }
    }

    const yChar = charYOptions[contentLength % charYOptions.length];
    uuid = uuid.replaceAll('y', yChar);
    let rCnt = 0;
    const lCnt = template.split('l').length - 1;
    const strNumLen = contentLength.toString().padStart(lCnt, '0');
    uuid = uuid.replaceAll('l', function () { return strNumLen[rCnt++] });
    return uuid.toLowerCase();
}