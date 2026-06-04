function calculateTotal() {
    const price = 250; // STR fixed price
    const qty = document.getElementById('qty').value;
    const total = price * qty;
    
    const totalBox = document.getElementById('totalPrice');
    if(totalBox) {
        totalBox.innerText = "₹" + total.toLocaleString('en-IN');
    }
}

function confirmBooking() {
    const qty = document.getElementById('qty').value;
    const total = "₹" + (250 * qty).toLocaleString('en-IN');
    
    if (confirm(`Book ${qty} ticket(s) for STR Sing Along? Total: ${total}`)) {
        alert("Atman! Your tickets are confirmed. See you at IDAM!");
        window.location.href = "index.html";
    }
}