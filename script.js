/**
 * Giriraj Jewels - Website Logic & Interactivity
 */

// Force scroll to top on page refresh
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);
    initHeaderScroll();
    initMobileMenu();
    initAccordion();
    initPhilosophyModals();
    initScrollReveal();
    initBookingForm();
    initStoryCarousel();
    initBackgroundMusic();
});

/* ==========================================
   1. Header Scroll Effect
   ========================================== */
function initHeaderScroll() {
    const header = document.querySelector(".header");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

/* ==========================================
   2. Mobile Drawer Navigation
   ========================================== */
function initMobileMenu() {
    const toggle = document.getElementById("menu-toggle");
    const overlay = document.getElementById("mobile-menu-overlay");
    const links = document.querySelectorAll(".mobile-nav-link");
    
    function toggleMenu() {
        toggle.classList.toggle("open");
        overlay.classList.toggle("active");
        
        // Prevent body scrolling when menu is active
        if (overlay.classList.contains("active")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }
    
    toggle.addEventListener("click", toggleMenu);
    
    links.forEach(link => {
        link.addEventListener("click", () => {
            // Close menu when a link is clicked
            if (overlay.classList.contains("active")) {
                toggleMenu();
            }
        });
    });
}

/* ==========================================
   3. Brand Principles Accordion
   ========================================== */
function initAccordion() {
    const headers = document.querySelectorAll(".accordion-header");
    
    headers.forEach(header => {
        header.addEventListener("click", (e) => {
            const item = e.currentTarget.parentElement;
            const isActive = item.classList.contains("active");
            
            // Close all items
            document.querySelectorAll(".accordion-item").forEach(i => {
                i.classList.remove("active");
            });
            
            // Toggle active state
            if (!isActive) {
                item.classList.add("active");
            }
        });
    });
}

/* ==========================================
   4. Collection Philosophy Modals
   ========================================== */
const philosophies = {
    gold: {
        title: "The Gold Philosophy",
        tag: "Design Vision / Gold",
        desc: "Our gold collection honors ancient metalcraft. We specialize in delicate hand-filigree and relief detailing that echoes the architectural temple carvings of Maheshwar. Made from ethically sourced, 22k hallmarked gold, each piece is conceptualized to be an heirloom that carries the weight of celebrations past and future.",
        img: "images/gold_jewellery.jpg"
    },
    antique: {
        title: "The Antique Philosophy",
        tag: "Design Vision / Antique",
        desc: "Curating a royal soul. Inspired by the legendary Maheshwar Fort and the heritage temple dynasties, our antique pieces are crafted using custom alloy blends to produce an authentic aged gold luster. Adorned with raw uncut polki diamonds, rubies, and emeralds, these pieces are designed to evoke ancestral heritage.",
        img: "images/antique_jewel.jpg"
    },
    diamond: {
        title: "The Diamond Philosophy",
        tag: "Design Vision / Diamond",
        desc: "Modern fire meets timeless lineage. We believe diamonds should capture light and emotion in equal measure. Our upcoming diamond creations focus on fluid, minimalist geometries that sit flush against the skin, engineered with hand-selected VS-VVS brilliant-cut diamonds that represent modern elegance.",
        img: "images/diamond_jewel.png"
    }
};

function initPhilosophyModals() {
    const modal = document.getElementById("philosophy-modal");
    const closeBtn = document.getElementById("philosophy-close");
    const cards = document.querySelectorAll(".collection-card");
    const registerBtn = document.getElementById("philosophy-register-btn");
    
    const modalImg = document.getElementById("philosophy-img");
    const modalTag = document.getElementById("philosophy-tag");
    const modalTitle = document.getElementById("philosophy-title");
    const modalDesc = document.getElementById("philosophy-desc");
    
    if (!modal) return;
    
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const key = card.getAttribute("data-philosophy");
            const data = philosophies[key];
            
            if (data) {
                modalImg.src = data.img;
                modalTag.textContent = data.tag;
                modalTitle.textContent = data.title;
                modalDesc.textContent = data.desc;
                
                modal.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        });
    });
    
    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
    
    closeBtn.addEventListener("click", closeModal);
    
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
    
    registerBtn.addEventListener("click", () => {
        closeModal();
        setTimeout(() => {
            const registerSection = document.getElementById("register");
            if (registerSection) {
                registerSection.scrollIntoView({ behavior: "smooth" });
                
                // Pre-populate viewing interest selector
                const title = modalTitle.textContent.toLowerCase();
                const interestSelect = document.getElementById("booking-interest");
                
                if (title.includes("gold")) {
                    interestSelect.value = "Gold Jewellery";
                } else if (title.includes("antique")) {
                    interestSelect.value = "Antique Jewellery";
                } else if (title.includes("diamond")) {
                    interestSelect.value = "Diamond Jewellery";
                } else if (title.includes("silver")) {
                    interestSelect.value = "Silver Jewellery";
                }
            }
        }, 300);
    });
}

