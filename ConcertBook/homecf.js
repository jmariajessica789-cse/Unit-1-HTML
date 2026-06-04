document.addEventListener("DOMContentLoaded", () => {
    // Check Login
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = "login.html";
        return;
    }

    // Scroll reveal for sections
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
        sec.style.opacity = "0";
        sec.style.transform = "translateY(20px)";
        sec.style.transition = "all 0.6s ease-out";
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    });

    sections.forEach(sec => observer.observe(sec));
});