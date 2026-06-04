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
        event: "Flashback Saturdays ft. DJ Sam",
        category: categoryName,
        quantity: qty,
        amount: total,
        date: "Sat, 31 Jan 2026",
        venue: "Hard Rock Cafe, Nungambakkam, Chennai",
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
function finalizeBooking() {
    if (tempBookingData) {
        // 1. Pack the specific concert data
        const checkoutData = {
            event: tempBookingData.event,
            amount: tempBookingData.amount,
            quantity: tempBookingData.quantity,
            date: tempBookingData.date,
            venue: tempBookingData.venue,
            bookingID: tempBookingData.bookingID
        };

        // 2. Save it to sessionStorage for the payment page to use
        sessionStorage.setItem('pendingCheckout', JSON.stringify(checkoutData));

        // 3. Move to the shared payment page
        window.location.href = "payment.html";
    }
}