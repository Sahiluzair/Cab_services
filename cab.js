document.addEventListener("DOMContentLoaded", function () {
    // Get form and create WhatsApp button
    const bookingForm = document.getElementById("booking-form");
    let whatsappBtn = document.querySelector(".whatsapp-btn");

    if (!whatsappBtn) {
        whatsappBtn = document.createElement("a");
        whatsappBtn.href = "#";
        whatsappBtn.className = "whatsapp-btn";
        whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
        document.body.appendChild(whatsappBtn);
    }

    // Event listeners
    if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault();
            sendWhatsAppMessage();
        });
    }

    whatsappBtn.addEventListener("click", function (event) {
        event.preventDefault();
        sendWhatsAppMessage();
    });

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
                      `*Vehicle Type:* ${formData.vehicleType}\n` +
                      `*Payment Method:* ${formData.paymentMethod}`;

        let whatsappURL = `https://wa.me/918904887257?text=${encodeURIComponent(message)}`;

        const submitButton = document.querySelector('.submit-btn');
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending... ⏳';

        setTimeout(() => {
            alert("✅ Booking request sent successfully!");
            submitButton.disabled = false;
            submitButton.innerHTML = 'Confirm Booking';
            window.open(whatsappURL, "_blank");
        }, 1500);
    }

    // Floating WhatsApp Button Styling with Animation
    const style = document.createElement("style");
    style.innerHTML = `
        .whatsapp-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #25D366;
            color: white;
            padding: 15px;
            border-radius: 50%;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
            text-align: center;
            font-size: 24px;
            cursor: pointer;
            transition: transform 0.3s ease-in-out;
            animation: bounce 2s infinite;
        }
        .whatsapp-btn:hover {
            background-color: #1EBE5D;
            transform: scale(1.1);
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(style);

    // Testimonial Slider
    const testimonials = document.querySelectorAll(".testimonial");
    let index = 0;

    function showNextTestimonial() {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.transform = `translateX(-${index * 100}%)`;
        });
        index = (index + 1) % testimonials.length;
    }

    if (testimonials.length > 0) {
        setInterval(showNextTestimonial, 3000);
    }
});
