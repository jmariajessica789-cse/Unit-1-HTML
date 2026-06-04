let currentBooking = null; // Temporary storage

function calculateTotal() {
    const price = document.getElementById('type').value;
    const qty = document.getElementById('qty').value;
    const total = price * qty;
    document.getElementById('totalPrice').innerText = "₹" + total.toLocaleString('en-IN');
}

function confirmBooking() {
    const typeSelect = document.getElementById('type');
    const categoryName = typeSelect.options[typeSelect.selectedIndex].text;
    const qty = document.getElementById('qty').value;
    const total = document.getElementById('totalPrice').innerText;

    if (qty < 1) {
        alert("Please select at least 1 ticket.");
        return;
    }

    // 1. Prepare data
    currentBooking = {
        event: "Hiphop Tamizha: ROTDM Finale",
        category: categoryName,
        quantity: qty,
        amount: total,
        date: "Sat, 07 Mar 2026",
        venue: "YMCA Ground, Chennai",
        bookingID: "HHT-" + Math.floor(Math.random() * 900000 + 100000)
    };

    // 2. Inject into modal
    document.getElementById('modalDetails').innerHTML = `
        <p><b>Event:</b> ${currentBooking.event}</p>
        <p><b>Category:</b> ${currentBooking.category}</p>
        <p><b>Quantity:</b> ${currentBooking.quantity}</p>
        <p><b>Total:</b> ${currentBooking.amount}</p>
    `;

    // 3. Open Modal
    document.getElementById('bookingModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

// ... existing calculateTotal and confirmBooking functions ...

function finalizeBooking() {
    if (currentBooking) {
        // Save the booking info temporarily for the payment session
        sessionStorage.setItem('pendingCheckout', JSON.stringify(currentBooking));

        // Visual feedback
        const modalContent = document.querySelector('.modal-card');
        modalContent.innerHTML = `
            <div class="modal-icon">🔒</div>
            <h2>Secure Connection</h2>
            <p>Redirecting to payment gateway...</p>
        `;
        
        // Redirect to payment.html after a short delay
        setTimeout(() => {
            window.location.href = "payment.html";
        }, 1500);
    }
}