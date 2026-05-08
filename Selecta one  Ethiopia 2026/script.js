// ========================================
// Selecta one Ethiopia - Universal Script
// Compatible with PC, Tablet & Mobile
// WITH YOUTUBE VIDEO WORKING Developed by: [Kaleb Degu] (https://github.com/kalebstructure/ZSEC2040-WEBSITE
// ========================================

// ========== DARK MODE (IMMEDIATE EXECUTION) ==========
(function() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const savedTheme = localStorage.getItem('darkMode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply dark mode immediately to prevent flash
  if (savedTheme === 'enabled' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    if (darkModeToggle) {
      const icon = darkModeToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
    }
  }
  
  // Set up toggle listener
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.toggle('dark-mode');
      const icon = darkModeToggle.querySelector('i');
      
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        if (icon) {
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
        }
      } else {
        localStorage.setItem('darkMode', 'disabled');
        if (icon) {
          icon.classList.remove('fa-sun');
          icon.classList.add('fa-moon');
        }
      }
    });
    
    // Also add touch event for mobile
    darkModeToggle.addEventListener('touchstart', (e) => {
      e.preventDefault();
      darkModeToggle.click();
    });
  }
})();

// ========== HERO SLIDER ==========
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dotsContainer');
const slidesContainer = document.getElementById('slidesContainer');

if (dotsContainer && slides.length) {
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dot.addEventListener('touchstart', (e) => {
      e.preventDefault();
      goToSlide(i);
    });
    dotsContainer.appendChild(dot);
  });
}

function goToSlide(i) {
  currentSlide = i;
  if (slidesContainer) {
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  document.querySelectorAll('.dot').forEach((d, idx) => {
    d.classList.toggle('active', idx === currentSlide);
  });
}

const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
  });
  prevBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  });
  nextBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  });
}

// Auto-slide every 5 seconds
let slideInterval = setInterval(() => {
  if (slides.length) {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }
}, 5000);

// Pause auto-slide on touch/hover for mobile
if (slidesContainer) {
  slidesContainer.addEventListener('touchstart', () => {
    clearInterval(slideInterval);
  });
  slidesContainer.addEventListener('touchend', () => {
    slideInterval = setInterval(() => {
      if (slides.length) {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
      }
    }, 5000);
  });
}

// ========== BURGER MENU TOGGLE (MOBILE FRIENDLY) ==========
const burgerMenu = document.getElementById('burgerMenu');
const burgerDropdown = document.getElementById('burgerDropdown');

if (burgerMenu && burgerDropdown) {
  const toggleBurgerMenu = (e) => {
    if (e) e.stopPropagation();
    const isExpanded = burgerMenu.getAttribute('aria-expanded') === 'true';
    burgerMenu.setAttribute('aria-expanded', !isExpanded);
    burgerDropdown.classList.toggle('active');
  };
  
  burgerMenu.addEventListener('click', toggleBurgerMenu);
  burgerMenu.addEventListener('touchstart', (e) => {
    e.preventDefault();
    toggleBurgerMenu(e);
  });
  
  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!burgerMenu.contains(e.target) && !burgerDropdown.contains(e.target)) {
      burgerDropdown.classList.remove('active');
      burgerMenu.setAttribute('aria-expanded', 'false');
    }
  });
  
  document.addEventListener('touchstart', (e) => {
    if (!burgerMenu.contains(e.target) && !burgerDropdown.contains(e.target)) {
      burgerDropdown.classList.remove('active');
      burgerMenu.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Close when clicking links
  const allBurgerLinks = document.querySelectorAll('.burger-dropdown-container a, .burger-dropdown-submenu a');
  allBurgerLinks.forEach(link => {
    link.addEventListener('click', () => {
      burgerDropdown.classList.remove('active');
      burgerMenu.setAttribute('aria-expanded', 'false');
    });
    link.addEventListener('touchstart', () => {
      burgerDropdown.classList.remove('active');
      burgerMenu.setAttribute('aria-expanded', 'false');
    });
  });
}

// ========== SMOOTH SCROLL FOR ALL LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  const smoothScroll = (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Close burger menu if open
      if (burgerDropdown && burgerDropdown.classList.contains('active')) {
        burgerDropdown.classList.remove('active');
        burgerMenu.setAttribute('aria-expanded', 'false');
      }
    }
  };
  
  anchor.addEventListener('click', smoothScroll);
  anchor.addEventListener('touchstart', smoothScroll);
});

