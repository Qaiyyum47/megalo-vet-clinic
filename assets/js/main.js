// -----------Hides the header on scroll down and shows it on scroll up-------------------------
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

// -----------Dynamically generates the navigation bar and handles mobile menu toggle functionality-----------
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
    
        if (mobileMenu.classList.contains("active")) {
            body.classList.add("no-scroll");
        } else {
            body.classList.remove("no-scroll");
        }
    };
    
    document.querySelector(".mobile-overlay").addEventListener("click", function () {
        document.querySelector(".mobile-menu").classList.remove("active");
        this.style.display = "none";
        document.body.classList.remove("no-scroll"); 
    });
    
});

// -----------Dynamically generates the footer--------
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

// --------------Adds a floating WhatsApp button that adjusts its position based on scroll----------
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
