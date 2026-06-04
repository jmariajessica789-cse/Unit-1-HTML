function calculateTotal() {
    const donationPrice = 249; // Fixed donation amount
    const qtyInput = document.getElementById('qty');
    const totalBox = document.getElementById('totalPrice');
    
    if (qtyInput && totalBox) {
        const qty = parseInt(qtyInput.value) || 0;
        const total = donationPrice * qty;
        totalBox.innerText = "₹" + total.toLocaleString('en-IN');
    }
}

function confirmBooking() {
    const qty = document.getElementById('qty').value;
    const total = "₹" + (249 * qty).toLocaleString('en-IN');
    
    if (confirm(`Confirm your donation of ${total} for ${qty} ticket(s)? Every ticket helps provide a hearing aid.`)) {
        alert("Thank you for your kindness! Your tickets have been sent to your email.");
        window.location.href = "index.html";
    }
}