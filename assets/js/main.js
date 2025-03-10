let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 50) {
        header.classList.add("hidden");
    } else {
        header.classList.remove("hidden");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
});

document.addEventListener("DOMContentLoaded", function () {
    let isSubpage = window.location.pathname.includes("/pages/");
    let currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelector("header").innerHTML = `
         <nav>
            <div class='nav-main'>
                <div class='nav-logo'>
                    <img src="${isSubpage ? "../" : ""}assets/img/icon/ev-logo.png" 
                        width="48px" 
                        alt="Logo"  
                        onclick="window.location.href='${isSubpage ? "../" : ""}index.html'">
                </div>
                <div class='nav-links'> 
                    <a href="${isSubpage ? "../" : ""}index.html">Home</a>
                    <a href="${isSubpage ? "" : "pages/"}about.html">About</a>
                    <a href="${isSubpage ? "" : "pages/"}services.html">Services</a>
                    <a href="${isSubpage ? "" : "pages/"}blog.html">Blog</a>
                    <a href="${isSubpage ? "" : "pages/"}gallery.html">Gallery</a>
                </div>
            </div>
            
            <div class="nav-socials">
                <a href="https://www.facebook.com/MegaloEmpire/" target="_blank" aria-label="Facebook">
                    <img src="${isSubpage ? "../" : ""}assets/img/icon/facebookb.png" alt="Facebook">
                </a>
                <a href="https://www.instagram.com/empiremegalo/" target="_blank" aria-label="Instagram">
                    <img src="${isSubpage ? "../" : ""}assets/img/icon/instagramb.png" alt="Instagram">
                </a>
            </div>
                <p class="hamburger" onclick="toggleMenu()">☰</p>
        </nav>


        <div class="mobile-menu">
            <div class="hamburger-close" onclick="toggleMenu()">X</div>
            <a href="${isSubpage ? "../" : ""}index.html" class="nav-item ${currentPage === 'index.html' ? 'active' : ''}">Home</a>
            <a href="${isSubpage ? "" : "pages/"}about.html" class="nav-item ${currentPage === 'about.html' ? 'active' : ''}">About</a>
            <a href="${isSubpage ? "" : "pages/"}services.html" class="nav-item ${currentPage === 'services.html' ? 'active' : ''}">Services</a>
            <a href="${isSubpage ? "" : "pages/"}blog.html" class="nav-item ${currentPage === 'blog.html' ? 'active' : ''}">Blog</a>
            <a href="${isSubpage ? "" : "pages/"}gallery.html" class="nav-item ${currentPage === 'gallery.html' ? 'active' : ''}">Gallery</a>
            <div class="mobile-socials">
                <a href="https://www.facebook.com/MegaloEmpire/" target="_blank" aria-label="Facebook">
                    <img src="${isSubpage ? "../" : ""}assets/img/icon/facebookb.png" alt="Facebook">
                </a>
                <a href="https://www.instagram.com/empiremegalo/" target="_blank" aria-label="Instagram">
                    <img src="${isSubpage ? "../" : ""}assets/img/icon/instagramb.png" alt="Instagram">
                </a>
            </div>
        </div>
        <div class="mobile-overlay"></div>
    `;

    window.toggleMenu = function () {
        const mobileMenu = document.querySelector(".mobile-menu");
        const mobileOverlay = document.querySelector(".mobile-overlay");
        const body = document.body;
    
        mobileMenu.classList.toggle("active");
        mobileOverlay.style.display = mobileMenu.classList.contains("active") ? "block" : "none";
    
        // Prevent scrolling when the menu is open
        if (mobileMenu.classList.contains("active")) {
            body.classList.add("no-scroll");
        } else {
            body.classList.remove("no-scroll");
        }
    };
    
    // Close menu when clicking overlay
    document.querySelector(".mobile-overlay").addEventListener("click", function () {
        document.querySelector(".mobile-menu").classList.remove("active");
        this.style.display = "none";
        document.body.classList.remove("no-scroll"); // Enable scrolling again
    });
    
});


