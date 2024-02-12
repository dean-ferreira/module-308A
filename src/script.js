import { getPosts, getUserById } from './api.js';

const contentTitle = document.querySelector('#content-title');
const postsContainer = document.querySelector('.posts-container');
const postTileTemplate = document.querySelector('#post-tile-template');
const createPostTemplate = document.querySelector('#create-post-template');

const homeLink = document.querySelector('#home-link');
const allPostsLink = document.querySelector('#all-posts');
const createPostLink = document.querySelector('#create-post');

allPostsLink.addEventListener('click', (event) => {
    event.preventDefault();
    displayAllPosts();
});

createPostLink.addEventListener('click', (event) => {
    event.preventDefault();
    displayCreatePostForm();
});

async function createPostTile(post) {
    const postTile = postTileTemplate.content.cloneNode(true);
    postTile.querySelector('.post-title').innerText = post.title;
    postTile.querySelector('.post-body').innerText = post.body;
    const user = await getUserById(post.userId);
    postTile.querySelector('.author-link').innerText = user.name;
    postsContainer.appendChild(postTile);
}

async function displayAllPosts() {
    let allPosts = await getPosts();
    contentTitle.innerText = 'All Posts';
    postsContainer.innerHTML = '';
    for (let post of allPosts) {
        createPostTile(post);
    }
}

async function displayLatestPosts() {
    let allPosts = await getPosts();
    contentTitle.innerText = 'Latest Posts';
    postsContainer.innerHTML = '';
    for (let i = allPosts.length - 1; i > allPosts.length - 6; i--) {
        createPostTile(allPosts[i]);
    }
}

function displayCreatePostForm() {
    contentTitle.innerText = 'Create Post';
    postsContainer.innerHTML = '';
    const createPost = createPostTemplate.content.cloneNode(true);
    postsContainer.appendChild(createPost);
}

async function init() {
    displayLatestPosts();
}

init();
