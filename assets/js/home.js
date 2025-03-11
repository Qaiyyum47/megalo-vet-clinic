// --------------Manages the visibility of the appointment form based on screen size and user interactions---------
// --------------Ensures a smooth toggle experience for mobile and desktop views---------
document.addEventListener("DOMContentLoaded", function () {
    const toggleFormBtn = document.getElementById("toggle-form-btn");
    const fullForm = document.getElementById("full-form");
    const closeBtn = document.getElementById("close-form-btn");
    const appointmentForm = document.getElementById("appointment-form");

    function isMobile() {
        return window.innerWidth <= 480;
    }

    function closeForm() {
        fullForm.classList.remove("show");
        appointmentForm.classList.remove("expanded");
        closeBtn.style.display = "none";
        toggleFormBtn.style.display = "block"; 
        appointmentForm.style.display = "none";

        document.querySelectorAll("#full-form input, #full-form select").forEach(input => {
            input.value = "";
        });
    }

    function updateVisibility() {
        if (isMobile()) {
            toggleFormBtn.style.display = "block";
            closeBtn.style.display = "none";
            if (!appointmentForm.classList.contains("expanded")) {
                appointmentForm.style.display = "none";
            }
        } else {
            toggleFormBtn.style.display = "none";
            closeBtn.style.display = "none";
            appointmentForm.style.display = "block";
        }
    }

    toggleFormBtn.addEventListener("click", function () {
        if (isMobile()) {
            appointmentForm.style.display = "block";
            fullForm.classList.add("show");
            appointmentForm.classList.add("expanded");
            closeBtn.style.display = "block";
            toggleFormBtn.style.display = "none";
        }
    });

    closeBtn.addEventListener("click", function () {
        if (isMobile()) {
            closeForm();
        }
    });

    window.addEventListener("resize", function () {
        if (isMobile() && appointmentForm.classList.contains("expanded")) {
            closeForm();
        }
        updateVisibility();
    });

    updateVisibility();
});

// ---------Creates an infinite carousell effect for service items and makes each item clickable----------
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.services-container');
    const itemWidth = 300;
    const cloneCount = 2;

    const serviceItems = document.querySelectorAll('.service-item');

    serviceItems.forEach(item => {
        item.onclick = () => {
            window.location.href = 'pages/services.html';
        };
    });

    for (let i = 0; i < cloneCount; i++) {
        let firstClone = serviceItems[i].cloneNode(true);
        let lastClone = serviceItems[serviceItems.length - 1 - i].cloneNode(true);

        firstClone.onclick = lastClone.onclick = () => {
            window.location.href = 'pages/services.html';
        };
        container.appendChild(firstClone);
        container.insertBefore(lastClone, container.firstChild);
    }
    container.scrollLeft = itemWidth * cloneCount;
});

// -----------------Initializes a date picker and validates time input within working hours------------
document.addEventListener("DOMContentLoaded", function () {
    flatpickr("#datepicker", {
        dateFormat: "d-m-Y",
        minDate: "today",
        maxDate: new Date().fp_incr(365)
    });
});

document.getElementById("timepicker").addEventListener("input", function () {
    let time = this.value;
    let minTime = "09:30";
    let maxTime = "17:30";
    let warning = document.getElementById("time-warning");

    if (time < minTime || time > maxTime) {
        warning.style.display = "block";  
        this.value = ""; 
    } else {
        warning.style.display = "none";  
    }
});

// ----Toggles FAQ item visibility while closing others when a question is clicked-----
document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", function () {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                }
            });

            item.classList.toggle("active");
        });
    });
});

// ----------Sends an appointment request via WhatsApp with user-inputted details---------
function sendMessage() {
    const name = document.getElementById('name').value.trim();
    const pet = document.getElementById('pet').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('datepicker').value;
    const time = document.getElementById('timepicker').value;
    const timeWarning = document.getElementById('time-warning');

    if (!name || !pet || !service || !date || !time) {
        alert("Please fill in all fields before booking.");
        return;
    }

    const currentTime = new Date(`1970-01-01T${time}:00`);
    const startTime = new Date('1970-01-01T09:30:00');
    const endTime = new Date('1970-01-01T17:30:00');

    if (currentTime < startTime || currentTime > endTime) {
        timeWarning.style.display = 'block';
        return;
    } else {
        timeWarning.style.display = 'none';
    }

    const message = `*Appointment Request*:
- *Name*: ${name}
- *Pet*: ${pet}
- *Service Requested*: ${service}
- *Date*: ${date}
- *Time*: ${time}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/601160814971?text=${encodedMessage}`;

    window.open(whatsappLink, '_blank');
}

