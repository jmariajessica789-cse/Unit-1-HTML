document.addEventListener("DOMContentLoaded", () => {
    // 1. SECURITY CHECK
    // Prevent access if the user is not logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = "login.html";
        return;
    }

    // 2. CAPTURE EVENT DETAILS
    // When the user clicks "Book Now", we save which concert they chose 
    // so the booking page knows it's the AR Rahman show.
    const bookBtn = document.querySelector('.book-btn');
    
    bookBtn.addEventListener('click', (e) => {
        // We prevent the default link for a split second to save the data
        const eventData = {
            name: "The Wonderment Tour | A.R. Rahman",
            date: "Sat, 14 Feb",
            venue: "JN Stadium, Chennai",
            price: 1799
        };
        
        // Store this specific event in session storage
        localStorage.setItem('selectedEvent', JSON.stringify(eventData));
        console.log("Event details saved for booking.");
    });

    // 3. UI INTERACTION: Button Pulse Effect
    // Adds a slight glow effect to the button every 3 seconds to draw attention
    setInterval(() => {
        bookBtn.style.boxShadow = "0 0 20px rgba(0, 242, 255, 0.6)";
        setTimeout(() => {
            bookBtn.style.boxShadow = "none";
        }, 1500);
    }, 3000);

    // 4. LOG USER ACTIVITY
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
        console.log(`${currentUser.name} is viewing the AR Rahman Event page.`);
    }
});