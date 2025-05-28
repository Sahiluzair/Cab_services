document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById("booking-form");
    const submitButton = document.querySelector('.submit-btn');
    const phoneNumber = "918904887257"; // Your WhatsApp number

    if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const rideType = document.getElementById("ride-type").value.trim();
            const pickup = document.getElementById("pickup").value.trim();
            const drop = document.getElementById("drop").value.trim();
            const vehicleType = document.getElementById("vehicle-type").value.trim();
            const datetime = document.getElementById("date-time").value;
            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const payment = document.getElementById("payment").value.trim();

            // Validate input
            const phoneRegex = /^[0-9]{10}$/;
            if (!rideType || !pickup || !drop || !vehicleType || !datetime || !name || !phone || !payment) {
                alert("⚠ Please fill in all fields.");
                return;
            }

            if (!phoneRegex.test(phone)) {
                alert("⚠ Please enter a valid 10-digit phone number.");
                return;
            }

            const selectedDateTime = new Date(datetime);
            if (selectedDateTime < new Date()) {
                alert("⚠ Please select a future date and time.");
                return;
            }

            // Construct message
            const message = `🚖 *New Cab Booking Request* 🚖\n\n` +
                `*Name:* ${name}\n` +
                `*Phone:* ${phone}\n` +
                `*Ride Type:* ${rideType}\n` +
                `*Pickup:* ${pickup}\n` +
                `*Drop-off:* ${drop}\n` +
                `*Date & Time:* ${datetime}\n` +
                `*Vehicle Type:* ${vehicleType}\n` +
                `*Payment Method:* ${payment}`;

            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

            // UI Feedback
            submitButton.disabled = true;
            submitButton.innerHTML = 'Sending... ⏳';

            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Confirm Booking';
                alert("✅ Booking request sent successfully!");
                window.open(whatsappURL, "_blank");
            }, 1500);
        });
    }
});
