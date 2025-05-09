<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Form</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
    <!-- Booking Form -->
    <form id="booking-form">
        <input type="text" id="name" placeholder="Name" required>
        <input type="text" id="phone" placeholder="Phone" required>
        <input type="text" id="pickup" placeholder="Pickup Location" required>
        <input type="text" id="drop" placeholder="Drop Location" required>
        <input type="date" id="date" required>
        <input type="time" id="time" required>
        <select id="vehicle-type">
            <option value="car">Car</option>
            <option value="van">Van</option>
            <option value="bike">Bike</option>
        </select>
        <select id="payment">
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="upi">UPI</option>
        </select>
        <button type="submit" class="submit-btn">Confirm Booking</button>
    </form>

    <!-- Floating WhatsApp Button -->
    <div class="whatsapp-btn">
        <i class="fab fa-whatsapp"></i>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const bookingForm = document.getElementById("booking-form");
            let whatsappBtn = document.querySelector(".whatsapp-btn");

            if (!whatsappBtn) {
                whatsappBtn = document.createElement("a");
                whatsappBtn.href = "#";
                whatsappBtn.className = "whatsapp-btn";
                whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
                document.body.appendChild(whatsappBtn);
            }

            // Event listeners for form submission
            if (bookingForm) {
                bookingForm.addEventListener("submit", function (event) {
                    event.preventDefault();
                    sendWhatsAppMessage();
                });
            }

            // WhatsApp button click event
            whatsappBtn.addEventListener("click", function (event) {
                event.preventDefault();
                sendWhatsAppMessage();
            });

            // Get form data
            function getFormData() {
                return {
                    name: document.getElementById("name").value.trim(),
                    phone: document.getElementById("phone").value.trim(),
                    pickup: document.getElementById("pickup").value.trim(),
                    drop: document.getElementById("drop").value.trim(),
                    date: document.getElementById("date").value,
                    time: document.getElementById("time").value,
                    vehicleType: document.getElementById("vehicle-type").value,
                    paymentMethod: document.getElementById("payment").value
                };
            }

            // Form validation
            function validateForm(formData) {
                const phoneRegex = /^[0-9]{10}$/;
                if (Object.values(formData).some(value => !value)) {
                    alert("⚠ Please fill all the details before confirming your booking.");
                    return false;
                }
                if (!phoneRegex.test(formData.phone)) {
                    alert("⚠ Please enter a valid 10-digit phone number.");
                    return false;
                }
                const selectedDate = new Date(`${formData.date}T${formData.time}`);
                if (selectedDate < new Date()) {
                    alert("⚠ Please select a future date and time.");
                    return false;
                }
                return true;
            }

            // Send WhatsApp message
            function sendWhatsAppMessage() {
                const formData = getFormData();
                if (!validateForm(formData)) return;

                let message = `🚖 *New Cab Booking* 🚖\n\n` +
                              `*Name:* ${formData.name}\n` +
                              `*Phone:* ${formData.phone}\n` +
                              `*Pickup:* ${formData.pickup}\n` +
                              `*Drop-off:* ${formData.drop}\n` +
                              `*Date:* ${formData.date}\n` +
                              `*Time:* ${formData.time}\n` +
                              `*Vehicle*
