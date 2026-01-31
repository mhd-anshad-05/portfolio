// Real Cloud Infrastructure Projects
const projects = [
  {
    id: 1,
    title: "Highly Available Web Application on AWS",
    description: "Multi-AZ deployment using EC2, ALB, Auto Scaling, and RDS.",
    icon: "fa-network-wired",
    tags: ["AWS", "EC2", "ALB", "Auto Scaling", "RDS"],
    details: "Designed and deployed a highly available web application architecture on AWS with load balancing, auto scaling, and secure database placement in private subnets. Implemented health checks, multi-AZ redundancy, and automated failover mechanisms."
  },
  {
    id: 2,
    title: "AWS EC2 Management Using CLI",
    description: "Provisioned and managed EC2 instances using AWS CLI.",
    icon: "fa-terminal",
    tags: ["AWS CLI", "EC2", "IAM", "Linux"],
    details: "Managed complete EC2 lifecycle using AWS CLI including key pair generation, security group configuration, SSH access setup, instance provisioning, and automated resource cleanup. Developed shell scripts for common administrative tasks."
  },
  {
    id: 3,
    title: "Website Deployment with Database on AWS Linux",
    description: "Hosted PHP-based web application with Nginx and MySQL.",
    icon: "fa-server",
    tags: ["AWS", "Linux", "Nginx", "MySQL", "SSL"],
    details: "Deployed a production database-driven web application on AWS EC2 using Linux, Nginx web server, MySQL database, SSL certificate configuration, and custom domain setup with Route 53. Implemented security best practices and performance optimization."
  },
  {
    id: 4,
    title: "Static Website Hosting on AWS S3",
    description: "Serverless static website using Amazon S3.",
    icon: "fa-cloud",
    tags: ["AWS S3", "Static Hosting", "CloudFront"],
    details: "Hosted a static website using AWS S3 with public access policies, static website hosting configuration, and CloudFront CDN integration for global content delivery. Configured custom domain and SSL certificates."
  },
  {
    id: 5,
    title: "Windows Server Active Directory Setup",
    description: "Configured domain controller and user management.",
    icon: "fa-windows",
    tags: ["Windows Server", "Active Directory", "Group Policy"],
    details: "Installed and configured Windows Server with Active Directory Domain Services. Set up domain controller, organizational units, user and group management, Group Policy Objects, and network authentication services for enterprise environment."
  }
];

// Documentation/PDF files - Add your actual PDF filenames here
const documentation = [
  {
    id: 1,
    title: "Resume",
    description: "Professional CV",
    icon: "fa-file-pdf",
    filename: "resume.pdf"
  },
  {
    id: 2,
    title: "Highly Available Web Application on AWS",
    description: "Multi-AZ deployment with screenshots",
    icon: "fa-network-wired",
    filename: "highly-available-web-app.pdf"
  },
  {
    id: 3,
    title: "AWS EC2 Management Using CLI",
    description: "Step-by-step CLI guide",
    icon: "fa-terminal",
    filename: "ec2-cli-management.pdf"
  },
  {
    id: 4,
    title: "Website Deployment with Database",
    description: "Nginx + MySQL setup guide",
    icon: "fa-server",
    filename: "website-database-deployment.pdf"
  },
  {
    id: 5,
    title: "Static Website Hosting on S3",
    description: "S3 hosting configuration",
    icon: "fa-cloud",
    filename: "s3-static-hosting.pdf"
  }
];

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadDocumentation();
    initTheme();
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    setCurrentYear();
});

// Load Projects
function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = projects.map(project => `
        <div class="project-card" onclick="showProjectDetails(${project.id})">
            <div class="project-image">
                <i class="fas ${project.icon}"></i>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Show project details (simple alert - can be customized)
function showProjectDetails(id) {
    const project = projects.find(p => p.id === id);
    alert(`${project.title}\n\n${project.details}`);
}

// Load Documentation
function loadDocumentation() {
    const grid = document.getElementById('docsGrid');
    grid.innerHTML = documentation.map(doc => `
        <div class="doc-card" onclick="openPdf('${doc.filename}', '${doc.title}')">
            <div class="doc-icon">
                <i class="fas ${doc.icon}"></i>
            </div>
            <h3>${doc.title}</h3>
            <p>${doc.description}</p>
            <span class="doc-btn">
                <i class="fas fa-external-link-alt"></i> View Document
            </span>
        </div>
    `).join('');
}

// PDF Viewer
function openPdf(filename, title) {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    const titleElement = document.getElementById('pdfTitle');
    
    // Set the PDF source - adjust the path based on your folder structure
    viewer.src = `pdfs/${filename}`;
    titleElement.textContent = title;
    
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

// Typing Effect - Updated with cloud-focused phrases
function initTypingEffect() {
    const text = document.querySelector('.typing-text');
    const phrases = [
        'Cloud & IT Support Intern',
        'AWS & Azure Learner',
        'Linux Administrator',
        'Infrastructure Automation'
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
    document.querySelectorAll('.project-card, .skill-category, .doc-card, .contact-item, .stat-card').forEach(el => {
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

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Close modals on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closePdfModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePdfModal();
    }
});