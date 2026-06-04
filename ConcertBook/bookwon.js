let tempBookingData = null; // To hold data while modal is open

function calculateTotal() {
    const price = document.getElementById('type').value;
    const qty = document.getElementById('qty').value;
    const total = price * qty;
    document.getElementById('totalPrice').innerText = "₹" + total.toLocaleString('en-IN');
}

// Opens the Custom Modal instead of alert
function confirmBooking() {
    const typeSelect = document.getElementById('type');
    const categoryName = typeSelect.options[typeSelect.selectedIndex].text;
    const qty = document.getElementById('qty').value;
    const total = document.getElementById('totalPrice').innerText;

    // Store data temporarily
    tempBookingData = {
        event: "The Wonderment Tour | A.R. Rahman",
        category: categoryName,
        quantity: qty,
        amount: total,
        date: "Sat, 14 Feb 2026",
        venue: "JN Stadium, Chennai",
        bookingID: "CB-" + Math.floor(Math.random() * 1000000)
    };

    // Inject data into modal
    document.getElementById('modalDetails').innerHTML = `
        <p><b>Event:</b> ${tempBookingData.event}</p>
        <p><b>Category:</b> ${tempBookingData.category}</p>
        <p><b>Quantity:</b> ${tempBookingData.quantity} Ticket(s)</p>
        <p><b>Total:</b> ${tempBookingData.amount}</p>
    `;

    // Show the modal
    document.getElementById('bookingModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

// ... existing calculateTotal and confirmBooking functions ...

function finalizeBooking() {
    if (tempBookingData) {
        // 1. Save the "In-Progress" booking to session storage
        // We use sessionStorage because it's a temporary checkout process
        sessionStorage.setItem('pendingCheckout', JSON.stringify(tempBookingData));

        // 2. Redirect to the payment page
        const card = document.querySelector('.modal-card');
        card.innerHTML = "<h2>Securely Redirecting...</h2><p>Preparing payment gateway...</p>";
        
        setTimeout(() => {
            window.location.href = "payment.html";
        }, 1200);
    }
}