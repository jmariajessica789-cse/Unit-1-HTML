function calculateTotal() {
    const fixedPrice = 800; // Ishq Mastana price
    const qtyInput = document.getElementById('qty');
    const totalBox = document.getElementById('totalPrice');
    
    if (qtyInput && totalBox) {
        const qty = parseInt(qtyInput.value) || 0;
        const total = fixedPrice * qty;
        totalBox.innerText = "₹" + total.toLocaleString('en-IN');
    }
}

function confirmBooking() {
    const qty = document.getElementById('qty').value;
    const total = "₹" + (800 * qty).toLocaleString('en-IN');
    
    if (confirm(`Do you want to proceed with the booking for ${qty} ticket(s)? Total: ${total}`)) {
        alert("Booking Confirmed! Prepare for a soulful evening at DakshinaChitra.");
        window.location.href = "index.html";
    }
}