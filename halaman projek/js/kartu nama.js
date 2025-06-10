document.addEventListener('DOMContentLoaded', function() {
            // Trigger animations when page loads
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                setTimeout(() => {
                    bar.style.transform = 'scaleX(1)';
                }, 500);
            });
            
            // Flip card on click
            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('click', function(e) {
                    if (e.target.closest('.btn-website')) return;
                    card.classList.toggle('is-flipped');
                });
            });
            // Website button click handler
            document.querySelectorAll('.btn-website').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    alert('Redirecting to website...');
                    // window.location.href = 'https://yourwebsite.com';
                });
            });
        });