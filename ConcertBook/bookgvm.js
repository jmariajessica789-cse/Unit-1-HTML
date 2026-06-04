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
        event: "Yennodu Vaa Veedu Varaikkum",
        category: categoryName,
        quantity: qty,
        amount: total,
        date: "Sun, 1 Feb 2026",
        venue: "The Music Academy, Chennai",
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

// Saves the data after clicking "Proceed to Pay"
// Change ONLY this function in your bookgvm.js
function finalizeBooking() {
    if (tempBookingData) {
        // 1. Save to sessionStorage (this is what payment.html looks for)
        // We rename the object keys to match what your payment.html expects
        const checkoutData = {
            event: tempBookingData.event,
            amount: tempBookingData.amount,
            quantity: tempBookingData.quantity,
            date: tempBookingData.date,
            venue: tempBookingData.venue,
            bookingID: tempBookingData.bookingID
        };

        sessionStorage.setItem('pendingCheckout', JSON.stringify(checkoutData));

        // 2. Redirect to your existing payment page
        window.location.href = "payment.html";
    }
}