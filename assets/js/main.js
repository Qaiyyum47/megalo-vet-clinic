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

    document.querySelector("header").innerHTML = `
        <nav>
            <img src="${isSubpage ? "../" : ""}assets/img/icon/ev-logo.png" 
                 width="48px" 
                 alt="Logo"  
                 onclick="window.location.href='${isSubpage ? "../" : ""}index.html'"> 
            <a href="${isSubpage ? "../" : ""}index.html">Home</a>
            <a href="${isSubpage ? "" : "pages/"}about.html">About</a>
            <a href="${isSubpage ? "" : "pages/"}services.html">Services</a>
            <a href="${isSubpage ? "" : "pages/"}blog.html">Blog</a>
            <a href="${isSubpage ? "" : "pages/"}gallery.html">Gallery</a>
        </nav>
    `;
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
            <p>Follow us on social media</p>
            <div class="icons">
                <img src="${isSubpage ? "../" : ""}assets/img/icon/facebookw.png" 
                     alt="Facebook" 
                     onclick="window.open('https://www.facebook.com/MegaloEmpire/', '_blank')">
                <img src="${isSubpage ? "../" : ""}assets/img/icon/instagramw.png" 
                     alt="Instagram" 
                     onclick="window.open('https://www.instagram.com/empiremegalo/', '_blank')">
            </div>
            <p><strong>Address:</strong> Lot 8641, Ground Floor, Emart Commercial Centre, Jalan Rakawi Yusuf, 97000 Bintulu, Sarawak</p>
            <div class="hours">
                <p><strong>Open:</strong> Mon-Wed, Sat-Sun (9:30 AM–1 PM, 2–5:30 PM) | Closed Thu-Fri</p>
            </div>
        </div>
    `;
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
});

document.addEventListener("DOMContentLoaded", function () {
    const toggleFormBtn = document.getElementById("toggle-form-btn");
    const fullForm = document.getElementById("full-form");
    const nameInput = document.getElementById("name");
    const closeBtn = document.getElementById("close-form-btn");
    const appointmentForm = document.getElementById("appointment-form");

    toggleFormBtn.addEventListener("click", function () {
        nameInput.classList.add("show");
        fullForm.classList.add("show");
        appointmentForm.classList.add("expanded");
        closeBtn.style.display = "block";
        toggleFormBtn.style.display = "none";
    });

    closeBtn.addEventListener("click", function () {
        fullForm.classList.remove("show");
        nameInput.classList.remove("show");
        appointmentForm.classList.remove("expanded");
        closeBtn.style.display = "none";
        toggleFormBtn.style.display = "block"; 

        document.querySelectorAll("#full-form input, #full-form select").forEach(input => {
            input.value = "";
        });
    });
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
        console.log(data);

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

            const match = icmageUrl.match(/id=([\w-]+)/);
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