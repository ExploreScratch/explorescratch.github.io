import fs from 'node:fs';
import path from 'node:path';
import markdown from './functions/markdown.js';
import divify from './functions/divify.js';
import CONFIG from '../config.json' with { type: 'json' };

// esm is evil sooo we make our own dirname
const dirname = import.meta.dirname;

// this is an array of folder names (writing this so i don't forget)
const articles = fs.readdirSync(path.join(dirname, './articles'));

let metadata = [];

console.log(`[+] Found ${articles.length} articles`);

for (const article of articles) {
    console.log(`[+] Building ${article}.md`);

    try {
        const text = fs.readFileSync(path.join(dirname, `./articles/${article}/${article}.md`), 'utf8');
        const information = JSON.parse(fs.readFileSync(path.join(dirname, `./articles/${article}/meta.json`), 'utf8'));

        metadata.push(information);

        const page = divify(markdown(text));

        const html = fs.readFileSync(path.join(dirname, './template.html'), 'utf-8');

        const route = path.join(dirname, `../public/articles/${article}.html`);

        fs.writeFileSync(
            route,
            html.replaceAll('{ TITLE }', information.title)
                .replaceAll('{ DESCRIPTION }', information.description)
                .replaceAll('{ AVATAR_URL }', information.author.avatar)
                .replaceAll('{ PROFILE_URL }', information.author.link)
                .replaceAll('{ NAME }', information.author.name)
                .replaceAll('{ DATE }',
                    new Date(information.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })
                )
                .replaceAll('{ CONTENT }', page)
                .replaceAll('{ URL }', `${CONFIG.prod}/articles/${article}.html`)
        );

    } catch (error) {
        throw error;
    }
}

fs.writeFileSync(
    path.join(dirname, '../public/data/articles.json'),
    JSON.stringify(metadata.sort((a, b) => b.date - a.date), null, 2)
);
