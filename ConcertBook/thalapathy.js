function calculateTotal() {
    const unitPrice = 280; 
    const qtyInput = document.getElementById('qty');
    const totalBox = document.getElementById('totalPrice');
    
    if (qtyInput && totalBox) {
        const qty = parseInt(qtyInput.value) || 0;
        const total = unitPrice * qty;
        totalBox.innerText = "₹" + total.toLocaleString('en-IN');
    }
}

function confirmBooking() {
    const qty = document.getElementById('qty').value;
    const total = "₹" + (280 * qty).toLocaleString('en-IN');
    
    if (confirm(`Ready for the vintage vibe? Confirm ${qty} ticket(s) for ${total}.`)) {
        alert("Thalapathy fans! Your booking is successful. See you at Arangam!");
        window.location.href = "index.html";
    }
}