import request from './functions/request.js';
import template from './functions/project.js';
import sources from './constants.js';

const container = document.getElementById('projects');
const expand = document.getElementById('load');

const projects = await request(sources.projects);

let offset = 0;
const limit = 32;

function load() {
    const end = Math.min(offset + limit, projects.length);

    for (let index = offset; index < end; index++) {
        container.insertAdjacentHTML('beforeend', template(projects[index]));
    }

    offset = end;
}

expand.addEventListener("click", load);

// Load initial projects
load();