// ========== UNIVERSAL LIGHTBOX (WORKS ON ALL DEVICES) ==========
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
  if (!src || !lightbox || !lightboxImg) return;
  
  lightboxImg.src = src;
  lightbox.style.display = 'flex';
  lightbox.style.opacity = '0';
  setTimeout(() => {
    lightbox.style.opacity = '1';
  }, 10);
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.top = `-${window.scrollY}px`;
  
  // Store scroll position to restore later
  window.scrollYPosition = window.scrollY;
}

function closeLightbox() {
  if (!lightbox) return;
  
  lightbox.style.opacity = '0';
  setTimeout(() => {
    lightbox.style.display = 'none';
  }, 200);
  
  // Restore body scroll
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.width = '';
  window.scrollTo(0, window.scrollYPosition || 0);
  
  if (lightboxImg) lightboxImg.src = '';
}

// Lightbox event listeners for all devices
if (lightbox) {
  // Click on background to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  lightbox.addEventListener('touchstart', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      closeLightbox();
    }
  });
}

// Close button
const closeBtn = document.querySelector('.lightbox-close');
if (closeBtn) {
  closeBtn.addEventListener('click', closeLightbox);
  closeBtn.addEventListener('touchstart', closeLightbox);
}

// ========== PHASE IMAGES WITH UNIVERSAL TOUCH/CLICK ==========
const basePath = "";
const phaseTitles = [
  { num: 1, name: "Phase I: Land Preparation", desc: "Clearing brush, controlled firing, mechanized leveling using tractors to soften and prepare soil for planting." },
  { num: 2, name: "Phase II: Advanced Irrigation Infrastructure", desc: "Deep borehole drilling, gravity-fed tankers, sprinkler and drip system installation for water efficiency." },
  { num: 3, name: "Phase III: Seeding & Transplanting", desc: "High-quality improved seeds: Kekeba wheat and Russet F1 onion. Current: Wheat at 2 months, Onion at 15 days after Transplanting." },
  { num: 4, name: "Phase IV: Crop Management", desc: "Continuous disease monitoring, visual inspection of wheat grain development, and assessment of crop greenness (vegetative vigor)" },
  { num: 5, name: "Phase V: Harvest & Seed Certification", desc: "Elite seed stock collection, quality certification, and distribution to local farmers for national food security." }
];

const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

// Helper function to create clickable/touchable image
function createTouchableImage(src, alt, phaseName, imageNum) {
  const picture = document.createElement('picture');
  const img = document.createElement('img');
  
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  img.style.width = '100%';
  img.style.aspectRatio = '4/3';
  img.style.objectFit = 'cover';
  img.style.borderRadius = '12px';
  img.style.cursor = 'pointer';
  img.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
  
  // Hover effect for desktop
  img.addEventListener('mouseenter', () => {
    img.style.transform = 'scale(1.02)';
    img.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.15)';
  });
  img.addEventListener('mouseleave', () => {
    img.style.transform = 'scale(1)';
    img.style.boxShadow = 'none';
  });
  
  // Universal open function for both click and touch
  const openHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openLightbox(src);
  };
  
  img.addEventListener('click', openHandler);
  img.addEventListener('touchstart', openHandler, { passive: false });
  
  img.onerror = () => {
    img.src = `https://placehold.co/400x300/1a73b0/white?text=${encodeURIComponent(phaseName)}+${imageNum}`;
  };
  
  picture.appendChild(img);
  return picture;
}

