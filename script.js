// Project Data - Cloud & IT Focused
const projects = [
  {
    id: 1,
    title: "Highly Available Web Application on AWS",
    description: "Multi-AZ deployment using EC2, ALB, Auto Scaling, and RDS.",
    icon: "fa-network-wired",
    tags: ["AWS", "EC2", "ALB", "Auto Scaling", "RDS"],
    github: "#",
    demo: "#",
    details: "Designed and deployed a highly available web application architecture on AWS with load balancing, auto scaling, and secure database placement in private subnets."
  },
  {
    id: 2,
    title: "AWS EC2 Management Using CLI",
    description: "Provisioned and managed EC2 instances using AWS CLI.",
    icon: "fa-terminal",
    tags: ["AWS CLI", "EC2", "IAM", "Linux"],
    github: "#",
    demo: "#",
    details: "Managed EC2 lifecycle using AWS CLI including key pairs, security groups, SSH access, and resource cleanup."
  },
  {
    id: 3,
    title: "Website Deployment with Database on AWS Linux",
    description: "Hosted PHP-based web application with Nginx and MySQL.",
    icon: "fa-server",
    tags: ["AWS", "Linux", "Nginx", "MySQL", "SSL"],
    github: "#",
    demo: "#",
    details: "Deployed a database-driven web application on AWS EC2 using Linux, Nginx, MySQL, SSL, and custom domain configuration."
  },
  {
    id: 4,
    title: "Static Website Hosting on AWS S3",
    description: "Serverless static website using Amazon S3.",
    icon: "fa-cloud",
    tags: ["AWS S3", "Static Hosting"],
    github: "#",
    demo: "#",
    details: "Hosted a static website using AWS S3 with public access configuration and static website hosting enabled."
  },
  {
    id: 5,
    title: "Windows Server Active Directory Setup",
    description: "Configured domain controller and user management.",
    icon: "fa-windows",
    tags: ["Windows Server", "Active Directory"],
    github: "#",
    demo: "#",
    details: "Installed and configured Windows Server with Active Directory Domain Services, including user and group management."
  }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    initTheme();
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
});

// Load Projects
function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = projects.map(project => `
        <div class="project-card" onclick="openProject(${project.id})">
            <div class="project-image">
                <i class="fas ${project.icon}"></i>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Project Modal
function openProject(id) {
    const project = projects.find(p => p.id === id);
    const modal = document.getElementById('projectModal');
    const body = document.getElementById('modalBody');
    
    body.innerHTML = `
        <div class="project-image" style="margin: -2rem -2rem 2rem -2rem; border-radius: 20px 20px 0 0;">
            <i class="fas ${project.icon}"></i>
        </div>
        <h2>${project.title}</h2>
        <p style="color: var(--text-muted); margin: 1rem 0; line-height: 1.8;">${project.details}</p>
        <div class="project-tags" style="margin: 1.5rem 0;">
            ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
            <a href="${project.demo}" class="btn btn-primary" target="_blank">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
            <a href="${project.github}" class="btn btn-secondary" target="_blank">
                <i class="fab fa-github"></i> View Code
            </a>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// PDF Viewer
function openPdf(filename) {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    viewer.src = `pdfs/${filename}`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePdfModal() {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    modal.classList.remove('active');
    viewer.src = '';
    document.body.style.overflow = '';
}

// Theme Toggle
function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const icon = toggle.querySelector('i');
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// Navigation
function initNavigation() {
    const nav = document.querySelector('.navbar');
    const toggle = document.getElementById('navToggle');
    const menu = document.querySelector('.nav-menu');
    const links = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Update active link
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Mobile toggle
    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    });
}

// Typing Effect - Cloud & IT Focused
function initTypingEffect() {
    const text = document.querySelector('.typing-text');
    const phrases = [
        'Cloud & IT Support Intern',
        'AWS & Azure Learner',
        'Linux & Windows Server',
        'Cloud Operations & Hosting'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const current = phrases[phraseIndex];
        
        if (isDeleting) {
            text.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            text.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements
    document.querySelectorAll('.project-card, .skill-category, .pdf-card, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Contact Form
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = e.target.querySelector('button');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    
    // Simulate sending (replace with actual form handling)
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = '#10b981';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.background = '';
            e.target.reset();
        }, 3000);
    }, 1500);
});

// Close modals on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal();
        closePdfModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closePdfModal();
    }
});