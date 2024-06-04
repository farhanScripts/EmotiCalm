document.getElementById('signupForm').addEventListener('submit', function(event) {
  var username = document.getElementById('username').value.trim();
  var email = document.getElementById('email').value.trim();
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirm_password').value;

  var usernameError = document.getElementById('usernameError');
  var emailError = document.getElementById('emailError');
  var passwordError = document.getElementById('passwordError');
  var confirmPasswordError = document.getElementById('confirmPasswordError');

  usernameError.innerHTML = '';
  emailError.innerHTML = '';
  passwordError.innerHTML = '';
  confirmPasswordError.innerHTML = '';

  if (username === '') {
    usernameError.innerHTML = 'Username is required.';
    event.preventDefault();
  }

  if (email === '') {
    emailError.innerHTML = 'Email is required.';
    event.preventDefault();
  } else if (!isValidEmail(email)) {
    emailError.innerHTML = 'Invalid email format.';
    event.preventDefault();
  }

  if (password === '') {
    passwordError.innerHTML = 'Password is required.';
    event.preventDefault();
  } else if (password.length < 6) {
    passwordError.innerHTML = 'Password must be at least 6 characters long.';
    event.preventDefault();
  }

  if (confirmPassword === '') {
    confirmPasswordError.innerHTML = 'Please confirm your password.';
    event.preventDefault();
  } else if (confirmPassword !== password) {
    confirmPasswordError.innerHTML = 'Passwords do not match.';
    event.preventDefault();
  }
});

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