function createComingSoonBox(phaseName, imageNum) {
  const box = document.createElement('div');
  box.className = 'coming-soon-box';
  box.style.aspectRatio = '4/3';
  box.style.display = 'flex';
  box.style.flexDirection = 'column';
  box.style.alignItems = 'center';
  box.style.justifyContent = 'center';
  box.style.backgroundColor = 'rgba(26, 115, 176, 0.1)';
  box.style.borderRadius = '12px';
  box.style.border = '2px dashed var(--border-color)';
  
  const icon = document.createElement('i');
  icon.className = 'fas fa-image';
  icon.style.fontSize = '42px';
  icon.style.marginBottom = '16px';
  icon.style.color = 'var(--sky-primary)';
  
  const text = document.createElement('span');
  text.textContent = `${phaseName} - Image ${imageNum} Coming Soon`;
  text.style.fontSize = '14px';
  text.style.textAlign = 'center';
  text.style.padding = '0 10px';
  
  box.appendChild(icon);
  box.appendChild(text);
  return box;
}

function initPhases() {
  for (let p = 1; p <= 5; p++) {
    const container = document.getElementById(`phase${p}-container`);
    if (!container) continue;
    
    const folderPath = `${basePath}Phase ${p}/`;
    
    // Add header
    const headerDiv = document.createElement('div');
    headerDiv.className = 'phase-header';
    headerDiv.innerHTML = `
      <div class="step-number">${p}</div>
      <div class="phase-content">
        <h3>${phaseTitles[p-1].name}</h3>
        <p>${phaseTitles[p-1].desc}</p>
      </div>
    `;
    container.appendChild(headerDiv);
    
    // Visible grid
    const visibleGrid = document.createElement('div');
    visibleGrid.className = 'phase-visible-grid';
    
    for (let i = 1; i <= 4; i++) {
      let imageFound = false;
      
      for (let ext of imageExtensions) {
        if (imageFound) break;
        const imgPath = `${folderPath}${i}.${ext}`;
        const testImg = new Image();
        
        testImg.onload = (function(path, idx) {
          return function() {
            if (!imageFound) {
              imageFound = true;
              const imgElement = createTouchableImage(path, `${phaseTitles[p-1].name} image ${idx}`, phaseTitles[p-1].name, idx);
              visibleGrid.appendChild(imgElement);
            }
          };
        })(imgPath, i);
        
        testImg.src = imgPath;
      }
      
      // If no image found ... show me coming soon after a short delay
      setTimeout(() => {
        if (!imageFound) {
          const comingBox = createComingSoonBox(phaseTitles[p-1].name, i);
          visibleGrid.appendChild(comingBox);
        }
      }, 300);
    }
    
    container.appendChild(visibleGrid);
    
    // More Images Button
    const moreBtn = document.createElement('button');
    moreBtn.className = 'more-images-btn';
    moreBtn.setAttribute('aria-expanded', 'false');
    moreBtn.innerHTML = `<i class="fas fa-images"></i> More Images <span class="more-count">(additional images)</span> <i class="fas fa-chevron-down"></i>`;
    container.appendChild(moreBtn);
    
    // More Images Grid (images 5-14)
    const moreGrid = document.createElement('div');
    moreGrid.id = `phase${p}-more`;
    moreGrid.className = 'phase-more-grid';
    moreGrid.setAttribute('aria-hidden', 'true');
    moreGrid.style.display = 'none';
    container.appendChild(moreGrid);
    
    let hasAnyImage = false;
    
    for (let i = 5; i <= 14; i++) {
      let imageFound = false;
      
      for (let ext of imageExtensions) {
        if (imageFound) break;
        const imgPath = `${folderPath}${i}.${ext}`;
        const testImg = new Image();
        
        testImg.onload = (function(path, idx) {
          return function() {
            if (!imageFound) {
              imageFound = true;
              hasAnyImage = true;
              const imgElement = createTouchableImage(path, `${phaseTitles[p-1].name} image ${idx}`, phaseTitles[p-1].name, idx);
              moreGrid.appendChild(imgElement);
            }
          };
        })(imgPath, i);
        
        testImg.src = imgPath;
      }
      
      setTimeout(() => {
        if (!imageFound) {
          const comingBox = createComingSoonBox(phaseTitles[p-1].name, i);
          moreGrid.appendChild(comingBox);
        }
      }, 300);
    }
    
    // Hide More button if no images at all
    setTimeout(() => {
      if (!hasAnyImage) {
        moreBtn.style.display = 'none';
      }
    }, 2000);
    
    // Toggle more images on click/touch
    const toggleMoreImages = (e) => {
      e.preventDefault();
      const isExpanded = moreBtn.getAttribute('aria-expanded') === 'true';
      const chevron = moreBtn.querySelector('.fa-chevron-down');
      
      if (isExpanded) {
        moreGrid.style.display = 'none';
        moreGrid.setAttribute('aria-hidden', 'true');
        moreBtn.setAttribute('aria-expanded', 'false');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      } else {
        moreGrid.style.display = 'grid';
        moreGrid.setAttribute('aria-hidden', 'false');
        moreBtn.setAttribute('aria-expanded', 'true');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      }
    };
    
    moreBtn.addEventListener('click', toggleMoreImages);
    moreBtn.addEventListener('touchstart', toggleMoreImages);
  }
}

