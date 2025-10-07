document.addEventListener('DOMContentLoaded', function() {
            
    // --- DATA ---
    const skillsData = [
        { name: 'HTML & CSS', percentage: 95 },
        { name: 'JavaScript', percentage: 90 },
        { name: 'React & Vue', percentage: 85 },
        { name: 'UI/UX Design', percentage: 92 },
        { name: 'Node.js', percentage: 70 },
    ];
    
    const skillsGridData = [
        { name: 'HTML5', icon: 'file-code-2' },
        { name: 'CSS3', icon: 'palette' },
        { name: 'JavaScript', icon: 'braces' },
        { name: 'React', icon: 'atom' },
        { name: 'Node.js', icon: 'server' },
        { name: 'Figma', icon: 'figma' },
        { name: 'Tailwind CSS', icon: 'wind' },
        { name: 'Git', icon: 'git-branch-plus' },
    ];

    const portfolioData = [
        { 
            id: 1, 
            title: 'Corporate Web Presence',
            category: 'web', 
            img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop', 
            tags: ['React', 'Node.js', 'Vercel'], 
            desc: 'A sleek and professional website for a corporate client, featuring dynamic content and a modern design.'
        },
        { 
            id: 2, 
            title: 'Digital Branding Identity',
            category: 'design', 
            img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop', 
            tags: ['Figma', 'Illustrator'], 
            desc: 'Complete branding guidelines for a tech startup, including logo, color palette, and typography.'
        },
        { 
            id: 3, 
            title: 'Mobile Task Manager',
            category: 'mobile', 
            img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop', 
            tags: ['React Native', 'Firebase'], 
            desc: 'A cross-platform mobile app to help users organize their tasks and boost productivity.'
        },
        { 
            id: 4, 
            title: 'Animated Portfolio Website',
            category: 'web', 
            img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop', 
            tags: ['HTML', 'CSS', 'GSAP'], 
            desc: 'A personal portfolio website with stunning animations and a clean, responsive design.'
        },
    ];
    
    const testimonialsData = [
        { name: 'Michael Chen', role: 'CEO, TechCorp', quote: 'An absolutely outstanding professional! The attention to detail and creative approach resulted in a product that exceeded all our expectations.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop' },
        { name: 'David Rodriguez', role: 'Project Manager, Innovate Inc.', quote: 'Working with them was a seamless experience. Deadlines were always met, communication was clear, and the final quality was impeccable.', avatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop' },
        { name: 'Chris Evans', role: 'Lead Designer, Creative Minds', quote: 'A rare talent who bridges the gap between design and development flawlessly. Highly recommended for any ambitious project.', avatar: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1976&auto=format&fit=crop' },
    ];
    
    // --- DOM ELEMENTS ---
    const skillsContainer = document.getElementById('skills-container');
    const portfolioGrid = document.getElementById('portfolio-grid');

    // --- RENDER FUNCTIONS ---
    const renderSkills = () => {
        skillsContainer.innerHTML = '';
        skillsData.forEach(skill => {
            const skillHTML = `
                <div>
                    <div class="flex justify-between mb-1">
                        <span class="font-medium">${skill.name}</span>
                        <span class="font-medium">${skill.percentage}%</span>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div class="progress-bar-inner h-2.5 rounded-full" style="width: 0%" data-width="${skill.percentage}"></div>
                    </div>
                </div>
            `;
            skillsContainer.innerHTML += skillHTML;
        });
        document.querySelectorAll('.progress-bar-inner').forEach(bar => {
            gsap.to(bar, {
                width: bar.dataset.width + '%',
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: bar,
                    start: 'top 80%',
                }
            });
        });
    };

    const renderPortfolio = (filter = 'all') => {
        portfolioGrid.innerHTML = '';
        const filteredItems = filter === 'all' 
            ? portfolioData 
            : portfolioData.filter(item => item.category === filter);
        
        filteredItems.forEach((item, index) => {
            const itemHTML = `
                <div class="portfolio-item group relative overflow-hidden rounded-lg cursor-pointer shadow-lg" data-id="${item.id}" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4">
                        <h3 class="text-white text-xl font-bold text-center">${item.title}</h3>
                        <span class="text-gray-300 capitalize">${item.category}</span>
                    </div>
                </div>
            `;
            portfolioGrid.innerHTML += itemHTML;
        });
    };
    
    // --- PRELOADER ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // --- THEME TOGGLE ---
    const themeToggle = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-icon-light');
    const darkIcon = document.getElementById('theme-icon-dark');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        }
    };
    
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
    
    // --- AOS INITIALIZATION ---
    AOS.init({
        duration: 800,
        once: true,
    });

    // --- TYPED.JS ---
    new Typed('#typed-text', {
        strings: ['Creative Designer.', 'Full-Stack Developer.', 'Problem Solver.'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
    });

    // --- GSAP ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('.blob', {
        x: () => (Math.random() - 0.5) * (window.innerWidth / 2),
        y: () => (Math.random() - 0.5) * (window.innerHeight / 2),
        scale: () => 1 + Math.random() * 0.5,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    // --- SKILLS GRID ---
    const skillsGridContainer = document.getElementById('skills-grid-container');
    skillsGridContainer.innerHTML = ''; // Clear it first
    skillsGridData.forEach((skill, index) => {
        const skillCardHTML = `
            <div class="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay="${index * 50}">
                <i data-lucide="${skill.icon}" class="w-12 h-12 skill-icon"></i>
                <h3 class="mt-4 font-semibold">${skill.name}</h3>
            </div>
        `;
        skillsGridContainer.innerHTML += skillCardHTML;
    });

    // --- PORTFOLIO ---
    const filterBtns = document.querySelectorAll('#portfolio-filters .filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPortfolio(btn.dataset.filter);
        });
    });
    
    // --- PORTFOLIO MODAL ---
    const modal = document.getElementById('portfolio-modal');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalTags = document.getElementById('modal-tags');
    const modalDescription = document.getElementById('modal-description');

    portfolioGrid.addEventListener('click', e => {
        const item = e.target.closest('.portfolio-item');
        if (item) {
            const itemId = parseInt(item.dataset.id);
            const project = portfolioData.find(p => p.id === itemId);
            if (project) {
                modalImage.src = project.img;
                modalImage.alt = project.title;
                modalTitle.textContent = project.title;
                modalDescription.textContent = project.desc;
                modalTags.innerHTML = project.tags.map(tag => `<span class="bg-gray-200 dark:bg-gray-700 text-sm font-medium px-3 py-1 rounded-full">${tag}</span>`).join('');
                
                modal.classList.remove('opacity-0', 'pointer-events-none');
                modalContent.classList.remove('scale-95');
            }
        }
    });

    const closeModal = () => {
        modal.classList.add('opacity-0', 'pointer-events-none');
        modalContent.classList.add('scale-95');
    };

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- TESTIMONIALS SLIDER ---
    const swiperWrapper = document.querySelector('#testimonials .swiper-wrapper');
    testimonialsData.forEach(testimonial => {
        const slideHTML = `
            <div class="swiper-slide">
                <div class="glass-card p-8 rounded-2xl text-center max-w-2xl mx-auto">
                    <img src="${testimonial.avatar}" alt="${testimonial.name}" class="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white/50 object-cover">
                    <p class="italic mb-4">"${testimonial.quote}"</p>
                    <h4 class="font-bold">${testimonial.name}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">${testimonial.role}</p>
                </div>
            </div>
        `;
        swiperWrapper.innerHTML += slideHTML;
    });
    
    new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
            delay: 5000,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        effect: 'fade',
    });
    
    // --- CONTACT FORM VALIDATION ---
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        let isValid = true;

        document.querySelectorAll('#contact-form [required]').forEach(input => {
            const errorMsg = input.nextElementSibling;
            if (!input.value.trim() || (input.type === 'email' && !/^\S+@\S+\.\S+$/.test(input.value))) {
                isValid = false;
                input.classList.add('border-red-500');
                errorMsg.classList.remove('hidden');
            } else {
                input.classList.remove('border-red-500');
                errorMsg.classList.add('hidden');
            }
        });

        if (isValid) {
            document.getElementById('form-success').classList.remove('hidden');
            contactForm.reset();
            setTimeout(() => {
                document.getElementById('form-success').classList.add('hidden');
            }, 3000);
        }
    });

    // --- BACK TO TOP BUTTON ---
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- INITIALIZE EVERYTHING ---
    renderSkills();
    renderPortfolio();
    lucide.createIcons();
});

