
import format from './Format';

function startsWith(str, suffix): boolean {
    return str.indexOf(suffix) === 0;
}
function endsWith(str: string, suffix): boolean {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
function trim(str: string) {
    return str.replace(/^\s+|\s+$/gm, '');
}
function trimEnd(str: string, chars) {
    if (endsWith(str, chars)) {
        return str.substring(0, str.length - chars.length);
    }
    return str;
}
function trimStart(str: string, chars: string) {
    if (startsWith(str, chars))
        return str.substring(chars.length, str.length);
    return str;
}
function isEmptyOrNull(str) {
    return !(str && str != "");
}
export const str = {
    format,
    isEmptyOrNull,
    startsWith,
    endsWith,
    trim,
    trimEnd,
    trimStart
}
export default str;

