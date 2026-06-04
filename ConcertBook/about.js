document.addEventListener('DOMContentLoaded', () => {
    // Check for saved user data
    const savedData = JSON.parse(localStorage.getItem('userProfile'));
    
    if (savedData) {
        // Update text content
        if(document.getElementById('displayFullName')) {
            document.getElementById('displayFullName').innerText = savedData.name;
        }
        if(document.getElementById('displayEmail')) {
            document.getElementById('displayEmail').innerText = savedData.email;
        }
        // Update Avatar Initial (First letter of name)
        if(document.getElementById('avatarInitial')) {
            document.getElementById('avatarInitial').innerText = savedData.name.charAt(0).toUpperCase();
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // 1. Selection all elements with the 'reveal' class
    const revealElements = document.querySelectorAll('.reveal');

    // 2. Setup the Observer Options
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
    };

    // 3. Define the Observer Logic
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing after it reveals once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // 4. Start watching each element
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});