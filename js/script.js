/* =====================================================================
   Campusly — Official Event Hub | IEM Department of CSE (AIML)
   Modern Interactive Script
   Features:
     1. Dynamic event rendering, category filter, live search
     2. Live countdown to nearest upcoming event with calendar (.ics) export
     3. Digital clock (Asia/Kolkata IST)
     4. Dark / Light mode toggle (persisted in localStorage)
     5. Robust registration form validation with instant feedback
     6. Feedback form validation with toast notifications
     7. Mobile navigation toggle & scrollspy active link indicator
     8. Reading scroll progress bar
     9. Interactive Gallery Lightbox modal with keyboard navigation
    10. Scroll-reveal animations and animated number counters
   ===================================================================== */

'use strict';

/* ---------------------------------------------------------------------
   1. Event Dataset
   --------------------------------------------------------------------- */
const EVENTS = [
  {
    id: 'hackiem',
    name: 'HackIEM 2026 — 24h Applied AI Hackathon',
    date: '2026-09-26T09:00:00+05:30',
    venue: 'AIML Central Lab, Gurukul Campus',
    category: 'technical',
    description: '24-hour sprint on applied machine learning, computer vision, and autonomous agents. Over 40 student teams built and deployed real-time prototypes with industry mentors.'
  },
  {
    id: 'dl-workshop',
    name: 'Hands-on Deep Learning with PyTorch',
    date: '2026-10-03T10:00:00+05:30',
    venue: 'Computing Lab 4, Ashram Building',
    category: 'workshop',
    description: 'Two-day intensive workshop covering tensor operations, autograd, CNN architectures, and transfer learning for speech-emotion classification. 60+ participants attended.'
  },
  {
    id: 'guest-lecture',
    name: 'Keynote: LLMs for Low-Resource Indic Languages',
    date: '2026-10-10T14:30:00+05:30',
    venue: 'Central Seminar Hall, 2nd Floor',
    category: 'lecture',
    description: 'Industry research scientists presented novel tokenization algorithms and low-resource fine-tuning architectures for Indian languages, followed by an open interactive Q&A.'
  },
  {
    id: 'cultural-night',
    name: 'Sharod Sandhya — Department Cultural Evening',
    date: '2026-10-16T17:00:00+05:30',
    venue: 'Main Auditorium, Gurukul Campus',
    category: 'cultural',
    description: 'Pre-Puja cultural gala featuring acoustic music, classical and contemporary dance ensembles, departmental drama society performances, and fellowship dinner.'
  },
  {
    id: 'robotics',
    name: 'Autonomous Line-Follower Robotics Challenge',
    date: '2026-11-07T10:00:00+05:30',
    venue: 'IoT & Robotics Arena, Gurukul Campus',
    category: 'technical',
    description: 'High-precision autonomous line-following bot race. Microcontroller kits provided; teams judged on PID algorithm tuning, lap time precision, and obstacle clearance.'
  },
  {
    id: 'innovacion',
    name: 'Innovacion 2026 — Annual Flagship Tech Fest',
    date: '2026-11-20T09:00:00+05:30',
    venue: 'All Campus Blocks, IEM Gurukul',
    category: 'technical',
    description: 'Three-day flagship festival: national algorithmic coding battles, paper presentations, ML project expos, gaming arenas, and venture pitching sessions.'
  }
];

const CATEGORY_META = {
  technical: { label: 'Technical', badgeClass: 'badge-technical' },
  workshop:  { label: 'Workshop',  badgeClass: 'badge-workshop' },
  cultural:  { label: 'Cultural',  badgeClass: 'badge-cultural' },
  lecture:   { label: 'Lecture',   badgeClass: 'badge-lecture' }
};

/* DOM References */
const eventList = document.getElementById('eventList');
const eventEmpty = document.getElementById('eventEmpty');
const eventSelect = document.getElementById('eventSelect');
const eventSearch = document.getElementById('eventSearch');
const searchClear = document.getElementById('searchClear');
const eventFilters = document.getElementById('eventFilters');
const btnResetFilters = document.getElementById('btnResetFilters');

/* Date Formatting Helper */
function formatDateParts(iso) {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString('en-IN', { day: '2-digit' }),
    month: d.toLocaleDateString('en-IN', { month: 'short' }),
    year: d.toLocaleDateString('en-IN', { year: 'numeric' }),
    fullDate: d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }),
    time: d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    raw: d
  };
}

