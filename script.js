/**
 * 4THEAMAZINGWOMAN Resources & Investment Ltd
 * Landing Page Interactive Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initModalListeners();
});

// Official WhatsApp business phone number
const OFFICIAL_WHATSAPP_NUMBER = '2348125417903';

/**
 * Mobile Navigation Toggle
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const nav = document.getElementById('mainNav');

  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('active');
  });

  // Close nav on link click
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * Enrollment Modal Logic
 */
let currentCourse = {
  title: '',
  fee: ''
};

window.openEnrollModal = function(courseTitle, feeAmount) {
  currentCourse.title = courseTitle;
  currentCourse.fee = feeAmount;

  const modal = document.getElementById('enrollModal');
  const modalTitle = document.getElementById('modalCourseTitle');
  const modalFee = document.getElementById('modalCourseFee');

  if (!modal || !modalTitle || !modalFee) return;

  modalTitle.textContent = courseTitle;
  modalFee.textContent = `₦${feeAmount}`;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeEnrollModal = function() {
  const modal = document.getElementById('enrollModal');
  if (!modal) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

function initModalListeners() {
  const modal = document.getElementById('enrollModal');
  if (!modal) return;

  // Close when clicking outside dialog
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      window.closeEnrollModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      window.closeEnrollModal();
    }
  });
}

/**
 * Handle Course Enrollment Submission -> Directs to WhatsApp with pre-filled message
 */
window.handleEnrollSubmit = function(event) {
  event.preventDefault();

  const nameInput = document.getElementById('studentName');
  const phoneInput = document.getElementById('studentPhone');

  const studentName = nameInput ? nameInput.value.trim() : '';
  const studentPhone = phoneInput ? phoneInput.value.trim() : '';

  if (!studentName || !studentPhone) {
    alert('Please fill in your name and phone number.');
    return;
  }

  const message = 
    `Hello 4TheAmazingWoman Resources,\n\n` +
    `I would like to register for:\n` +
    `*Program:* ${currentCourse.title}\n` +
    `*Fee:* ₦${currentCourse.fee}\n\n` +
    `*My Details:*\n` +
    `*Name:* ${studentName}\n` +
    `*Phone/WhatsApp:* ${studentPhone}\n\n` +
    `Please provide the bank payment details to confirm my spot.`;

  const whatsappUrl = `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  // Close modal and redirect
  window.closeEnrollModal();
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};

/**
 * Handle One-on-One Counseling Booking -> Directs to WhatsApp
 */
window.handleBookingSubmit = function(event) {
  event.preventDefault();

  const name = document.getElementById('clientName').value.trim();
  const phone = document.getElementById('clientPhone').value.trim();
  const topic = document.getElementById('sessionTopic').value;
  const time = document.getElementById('preferredTime').value;

  if (!name || !phone || !topic || !time) {
    alert('Please complete all counseling booking fields.');
    return;
  }

  const message = 
    `Hello Coach Zainab (4TheAmazingWoman),\n\n` +
    `I would like to book a *Private 1-on-1 Psychological Counseling Session* (₦10,000).\n\n` +
    `*Client Details:*\n` +
    `*Name:* ${name}\n` +
    `*WhatsApp Phone:* ${phone}\n` +
    `*Session Focus:* ${topic}\n` +
    `*Preferred Timeframe:* ${time}\n\n` +
    `Please confirm appointment availability and send payment information.`;

  const whatsappUrl = `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};