// ========== VIDEO GALLERY WITH YOUTUBE LINK (FIXED) ==========
function initVideoGallery() {
  const visibleContainer = document.getElementById('videoVisibleGrid');
  const moreContainer = document.getElementById('videoMoreGrid');
  const moreBtn = document.getElementById('moreVideosBtn');
  
  if (!visibleContainer || !moreContainer || !moreBtn) {
    console.error('Video gallery elements not found');
    return;
  }
  
  // Clear containers
  visibleContainer.innerHTML = '';
  moreContainer.innerHTML = '';
  
  // Function to create a real YouTube video card
  function createYouTubeVideoCard(videoId, title) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.style.cursor = 'pointer';
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    
    // Create clickable link that opens YouTube
    const link = document.createElement('a');
    link.href = `https://www.youtube.com/watch?v=${videoId}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.textDecoration = 'none';
    link.style.color = 'inherit';
    link.style.display = 'block';
    
    // YouTube thumbnail
    const img = document.createElement('img');
    img.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    img.alt = title;
    img.className = 'video-thumbnail';
    img.style.width = '100%';
    img.style.aspectRatio = '16/9';
    img.style.objectFit = 'cover';
    
    // Fallback if thumbnail fails to load
    img.onerror = function() {
      this.src = `https://placehold.co/640x360/1a73b0/white?text=${encodeURIComponent(title)}`;
    };
    
    const label = document.createElement('div');
    label.className = 'video-label';
    label.innerHTML = `🎬 ${title} <i class="fas fa-external-link-alt"></i>`;
    label.style.padding = '12px 16px';
    label.style.textAlign = 'center';
    label.style.fontWeight = '500';
    
    link.appendChild(img);
    link.appendChild(label);
    card.appendChild(link);
    
    // Add hover effect for desktop
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 24px 40px -16px rgba(0, 0, 0, 0.2)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = 'none';
    });
    
    // Touch feedback for mobile
    card.addEventListener('touchstart', () => {
      card.style.transform = 'translateY(-3px)';
    });
    card.addEventListener('touchend', () => {
      setTimeout(() => {
        card.style.transform = 'translateY(0)';
      }, 100);
    });
    
    return card;
  }
  
  // Function to create placeholder video card
  function createPlaceholderVideoCard(videoNum) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.style.cursor = 'pointer';
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    
    const img = document.createElement('img');
    img.src = `https://placehold.co/640x360/0b3b5f/white?text=${encodeURIComponent(`Video ${videoNum} - Coming Soon`)}`;
    img.alt = `Video ${videoNum}`;
    img.className = 'video-thumbnail';
    img.style.width = '100%';
    img.style.aspectRatio = '16/9';
    img.style.objectFit = 'cover';
    
    const label = document.createElement('div');
    label.className = 'video-label';
    label.textContent = `📹 Video ${videoNum} (Coming Soon)`;
    label.style.padding = '12px 16px';
    label.style.textAlign = 'center';
    label.style.fontWeight = '500';
    
    card.appendChild(img);
    card.appendChild(label);
    
    // Add hover effect for desktop
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 24px 40px -16px rgba(0, 0, 0, 0.2)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = 'none';
    });
    
    return card;
  }
  
  // ===== MY YOUTUBE VIDEO =====
 // Video 1: SITE VISIT 1 (Original)
const siteVisitCard1 = createYouTubeVideoCard('uqYhwlAPCR4', 'SITE VISIT 1 - Winter Wheat Initiative');
visibleContainer.appendChild(siteVisitCard1);