/* ---------------------------------------------------------------------
   2. Render Events & Populate Registration Dropdown
   --------------------------------------------------------------------- */
function renderEvents() {
  if (!eventList) return;

  const sorted = [...EVENTS].sort((a, b) => new Date(a.date) - new Date(b.date));
  const now = Date.now();

  eventList.innerHTML = sorted.map(ev => {
    const dt = formatDateParts(ev.date);
    const cat = CATEGORY_META[ev.category] || { label: ev.category, badgeClass: 'badge-technical' };
    const isPast = new Date(ev.date).getTime() < now;
    const statusText = isPast ? 'Archived' : 'Registration Open';
    const statusClass = isPast ? 'status-completed' : 'status-upcoming';

    return `
      <li class="event-card" data-id="${ev.id}" data-category="${ev.category}">
        <div class="event-date-block">
          <span class="day">${dt.day}</span>
          <span class="month">${dt.month}</span>
          <span class="year">${dt.year}</span>
        </div>

        <div class="event-info">
          <div class="event-meta-top">
            <span class="event-badge ${cat.badgeClass}">${cat.label}</span>
            <span class="event-status-pill ${statusClass}">${statusText}</span>
          </div>

          <h3 class="event-title">${ev.name}</h3>

          <div class="event-venue-row">
            <span class="event-venue-item">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
              <span>${dt.fullDate} &middot; ${dt.time}</span>
            </span>
            <span class="event-venue-item">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              <span>${ev.venue}</span>
            </span>
          </div>

          <p class="event-desc">${ev.description}</p>
        </div>

        <div class="event-actions">
          <button class="btn btn-sm btn-card-register" data-action="register" data-event-id="${ev.id}">
            <span>${isPast ? 'View Details' : 'Register Now'}</span>
          </button>
          <button class="btn btn-sm btn-card-cal" data-action="calendar" data-event-id="${ev.id}" title="Download Calendar Invite (.ics)">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
            </svg>
            <span>Save (.ics)</span>
          </button>
        </div>
      </li>
    `;
  }).join('');

  // Populate registration dropdown with clean formatted options
  if (eventSelect) {
    eventSelect.innerHTML = '<option value="">Choose an upcoming event to register</option>';
    sorted.forEach(ev => {
      const dt = formatDateParts(ev.date);
      const isPast = new Date(ev.date).getTime() < now;
      const opt = document.createElement('option');
      opt.value = ev.id;
      opt.textContent = `${ev.name} (${dt.day} ${dt.month} ${dt.year})${isPast ? ' [Archived]' : ''}`;
      eventSelect.appendChild(opt);
    });
  }

  updateFilterCounts();
}

function updateFilterCounts() {
  const counts = { all: EVENTS.length, technical: 0, workshop: 0, cultural: 0, lecture: 0 };
  EVENTS.forEach(ev => {
    if (counts[ev.category] !== undefined) counts[ev.category]++;
  });
  for (const [key, val] of Object.entries(counts)) {
    const badge = document.getElementById(`count-${key}`);
    if (badge) badge.textContent = String(val);
  }
}

function applyFilters() {
  const activeChip = eventFilters ? eventFilters.querySelector('.chip.is-active') : null;
  const category = activeChip ? activeChip.dataset.filter : 'all';
  const query = (eventSearch ? eventSearch.value.trim().toLowerCase() : '');

  let visibleCount = 0;
  const cards = document.querySelectorAll('.event-card');

  cards.forEach(card => {
    const matchesCategory = category === 'all' || card.dataset.category === category;
    let matchesQuery = true;

    if (query) {
      const text = card.textContent.toLowerCase();
      matchesQuery = text.includes(query);
    }

    const show = matchesCategory && matchesQuery;
    card.classList.toggle('is-hidden', !show);
    if (show) visibleCount++;
  });

  if (eventEmpty) {
    eventEmpty.hidden = visibleCount > 0;
  }
}

if (eventFilters) {
  eventFilters.addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    eventFilters.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
    btn.classList.add('is-active');
    applyFilters();
  });
}

if (eventSearch) {
  eventSearch.addEventListener('input', () => {
    if (searchClear) searchClear.hidden = !eventSearch.value;
    applyFilters();
  });
}

if (searchClear) {
  searchClear.addEventListener('click', () => {
    eventSearch.value = '';
    searchClear.hidden = true;
    eventSearch.focus();
    applyFilters();
  });
}

