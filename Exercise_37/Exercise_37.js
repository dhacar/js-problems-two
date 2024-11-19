const postTitleInput = document.getElementById('postTitle');
const imageUrlInput = document.getElementById('imageUrl');
const postContentInput = document.getElementById('postContent');
const addPostButton = document.getElementById('addPostButton');
const allPostsDiv = document.getElementById('allPosts');


document.addEventListener('DOMContentLoaded', loadPosts);

addPostButton.addEventListener('click', addPost);

function addPost() {
    const title = postTitleInput.value;
    const imageUrl = imageUrlInput.value;
    const content = postContentInput.value;

    if (title && content) {
        const post = {
            id: Date.now(),
            title,
            imageUrl,
            content
        };

        savePost(post);

        postTitleInput.value = '';
        imageUrlInput.value = '';
        postContentInput.value = '';

        loadPosts();
    } else {
        alert('Title and content are required!');
    }
}

function savePost(post) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
}

function loadPosts() {
    allPostsDiv.innerHTML = ''; 
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        const postTitle = document.createElement('h3');
        postTitle.textContent = post.title;

        const postImage = document.createElement('img');
        if (post.imageUrl) {
            postImage.src = post.imageUrl;
        }

        const postContent = document.createElement('p');
        postContent.textContent = post.content;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editPost(post.id);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => deletePost(post.id);

        postDiv.appendChild(postTitle);
        if (post.imageUrl) postDiv.appendChild(postImage);
        postDiv.appendChild(postContent);
        postDiv.appendChild(editButton);
        postDiv.appendChild(deleteButton);

        allPostsDiv.appendChild(postDiv);
    });
}

// Function to edit a post
function editPost(postId) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postToEdit = posts.find(post => post.id === postId);

    if (postToEdit) {
        const newTitle = prompt('Edit Title', postToEdit.title);
        const newImageUrl = prompt('Edit Image URL', postToEdit.imageUrl || '');
        const newContent = prompt('Edit Content', postToEdit.content);

        if (newTitle && newContent) {
            postToEdit.title = newTitle;
            postToEdit.imageUrl = newImageUrl;
            postToEdit.content = newContent;

            localStorage.setItem('posts', JSON.stringify(posts));
            loadPosts();
        } else {
            alert('Title and content cannot be empty!');
        }
    }
}

// Function to delete a post
function deletePost(postId) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts = posts.filter(post => post.id !== postId);

    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();
}
