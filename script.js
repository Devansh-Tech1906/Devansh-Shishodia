/* =========================================
   1. DYNAMIC NAVBAR (Scroll Effect)
========================================= */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(255, 215, 0, 0.2)';
    } else {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

/* =========================================
   2. MOBILE MENU (Burger Icon)
========================================= */
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

if (burger) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
}

/* =========================================
   3. TYPING EFFECT (Hero Section)
========================================= */
const typingText = document.querySelector('.typing-text');
const words = ["Cybersecurity Student", "Developer", "CTF Player", "Python Learner"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!typingText) return;
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at the end of the word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before typing the next word
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    if (typingText) setTimeout(type, 1000);
});

/* =========================================
   4. DYNAMIC FOOTER YEAR
========================================= */
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

/* =========================================
   5. PROJECT MODAL LOGIC
========================================= */
const projectModal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalTech = document.getElementById('modal-tech');
const modalLive = document.getElementById('modal-live');
const modalGithub = document.getElementById('modal-github');

// Database for your projects
const projectData = {
    'spam': {
        title: 'AI Spam Detector',
        desc: 'Developed a machine learning model to classify text messages as spam or legitimate ("ham"). Built the classifier from the ground up to understand the full workflow, including data preprocessing, feature extraction, model training, and evaluation.',
        tech: ['Python', 'Flask', 'Scikit-Learn'],
        live: '#',
        github: 'https://github.com/Devansh-Tech1906'
    },
    'safety': {
        title: "Women's Safety App",
        desc: "Created a Java desktop app with a simple interface to help improve women's safety. It uses JDBC to connect to a PostgreSQL database, allowing the app to safely store and manage user details and emergency contacts.",
        tech: ['Java Swing', 'PostgreSQL', 'JDBC'],
        live: '#',
        github: 'https://github.com/Devansh-Tech1906'
    },
    'security': {
        title: 'Privacy-First Security',
        desc: 'A web-based security protocol implementation using modern JavaScript and Web Crypto APIs to ensure data integrity and user privacy.',
        tech: ['JavaScript', 'Web Crypto API'],
        live: '#',
        github: 'https://github.com/Devansh-Tech1906'
    }
};

function openModal(projectId) {
    if (!projectModal) return;
    const data = projectData[projectId];
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    
    // Clear old tech stack and add new ones
    modalTech.innerHTML = '';
    data.tech.forEach(tech => {
        const span = document.createElement('span');
        span.textContent = tech;
        modalTech.appendChild(span);
    });

    modalLive.href = data.live;
    modalGithub.href = data.github;
    
    projectModal.classList.add('active');
}

function closeModal() {
    if (projectModal) projectModal.classList.remove('active');
}

/* =========================================
   6. CERTIFICATE MODAL LOGIC
========================================= */
const certModal = document.getElementById('certModal');
const certModalTitle = document.getElementById('cert-modal-title');
const certModalImg = document.getElementById('cert-modal-img');

function openCertModal(title, imgSrc) {
    if (!certModal) return;
    certModalTitle.textContent = title;
    certModalImg.src = imgSrc;
    certModal.classList.add('active');
}

function closeCertModal() {
    if (certModal) certModal.classList.remove('active');
}

// Close modals when clicking outside the box
window.onclick = function(event) {
    if (event.target == projectModal) {
        closeModal();
    }
    if (event.target == certModal) {
        closeCertModal();
    }
}

/* =========================================
   7. INITIALIZE AOS ANIMATIONS
========================================= */
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: false,
        offset: 100
    });
}

/* =========================================
   8. DISCORD VISITOR TRACKER (WITH LOCATION)
========================================= */
// Devansh's Private Discord Webhook
const webhookURL = "https://discord.com/api/webhooks/1471840559147651133/NICu3ra5DdsAM4s3FiwccMZb9_cp0LEUZVJ5DHbCBx4uaBTK3i9C9MxRzXkHcvDpMAmf";

const trackVisitor = async () => {
    // Stop if the webhook URL isn't set up yet
    if (!webhookURL || webhookURL === "YOUR_DISCORD_WEBHOOK_URL_HERE") return; 
    
    // Prevents spamming your Discord if the user just refreshes the page
    if (sessionStorage.getItem('visited_portfolio')) return;
    sessionStorage.setItem('visited_portfolio', 'true');

    try {
        // Fetch the visitor's location data using a free API
        const locResponse = await fetch('https://ipapi.co/json/');
        const locData = await locResponse.json();

        // Gather system information
        const userAgent = navigator.userAgent;
        const platform = navigator.platform || "Unknown OS";
        const time = new Date().toLocaleString();
        
        // Build the sleek Discord Embed Message
        const message = {
            username: "Portfolio Watcher",
            avatar_url: "https://cdn-icons-png.flaticon.com/512/1183/1183672.png", // Cool server icon
            embeds: [{
                title: "🚨 New Portfolio Visitor!",
                description: "Someone just opened your website!",
                color: 16766720, // Gold color to match your theme
                fields: [
                    { name: "📍 Location", value: `${locData.city || 'Unknown'}, ${locData.country_name || 'Unknown'}`, inline: true },
                    { name: "🌐 Network", value: `${locData.org || 'Unknown ISP'}`, inline: true },
                    { name: "💻 System", value: platform, inline: true },
                    { name: "⏰ Time", value: time, inline: false },
                    { name: "🔍 Browser Info", value: `\`\`\`${userAgent}\`\`\``, inline: false }
                ],
                footer: { text: "Devansh's Live Tracker" }
            }]
        };

        // Send the data silently to Discord
        await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message)
        });

    } catch (error) {
        console.error("Tracker bypassed or blocked by adblocker.");
    }
};

// Execute the tracker
trackVisitor();
