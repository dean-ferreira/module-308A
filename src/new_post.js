import { createPost } from './api.js';

const submitButton = document.getElementById('create-post-btn');

submitButton.addEventListener('click', (button) => {
    button.preventDefault();
    createNewPost();
});

export function validatePostTitle(title) {
    if (title.length < 4) {
        return 'Title is too short';
    }
    return true;
}

export function validatePostBody(body) {
    if (body.length < 4) {
        return 'Body is too short';
    }
    return true;
}

async function createNewPost() {
    const title = document.querySelector('#post-title').value;
    const body = document.querySelector('#post-body').value;
    const titleValidation = validatePostTitle(title);
    const bodyValidation = validatePostBody(body);
    if (titleValidation !== true) {
        alert(titleValidation);
        return;
    } else if (bodyValidation !== true) {
        alert(bodyValidation);
        return;
    } else {
        const response = await createPost(title, body, 1);
        if (response.id) {
            alert('Post created successfully');
            window.location.href = '/';
        } else {
            alert('Error creating post');
        }
    }
}
