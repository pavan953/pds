// Handle Sign Up form submission
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    if (email && password) {
        document.getElementById('signupMessage').textContent = 'Sign Up Successful!';
        document.getElementById('signupMessage').style.color = 'green';
    } else {
        document.getElementById('signupMessage').textContent = 'Please fill in all fields.';
        document.getElementById('signupMessage').style.color = 'red';
    }
});

// Handle Sign In form submission
document.getElementById('signinForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;

    if (email && password) {
        document.getElementById('signinMessage').textContent = 'Sign In Successful!';
        document.getElementById('signinMessage').style.color = 'blue';
    } else {
        document.getElementById('signinMessage').textContent = 'Please fill in all fields.';
        document.getElementById('signinMessage').style.color = 'red';
    }
});

// Handle Password Reset form submission
document.getElementById('resetForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const email = document.getElementById('resetEmail').value;

    if (email) {
        document.getElementById('resetMessage').textContent = 'Password reset email sent!';
        document.getElementById('resetMessage').style.color = 'orange';
    } else {
        document.getElementById('resetMessage').textContent = 'Please enter your email.';
        document.getElementById('resetMessage').style.color = 'red';
    }
});

// Toggle between Sign Up and Sign In forms
document.getElementById('showSignin').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('signupSection').style.display = 'none';
    document.getElementById('signinSection').style.display = 'block';
});

document.getElementById('showSignup').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('signinSection').style.display = 'none';
    document.getElementById('signupSection').style.display = 'block';
});

// Toggle between Sign In and Reset Password forms
document.getElementById('showReset').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('signinSection').style.display = 'none';
    document.getElementById('resetSection').style.display = 'block';
});

document.getElementById('showSigninFromReset').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('resetSection').style.display = 'none';
    document.getElementById('signinSection').style.display = 'block';
});
