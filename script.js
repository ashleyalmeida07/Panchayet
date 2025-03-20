// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    
    themeToggleBtn.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Save theme preference to localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 2px 10px var(--shadow-color)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Chatbot functionality
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendChat = document.getElementById('send-chat');
    const chatMessages = document.querySelector('.chatbot-messages');
    
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.style.display = 'flex';
        chatbotToggle.style.display = 'none';
    });
    
    closeChat.addEventListener('click', function() {
        chatbotContainer.style.display = 'none';
        chatbotToggle.style.display = 'flex';
    });
    
    function sendMessage() {
        const message = chatInput.value.trim();
        
        if (message !== '') {
            // Add user message
            const userMessageDiv = document.createElement('div');
            userMessageDiv.classList.add('message', 'user');
            userMessageDiv.innerHTML = `<p>${message}</p>`;
            chatMessages.appendChild(userMessageDiv);
            
            // Clear input
            chatInput.value = '';
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate bot response after a short delay
            setTimeout(function() {
                const botResponse = getBotResponse(message);
                const botMessageDiv = document.createElement('div');
                botMessageDiv.classList.add('message', 'bot');
                botMessageDiv.innerHTML = `<p>${botResponse}</p>`;
                chatMessages.appendChild(botMessageDiv);
                
                // Scroll to bottom again
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }
    
    sendChat.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Simple bot responses based on keywords
    function getBotResponse(message) {
        message = message.toLowerCase();
        
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return 'Hello! How can I help you with information about Jalgaon Panchayat Samiti?';
        } else if (message.includes('contact') || message.includes('address') || message.includes('phone')) {
            return 'You can contact Jalgaon Panchayat Samiti at +91 257 2260123 or visit our office at Block Development Complex, Jalgaon.';
        } else if (message.includes('service') || message.includes('certificate')) {
            return 'We offer various services including land record verification, birth & death certificates, RTI processing, and scheme enrollments. Please visit the Services section for more details.';
        } else if (message.includes('scheme') || message.includes('program')) {
            return 'We implement various government schemes like PMAY, MGNREGA, and agricultural assistance programs. Visit our office for enrollment details.';
        } else if (message.includes('history')) {
            return 'Jalgaon Panchayat Samiti was established in 1962 as part of the three-tier Panchayati Raj system in Maharashtra. Check our History section for a detailed timeline.';
        } else if (message.includes('thank')) {
            return 'You\'re welcome! Feel free to ask if you need any other information.';
        } else {
            return 'I\'m sorry, I don\'t have specific information about that. Please visit our office or contact us at +91 257 2260123 for more details.';
        }
    }
    
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                // In a real application, you would send this data to a server
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // Add animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkScroll() {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.8) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for timeline items
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Check on load and scroll
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
});