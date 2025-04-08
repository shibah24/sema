document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.querySelector('.main-nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('show');
        });
    }
    
    // Testimonial Carousel
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;
    
    // Function to update carousel display
    function updateCarousel(index) {
        // Remove active class from all testimonials and dots
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current testimonial and dot
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    // Initialize carousel controls
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex === 0) ? testimonialCards.length - 1 : currentIndex - 1;
            updateCarousel(currentIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
            updateCarousel(currentIndex);
        });
    }
    
    // Add click handlers to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateCarousel(currentIndex);
        });
    });
    
    // Auto-rotate carousel every 5 seconds
    setInterval(function() {
        if (document.querySelector('.testimonial-carousel:hover')) {
            return; // Pause autoplay on hover
        }
        currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
        updateCarousel(currentIndex);
    }, 5000);
    
    // Watch Intro video functionality
    const btnPlay = document.querySelector('.btn-play');
    
    if (btnPlay) {
        btnPlay.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create modal element
            const modal = document.createElement('div');
            modal.className = 'video-modal';
            
            // Add video iframe (placeholder URL - replace with your actual video)
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/your-video-id" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen></iframe>
                    </div>
                </div>
            `;
            
            // Add modal to body
            document.body.appendChild(modal);
            
            // Show modal with animation
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            // Close modal functionality
            modal.querySelector('.close-modal').addEventListener('click', function() {
                modal.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value) {
                // Create notification element
                const notification = document.createElement('div');
                notification.className = 'notification success';
                notification.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for subscribing to our newsletter!</p>
                `;
                
                // Add notification to page
                document.body.appendChild(notification);
                
                // Show notification
                setTimeout(() => {
                    notification.classList.add('show');
                }, 10);
                
                // Hide and remove notification after 3 seconds
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 3000);
                
                // Reset form
                emailInput.value = '';
            }
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-header, .category-card, .step-card, .testimonial-carousel, .cta-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add CSS for animations and modal
    const style = document.createElement('style');
    style.textContent = `
        .video-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .video-modal.show {
            opacity: 1;
        }
        
        .modal-content {
            position: relative;
            width: 80%;
            max-width: 800px;
            background: #fff;
            border-radius: 10px;
            overflow: hidden;
        }
        
        .close-modal {
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 24px;
            color: white;
            cursor: pointer;
            z-index: 10;
        }
        
        .video-container {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
        }
        
        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 20px;
            background: #fff;
            border-radius: 5px;
            box-shadow: 0 3px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .notification.success {
            border-left: 4px solid #4CAF50;
        }
        
        .notification i {
            font-size: 20px;
            color: #4CAF50;
        }
        
        /* Animation for scroll elements */
        .section-header, .category-card, .step-card, .testimonial-carousel, .cta-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .section-header.animate, .category-card.animate, .step-card.animate, .testimonial-carousel.animate, .cta-content.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Staggered animations for multiple elements */
        .category-card:nth-child(1) { transition-delay: 0.1s; }
        .category-card:nth-child(2) { transition-delay: 0.2s; }
        .category-card:nth-child(3) { transition-delay: 0.3s; }
        .category-card:nth-child(4) { transition-delay: 0.4s; }
        
        .step-card:nth-child(1) { transition-delay: 0.1s; }
        .step-card:nth-child(2) { transition-delay: 0.2s; }
        .step-card:nth-child(3) { transition-delay: 0.3s; }
        
        /* Mobile menu animation */
        .main-nav ul {
            transition: transform 0.4s ease;
        }
        
        @media (max-width: 768px) {
            .main-nav ul {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                padding: 20px;
                box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                transform: translateY(-10px);
                opacity: 0;
                pointer-events: none;
                transition: all 0.3s ease;
                display: flex;
                flex-direction: column;
                border-radius: 0 0 10px 10px;
            }
            
            .main-nav ul.show {
                transform: translateY(0);
                opacity: 1;
                pointer-events: all;
            }
            
            .mobile-menu-btn {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 20px;
                cursor: pointer;
            }
            
            .mobile-menu-btn span {
                width: 30px;
                height: 2px;
                background-color: #333;
                transition: all 0.3s ease;
            }
            
            .mobile-menu-btn.active span:nth-child(1) {
                transform: translateY(9px) rotate(45deg);
            }
            
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-btn.active span:nth-child(3) {
                transform: translateY(-9px) rotate(-45deg);
            }
        }
    `;
    
    document.head.appendChild(style);
});