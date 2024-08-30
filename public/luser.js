
window.onload = async function() {
    try {
        let id = localStorage.getItem('user_id');
        if (!id) {
            throw new Error('No user ID found in localStorage');
        }
        document.title = await getusername(id);
    } catch (error) {
        console.error('Error:', error);
    }
};



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
        console.error('Error:', error);
        throw error;
    }
}