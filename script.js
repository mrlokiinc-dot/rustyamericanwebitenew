// Server IP for copying
const SERVER_IP = "connect.rustyamerican.com";

// Wipe schedule: Thursday 2PM EST
const WIPE_DAY = 4; // Thursday (0 = Sunday, 4 = Thursday)
const WIPE_HOUR = 14; // 2PM in 24-hour format
const WIPE_TIMEZONE_OFFSET = -5; // EST is UTC-5

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

// Calculate next wipe time
function getNextWipeTime() {
    const now = new Date();

    // Convert to EST
    const estOffset = WIPE_TIMEZONE_OFFSET * 60;
    const localOffset = now.getTimezoneOffset();
    const offsetDiff = localOffset + (estOffset * -1);
    const estTime = new Date(now.getTime() + offsetDiff * 60000);

    // Find next wipe day
    const currentDay = estTime.getDay();
    const currentHour = estTime.getHours();

    let daysUntilWipe = WIPE_DAY - currentDay;

    // If today is wipe day but time has passed, or wipe day has passed this week
    if (daysUntilWipe < 0 || (daysUntilWipe === 0 && currentHour >= WIPE_HOUR)) {
        daysUntilWipe += 7;
    }

    const nextWipe = new Date(estTime);
    nextWipe.setDate(estTime.getDate() + daysUntilWipe);
    nextWipe.setHours(WIPE_HOUR, 0, 0, 0);

    // Convert back to local time
    return new Date(nextWipe.getTime() - offsetDiff * 60000);
}

// Update countdown timer
function updateCountdown() {
    const now = new Date();
    const nextWipe = getNextWipeTime();
    const difference = nextWipe - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    } else {
        // Wipe is happening now!
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
    }
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
    // Start countdown timer
    updateCountdown();
    setInterval(updateCountdown, 1000); // Update every second

    // Animate player count
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
