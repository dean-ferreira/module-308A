import { getPosts, getUserById } from './api.js';

const contentTitle = document.querySelector('#content-title');
const postsContainer = document.querySelector('.posts-container');
const postTileTemplate = document.querySelector('#post-tile-template');

const homeLink = document.querySelector('#home-link');
const allPostsLink = document.querySelector('#all-posts');

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

async function init() {
    displayLatestPosts();
}

init();
