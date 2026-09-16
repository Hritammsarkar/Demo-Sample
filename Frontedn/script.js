/**
 * DEVELOPER PORTFOLIO - INTERACTIVE LOGIC
 * Vanilla JavaScript ES6+
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Header Scroll Effect & Mobile Navigation
    // ----------------------------------------------------------------------
    const header = document.getElementById('header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileClose = document.getElementById('mobile-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('back-to-top');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Mobile Menu Toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
        });
    }

    if (mobileClose && navMenu) {
        mobileClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    }

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    // Back to top click handler
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ----------------------------------------------------------------------
    // 2. Scroll Active Section Highlight
    // ----------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');

    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active');
                } else {
                    correspondingLink.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', scrollActive);

    // ----------------------------------------------------------------------
    // 3. Stats Counter Animation
    // ----------------------------------------------------------------------
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;

    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            const duration = 2000; // 2 seconds
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.ceil(current);
                }
            }, stepTime);
        });
    };

    // Trigger stats animation when hero stats bar is visible
    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimatedStats) {
                    animateStats();
                    hasAnimatedStats = true;
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsBar);
    }

    // ----------------------------------------------------------------------
    // 4. About Section Tab Switcher
    // ----------------------------------------------------------------------
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const activePane = document.getElementById(targetTab);
            if (activePane) {
                activePane.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------------------------
    // 5. Skills Matrix Filtering
    // ----------------------------------------------------------------------
    const skillFilterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    skillFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            skillFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 6. Projects Filtering
    // ----------------------------------------------------------------------
    const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-project-filter');

            projectFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-project-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 7. Interactive Project Modal Data & Handler
    // ----------------------------------------------------------------------
    const projectData = {
        '1': {
            title: 'QuantumFlow - Real-time SaaS Analytics',
            category: 'Featured SaaS & Analytics',
            image: 'assets/project1.jpg',
            description: 'QuantumFlow is a high-performance telemetry dashboard engineered for enterprise SaaS platforms. It ingests thousands of streaming API events per second, rendering live telemetry graphs, cohort funnels, and revenue metrics.',
            techStack: ['TypeScript', 'React 18', 'Node.js', 'Recharts', 'WebSockets', 'TailwindCSS'],
            features: [
                'Real-time WebSocket metrics streaming under 50ms latency',
                'Custom interactive data visualizations with canvas acceleration',
                'Granular user segmentation and conversion funnel reporting',
                'Dark mode glassmorphism UI layout'
            ],
            liveUrl: 'https://example.com',
            githubUrl: 'https://github.com'
        },
        '2': {
            title: 'AURA - Luxury E-Commerce Platform',
            category: 'Full-Stack E-Commerce',
            image: 'assets/project2.jpg',
            description: 'AURA delivers a luxury online shopping experience with ultra-fast page transitions, 3D interactive product previews, dynamic inventory management, and automated Stripe webhooks.',
            techStack: ['Next.js 14', 'TypeScript', 'Stripe API', 'PostgreSQL', 'Prisma ORM'],
            features: [
                'Instant search & client-side faceted filter architecture',
                'Sub-second server-rendered catalog pages',
                'Secure guest & user checkout via Stripe Payment Element',
                'Full admin dashboard for order processing'
            ],
            liveUrl: 'https://example.com',
            githubUrl: 'https://github.com'
        },
        '3': {
            title: 'Synapse AI - Visual Node Workflow Studio',
            category: 'AI & Generative Tools',
            image: 'assets/project3.jpg',
            description: 'Synapse AI is a visual node-based editor designed for AI creators and engineers to build complex generative AI pipelines, combine text-to-image models, and run automated post-processing.',
            techStack: ['Python', 'FastAPI', 'JavaScript (Canvas API)', 'WebSockets', 'Docker'],
            features: [
                'Drag-and-drop node graph canvas interface',
                'Asynchronous worker queues for model inferencing',
                'Preset prompt chaining and upscale parameter sliders',
                'Exportable JSON workflow schema files'
            ],
            liveUrl: 'https://example.com',
            githubUrl: 'https://github.com'
        }
    };

    const modal = document.getElementById('project-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');
    const quickViewBtns = document.querySelectorAll('.btn-quick-view');

    const openModal = (projectId) => {
        const data = projectData[projectId];
        if (!data || !modalBody) return;

        modalBody.innerHTML = `
            <img src="${data.image}" alt="${data.title}" class="modal-project-img">
            <span class="project-badge" style="position: static; display: inline-block; margin-bottom: 0.75rem;">${data.category}</span>
            <h2 class="modal-project-title">${data.title}</h2>
            <p class="modal-project-desc">${data.description}</p>
            
            <h4 style="font-family: var(--font-heading); margin-bottom: 0.5rem;">Key Engineering Highlights:</h4>
            <ul style="list-style: disc; padding-left: 1.25rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
                ${data.features.map(f => `<li style="margin-bottom: 0.35rem;">${f}</li>`).join('')}
            </ul>

            <h4 style="font-family: var(--font-heading); margin-bottom: 0.5rem;">Tech Stack:</h4>
            <div class="project-tags" style="margin-bottom: 2rem;">
                ${data.techStack.map(t => `<span class="tag" style="background: rgba(139, 92, 246, 0.15); color: var(--accent-purple); border-color: rgba(139, 92, 246, 0.3);">${t}</span>`).join('')}
            </div>

            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <a href="${data.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary">
                    <span>Visit Live Site</span>
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
                <a href="${data.githubUrl}" target="_blank" rel="noopener" class="btn btn-outline">
                    <i class="fa-brands fa-github"></i>
                    <span>Source Code</span>
                </a>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            openModal(projectId);
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // ----------------------------------------------------------------------
    // 8. Contact Form Handling & Toast Notification
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    const showToast = (message) => {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    };

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submit-btn');
            const originalBtnContent = submitBtn.innerHTML;

            // Loading State
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

            // Simulate API request delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                contactForm.reset();
                showToast('Thank you! Your message has been sent successfully.');
            }, 1500);
        });
    }

    // ----------------------------------------------------------------------
    // 9. Resume Download Simulation
    // ----------------------------------------------------------------------
    const downloadCvBtn = document.getElementById('download-cv-btn');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', () => {
            showToast('Downloading Alex_Rivers_Resume.pdf...');
        });
    }
});
