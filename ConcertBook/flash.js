function calculateTotal() {
    const entryFee = 500; 
    const qtyInput = document.getElementById('qty');
    const totalBox = document.getElementById('totalPrice');
    
    if (qtyInput && totalBox) {
        const qty = parseInt(qtyInput.value) || 0;
        const total = entryFee * qty;
        totalBox.innerText = "₹" + total.toLocaleString('en-IN');
    }
}

function confirmBooking() {
    const qty = document.getElementById('qty').value;
    const total = "₹" + (500 * qty).toLocaleString('en-IN');
    
    if (confirm(`Confirm booking for ${qty} person(s)? Total: ${total}. Note: Physical ID is mandatory at the entrance.`)) {
        alert("Booking Confirmed! Get ready to flashback with DJ Sam.");
        window.location.href = "index.html";
    }
}