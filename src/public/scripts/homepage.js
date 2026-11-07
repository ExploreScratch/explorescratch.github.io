import request from './functions/request.js';
import template from './functions/project.js';
import SOURCES from './constants.js';
import escape from './functions/escape.js';

const podcastContainer = document.getElementById('podcasts');
const projectContainer = document.getElementById('projects');
const featuredArticle = document.getElementById('featured-article');
const articleList = document.getElementById('article-list');

const data = await request(SOURCES.site);
const articles = await request('./data/articles.json');

if (data?.podcasts) {
    for (const podcast of data.podcasts) {
        podcastContainer.insertAdjacentHTML(
            "beforeend",
            template(podcast)
        );
    }
}

if (data?.featured) {
    for (const project of data.featured) {
        projectContainer.insertAdjacentHTML(
            "beforeend",
            template(project)
        );
    }
}

// for now im just assuming the latest article is the featured article
featuredArticle.innerHTML = `
    <a href="${`${SOURCES.prod}/articles/${articles[0].slug}.html`}" class="title-link"><p class="text-3xl font-semibold m-none my-xs">${escape(articles[0].title)}</p></a>
    <p class="text-md font-medium m-none my-xs less-white">Written by <a href="${articles[0].author.link}" class="a-no-decoration" target="_blank" rel="noopener noreferrer"><span class="mention">@${escape(articles[0].author.name)}</span></a></p>
    <p class="preview text-lg fade-truncate m-none">${escape(articles[0].description)}</p>
`

for (const article of articles) {
    articleList.insertAdjacentHTML(
        "beforeend",
        `
        <article class="article">
            <a href="${`${SOURCES.prod}/articles/${article.slug}.html`}" class="title-link"><p class="font-semibold text-xl margin-bottom-xs">${escape(article.title)}</p></a>
            <p class="font-medium text-sm m-none my-xs less-white">Written by <a href="${article.author.link}" class="a-no-decoration" target="_blank" rel="noopener noreferrer"><span class="mention">@${escape(article.author.name)}</span></a></p>
            <p class="preview fade-truncate m-none">${escape(article.description)}</p>
        </article>
        `
    );
}
