document.addEventListener('DOMContentLoaded', () => {
    const regForm = document.getElementById('regForm');

    if (regForm) {
        regForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const pass = document.getElementById('pass').value;
            const confirmPass = document.getElementById('confirmPass').value;

            // 1. Trigger Modal instead of alert
            if (pass !== confirmPass) {
                showRegModal("⚠️", "Oops!", "Passwords do not match. Please double-check!");
                return;
            }

            // 2. Save user info
            const userData = {
                name: name,
                email: email,
                isLoggedIn: true
            };
            
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('isLoggedIn', 'true');

            // 3. Update button state
            const btn = document.querySelector('.btn-primary');
            btn.innerText = "Creating Account...";
            btn.disabled = true; 
            
            // 4. Redirect
            setTimeout(() => {
                window.location.assign("index.html");
            }, 1000);
        });
    }
});

// Modal Control Functions
function showRegModal(icon, title, message) {
    document.getElementById('modalIcon').innerText = icon;
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalMessage').innerText = message;
    document.getElementById('regModal').style.display = 'flex';
}

function closeRegModal() {
    document.getElementById('regModal').style.display = 'none';
}