document.addEventListener('DOMContentLoaded', () => {
    // 1. SHARED LOGIC: Update Profile Name in Header/Sidebar
    const savedData = JSON.parse(localStorage.getItem('userProfile'));
    const profileNameDisplay = document.querySelector('.user-main-info h2');
    
    if (savedData && profileNameDisplay) {
        profileNameDisplay.innerText = savedData.name;
    }

    // 2. MY TICKETS PAGE LOGIC
    if (document.querySelector('.ticket-list')) {
        renderTickets();
    }

    // 3. SETTINGS PAGE LOGIC
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        handleSettingsUpdate(settingsForm);
    }
});

/**
 * Logic for My Tickets Page
 */
function renderTickets() {
    const ticketContainer = document.querySelector('.ticket-list');
    const recentBooking = JSON.parse(localStorage.getItem('lastBooking'));

    if (recentBooking) {
        const ticketHTML = `
            <div class="ticket-stub">
                <div class="stub-info">
                    <span class="badge">Upcoming</span>
                    <h2>${recentBooking.eventName}</h2>
                    <p>📅 ${recentBooking.date}</p>
                    <p>📍 ${recentBooking.venue}</p>
                </div>
                <div class="stub-action">
                    <p>Qty: ${recentBooking.quantity}</p>
                    <button class="btn-download" onclick="generateQR('${recentBooking.eventName}')">View QR</button>
                </div>
            </div>
        `;
        ticketContainer.insertAdjacentHTML('afterbegin', ticketHTML);
    }
}

function generateQR(event) {
    alert(`🎟️ Access Granted!\nYour unique entry code for ${event} is being verified...`);
}

/**
 * Logic for Settings Page
 */
function handleSettingsUpdate(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const updatedName = document.getElementById('userName').value;
        const updatedEmail = document.getElementById('userEmail').value;

        if (!updatedName || !updatedEmail) {
            alert("Please fill in all details.");
            return;
        }

        const userProfile = {
            name: updatedName,
            email: updatedEmail,
            updatedAt: new Date().toLocaleDateString()
        };

        localStorage.setItem('userProfile', JSON.stringify(userProfile));

        // Visual Feedback
        const btn = form.querySelector('.btn-primary');
        const originalText = btn.innerText;
        btn.innerText = "✅ Saved Successfully";
        btn.style.backgroundColor = "#10b981";

        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = "";
        }, 2000);
    });
}
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
document.addEventListener('DOMContentLoaded', () => {
    renderUserTickets();
});

function renderUserTickets() {
    const container = document.getElementById('dynamicTicketList');
    const myTickets = JSON.parse(localStorage.getItem('myTickets')) || [];

    container.innerHTML = "";

    if (myTickets.length === 0) {
        container.innerHTML = `<div class="empty-state-card"><h2>No Bookings Found</h2></div>`;
        return;
    }

    // This loop works for ANY concert name stored in the 'event' property
    myTickets.forEach((ticket, index) => {
        const ticketHTML = `
            <div class="ticket-stub animated-entry">
                <div class="stub-info">
                    <span class="badge">Confirmed</span>
                    <h2>${ticket.event}</h2> 
                    <p>📅 ${ticket.date || 'TBA'}</p>
                    <p>📍 ${ticket.venue || 'Chennai'}</p>
                    <p class="booking-id-text">ID: ${ticket.bookingID}</p>
                </div>
                <div class="stub-action">
                    <p>Qty: ${ticket.quantity}</p>
                    <button class="btn-download" onclick="viewQR('${ticket.bookingID}')">View QR</button>
                    <button class="btn-cancel" onclick="cancelTicket(${index})">Cancel</button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', ticketHTML);
    });
}

let ticketIndexToDelete = null;

// 1. Opens the Custom Cancel Modal
function cancelTicket(index) {
    const myTickets = JSON.parse(localStorage.getItem('myTickets')) || [];
    const ticket = myTickets[index];

    if (ticket) {
        ticketIndexToDelete = index;
        document.getElementById('cancelEventName').innerText = ticket.event;
        document.getElementById('cancelModal').style.display = 'flex';
        
        // Attach the actual deletion logic to the "Yes, Cancel" button
        document.getElementById('confirmCancelBtn').onclick = finalizeDeletion;
    }
}

// 2. Closes the Modal
function closeCancelModal() {
    document.getElementById('cancelModal').style.display = 'none';
    ticketIndexToDelete = null;
}

// 3. Performs the actual deletion from LocalStorage
function finalizeDeletion() {
    if (ticketIndexToDelete !== null) {
        let myTickets = JSON.parse(localStorage.getItem('myTickets')) || [];
        
        // Remove the ticket from the array
        myTickets.splice(ticketIndexToDelete, 1);
        
        // Save the updated list back to storage
        localStorage.setItem('myTickets', JSON.stringify(myTickets));
        
        // Close modal and refresh the ticket display
        closeCancelModal();
        renderUserTickets(); // This is the function that draws your tickets on the page
    }
}

// Function to show the custom QR modal
function viewQR(id) {
    const modal = document.getElementById('qrModal');
    const qrContainer = document.getElementById('qrContainer');
    const qrInfo = document.getElementById('qrInfo');
    
    // Find the ticket data in our array
    const myTickets = JSON.parse(localStorage.getItem('myTickets')) || [];
    const ticket = myTickets.find(t => t.bookingID === id);

    if (ticket) {
        // Generate a real QR code using an API
        qrContainer.innerHTML = `
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${id}" alt="QR Code">
        `;
        
        qrInfo.innerHTML = `
            <h4>${ticket.event}</h4>
            <p><strong>Booking ID:</strong> ${id}</p>
            <p><strong>Quantity:</strong> ${ticket.quantity} Tickets</p>
        `;

        modal.style.display = 'flex';
    }
}

function closeQRModal() {
    document.getElementById('qrModal').style.display = 'none';
}

// Close modal if user clicks outside the card
window.onclick = function(event) {
    const modal = document.getElementById('qrModal');
    if (event.target == modal) {
        closeQRModal();
    }
}