if (btnResetFilters) {
  btnResetFilters.addEventListener('click', () => {
    if (eventSearch) { eventSearch.value = ''; if (searchClear) searchClear.hidden = true; }
    if (eventFilters) {
      eventFilters.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
      const allChip = eventFilters.querySelector('[data-filter="all"]');
      if (allChip) allChip.classList.add('is-active');
    }
    applyFilters();
  });
}

if (eventList) {
  eventList.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const action = btn.dataset.action;
    const eventId = btn.dataset.eventId;
    const ev = EVENTS.find(i => i.id === eventId);
    if (!ev) return;

    if (action === 'register') {
      if (eventSelect) {
        eventSelect.value = ev.id;
        eventSelect.classList.remove('is-invalid');
      }
      const regSection = document.getElementById('register');
      if (regSection) {
        regSection.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('studentName');
        if (nameInput) setTimeout(() => nameInput.focus(), 500);
      }
      showToast('Event Selected', `Pre-selected ${ev.name} for registration`, '🎟️');
    } else if (action === 'calendar') {
      downloadIcs(ev);
    }
  });
}

/* ---------------------------------------------------------------------
   3. Calendar (.ics) Generator
   --------------------------------------------------------------------- */
function formatIcsDate(d) {
  return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function downloadIcs(ev) {
  const start = new Date(ev.date);
  const end = new Date(start.getTime() + 3 * 3600 * 1000);

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Campusly IEM Kolkata//Event Hub//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:campusly-${ev.id}@iem.edu.in`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:${ev.name}`,
    `LOCATION:${ev.venue}, IEM Kolkata`,
    `DESCRIPTION:${ev.description.replace(/\n/g, ' ')}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${ev.id}-invite.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('Calendar Saved', `Downloaded .ics for ${ev.name}`, '📅');
}

/* ---------------------------------------------------------------------
   4. Live Countdown & IST Clock
   --------------------------------------------------------------------- */
let featuredEvent = null;

function initCountdown() {
  const now = Date.now();
  const upcoming = EVENTS
    .filter(e => new Date(e.date).getTime() > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  featuredEvent = upcoming.length > 0 ? upcoming[0] : EVENTS[0];

  const titleEl = document.getElementById('cdTitle');
  const metaText = document.getElementById('cdMetaText');
  const tagEl = document.getElementById('cdTag');

  if (featuredEvent) {
    const dt = formatDateParts(featuredEvent.date);
    if (titleEl) titleEl.textContent = featuredEvent.name;
    if (metaText) metaText.textContent = `${dt.fullDate} · ${dt.time} · ${featuredEvent.venue}`;
    if (tagEl) tagEl.textContent = new Date(featuredEvent.date).getTime() > now ? 'Confirmed' : 'Past Event';
  }

  updateCountdownDigits();
  setInterval(updateCountdownDigits, 1000);
}

function updateCountdownDigits() {
  if (!featuredEvent) return;

  const target = new Date(featuredEvent.date).getTime();
  const now = Date.now();
  const diff = target - now;

  const daysEl = document.getElementById('cdDays');
  const hoursEl = document.getElementById('cdHours');
  const minsEl = document.getElementById('cdMins');
  const secsEl = document.getElementById('cdSecs');

  if (diff <= 0) {
    if (daysEl) daysEl.textContent = '00';
    if (hoursEl) hoursEl.textContent = '00';
    if (minsEl) minsEl.textContent = '00';
    if (secsEl) secsEl.textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
  if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
  if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
}

const btnQuickRegister = document.getElementById('btnQuickRegister');
if (btnQuickRegister) {
  btnQuickRegister.addEventListener('click', () => {
    if (featuredEvent && eventSelect) {
      eventSelect.value = featuredEvent.id;
    }
    const regSection = document.getElementById('register');
    if (regSection) {
      regSection.scrollIntoView({ behavior: 'smooth' });
      const nameInput = document.getElementById('studentName');
      if (nameInput) setTimeout(() => nameInput.focus(), 500);
    }
  });
}

const btnAddToCalendar = document.getElementById('btnAddToCalendar');
if (btnAddToCalendar) {
  btnAddToCalendar.addEventListener('click', () => {
    if (featuredEvent) downloadIcs(featuredEvent);
  });
}

function updateClock() {
  const clockEl = document.getElementById('clock');
  if (!clockEl) return;
  const now = new Date();
  const options = {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  clockEl.textContent = now.toLocaleTimeString('en-GB', options);
}
setInterval(updateClock, 1000);
updateClock();

/* ---------------------------------------------------------------------
   5. Gallery Lightbox Modal
   --------------------------------------------------------------------- */
const galleryItems = document.querySelectorAll('.gallery-item');
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');

let currentGalleryIndex = 0;

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const idx = parseInt(item.dataset.index, 10) || 0;
    openLightbox(idx);
  });
});

function openLightbox(index) {
  if (!galleryItems[index]) return;
  currentGalleryIndex = index;
  const item = galleryItems[index];
  const img = item.querySelector('img');
  const caption = item.querySelector('figcaption');

  if (lightboxImg && img) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }
  if (lightboxCaption && caption) {
    lightboxCaption.textContent = caption.textContent;
  }
  if (lightboxModal) {
    lightboxModal.hidden = false;
    lightboxModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  if (lightboxModal) {
    lightboxModal.hidden = true;
    lightboxModal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function nextGallery() {
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
  openLightbox(currentGalleryIndex);
}

function prevGallery() {
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
  openLightbox(currentGalleryIndex);
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
if (lightboxNext) lightboxNext.addEventListener('click', nextGallery);
if (lightboxPrev) lightboxPrev.addEventListener('click', prevGallery);

document.addEventListener('keydown', e => {
  if (lightboxModal && !lightboxModal.hidden) {
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') nextGallery();
    else if (e.key === 'ArrowLeft') prevGallery();
  }
});

/* ---------------------------------------------------------------------
   6. Form Validation (Registration & Feedback)
   --------------------------------------------------------------------- */
const regForm = document.getElementById('regForm');
const validators = {
  studentName: val => val.trim().length >= 3 ? '' : 'Please enter your full student name (min. 3 characters).',
  rollNo: val => /^\d{10}$/.test(val.trim()) ? '' : 'Please enter a valid 10-digit IEM roll number.',
  department: val => val.trim() !== '' ? '' : 'Please select your department.',
  email: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) ? '' : 'Please enter a valid college email (@iem.edu.in).',
  phone: val => /^[6-9]\d{9}$/.test(val.trim().replace(/\D/g, '')) ? '' : 'Please enter a valid 10-digit mobile number.',
  eventSelect: val => val.trim() !== '' ? '' : 'Please select an event to register for.'
};

function validateField(input) {
  const name = input.name;
  const val = input.value;
  const fn = validators[name];
  if (!fn) return true;

  const err = fn(val);
  const errEl = document.getElementById(`err-${name}`);
  if (errEl) errEl.textContent = err;

  input.classList.toggle('is-invalid', !!err);
  input.classList.toggle('is-valid', !err && val.trim().length > 0);
  return !err;
}

if (regForm) {
  regForm.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', () => {
      if (el.classList.contains('is-invalid')) validateField(el);
    });
    el.addEventListener('blur', () => {
      if (el.value.trim().length > 0) validateField(el);
    });
  });

  regForm.addEventListener('submit', e => {
    e.preventDefault();
    let isValid = true;

    for (const name of Object.keys(validators)) {
      const input = regForm.elements[name];
      if (input && !validateField(input)) {
        isValid = false;
      }
    }

    const genderChecked = regForm.querySelector('input[name="gender"]:checked');
    const errGender = document.getElementById('err-gender');
    if (!genderChecked) {
      if (errGender) errGender.textContent = 'Please choose a gender identity.';
      isValid = false;
    } else {
      if (errGender) errGender.textContent = '';
    }

    if (!isValid) {
      showToast('Check Fields', 'Please complete all required fields properly.', '⚠️');
      return;
    }

    regForm.classList.add('is-submitting');
    const submitBtn = document.getElementById('regSubmitBtn');
    if (submitBtn) submitBtn.disabled = true;

    setTimeout(() => {
      regForm.classList.remove('is-submitting');
      if (submitBtn) submitBtn.disabled = false;

      const studentName = regForm.elements['studentName'].value.trim();
      const eventId = regForm.elements['eventSelect'].value;
      const ev = EVENTS.find(i => i.id === eventId);
      const eventName = ev ? ev.name : 'Selected Event';

      const statusEl = document.getElementById('regStatus');
      if (statusEl) {
        statusEl.className = 'form-status success';
        statusEl.textContent = `✓ Registration confirmed for ${studentName}! An official receipt has been emailed.`;
      }

      showToast('Registration Confirmed! 🎉', `${studentName} successfully registered for ${eventName}`, '🎟️');
      regForm.reset();
      regForm.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
    }, 700);
  });
}

/* Feedback Form */
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
  feedbackForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = feedbackForm.elements['fbName'];
    const email = feedbackForm.elements['fbEmail'];
    const message = feedbackForm.elements['fbMessage'];

    let valid = true;
    if (!name.value.trim() || name.value.trim().length < 2) {
      document.getElementById('err-fbName').textContent = 'Please enter your name.';
      name.classList.add('is-invalid');
      valid = false;
    } else {
      document.getElementById('err-fbName').textContent = '';
      name.classList.remove('is-invalid');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      document.getElementById('err-fbEmail').textContent = 'Please enter a valid email address.';
      email.classList.add('is-invalid');
      valid = false;
    } else {
      document.getElementById('err-fbEmail').textContent = '';
      email.classList.remove('is-invalid');
    }

    if (!message.value.trim() || message.value.trim().length < 15) {
      document.getElementById('err-fbMessage').textContent = 'Please enter a message of at least 15 characters.';
      message.classList.add('is-invalid');
      valid = false;
    } else {
      document.getElementById('err-fbMessage').textContent = '';
      message.classList.remove('is-invalid');
    }

    if (!valid) return;

    const statusEl = document.getElementById('fbStatus');
    if (statusEl) {
      statusEl.className = 'form-status success';
      statusEl.textContent = '✓ Message transmitted! Secretariat will reply shortly.';
    }

    showToast('Message Received', 'Thank you! The secretariat has received your query.', '📨');
    feedbackForm.reset();
  });
}

/* ---------------------------------------------------------------------
   7. Theme Toggle (Persisted in localStorage)
   --------------------------------------------------------------------- */
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);
  if (themeToggle) {
    const icon = themeToggle.querySelector('.theme-icon');
    if (icon) icon.textContent = isDark ? '☼' : '☾';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

const savedTheme = localStorage.getItem('campusly_theme') || 'light';
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('campusly_theme', next);
    showToast('Theme Changed', `Switched to ${next} mode`, next === 'dark' ? '🌙' : '☀️');
  });
}

/* ---------------------------------------------------------------------
   8. Navigation, Scroll Progress & Scrollspy
   --------------------------------------------------------------------- */
const scrollProgressBar = document.getElementById('scrollProgressBar');
const siteHeader = document.querySelector('.site-header');
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  if (scrollProgressBar) {
    scrollProgressBar.style.width = scrolled + '%';
  }

  if (siteHeader) {
    siteHeader.classList.toggle('is-scrolled', winScroll > 25);
  }

  let currentId = 'home';
  sections.forEach(sec => {
    const top = sec.offsetTop - 130;
    const h = sec.offsetHeight;
    if (winScroll >= top && winScroll < top + h) {
      currentId = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${currentId}`) {
      link.classList.add('is-current');
    } else {
      link.classList.remove('is-current');
    }
  });
}, { passive: true });

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('.nav-link, .btn').forEach(l => {
    l.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------------------------------------------------------------------
   9. Scroll Reveal Animations & Animated Number Counters
   --------------------------------------------------------------------- */
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));

