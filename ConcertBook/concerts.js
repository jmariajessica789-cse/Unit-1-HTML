document.addEventListener("DOMContentLoaded", () => {
    // 1. Check if logged in
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = "login.html";
    }

    // 2. Make cards clickable
    const cards = document.querySelectorAll('.event-card');
    cards.forEach(card => {
        card.style.cursor = "pointer";
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A') {
                const link = card.querySelector('.btn-know').href;
                window.location.href = link;
            }
        });
    });
});