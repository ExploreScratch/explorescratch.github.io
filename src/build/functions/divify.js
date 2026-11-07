/**
 * Wrap lines in HTML divs
 * @param {string} text 
 * @returns {string}
 */

export default function divify(text) {
    return text.split(/\r?\n/g)
               .map(text => `<div>${text}</div>`)
               .join('')
               .replaceAll('<div></div>', '<br>');
}
