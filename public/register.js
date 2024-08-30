document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch('/register', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            alert('Registration successful!');
            window.location.href = 'index.html'; // Redirect to login page
        } else {
            document.getElementById('error').textContent = result.message;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error').textContent = 'An error occurred during registration. Please try again.';
    }
});