document.addEventListener("DOMContentLoaded", function () {
    let isSubpage = window.location.pathname.includes("/pages/");

    document.querySelector("#main-footer").innerHTML = `
        <div id="footer-logo">
            <h1>Megalo Empire</h1>
            <h1 class="outline">Animal Clinic</h1>
            <h3>Weekend vet, because fur-ever matters</h3>
        </div>
        <div class="footer-info">
            <p><strong>Address:</strong> Lot 8641, Ground Floor, Emart Commercial Centre, Jalan Rakawi Yusuf, 97000 Bintulu, Sarawak</p>
            <p><strong>Phone:</strong> <a href="tel:+60123456789">+60 12-345 6789</a></p>
            <p><strong>Email:</strong> <a href="mailto:megaloempire@gmail.com">megaloempire@gmail.com</a></p> 
            <div class="hours">
                <p><strong>Open:</strong> Mon-Wed, Sat-Sun (9:30 AM–1 PM, 2–5:30 PM) | Closed Thu-Fri</p>
            </div>
    </div>

    `;
});

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
        closeBtn.style.display = "none"; // Hide close button on mobile
        toggleFormBtn.style.display = "block"; 
        appointmentForm.style.display = "none"; // Hide form on mobile

        // Clear input fields when form is closed
        document.querySelectorAll("#full-form input, #full-form select").forEach(input => {
            input.value = "";
        });
    }

    function updateVisibility() {
        if (isMobile()) {
            toggleFormBtn.style.display = "block"; // Show toggle button on mobile
            closeBtn.style.display = "none"; // Hide close button until form is opened
            if (!appointmentForm.classList.contains("expanded")) {
                appointmentForm.style.display = "none"; // Hide form if not open
            }
        } else {
            toggleFormBtn.style.display = "none"; // Hide toggle button on larger screens
            closeBtn.style.display = "none"; // Ensure close button is hidden on larger screens
            appointmentForm.style.display = "block"; // Form always visible on larger screens
        }
    }

    toggleFormBtn.addEventListener("click", function () {
        if (isMobile()) {
            appointmentForm.style.display = "block"; // Show form
            fullForm.classList.add("show");
            appointmentForm.classList.add("expanded");
            closeBtn.style.display = "block"; // Show close button on mobile
            toggleFormBtn.style.display = "none"; // Hide button when form is opened
        }
    });

    closeBtn.addEventListener("click", function () {
        if (isMobile()) {
            closeForm();
        }
    });

    // 🔥 Auto-close form when switching from desktop to mobile
    window.addEventListener("resize", function () {
        if (isMobile() && appointmentForm.classList.contains("expanded")) {
            closeForm();
        }
        updateVisibility(); // Update visibility when resizing
    });

    // Ensure correct visibility on page load
    updateVisibility();
});

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.services-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    const itemWidth = 300; // Adjust based on `.service-item` width
    const cloneCount = 2; // Number of items to clone

    // Clone first and last items for infinite scrolling effect
    const serviceItems = document.querySelectorAll('.service-item');
    for (let i = 0; i < cloneCount; i++) {
        let firstClone = serviceItems[i].cloneNode(true);
        let lastClone = serviceItems[serviceItems.length - 1 - i].cloneNode(true);
        container.appendChild(firstClone);
        container.insertBefore(lastClone, container.firstChild);
    }

    container.scrollLeft = itemWidth * cloneCount;

    nextBtn.addEventListener('click', () => {
        container.scrollBy({ left: itemWidth, behavior: 'smooth' });

        setTimeout(() => {
            if (container.scrollLeft >= container.scrollWidth - container.clientWidth - itemWidth) {
                container.scrollLeft = itemWidth * cloneCount;
            }
        }, 500);
    });

    prevBtn.addEventListener('click', () => {
        container.scrollBy({ left: -itemWidth, behavior: 'smooth' });

        setTimeout(() => {
            if (container.scrollLeft <= 0) {
                container.scrollLeft = container.scrollWidth - (itemWidth * cloneCount * 2);
            }
        }, 500);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let isSubpage = window.location.pathname.includes("/pages/");

    const whatsappBtn = document.createElement("div");
    whatsappBtn.classList.add("whatsapp-btn");
    whatsappBtn.style.cursor = "pointer";

    const whatsappIcon = document.createElement("img");
    whatsappIcon.src = `${isSubpage ? "../" : ""}assets/img/icon/whatsapp.png`;
    whatsappIcon.alt = "WhatsApp";

    whatsappBtn.appendChild(whatsappIcon);
    document.body.appendChild(whatsappBtn);

    whatsappBtn.onclick = function () {
        window.open("https://wa.me/60173807339", "_blank");
    };

    function adjustWhatsAppPosition() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const fullHeight = document.body.scrollHeight;

        if (scrollPosition + windowHeight >= fullHeight - 10) {
            whatsappBtn.style.bottom = "auto";
            whatsappBtn.style.top = "30%"; 
        } else {
            whatsappBtn.style.top = "auto";
            whatsappBtn.style.bottom = "50px";
        }
    }

    window.addEventListener("scroll", adjustWhatsAppPosition);
});


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
let touchEndX = 0;
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
    slider.innerHTML = '<div class="service-item"></div>';
    updatePaginationMobile();
    updateMobileItem();
    slider.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('touchmove', handleTouchMove);
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
    document.querySelectorAll('.service-item').forEach(item => {
        item.addEventListener('mouseenter', () => clearInterval(autoSlide));
        item.addEventListener('mouseleave', resetAutoSlide);
    });
}

function updateSlider() {
    if (window.innerWidth < 768) return;
    const translateX = -(currentIndex * (100 / slidesToShow));
    slider.style.transform = `translateX(${translateX}%)`;
    document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
    const dotIndex = Math.floor(currentIndex / slidesToShow);
    document.querySelectorAll('.dot')[dotIndex]?.classList.add('active');
    addHoverPause();
}

function updateMobileItem() {
    const mobileItem = document.querySelector('.service-item');
    if (!mobileItem) return;
    mobileItem.innerHTML = `
        <img src="${services[mobileIndex].img}" alt="${services[mobileIndex].title}">
        <h3>${services[mobileIndex].title}</h3>
    `;
    document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
    document.querySelectorAll('.dot')[mobileIndex]?.classList.add('active');
    addHoverPause();
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
    currentIndex = (currentIndex - slidesToShow + services.length) % services.length;
    updateSlider();
}

function prevSlideMobile() {
    mobileIndex = (mobileIndex - 1 + services.length) % services.length;
    updateMobileItem();
}

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
}

function handleTouchEnd() {
    const swipeDistance = touchStartX - touchEndX;
    if (swipeDistance > 50) nextSlideMobile();
    else if (swipeDistance < -50) prevSlideMobile();
}

function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(window.innerWidth < 768 ? nextSlideMobile : nextSlideDesktop, 3000);
}

window.addEventListener('resize', () => {
    clearInterval(autoSlide);
    if (window.innerWidth < 768) {
        initMobileSlider();
    } else {
        initDesktopSlider();
    }
});

function init() {
    if (window.innerWidth < 768) {
        initMobileSlider();
    } else {
        initDesktopSlider();
    }
}

init();
