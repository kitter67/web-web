// Dropdown Setting
function toggleDropdown() {
  const dropdown = document.getElementById('settingsDropdown');
  dropdown.classList.toggle('hidden');
  // Close if click outside
  document.addEventListener('click', function handler(e) {
    if (!e.target.closest('.dropdown')) {
      dropdown.classList.add('hidden');
      document.removeEventListener('click', handler);
    }
  });
}

// Popup Panel
function openSection(id) {
  document.getElementById('settingsDropdown').classList.add('hidden');
  document.querySelectorAll('.popup').forEach(p => p.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
function closePopup(id) {
  document.getElementById(id).classList.add('hidden');
}

// Music Player
let currentAudio = null;
function playMusic(src, title) {
  const audio = document.getElementById('audioPlayer');
  if (audio.src !== location.origin + '/' + src && audio.src !== location.origin + src) {
    audio.src = src;
  }
  audio.play();
  document.getElementById('nowPlaying').textContent = title;
  currentAudio = audio;
}

// Background Video
function changeBackgroundVideo(src) {
  const bgVideo = document.getElementById('bgVideo');
  bgVideo.src = src;
  bgVideo.play();
  closePopup('backgroundVideo');
}

// Card Flip
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
      card.classList.toggle('flipped');
    });
  });
});


// glery
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const allBtn = document.getElementById('all-btn');
    const horizontalBtn = document.getElementById('horizontal-btn');
    const verticalBtn = document.getElementById('vertical-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterLinks = document.querySelectorAll('.gallery-filter-link');
    function setActiveButton(activeBtn) {
        filterLinks.forEach(link => link.classList.remove('active'));
        activeBtn.classList.add('active');
    }
    allBtn.addEventListener('click', function(e) {
        e.preventDefault();
        setActiveButton(this);
        galleryItems.forEach(item => {
            item.style.display = 'inline-block';
        });
    });
    horizontalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        setActiveButton(this);
        galleryItems.forEach(item => {
            if (item.getAttribute('data-type') === 'horizontal') {
                item.style.display = 'inline-block';
            } else {
                item.style.display = 'none';
            }
        });
    });
    verticalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        setActiveButton(this);
        galleryItems.forEach(item => {
            if (item.getAttribute('data-type') === 'vertical') {
                item.style.display = 'inline-block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxClose = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;
    const visibleItems = () => Array.from(galleryItems).filter(item => item.style.display !== 'none');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const items = visibleItems();
            currentIndex = items.indexOf(this);
            const img = this.querySelector('img');
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const items = visibleItems();
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateLightbox(items[currentIndex]);
    });
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const items = visibleItems();
        currentIndex = (currentIndex + 1) % items.length;
        updateLightbox(items[currentIndex]);
    });
    function updateLightbox(item) {
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxTitle.textContent = title;
        lightboxDescription.textContent = description;
    }
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
});