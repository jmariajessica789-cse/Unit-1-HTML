const heroImages = [
    'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80'
];

// --- NEW: Preload Function ---
function preloadHeroImages() {
    heroImages.forEach((url) => {
        const img = new Image();
        img.src = url;
    });
}

let currentIndex = 0;
let isLayer1Visible = true;

function crossFadeSlides() {
    const layer1 = document.getElementById('layer1');
    const layer2 = document.getElementById('layer2');
    
    currentIndex = (currentIndex + 1) % heroImages.length;
    const nextImage = `url('${heroImages[currentIndex]}')`;

    if (isLayer1Visible) {
        layer2.style.backgroundImage = nextImage;
        layer1.style.opacity = '0';
        layer2.style.opacity = '1';
    } else {
        layer1.style.backgroundImage = nextImage;
        layer2.style.opacity = '0';
        layer1.style.opacity = '1';
    }
    isLayer1Visible = !isLayer1Visible;
}

// Updated DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    // 1. Start preloading images immediately
    preloadHeroImages();

    const l1 = document.getElementById('layer1');
    const l2 = document.getElementById('layer2');

    if(l1 && l2) {
        // 2. Set initial state: Layer 1 has Image 0, Layer 2 has Image 1 (ready to fade in)
        l1.style.backgroundImage = `url('${heroImages[0]}')`;
        l1.style.opacity = '1';
        
        // Pre-set the next image on the hidden layer so it's already there
        l2.style.backgroundImage = `url('${heroImages[1]}')`;
        l2.style.opacity = '0';
    }
    
    // 3. Begin the interval
    setInterval(crossFadeSlides, 3000);
});

// Toggle Profile Dropdown

function toggleProfile() {

    document.getElementById("profileDropdown").classList.toggle("show");

}



// Close dropdown if user clicks outside

window.onclick = function(event) {

    if (!event.target.closest('.profile-section')) {

        var dropdowns = document.getElementsByClassName("profile-dropdown");

        for (var i = 0; i < dropdowns.length; i++) {

            var openDropdown = dropdowns[i];

            if (openDropdown.classList.contains('show')) {

                openDropdown.classList.remove('show');

            }

        }

    }

}



// Populate User Info

document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {

        document.getElementById('userName').innerText = user.name || "User";

        document.getElementById('userEmail').innerText = user.email || "fan@concertbook.com";

    }

});



// 1. Modified Logout function (Triggers Modal)

function logout() {

    // Prevent the default link behavior

    event.preventDefault();

    // Show the modal

    document.getElementById("logoutModal").style.display = "flex";

}



// 2. Close Modal function

function closeLogoutModal() {

    document.getElementById("logoutModal").style.display = "none";

}



// 3. Finalize Logout (Actual data clearing)

function finalizeLogout() {

    localStorage.removeItem('isLoggedIn');

    localStorage.removeItem('user');

   

    // Optional: Success animation before redirect

    const card = document.querySelector('#logoutModal .modal-card');

    card.innerHTML = "<h2>Logging out...</h2><p>Come back soon!</p>";

   

    setTimeout(() => {

        window.location.href = "login.html";

    }, 1500);

} 