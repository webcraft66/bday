// All interactions for cute birthday website

// Elements
const balloons = document.querySelectorAll('.balloon');
const envelope = document.getElementById('envelope');
const letterContent = document.getElementById('letter-content');
const typewriterText = document.getElementById('typewriter-text');
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
const ageNumber = document.getElementById('age-number');
const confettiContainer = document.getElementById('confetti-container');

// Music setup - use existing file
bgMusic.src = '../valentine-site/BIRTHDAY WISHES .mp3';
let musicPlaying = false;


    balloon.addEventListener('click', () => {
        balloon.classList.add('popped');
        
        // Show pop message
        showMessage(`Surprise #${index + 1}! Happy Birthday my love 💖`, 'pop');
        
        // Confetti burst
        createConfetti(20, balloon.getBoundingClientRect().center);
    });
});


    envelope.classList.toggle('open');
    
    if (envelope.classList.contains('open')) {
        typeWriterEffect(`
            My Dearest Love 💕,
            
            Happy Birthday to the most amazing girlfriend in the world! 
            You light up my life every single day with your smile and love. 
            Here's to many more beautiful memories together! 
            
            Forever yours,
            [Your BF] 💖
        `, typewriterText);
        
        createConfetti(50);
        bgMusic.play().catch(e => console.log('Autoplay prevented'));
    }
});

// Typewriter effect
function typeWriterEffect(text, element) {
    element.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i > text.length) {
            clearInterval(timer);
        }
    }, 100);
}

// Show popup message
function showMessage(message, type = 'pop') {
    const modal = document.createElement('div');
    modal.className = `message-modal ${type}`;
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-heart">💖</div>
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()">✨ OK ✨</button>
        </div>
    `;
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255,255,255,0.95);
        padding: 2rem;
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        z-index: 200;
        text-align: center;
        max-width: 300px;
        backdrop-filter: blur(10px);
    `;
    document.body.appendChild(modal);
    
    // Auto remove after 3s
    setTimeout(() => modal.remove(), 3000);
}

// Confetti function
function createConfetti(count, center = {x: window.innerWidth/2, y: window.innerHeight/2}) {
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = center.x + 'px';
        confetti.style.background = ['#ff6b9d', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'][Math.floor(Math.random()*5)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

// Music toggle
musicToggle.addEventListener('click', () => {
    if (musicPlaying) {
        bgMusic.pause();
        musicToggle.classList.add('paused');
    } else {
        bgMusic.play().catch(e => console.log('Play prevented'));
        musicToggle.classList.remove('paused');
    }
    musicPlaying = !musicPlaying;
});

// Age reveal animation
setTimeout(() => {
    ageNumber.style.animation = 'none';
    ageNumber.innerHTML = Array(3).fill('🎉').join('') + '<br>Happy Birthday!';
}, 3000);

// Continuous confetti on birthday wishes click
document.querySelectorAll('.wish-card').forEach(card => {
    card.addEventListener('click', () => {
        createConfetti(15);
        showMessage('Beautiful wish! 🥰', 'wish');
    });
});

// Gallery hover sounds/effects (visual only)
document.querySelectorAll('.polaroid').forEach(polaroid => {
    polaroid.addEventListener('click', () => {
        polaroid.style.animation = 'bounce 0.6s';
        setTimeout(() => polaroid.style.animation = '', 600);
        createConfetti(10);
    });
});

// Responsive resize handler
window.addEventListener('resize', () => {
    // Regenerate floating elements if needed
});

// Initial confetti burst
window.addEventListener('load', () => {
    setTimeout(() => createConfetti(30), 500);
    
    // Animate age in
    ageNumber.style.animation = 'pulse 2s infinite';
});

// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);
