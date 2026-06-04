document.addEventListener("DOMContentLoaded", () => {
    // Initial Price Display
    if(document.getElementById('totalPrice')) {
        calculateTotal();
    }
});

function calculateTotal() {
    const price = parseInt(document.getElementById('type').value);
    const qty = parseInt(document.getElementById('qty').value);
    const total = price * qty;
    
    // Smooth update for the Final Amount box
    const totalBox = document.getElementById('totalPrice');
    totalBox.innerText = "₹" + total.toLocaleString('en-IN');
}

function confirmBooking() {
    const total = document.getElementById('totalPrice').innerText;
    const qty = document.getElementById('qty').value;
    
    if (confirm(`Confirm booking for ${qty} ticket(s)? Total: ${total}`)) {
        alert("Booking Successful! Enjoy the GVM experience.");
        window.location.href = "index.html";
    }
}