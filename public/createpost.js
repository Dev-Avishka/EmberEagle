document.getElementById('createPostForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('author', localStorage.getItem('user_id'));
    formData.append('caption', document.getElementById('caption').value);
    
    const imageFiles = document.getElementById('images').files;
    for (let i = 0; i < imageFiles.length; i++) {
        formData.append('images', imageFiles[i]);
    }
    
    const videoFiles = document.getElementById('videos').files;
    for (let i = 0; i < videoFiles.length; i++) {
        formData.append('videos', videoFiles[i]);
    }
    
    try {
        const response = await fetch('/create-post', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        if (result.success) {
            document.getElementById('message').innerText = 'Post created successfully!';
            window.location.href = 'home.html'
        } else {
            document.getElementById('message').innerText = 'Failed to create post: ' + result.message;
        }
    } catch (error) {
        console.error('Error creating post:', error);
        document.getElementById('message').innerText = 'Error creating post: ' + error.message;
    }
});
