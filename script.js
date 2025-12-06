// Server IP for copying
const SERVER_IP = "connect.rustyamerican.com";

// Copy IP to clipboard
function copyIP() {
    navigator.clipboard.writeText(SERVER_IP).then(() => {
        const button = document.getElementById('serverIP');
        const originalText = button.textContent;
        button.textContent = 'IP Copied!';

        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy IP:', err);
        alert('Server IP: ' + SERVER_IP);
    });
}

// Animate player count (simulated - replace with actual API call)
function animatePlayerCount() {
    const playerCountElement = document.getElementById('playerCount');
    let count = 0;
    const target = Math.floor(Math.random() * 150) + 50; // Random number between 50-200

    const interval = setInterval(() => {
        if (count < target) {
            count += Math.ceil((target - count) / 10);
            playerCountElement.textContent = count;
        } else {
            playerCountElement.textContent = target;
            clearInterval(interval);
        }
    }, 50);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Initialize on page load
window.addEventListener('load', () => {
    animatePlayerCount();

    // Update player count every 30 seconds (replace with actual API polling)
    setInterval(animatePlayerCount, 30000);
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});