/* ==========================================
   5. Scroll Reveal Observer
   ========================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(".scroll-reveal");
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================
   6. Grand Launch Registry Form
   ========================================== */
function initBookingForm() {
    const form = document.getElementById("viewing-form");
    const msgDiv = document.getElementById("booking-message");
    
    if (!form) return;
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("booking-name").value;
        const phone = document.getElementById("booking-phone").value;
        const interest = document.getElementById("booking-interest").value;
        const notes = document.getElementById("booking-notes").value;
        
        // Show local success state
        msgDiv.className = "booking-message success";
        msgDiv.innerHTML = `<i class="fas fa-circle-check"></i> Thank you, <strong>${name}</strong>. You have registered for collection updates. We will notify you at <strong>${phone}</strong> when new collections and design releases arrive.`;
        
        // Form redirect to WhatsApp for dynamic client registry
        setTimeout(() => {
            const waRegistryText = encodeURIComponent(
                `Hello Giriraj Jewels, I would like to request updates on your recent collections:\n\n` +
                `- Name: ${name}\n` +
                `- Phone: ${phone}\n` +
                `- Preferred Category: ${interest}\n` +
                `- Enquiries: ${notes || 'None'}`
            );
            
            window.open(`https://wa.me/919981239994?text=${waRegistryText}`, "_blank");
            form.reset();
        }, 1500);
    });
}

/* ==========================================
   7. Interactive Story Carousel
   ========================================== */
function initStoryCarousel() {
    const slides = document.querySelectorAll(".story-slide");
    const dots = document.querySelectorAll(".carousel-dot");
    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");
    
    if (slides.length === 0) return;
    
    let currentIndex = 0;
    
    function showSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        currentIndex = index;
        
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));
        
        slides[currentIndex].classList.add("active");
        dots[currentIndex].classList.add("active");
    }
    
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            showSlide(currentIndex - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            showSlide(currentIndex + 1);
        });
    }
    
    dots.forEach((dot, idx) => {
        dot.addEventListener("click", () => {
            showSlide(idx);
        });
    });
}

/* ==========================================
   8. Background Music Controller
   ========================================== */
function initBackgroundMusic() {
    const audio = document.getElementById("bg-music");
    const toggleBtn = document.getElementById("music-toggle");
    
    if (!audio || !toggleBtn) return;
    
    let isMutedByUser = false;
    let isPlaying = false;
    
    // Function to update icon state
    function updateIconState() {
        const icon = toggleBtn.querySelector("i");
        if (isPlaying) {
            icon.className = "fas fa-volume-high";
            toggleBtn.classList.add("playing");
            toggleBtn.setAttribute("aria-label", "Mute background music");
        } else {
            icon.className = "fas fa-volume-xmark";
            toggleBtn.classList.remove("playing");
            toggleBtn.setAttribute("aria-label", "Play background music");
        }
    }
    
    // Attempt play function
    function playAudio() {
        audio.play().then(() => {
            isPlaying = true;
            updateIconState();
        }).catch(err => {
            console.log("Autoplay blocked by browser. Awaiting user interaction.", err);
        });
    }
    
    // Try to autoplay on user gestures (safely bypasses browser block)
    const gestureEvents = ["click", "touchstart", "scroll"];
    function playOnGesture() {
        if (!isMutedByUser && !isPlaying) {
            playAudio();
        }
        gestureEvents.forEach(event => {
            document.removeEventListener(event, playOnGesture);
        });
    }
    gestureEvents.forEach(event => {
        document.addEventListener(event, playOnGesture);
    });
    
    // Button toggle logic
    toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Avoid triggering gesture logic again
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            isMutedByUser = true;
        } else {
            isMutedByUser = false;
            playAudio();
        }
        updateIconState();
    });
    
    // Tab visibility handling (pause on tab switch/minimize, resume on return)
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            if (isPlaying) {
                audio.pause();
            }
        } else {
            // Resume only if it was playing and not explicitly muted by user
            if (!isMutedByUser) {
                playAudio();
            }
        }
    });
}
