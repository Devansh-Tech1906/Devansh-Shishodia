// =========================================
//  1. INITIALIZATION & UTILITIES
// =========================================

// Initialize AOS Animation Library
AOS.init({
    once: true,
    offset: 100,
});

// Dynamic Year in Footer
const yearSpan = document.getElementById('year');
if(yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// =========================================
//  2. TYPING EFFECT (UPDATED TEXT)
// =========================================
const text = ["Cybersecurity Student", "Python Learner", "CTF Player", "Java Student"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
    if (count === text.length) {
        count = 0;
    }
    currentText = text[count];
    letter = currentText.slice(0, ++index);

    const typingElement = document.querySelector(".typing-text");
    if(typingElement){
        typingElement.textContent = letter;
    }

    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000);
    } else {
        setTimeout(type, 100);
    }
})();

// =========================================
//  3. MOBILE NAVIGATION
// =========================================
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if(burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }
}
navSlide();

/* =========================================
   4. PROJECT MODAL LOGIC (With 'images/' path)
========================================= */

const projects = {
    'spam': {
        title: "AI Spam Detector",
        desc: "A robust Machine Learning web application designed to combat digital noise. Using a Naive Bayes classifier trained on a dataset of 5,000+ messages, this tool detects spam SMS and Emails with 98% accuracy. It features a Flask backend and a clean dashboard for visualization.",
        tech: ["Python", "Flask", "Scikit-Learn", "HTML/CSS"],
        liveLink: "https://spam-detection-7y3v.onrender.com/",
        gitLink: "https://github.com/Devansh-Tech1906",
        background: "images/p1.jpg"
    },
    'safety': {
        title: "Women's Safety App",
        desc: "A critical desktop application focused on personal security. This Java Swing application allows users to trigger SOS alerts instantly. It connects to a PostgreSQL database to manage emergency contacts and logs location data to ensure rapid response times in critical situations.",
        tech: ["Java Swing", "PostgreSQL", "JDBC", "Twilio API"],
        liveLink: "https://github.com/Devansh-Tech1906",
        gitLink: "https://github.com/Devansh-Tech1906",
        background: "images/p2.jpg"
    },
    'security': {
        title: "Privacy-First Security",
        desc: "A cybersecurity tool built for the modern web. Unlike typical checkers that send your password to a server, this tool hashes your password locally (SHA-1) and uses k-Anonymity to check against the 'HaveIBeenPwned' database. It calculates entropy bits to give you a mathematical strength score.",
        tech: ["JavaScript", "Web Crypto API", "REST API"],
        liveLink: "https://devansh-tech1906.github.io/password-auditor/",
        gitLink: "https://github.com/Devansh-Tech1906",
        background: "images/p3.jpg"
    }
};

// Elements
const modal = document.getElementById("projectModal");
const modalContent = document.getElementById("modal-card");
const title = document.getElementById("modal-title");
const tech = document.getElementById("modal-tech");
const desc = document.getElementById("modal-desc");
const liveBtn = document.getElementById("modal-live");
const gitBtn = document.getElementById("modal-github");

function openModal(id) {
    const data = projects[id];
    if(!data) return;

    title.textContent = data.title;
    desc.textContent = data.desc;
    liveBtn.href = data.liveLink;
    gitBtn.href = data.gitLink;

    // Set Background with 'images/' path
    if(modalContent) {
        modalContent.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.95)), url('${data.background}')`;
    }

    if(tech) {
        tech.innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');
    }

    if(modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeModal() {
    if(modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    }
}

/* =========================================
   5. CERTIFICATE IMAGE MODAL LOGIC
========================================= */

const certModal = document.getElementById("certModal");
const certModalImg = document.getElementById("cert-modal-img");
const certModalTitle = document.getElementById("cert-modal-title");

function openCertModal(title, imageSrc) {
    if(certModal) {
        certModalTitle.textContent = title;
        // imageSrc passed from HTML already contains 'images/'
        certModalImg.src = imageSrc;
        certModal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeCertModal() {
    if(certModal) {
        certModal.classList.remove("active");
        document.body.style.overflow = "auto";
    }
}

// Unified Window Click Logic (Closes ANY open modal)
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
    if (event.target == certModal) {
        closeCertModal();
    }
}