import { getPosts, getUserById, getCommentsByPostId } from './api.js';

const contentTitle = document.querySelector('#content-title');
const postsContainer = document.querySelector('.posts-container');
const postTileTemplate = document.querySelector('#post-tile-template');
const createPostTemplate = document.querySelector('#create-post-template');

const homeLink = document.querySelector('#home-link');
const allPostsLink = document.querySelector('#all-posts');

allPostsLink.addEventListener('click', (event) => {
    event.preventDefault();
    displayAllPosts();
});

async function createPostTile(post) {
    const postTile = postTileTemplate.content.cloneNode(true);
    postTile.querySelector('.post-title').innerText = post.title;
    postTile.querySelector('.post-body').innerText = post.body;
    const user = await getUserById(post.userId);
    postTile.querySelector('.author-link').innerText = user.name;
    const allComments = await getCommentsByPostId(post.id);
    const commentsLink = postTile.querySelector('.comments-link');
    commentsLink.innerText = `${allComments.length} comments`;
    commentsLink.addEventListener('click', (event) => {
        event.preventDefault();
        displayAllComments(post);
    });
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

async function displayAllComments(post) {
    let allComments = await getCommentsByPostId(post.id);
    postsContainer.innerHTML = '';
    contentTitle.innerText = `${post.title}`;
    for (let comment of allComments) {
        const commentTile = postTileTemplate.content.cloneNode(true);
        commentTile.querySelector('.post-title').innerText = comment.name;
        commentTile.querySelector('.post-body').innerText = comment.body;
        commentTile.querySelector('.author-link').innerText = comment.email;
        postsContainer.appendChild(commentTile);
    }
}

async function init() {
    displayLatestPosts();
}

init();
