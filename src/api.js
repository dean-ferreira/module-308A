const API_URL = 'https://jsonplaceholder.typicode.com';

export async function getPosts() {
    try {
        const response = await fetch(`${API_URL}/posts`);
        const json = await response.json();
        const allPosts = [];
        for (let post of json) {
            allPosts.push(post);
        }
        return allPosts;
    } catch (error) {
        console.log(error);
    }
}

export async function getPostById(id) {
    try {
        const response = await fetch(`${API_URL}/posts/${id}`);
        const post = await response.json();
        return post;
    } catch (error) {
        console.log(error);
    }
}

export async function getCommentsByPostId(id) {
    try {
        const response = await fetch(`${API_URL}/posts/${id}/comments`);
        const json = await response.json();
        const comments = [];
        for (let comment of json) {
            comments.push(comment);
        }
        return comments;
    } catch (error) {
        console.log(error);
    }
}

export async function createPost(_title, _body, _userId) {
    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            body: JSON.stringify({
                title: _title,
                body: _body,
                userId: _userId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const post = await response.json();
        return post;
    } catch (error) {
        console.log(error);
    }
}

export async function deletePost(id) {
    try {
        const response = await fetch(`${API_URL}/posts/${id}`, {
            method: 'DELETE',
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}
