document.addEventListener('DOMContentLoaded', () => {
    // 1. Get user data from localStorage
    const rawData = localStorage.getItem('user');
    
    if (!rawData) {
        // If no user found, kick them back to login
        window.location.href = "login.html";
        return;
    }

    const user = JSON.parse(rawData);

    // 2. Display the data
    document.getElementById('displayName').innerText = user.name;
    document.getElementById('displayEmail').innerText = user.email;
    document.getElementById('userInitial').innerText = user.name.charAt(0).toUpperCase();
    document.getElementById('editName').value = user.name;
});

// Switch between Tickets and Settings
function showTab(tab) {
    const tickets = document.getElementById('tickets-view');
    const settings = document.getElementById('settings-view');
    
    if (tab === 'tickets') {
        tickets.style.display = 'block';
        settings.style.display = 'none';
        document.getElementById('btn-tickets').classList.add('active');
        document.getElementById('btn-settings').classList.remove('active');
    } else {
        tickets.style.display = 'none';
        settings.style.display = 'block';
        document.getElementById('btn-settings').classList.add('active');
        document.getElementById('btn-tickets').classList.remove('active');
    }
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}
// Run this on every page load to sync data
document.addEventListener('DOMContentLoaded', () => {
    const savedData = JSON.parse(localStorage.getItem('userProfile'));

    if (savedData) {
        // Update the Profile Page elements if they exist
        const nameEl = document.getElementById('displayFullName');
        const emailEl = document.getElementById('displayEmail');
        const phoneEl = document.getElementById('displayPhone');
        const cityEl = document.getElementById('displayCity');
        const avatarEl = document.getElementById('avatarInitial');

        if (nameEl) nameEl.innerText = savedData.name;
        if (emailEl) emailEl.innerText = savedData.email;
        if (phoneEl) phoneEl.innerText = savedData.phone;
        if (cityEl) cityEl.innerText = savedData.city;
        
        // Update the Avatar Circle with the first letter of the name
        if (avatarEl && savedData.name) {
            avatarEl.innerText = savedData.name.charAt(0).toUpperCase();
        }

        // Also update the Profile Dropdown in the Header if it's present
        const dropdownName = document.getElementById('userName');
        const dropdownEmail = document.getElementById('userEmail');
        if (dropdownName) dropdownName.innerText = savedData.name;
        if (dropdownEmail) dropdownEmail.innerText = savedData.email;
    }
});