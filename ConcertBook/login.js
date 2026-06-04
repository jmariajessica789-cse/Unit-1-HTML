document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('pass').value;

            // 1. Password Length Validation
            if (password.length < 6) {
                showLoginModal("Password is too short! It must be at least 6 characters.");
                return;
            }

            // 2. Existing Login Logic
            if (email.trim() !== "" && password.trim() !== "") {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                
                const userObj = { name: email.split('@')[0], email: email };
                localStorage.setItem('user', JSON.stringify(userObj));

                const btn = document.querySelector('.btn-primary');
                btn.innerText = "Authenticating...";
                btn.disabled = true;

                setTimeout(() => {
                    window.location.assign("index.html");
                }, 1000);
            }
        });
    }
});

function showLoginModal(message) {
    document.getElementById('modalMessage').innerText = message;
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}