// --------Fetches and displays updates from a Google Sheet, formatting timestamps and images----------
async function fetchGoogleSheetData() {
    const sheetURL = 'https://script.google.com/macros/s/AKfycbwoNH9hqxXEuZqxL2HaGimresjT25O3JEtibARgyMm2C_gIdOpTffKoEZz0-jN0UzETow/exec';  

    try {
        const response = await fetch(sheetURL);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();

        const entries = data.data;
        const updatesContainer = document.querySelector('.updates-container');

        if (!updatesContainer) {
            console.error("Error: '.updates-container' not found in the document.");
            return;
        }

        updatesContainer.innerHTML = "";

        entries.forEach(entry => {
            let imageUrl = entry.imageUrl;
            const caption = entry.caption;
            const timestamp = entry.timestamp;
            const username = entry.username;

            const match = imageUrl.match(/id=([\w-]+)/);
            if (match) {
                imageUrl = `https://drive.google.com/thumbnail?id=${match[1]}`;
            }

            const dateObj = new Date(timestamp);
            const formattedDate = dateObj.toLocaleString("en-GB", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true
            }).replace(",", "");

            const updateItem = document.createElement('div');
            updateItem.classList.add('update-item');
        
            updateItem.innerHTML = `
                <div class="update-header">
                    <img src="assets/img/icon/ev-logo.png" class="profile-pic" alt="Profile">
                    <span class="username">${username}</span>
                </div>
                <img src="${imageUrl}" class="update-img" alt="Update Image" loading="lazy">
                <div class="update-content">
                    <p>${caption}</p>
                    <span class="timestamp">${formattedDate}</span>
                </div>
            `;
        
            updatesContainer.appendChild(updateItem);
        });        

    } catch (error) {
        console.error('Error fetching Google Sheets data:', error);
    }
}
document.addEventListener("DOMContentLoaded", fetchGoogleSheetData);

// -----------------Initializes the services slider with responsive desktop and mobile modes--------------
// -----------------Handles automatic sliding, touch gestures, and hover pauses-------------
const slider = document.querySelector('.services-list');
const pagination = document.querySelector('.pagination');

const services = [
    { img: "assets/img/consultation.png", title: "Consultation" },
    { img: "assets/img/vaccine.jpg", title: "Vaccination" },
    { img: "assets/img/surgery.jpg", title: "Surgery" },
    { img: "assets/img/ultrasound.jpg", title: "Ultrasound" },
    { img: "assets/img/emergency.jpg", title: "Emergency Treatment" },
];

let currentIndex = 0;
let mobileIndex = 0;
let slidesToShow = 3;
let touchStartX = 0;
let autoSlide;

function initDesktopSlider() {
    slidesToShow = 3;
    currentIndex = 0;
    updatePaginationDesktop();
    updateSlider();
    autoSlide = setInterval(nextSlideDesktop, 3000);
}

function initMobileSlider() {
    slidesToShow = 1;
    mobileIndex = 0;
    updatePaginationMobile();
    updateMobileItem();
    slider.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('touchend', handleTouchEnd);
    autoSlide = setInterval(nextSlideMobile, 3000);
}

function updatePaginationDesktop() {
    pagination.innerHTML = "";
    const totalDots = Math.ceil(services.length / slidesToShow);
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentIndex = Math.min(i * slidesToShow, services.length - slidesToShow);
            updateSlider();
            resetAutoSlide();
        });
        pagination.appendChild(dot);
    }
}

function updatePaginationMobile() {
    pagination.innerHTML = "";
    for (let i = 0; i < services.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            mobileIndex = i;
            updateMobileItem();
            resetAutoSlide();
        });
        pagination.appendChild(dot);
    }
}

function addHoverPause() {
    if (window.innerWidth >= 768) {
        document.querySelectorAll('.service-item').forEach(item => {
            item.addEventListener('mouseenter', () => clearInterval(autoSlide));
            item.addEventListener('mouseleave', resetAutoSlide);
        });
    }
}

function updateSlider() {
    if (window.innerWidth < 768) return;
    const translateX = -(currentIndex * (100 / slidesToShow));
    slider.style.transform = `translateX(${translateX}%)`;
    document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
    document.querySelectorAll('.dot')[Math.floor(currentIndex / slidesToShow)]?.classList.add('active');
    addHoverPause();
}

function updateMobileItem() {
    slider.innerHTML = `
        <div class="service-item">
            <img src="${services[mobileIndex].img}" alt="${services[mobileIndex].title}">
            <h3>${services[mobileIndex].title}</h3>
        </div>
    `;
    document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
    document.querySelectorAll('.dot')[mobileIndex]?.classList.add('active');
}

function nextSlideDesktop() {
    currentIndex = (currentIndex + slidesToShow) % services.length;
    updateSlider();
}

function nextSlideMobile() {
    mobileIndex = (mobileIndex + 1) % services.length;
    updateMobileItem();
}

function prevSlideDesktop() {
    currentIndex = Math.max(0, currentIndex - slidesToShow);
    updateSlider();
}

function prevSlideMobile() {
    mobileIndex = (mobileIndex - 1 + services.length) % services.length;
    updateMobileItem();
}

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
    const swipeDistance = touchStartX - event.changedTouches[0].clientX;
    if (swipeDistance > 50) nextSlideMobile();
    else if (swipeDistance < -50) prevSlideMobile();
}

function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(window.innerWidth < 768 ? nextSlideMobile : nextSlideDesktop, 3000);
}

window.addEventListener('resize', () => {
    clearInterval(autoSlide);
    window.innerWidth < 768 ? initMobileSlider() : initDesktopSlider();
});

function init() {
    window.innerWidth < 768 ? initMobileSlider() : initDesktopSlider();
}

init();