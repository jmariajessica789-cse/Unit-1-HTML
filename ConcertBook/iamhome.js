function calculateTotal() {
    const price = 2500; // Sunidhi base price
    const qtyInput = document.getElementById('qty');
    const totalBox = document.getElementById('totalPrice');
    
    if (qtyInput && totalBox) {
        const qty = qtyInput.value;
        const total = price * qty;
        totalBox.innerText = "₹" + total.toLocaleString('en-IN');
    }
}

function confirmBooking() {
    const qty = document.getElementById('qty').value;
    const total = "₹" + (2500 * qty).toLocaleString('en-IN');
    
    if (confirm(`Book ${qty} ticket(s) for Sunidhi Chauhan? Total: ${total}`)) {
        alert("Booking Successful! Get ready to dance!");
        window.location.href = "index.html";
    }
}