// Video 2: Sprinkler Application (YouTube Shorts)
const sprinklerVideo = createYouTubeVideoCard('IHsd4LdK5MM', 'Sprinkler Application');
visibleContainer.appendChild(sprinklerVideo);

// Video 3: SITE VISIT 2 (Previous)
const siteVisitCard2 = createYouTubeVideoCard('RqqlGHAMERE', 'SITE VISIT 2 - Winter Wheat Initiative');
visibleContainer.appendChild(siteVisitCard2);

// Video 4: Onion Cultivation Stages (NEW)
const onionVideo = createYouTubeVideoCard('CIXNGMS6LJc', 'Onion Cultivation Stages 04 - From Nursery to Transplant');
visibleContainer.appendChild(onionVideo);

  // Videos 5-24 for "More Videos" (All placeholders for now)
  for (let i = 5; i <= 24; i++) {
    moreContainer.appendChild(createPlaceholderVideoCard(i));
  }
  
  // Initially hide more container
  moreContainer.style.display = 'none';
  moreContainer.setAttribute('aria-hidden', 'true');
  moreBtn.setAttribute('aria-expanded', 'false');
  
  // Toggle more videos
  const toggleMoreVideos = (e) => {
    e.preventDefault();
    const isExpanded = moreBtn.getAttribute('aria-expanded') === 'true';
    const chevron = moreBtn.querySelector('.fa-chevron-down');
    
    if (isExpanded) {
      moreContainer.style.display = 'none';
      moreContainer.setAttribute('aria-hidden', 'true');
      moreBtn.setAttribute('aria-expanded', 'false');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    } else {
      moreContainer.style.display = 'grid';
      moreContainer.setAttribute('aria-hidden', 'false');
      moreBtn.setAttribute('aria-expanded', 'true');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
    }
  };
  
  moreBtn.addEventListener('click', toggleMoreVideos);
  moreBtn.addEventListener('touchstart', toggleMoreVideos);
  
  console.log('Video gallery initialized with YouTube video');
}

// ========== ACTIVE NAV HIGHLIGHT ==========
function updateActiveNav() {
  const sections = document.querySelectorAll('#home, #overview, #process, #vision, #videos, #footer');
  const navLinks = document.querySelectorAll('.nav-links a');
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);
window.addEventListener('resize', updateActiveNav);

// ========== FIX FOR IOS SAFARI 100VH ISSUE ==========
function setVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setVH);
window.addEventListener('load', setVH);
setVH();

// ========== INITIALIZE EVERYTHING ==========
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initPhases();
    initVideoGallery();
    setVH();
  });
} else {
  initPhases();
  initVideoGallery();
  setVH();
}

// ========== ADD TOUCH-FRIENDLY STYLES ==========
const style = document.createElement('style');
style.textContent = `
  /* Better touch targets for mobile */
  button, 
  .more-images-btn, 
  .more-videos-btn,
  .dark-mode-toggle,
  .burger-menu,
  .nav-links a,
  .dot {
    min-height: 44px;
    min-width: 44px;
  }
  
  /* Improve tap highlight on mobile */
  a, button, img, .dot {
    -webkit-tap-highlight-color: rgba(26, 115, 176, 0.3);
  }
  
  /* Prevent text selection on double-tap */
  img {
    user-select: none;
    -webkit-user-select: none;
  }
  
  /* Smooth lightbox transition */
  .lightbox {
    transition: opacity 0.2s ease;
  }
  
  /* Improve scroll behavior */
  html {
    scroll-behavior: smooth;
  }
  
  /* Better touch scrolling */
  .phase-more-grid,
  .video-more-grid {
    overflow-x: visible;
  }
  
  /* Phase grid responsiveness */
  @media (max-width: 768px) {
    .phase-visible-grid,
    .phase-more-grid {
      gap: 12px;
    }
  }
  
  /* Make video cards open on tap */
  .video-card a {
    display: block;
    text-decoration: none;
    color: inherit;
  }
`;
document.head.appendChild(style);

console.log('Selecta one Ethiopia — Fully compatible with PC, Tablet & Mobile (with YouTube video)');