/* Number Counters */
const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      if (isNaN(target)) return;

      const duration = 1500;
      const start = performance.now();

      function update(nowTime) {
        const progress = Math.min((nowTime - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(ease * target);

        if (target >= 1000) {
          el.textContent = `${currentVal.toLocaleString('en-IN')}+`;
        } else if (target === 100) {
          el.textContent = `${currentVal}%`;
        } else {
          el.textContent = `${currentVal}+`;
        }

        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      obs.unobserve(el);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

/* ---------------------------------------------------------------------
   10. Toast Notification Helper
   --------------------------------------------------------------------- */
function showToast(title, message, icon = '✦') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <p class="toast-msg">${message}</p>
    </div>
    <button class="toast-close" aria-label="Close notification">&times;</button>
    <div class="toast-progress"></div>
  `;

  container.appendChild(toast);

  const closeBtn = toast.querySelector('.toast-close');
  const dismiss = () => {
    toast.style.animation = 'slideInRight 0.3s ease reverse forwards';
    setTimeout(() => toast.remove(), 300);
  };

  closeBtn.addEventListener('click', dismiss);
  setTimeout(dismiss, 4000);
}

/* ---------------------------------------------------------------------
   11. DOM Initialization
   --------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  renderEvents();
  initCountdown();
});
