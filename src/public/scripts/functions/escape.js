/**
 * Escape evil html
 * @param {string} string 
 * @returns {string}
 */

export default function escape(string) {
    return string.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}
