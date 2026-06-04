function calculateTotal() {
    const ticketPrice = 400; 
    const qtyInput = document.getElementById('qty');
    const totalBox = document.getElementById('totalPrice');
    
    if (qtyInput && totalBox) {
        const qty = parseInt(qtyInput.value) || 0;
        const total = ticketPrice * qty;
        totalBox.innerText = "₹" + total.toLocaleString('en-IN');
    }
}

function confirmBooking() {
    const qty = document.getElementById('qty').value;
    const total = "₹" + (400 * qty).toLocaleString('en-IN');
    
    if (confirm(`Confirm booking for ${qty} ticket(s) to Pale White Dot? Total: ${total}`)) {
        alert("Success! Your tickets for Crea-Shakthi's musical are confirmed.");
        window.location.href = "index.html";
    }
}