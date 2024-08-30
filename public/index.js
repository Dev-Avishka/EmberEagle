document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

   
    const data = {
        username: username,
        password: password
    };

   
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            localStorage.setItem('user_id', result.user_id);
            alert('Login successful!');

            window.location.href = 'home.html';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during login. Please try again later.');
    });
});
