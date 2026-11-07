import escape from './escape.js';

export default function template(project) {
    const projectUrl = `https://scratch.mit.edu/projects/${project.id}/`;
    const profileUrl = `https://scratch.mit.edu/users/${project.username}/`;
    return `
        <article class="project">
            <div class="background" style="background-image: linear-gradient(180deg,rgba(255, 255, 255, 0) 0%, rgb(0, 0, 0) 100%), url(${project.banner});"></div>
            <!-- Banner -->
            <a class="image-link" href="${projectUrl}" target="_blank" rel="noopener noreferrer"><img class="project-image" src="${project.banner}"></a>
            <div>
                <!-- Profile -->
                <div class="profile">
                    <a class="image-link" href="${profileUrl}" target="_blank" rel="noopener noreferrer"><img class="profile-image" src="${project.avatar}"></a>
                    <div class="project-information">
                        <a class="a-no-decoration" href="${projectUrl}" target="_blank" rel="noopener noreferrer"><p class="font-semibold project-title">${escape(project.title)}</p></a>
                        <p class="font-medium text-sm project-author">
                            <a class="a-no-decoration" href="${profileUrl}" target="_blank" rel="noopener noreferrer"><span class="mention font-regular">@${project.username}</span></a>
                        </p>
                    </div>
                </div>
            </div>
        </article>
    `
} 
