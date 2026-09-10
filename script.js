/**
 * Aarohi Mudgal - Portfolio Interactivity & Modal Handlers
 */

// Certificate Database
const certificatesData = {
  '10th': {
    title: 'Secondary School Examination (Class X)',
    issuer: 'Central Board of Secondary Education (CBSE)',
    issueDate: 'May 2020',
    score: '94.6% Distinction',
    credentialId: 'CBSE-X-2020-847291',
    pdfUrl: 'assets/10th-certificate.pdf',
    description: 'Awarded for exceptional academic performance with distinction in Science, Mathematics, and Social Sciences. Recognized among top academic achievers in school.',
    skills: ['Mathematics', 'Foundational Science', 'Analytical Problem Solving', 'English Communication']
  },
  '12th': {
    title: 'Senior School Certificate Examination (Class XII)',
    issuer: 'Central Board of Secondary Education (CBSE - Science Stream)',
    issueDate: 'June 2022',
    score: '95.2% Distinction with Honors',
    credentialId: 'CBSE-XII-2022-921473',
    pdfUrl: 'assets/12th-certificate.pdf',
    description: 'Completed rigorous Senior Secondary curriculum with major focus on Physics, Chemistry, Mathematics, and Computer Science with continuous excellence.',
    skills: ['Advanced Mathematics', 'Physics & Mechanics', 'Computer Science Fundamentals', 'C++ / Python Basics']
  },
  'ibm': {
    title: 'IBM Enterprise Developer & AI Specialist',
    issuer: 'IBM Skills Network & Global Credentials',
    issueDate: 'December 2023',
    score: 'Grade: A+ (Honors)',
    credentialId: 'IBM-CRED-99410-ARH',
    pdfUrl: 'assets/ibm-certificate.pdf',
    description: 'Comprehensive enterprise-grade certification validating practical expertise in cloud deployment, containerization, modern APIs, and machine learning fundamentals.',
    skills: ['Cloud Computing', 'Enterprise REST APIs', 'Containerization (Docker)', 'AI Model Integration', 'Python Backend']
  }
};

// DOM Elements
const certModal = document.getElementById('certModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalTitle = document.getElementById('modalTitle');
const modalIssuer = document.getElementById('modalIssuer');
const modalDate = document.getElementById('modalDate');
const modalScore = document.getElementById('modalScore');
const modalCredId = document.getElementById('modalCredId');
const modalDesc = document.getElementById('modalDesc');
const modalPdfFrame = document.getElementById('modalPdfFrame');
const modalDownloadBtn = document.getElementById('modalDownloadBtn');
const modalNewTabBtn = document.getElementById('modalNewTabBtn');
const modalSkillsList = document.getElementById('modalSkillsList');

// Open Certificate Modal
function openCertificateModal(certKey) {
  const data = certificatesData[certKey];
  if (!data) return;

  modalTitle.textContent = data.title;
  modalIssuer.textContent = data.issuer;
  modalDate.textContent = data.issueDate;
  modalScore.textContent = data.score;
  modalCredId.textContent = data.credentialId;
  modalDesc.textContent = data.description;
  
  modalPdfFrame.src = data.pdfUrl;
  modalDownloadBtn.href = data.pdfUrl;
  modalDownloadBtn.setAttribute('download', `${certKey}-certificate-aarohi-mudgal.pdf`);
  modalNewTabBtn.href = data.pdfUrl;

  // Render skills tags
  modalSkillsList.innerHTML = '';
  data.skills.forEach(skill => {
    const span = document.createElement('span');
    span.className = 'px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20';
    span.textContent = skill;
    modalSkillsList.appendChild(span);
  });

  certModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close Certificate Modal
function closeCertificateModal() {
  certModal.classList.remove('active');
  document.body.style.overflow = '';
  // reset frame to prevent background loading
  setTimeout(() => {
    modalPdfFrame.src = '';
  }, 200);
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeCertificateModal);
}

// Close modal when clicking backdrop
if (certModal) {
  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) {
      closeCertificateModal();
    }
  });
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certModal.classList.contains('active')) {
    closeCertificateModal();
  }
});

// Attach triggers for all certificate buttons
document.querySelectorAll('[data-cert-target]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const target = btn.getAttribute('data-cert-target');
    openCertificateModal(target);
  });
});

// Mobile Navigation Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// ScrollSpy: Update active nav indicator on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavOnScroll() {
  const scrollY = window.pageYOffset + 140;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop;
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavOnScroll);

// Skills Filter System
const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

skillFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    skillFilterBtns.forEach(b => {
      b.classList.remove('bg-indigo-600', 'text-white');
      b.classList.add('bg-slate-900/60', 'text-slate-400', 'border-slate-800');
    });
    btn.classList.add('bg-indigo-600', 'text-white');
    btn.classList.remove('bg-slate-900/60', 'text-slate-400', 'border-slate-800');

    const filterValue = btn.getAttribute('data-filter');

    skillCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filterValue === 'all' || category === filterValue) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 200);
      }
    });
  });
});

// Toast Notification
function showToast(title, message) {
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toastTitle');
  const toastMsg = document.getElementById('toastMsg');

  if (!toast) return;

  toastTitle.textContent = title;
  toastMsg.textContent = message;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

// Copy to Clipboard Functionality (e.g. email)
const copyEmailBtn = document.getElementById('copyEmailBtn');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', () => {
    const email = copyEmailBtn.getAttribute('data-email') || 'aarohi.mudgal@example.com';
    navigator.clipboard.writeText(email).then(() => {
      const originalHtml = copyEmailBtn.innerHTML;
      copyEmailBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-400 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg> Copied!
      `;
      setTimeout(() => {
        copyEmailBtn.innerHTML = originalHtml;
      }, 2000);
    });
  });
}

// Contact Form Submission Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const submitBtn = document.getElementById('submitBtn');

    if (!name || !email || !message) {
      showToast('Missing Fields', 'Please fill in your name, email, and message.');
      return;
    }

    // Email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    // Simulate sending with loading state
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Sending Message...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
      contactForm.reset();
      showToast('Message Received!', `Thank you ${name}. Your message has been sent successfully. Aarohi will reach out soon.`);
    }, 1200);
  });
}
