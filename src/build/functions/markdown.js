/**
 * Finds markdown in the string and replaces it with appropriate HTML
 * @param {string} text 
 * @returns {string}
 */

/*
TODO:

I'm probably going to 
1: make my own markdown parser that actually tokenizes things and handles
edge cases properly

2: Configure a library for @mentions and other custom things

3: Make the initial pass only replace it with identifiers so I can replace later.

(Probably going to be using a package for this in the future)
*/

export default function markdown(text) {

    // Escape HTML syntax for XSS and potentially valid HTML in articles
    text = text.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')

        // Targets urls and [text](url) structures
        .replace(/\[(.+)\]\((https?:\/\/[^\s]+)\)|(https?:\/\/[^\s]+)/g, (match, text, href, url) => {
            if (url) {
                return `<a href='${url}' target="_blank" rel="noopener noreferrer"><span class="link">${url}</span></a>`;
            } else {
                return `<a href='${href}' target="_blank" rel="noopener noreferrer"><span class="link">${text}</span></a>`;
            }
        })

        // Targets @mentions using only valid Scratch username characters
        .replace(/(@[a-zA-Z0-9_-]+)/g, (match, mention) => {
            const username = (mention.startsWith('@') ? mention.slice(1) : mention);
            const url = `https://scratch.mit.edu/users/${username}`;
            return `<a href='${url}' class='decorator-none' target="_blank" rel="noopener noreferrer"><span class='mention'>${mention}</span></a>`;
        })

        /* Targets *- to make it a bulletpoint
        TODO:
        Make this support proper HTML bulletpoint list syntax
        */
        .replace(/^- /gm, "• ")

        // Targets **text** to make it bold
        .replace(/\*\*(.+?)\*\*/g, (match, text) => {
            return `<span class="font-bold">${text}</span>`;
        })

        // Targets *text* to make it italic
        .replace(/\*(.+?)\*/g, (match, text) => {
            return `<span class="italic">${text}</span>`;
        })

        // Targets ~text~ to make it strikethrough
        .replace(/~(.+?)~/g, (match, text) => {
            return `<span class="strikethrough">${text}</span>`;
        })

        // Targets _text_ to make it underlined
        .replace(/(?<=^| )_(.+?)_/gm, (match, text) => {
            return `<span class="underline">${text}</span>`;
        })

        // Targets lines that start with ### to make it slightly bigger
        .replace(/^### (.+)/gm, (match, text) => {
            return `<h3 class="my-sm text-lg">${text}</h3>`;
        })

        // Targets lines that start with ## to make it bigger
        .replace(/^## (.+)/gm, (match, text) => {
            return `<h2 class="my-sm text-xl">${text}</h2>`;
        })

        // Targets lines that start with ## to make it big
        .replace(/^# (.+)/gm, (match, text) => {
            return `<h1 class="my-sm text-2xl">${text}</h1>`;
        })

        // Targets --- to make a line divider
        .replace(/^---/gm, '<hr>')

    return text;
}
