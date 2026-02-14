// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('💕 Valentine Website Loaded!');

    // Get all elements
    const questionSection = document.getElementById('questionSection');
    const loveSection = document.getElementById('loveSection');
    const chocolateSection = document.getElementById('chocolateSection');
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    const btnGift = document.getElementById('btnGift');

    // Check if elements exist
    console.log('Elements found:', {
        questionSection: !!questionSection,
        loveSection: !!loveSection,
        chocolateSection: !!chocolateSection,
        btnYes: !!btnYes,
        btnNo: !!btnNo,
        btnGift: !!btnGift
    });

    let noClickCount = 0;

    // YES button functionality
    if (btnYes) {
        btnYes.addEventListener('click', function() {
            console.log('✅ YES button clicked!');

            // Hide question section
            if (questionSection) {
                questionSection.classList.add('hidden');
            }

            // Show love section
            if (loveSection) {
                loveSection.classList.remove('hidden');
                setTimeout(() => {
                    loveSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        });
    }

    // NO button functionality - runs away!
    if (btnNo) {
        btnNo.addEventListener('click', function(e) {
            e.preventDefault();
            noClickCount++;
            console.log('❌ NO button clicked! Count:', noClickCount);

            // Get window dimensions
            const maxX = window.innerWidth - btnNo.offsetWidth - 50;
            const maxY = window.innerHeight - btnNo.offsetHeight - 50;

            // Random position
            const randomX = Math.random() * Math.max(maxX, 100);
            const randomY = Math.random() * Math.max(maxY, 100);

            // Move button
            btnNo.style.position = 'fixed';
            btnNo.style.left = randomX + 'px';
            btnNo.style.top = randomY + 'px';
            btnNo.style.zIndex = '1000';

            // Change text
            const noTexts = ['No', 'Nope!', 'Never!', 'No way!', 'Try YES 💕', 'Still No?', 'Really?', 'Come on!'];
            btnNo.textContent = noTexts[noClickCount % noTexts.length];

            // Shrink after 3 clicks
            if (noClickCount > 3) {
                const scale = Math.max(0.6, 1 - (noClickCount * 0.05));
                btnNo.style.transform = `scale(${scale})`;
            }
        });

        // Make NO button run away on hover (after 3 clicks)
        btnNo.addEventListener('mouseenter', function() {
            if (noClickCount > 2) {
                console.log('🏃 NO button running away from mouse!');

                const maxX = window.innerWidth - btnNo.offsetWidth - 50;
                const maxY = window.innerHeight - btnNo.offsetHeight - 50;

                const randomX = Math.random() * Math.max(maxX, 100);
                const randomY = Math.random() * Math.max(maxY, 100);

                btnNo.style.position = 'fixed';
                btnNo.style.left = randomX + 'px';
                btnNo.style.top = randomY + 'px';
            }
        });
    }

    // GIFT button functionality
    if (btnGift) {
        btnGift.addEventListener('click', async function() {
            console.log('🎁 GIFT button clicked!');

            // Animation
            btnGift.style.transform = 'scale(0.9)';
            setTimeout(() => {
                btnGift.style.transform = 'scale(1)';
            }, 200);

            // Show chocolate section
            if (chocolateSection) {
                chocolateSection.classList.remove('hidden');
                setTimeout(() => {
                    chocolateSection.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }

            // Send email notification
            try {
                console.log('📧 Sending email notification...');

                const currentTime = new Date().toLocaleString('en-IN', { 
                    timeZone: 'Asia/Kolkata',
                    dateStyle: 'full',
                    timeStyle: 'long'
                });

                const response = await fetch('https://formspree.io/f/xlgwbgrn', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        email: 'manvisharma.1718@gmail.com',
                        subject: '💝 Mayank Clicked Your Valentine Gift!',
                        message: `🎉 AMAZING NEWS! 🎉

Mayank just clicked on the big Valentine gift icon! 🎁💕

He opened your special chocolate surprise!

Time: ${currentTime}

Love is in the air! 💖✨

Your Valentine website is working perfectly! 🌟`
                    })
                });

                if (response.ok) {
                    console.log('✅ Email notification sent successfully!');
                    alert('🎉 Surprise revealed! Check your email notification! 💕');
                } else {
                    console.log('⚠️ Email response status:', response.status);
                }
            } catch (error) {
                console.error('❌ Error sending email:', error);
            }
        });
    }

    console.log('✨ All event listeners attached successfully!');
});