document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Logic
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = { threshold: 0.15 };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Form Submission Logic
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('userName').value;
            
            status.style.color = "var(--primary)";
            status.innerText = `Success! Rock on, ${name}. We'll be in touch soon!`;

            form.reset();
            setTimeout(() => { status.innerText = ""; }, 5000);
        });
    }

    // 3. Floating Bubble Scroll Logic
    const chatBubble = document.getElementById('chatBubble');
    if (chatBubble) {
        chatBubble.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
                document.getElementById('userName').focus();
            }, 800);
        });
    }
});