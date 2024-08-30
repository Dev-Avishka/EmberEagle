async function getusername(user_id) {
    try {
        const response = await fetch(`/username/${user_id}`);
        const data = await response.json();
        if (data.success) {
            return data.user_name;
        } else {
            throw new Error("Error 404");
        }
    } catch (error) {
        console.error('Error fetching username:', error);
        throw error;
    }
}

async function getprpic(user_id) {
    try {
        const response = await fetch(`/userprpic/${user_id}`);
        const data = await response.json();
        if (data.success) {
            return data.prpic;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Error fetching profile picture:', error);
        throw error;
    }
}

window.onload = async function() {
    try {
        let id = localStorage.getItem('user_id');
        if (!id) {
            throw new Error('No user ID found in localStorage');
        }
        let name = await getusername(id);
        let picpath = await getprpic(id);

        let namehtml = document.getElementById('name');
        let pic = document.getElementById('ppic');

        namehtml.innerHTML = name;
        pic.src = picpath;
        await loadPosts();
    } catch (error) {
        console.error('Error during onload:', error);
    }
};

function logout() {
    localStorage.removeItem('user_id');
    window.location.href = 'index.html';
}

async function loadPosts() {
    try {
        console.log('Fetching posts...');
        const response = await fetch('/posts');
        const result = await response.json();
        console.log('Posts response:', result);

        if (result.success) {
            const postsDiv = document.getElementById('posts');
            postsDiv.innerHTML = ''; 

            const postsData = await Promise.all(result.posts.map(async post => {
                const userName = await getusername(post.author);
                const profilePicture = await getprpic(post.author);
                return {
                    ...post,
                    userName,
                    profilePicture
                };
            }));

            postsData.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('postbar');

                const imagesHtml = post.images ? post.images.map(image => `<img src="${image}" alt="Post image">`).join('') : '';
                const videosHtml = post.videos ? post.videos.map(video => `<video src="${video}" controls></video>`).join('') : '';

                postElement.innerHTML = `
                    <div class="postbar-header">
                        <div class="user-link">
                            <img src="${post.profilePicture}" class="ppic">
                            <h3 style="color:black">${post.userName}</h3>
                        </div>
                    </div>
                    <div class="postbar-content">
                        <p>${post.caption}</p>
                        <div class="media-container">
                            ${imagesHtml}
                            ${videosHtml}
                        </div>
                    </div>
                `;
                postsDiv.appendChild(postElement);
            });
        } else {
            console.error('Failed to load posts:', result.message);
        }
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}




