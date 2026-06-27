document.addEventListener('DOMContentLoaded', () => {
    const heartView = document.getElementById('heart-view');
    const loveView = document.getElementById('love-view');
    const heartFill = document.querySelector('.heart-fill');
    const heartContainer = document.querySelector('.heart-container');
    const particleContainer = document.getElementById('particle-container');
    const fallingCarnations = document.querySelector('.falling-carnations');
    const loveNoteBox = document.querySelector('.love-note-box');

    // Load progress from localStorage
    let progress = parseFloat(localStorage.getItem('heartProgress')) || 0;
    const clicksNeeded = 5; // Number of clicks to fill heart
    const progressPerClick = 1 / clicksNeeded;

    // Update UI based on progress
    function updateHeartFill() {
        heartFill.className = `heart-fill progress-${Math.min(Math.ceil(progress * clicksNeeded), clicksNeeded)}`;
        if (progress >= 1) {
            showLoveView();
        }
    }

    // Show love view when heart is full
    function showLoveView() {
        heartView.classList.remove('active');
        loveView.classList.add('active');
        // Prevent further clicks on heart
        heartContainer.style.pointerEvents = 'none';
    }

    // Create particle effect at click position
    function createParticles(x, y) {
        const particleCount = 5 + Math.floor(Math.random() * 4); // 5-8 particles

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'carnation';

            // Size variation
            const size = 8 + Math.random() * 8; // 8-16px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Position at click point
            particle.style.left = `${x - size/2}px`;
            particle.style.top = `${y - size/2}px`;

            // Random opacity
            particle.style.opacity = 0.6 + Math.random() * 0.4;

            // Animation properties
            const duration = 3 + Math.random() * 5; // 3-8 seconds
            const delay = Math.random() * 2; // 0-2s delay
            const drift = (Math.random() - 0.5) * 100; // -50 to 50px drift

            particle.style.animation = `fall ${duration}s linear ${delay}s`;
            particle.style.setProperty('--drift', `${drift}px`);

            particleContainer.appendChild(particle);

            // Remove particle after animation ends
            particle.addEventListener('animationend', () => {
                particle.remove();
            });
        }
    }

    // Handle heart click/tap
    function handleHeartClick(e) {
        // Get coordinates
        let clientX, clientY;
        if (e.type === 'touchstart') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        // Create particle effect
        createParticles(clientX, clientY);

        // Update progress
        progress = Math.min(progress + progressPerClick, 1);
        localStorage.setItem('heartProgress', progress);
        updateHeartFill();

        // Prevent default for touch events
        e.preventDefault();
    }

    // Add event listeners
    heartContainer.addEventListener('click', handleHeartClick);
    heartContainer.addEventListener('touchstart', handleHeartClick, { passive: false });

    // Continuous falling carnations in love view
    function createFloatingCarnation() {
        const carnation = document.createElement('div');
        carnation.className = 'carnation';

        const size = 8 + Math.random() * 12; // 8-20px
        carnation.style.width = `${size}px`;
        carnation.style.height = `${size}px`;

        // Start position (random x, above viewport)
        carnation.style.left = `${Math.random() * 100}vw`;
        carnation.style.top = `-${size}px`;

        // Animation properties
        const duration = 5 + Math.random() * 10; // 5-15 seconds
        const delay = Math.random() * 5; // 0-5s delay
        const drift = (Math.random() - 0.5) * 200; // -100 to 100px

        carnation.style.animation = `fall ${duration}s linear ${delay}s`;
        carnation.style.setProperty('--drift', `${drift}px`);
        carnation.style.opacity = 0.6 + Math.random() * 0.4;

        fallingCarnations.appendChild(carnation);

        // Remove after animation
        carnation.addEventListener('animationend', () => {
            carnation.remove();
        });
    }

    // Generate carnations periodically
    setInterval(createFloatingCarnation, 300); // Create new carnation every 300ms

    // Limit love note to 150 characters
    loveNoteBox.addEventListener('input', (e) => {
        if (loveNoteBox.textContent.length > 150) {
            // Remove excess characters
            const selectionStart = loveNoteBox.selectionStart;
            loveNoteBox.textContent = loveNoteBox.textContent.slice(0, 150);
            // Restore cursor position
            loveNoteBox.setSelectionRange(Math.min(selectionStart, 150), Math.min(selectionStart, 150));
        }
    });

    // Initialize
    updateHeartFill();

    // If already complete, show love view immediately
    if (progress >= 1) {
        showLoveView();
    }
});