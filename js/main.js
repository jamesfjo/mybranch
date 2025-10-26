// main.js — combined JS from your original single-file page (extracted).
// Save as js/main.js and ensure index.html loads it with: <script src="js/main.js" defer></script>

(function(){
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Tab'){
      document.documentElement.classList.add('kbd');
    }
  }, {once:true});

  document.querySelectorAll('.x88001').forEach(btn=>{
    btn.addEventListener('mousedown', ()=> btn.style.transform = 'translateY(0)');
    btn.addEventListener('mouseup',   ()=> btn.style.transform = '');
    btn.addEventListener('mouseleave',()=> btn.style.transform = '');
  });
})();

function updateHeaderHeight(){
  const top = document.getElementById('topbar');
  if(!top) return;
  const h = top.offsetHeight || 64;
  document.documentElement.style.setProperty('--header-height', h + 'px');
  const mainEl = document.querySelector('main');
  if(mainEl) mainEl.style.marginTop = h + 'px';
  window.dispatchEvent(new Event('resize'));
}
window.addEventListener('load', updateHeaderHeight);
window.addEventListener('resize', updateHeaderHeight);

function handleHeaderScroll(){
  const topbar = document.getElementById('topbar');
  if(!topbar) return;
  const isDesktop = window.innerWidth > 720;
  const scrolled = window.scrollY > 12;
  topbar.classList.toggle('scrolled', isDesktop && scrolled);
}
window.addEventListener('load', handleHeaderScroll);
window.addEventListener('scroll', handleHeaderScroll, { passive: true });
window.addEventListener('resize', handleHeaderScroll);

(function(){
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');
  const focusableSelector = 'a[href], button:not([disabled])';
  let lastFocusedEl = null;

  function openMenu(){
    lastFocusedEl = document.activeElement;
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    const firstLink = mobileNav.querySelector('a');
    if(firstLink) firstLink.focus();
    document.addEventListener('focus', trapFocus, true);
  }
  function closeMenu(){
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    document.removeEventListener('focus', trapFocus, true);
    if(lastFocusedEl) lastFocusedEl.focus();
  }
  function trapFocus(e){
    if(!mobileNav.classList.contains('open')) return;
    if(mobileNav.contains(e.target)) return;
    const first = mobileNav.querySelector(focusableSelector);
    if(first) first.focus();
    e.stopPropagation();
    e.preventDefault();
  }

  menuToggle?.addEventListener('click', function(){
    const isOpen = mobileNav.classList.contains('open');
    if(isOpen) closeMenu(); else openMenu();
  });
  mobileClose?.addEventListener('click', closeMenu);

  window.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  });

  mobileNav?.addEventListener('click', function(e){
    if(e.target === mobileNav) closeMenu();
  });

  mobileNav?.querySelectorAll('a[data-key]')?.forEach(a=>{
    a.addEventListener('click', (ev)=>{
      ev.preventDefault();
      const key = a.getAttribute('data-key');
      document.querySelectorAll('#mainNav a').forEach(m=> m.classList.toggle('active', m.getAttribute('data-key') === key));
      closeMenu();
    });
  });
})();

(function(){
  const nav = document.getElementById('mainNav');
  if(!nav) return;
  const links = Array.from(nav.querySelectorAll('a'));
  if(links.length) links[0].classList.add('active');

  links.forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      links.forEach(l=> l.classList.remove('active'));
      a.classList.add('active');
    });
    a.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        links.forEach(l=> l.classList.remove('active'));
        a.classList.add('active');
      }
    });
  });
})();

(function(){
  const track = document.getElementById('track');
  if(!track) return;
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('dots');
  const slider = document.getElementById('slider');
  let index = 0;
  const count = slides.length;
  let isDragging = false;
  let startX = 0;
  let autoplayID = null;
  const autoplayDelay = 180000;

  const hairVideos = [
    'assets/videos/hair1.mp4',
    'assets/videos/hair2.mp4',
    'assets/videos/hair3.mp4',
    'assets/videos/hair4.mp4',
    'assets/videos/hair5.mp4'
  ];

  function shuffle(a){ return a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]); }

  function assignRandomVideos(){
    const vids = shuffle(hairVideos.slice());
    slides.forEach((s,i)=>{
      const v = s.querySelector('.hero-video');
      if(!v) return;
      const pick = vids[i % vids.length];
      if(pick){
        v.src = pick;
        v.setAttribute('playsinline','');
        v.setAttribute('muted','');
        v.muted = true;
        v.loop = true;
        v.autoplay = true;
        v.addEventListener('canplay', ()=>{ v.play().catch(()=>{}); }, {once:true});
      }
    });
  }

  if (dotsContainer) {
    slides.forEach((s, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i===0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i+1));
      dot.addEventListener('click', ()=> goTo(i));
      dotsContainer.appendChild(dot);
    });
  }

  function setPosition(){
    track.style.width = `${count * 100}%`;
    slides.forEach(s => s.style.width = `${100 / count}%`);
    track.style.transform = `translateX(${-index * 100}%)`;
  }

  function playActive(){
    slides.forEach((s, i)=>{
      const v = s.querySelector('.hero-video');
      if(!v) return;
      if(i === index){
        v.currentTime = 0;
        v.play().catch(()=>{});
      } else {
        v.pause();
      }
    });
  }

  function goTo(i){
    index = (i + count) % count;
    setPosition();
    playActive();
    resetAutoplay();
  }

  prevBtn?.addEventListener('click', ()=> goTo(index - 1));
  nextBtn?.addEventListener('click', ()=> goTo(index + 1));

  window.addEventListener('keydown', e=>{
    if(e.key === 'ArrowLeft') prevBtn?.click();
    if(e.key === 'ArrowRight') nextBtn?.click();
  });

  track.addEventListener('pointerdown', startDrag, {passive:false});
  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointerleave', endDrag);
  track.addEventListener('pointercancel', endDrag);
  track.addEventListener('pointermove', moveDrag);

  function startDrag(e){
    isDragging = true;
    startX = e.clientX || (e.touches && e.touches[0].clientX);
    track.style.transition = 'none';
    try { e.target.setPointerCapture?.(e.pointerId); } catch (err) {}
    resetAutoplay();
  }
  function moveDrag(e){
    if(!isDragging) return;
    const currentX = e.clientX ?? startX;
    const diff = currentX - startX;
    const pct = (diff / slider.clientWidth) * 100;
    track.style.transform = `translateX(${ -index*100 + pct }%)`;
  }
  function endDrag(e){
    if(!isDragging) return;
    isDragging = false;
    const endX = e.clientX ?? startX;
    const diff = endX - startX;
    const threshold = slider.clientWidth * 0.15;
    track.style.transition = '';
    if(Math.abs(diff) > threshold){
      if(diff < 0) goTo(index + 1);
      else goTo(index - 1);
    } else {
      setPosition();
    }
  }

  function nextAuto(){ goTo(index + 1); }
  function startAutoplay(){ stopAutoplay(); autoplayID = setInterval(nextAuto, autoplayDelay); }
  function stopAutoplay(){ if(autoplayID) clearInterval(autoplayID); autoplayID = null; }
  function resetAutoplay(){ stopAutoplay(); startAutoplay(); }

  slider?.addEventListener('mouseenter', stopAutoplay);
  slider?.addEventListener('mouseleave', startAutoplay);
  window.addEventListener('resize', ()=> setPosition());

  assignRandomVideos();
  setPosition();
  playActive();
  startAutoplay();

  if('ontouchstart' in window && slider){
    const hint = document.createElement('div');
    hint.style.position = 'absolute';
    hint.style.left = '12px';
    hint.style.bottom = '12px';
    hint.style.color = 'rgba(255,255,255,0.9)';
    hint.style.fontWeight = '700';
    hint.style.fontSize = '13px';
    hint.style.zIndex = '60';
    hint.innerText = 'Swipe to change';
    slider.appendChild(hint);
    setTimeout(()=> hint.style.opacity = '0.6', 100);
  }
})();

// main.js — combined JavaScript (unchanged logic)
// Extracted from the original page. Save as /js/main.js and ensure index.html references it.

(function(){
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Tab'){
      document.documentElement.classList.add('kbd');
    }
  }, {once:true});

  document.querySelectorAll('.x88001').forEach(btn=>{
    btn.addEventListener('mousedown', ()=> btn.style.transform = 'translateY(0)');
    btn.addEventListener('mouseup',   ()=> btn.style.transform = '');
    btn.addEventListener('mouseleave',()=> btn.style.transform = '');
  });
})();

function updateHeaderHeight(){
  const top = document.getElementById('topbar');
  if(!top) return;
  const h = top.offsetHeight || 64;
  document.documentElement.style.setProperty('--header-height', h + 'px');
  const mainEl = document.querySelector('main');
  if(mainEl) mainEl.style.marginTop = h + 'px';
  window.dispatchEvent(new Event('resize'));
}
window.addEventListener('load', updateHeaderHeight);
window.addEventListener('resize', updateHeaderHeight);

function handleHeaderScroll(){
  const topbar = document.getElementById('topbar');
  if(!topbar) return;
  const isDesktop = window.innerWidth > 720;
  const scrolled = window.scrollY > 12;
  topbar.classList.toggle('scrolled', isDesktop && scrolled);
}
window.addEventListener('load', handleHeaderScroll);
window.addEventListener('scroll', handleHeaderScroll, { passive: true });
window.addEventListener('resize', handleHeaderScroll);

(function(){
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');
  const focusableSelector = 'a[href], button:not([disabled])';
  let lastFocusedEl = null;

  function openMenu(){
    lastFocusedEl = document.activeElement;
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    const firstLink = mobileNav.querySelector('a');
    if(firstLink) firstLink.focus();
    document.addEventListener('focus', trapFocus, true);
  }
  function closeMenu(){
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    document.removeEventListener('focus', trapFocus, true);
    if(lastFocusedEl) lastFocusedEl.focus();
  }
  function trapFocus(e){
    if(!mobileNav.classList.contains('open')) return;
    if(mobileNav.contains(e.target)) return;
    const first = mobileNav.querySelector(focusableSelector);
    if(first) first.focus();
    e.stopPropagation();
    e.preventDefault();
  }

  menuToggle?.addEventListener('click', function(){
    const isOpen = mobileNav.classList.contains('open');
    if(isOpen) closeMenu(); else openMenu();
  });
  mobileClose?.addEventListener('click', closeMenu);

  window.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  });

  mobileNav.addEventListener('click', function(e){
    if(e.target === mobileNav) closeMenu();
  });

  mobileNav.querySelectorAll('a[data-key]').forEach(a=>{
    a.addEventListener('click', (ev)=>{
      ev.preventDefault();
      const key = a.getAttribute('data-key');
      document.querySelectorAll('#mainNav a').forEach(m=> m.classList.toggle('active', m.getAttribute('data-key') === key));
      closeMenu();
    });
  });
})();

(function(){
  const nav = document.getElementById('mainNav');
  if(!nav) return;
  const links = Array.from(nav.querySelectorAll('a'));
  if(links.length) links[0].classList.add('active');

  links.forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      links.forEach(l=> l.classList.remove('active'));
      a.classList.add('active');
    });
    a.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        links.forEach(l=> l.classList.remove('active'));
        a.classList.add('active');
      }
    });
  });
})();

(function(){
  const track = document.getElementById('track');
  if(!track) return;
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('dots');
  const slider = document.getElementById('slider');
  let index = 0;
  const count = slides.length;
  let isDragging = false;
  let startX = 0;
  let autoplayID = null;
  const autoplayDelay = 180000;

  const hairVideos = [
    '/assets/videos/hair1.mp4',
    '/assets/videos/hair2.mp4',
    '/assets/videos/hair3.mp4',
    '/assets/videos/hair4.mp4',
    '/assets/videos/hair5.mp4'
  ];

  function shuffle(a){ return a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]); }

  function assignRandomVideos(){
    const vids = shuffle(hairVideos.slice());
    slides.forEach((s,i)=>{
      const v = s.querySelector('.hero-video');
      if(!v) return;
      const pick = vids[i % vids.length];
      if(pick){
        v.src = pick;
        v.setAttribute('playsinline','');
        v.setAttribute('muted','');
        v.muted = true;
        v.loop = true;
        v.autoplay = true;
        v.addEventListener('canplay', ()=>{ v.play().catch(()=>{}); }, {once:true});
      }
    });
  }

  if (dotsContainer) {
    slides.forEach((s, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i===0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i+1));
      dot.addEventListener('click', ()=> goTo(i));
      dotsContainer.appendChild(dot);
    });
  }

  function setPosition(){
    track.style.width = `${count * 100}%`;
    slides.forEach(s => s.style.width = `${100 / count}%`);
    track.style.transform = `translateX(${-index * 100}%)`;
  }

  function playActive(){
    slides.forEach((s, i)=>{
      const v = s.querySelector('.hero-video');
      if(!v) return;
      if(i === index){
        v.currentTime = 0;
        v.play().catch(()=>{});
      } else {
        v.pause();
      }
    });
  }

  function goTo(i){
    index = (i + count) % count;
    setPosition();
    playActive();
    resetAutoplay();
  }

  prevBtn?.addEventListener('click', ()=> goTo(index - 1));
  nextBtn?.addEventListener('click', ()=> goTo(index + 1));

  window.addEventListener('keydown', e=>{
    if(e.key === 'ArrowLeft') prevBtn?.click();
    if(e.key === 'ArrowRight') nextBtn?.click();
  });

  track.addEventListener('pointerdown', startDrag, {passive:false});
  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointerleave', endDrag);
  track.addEventListener('pointercancel', endDrag);
  track.addEventListener('pointermove', moveDrag);

  function startDrag(e){
    isDragging = true;
    startX = e.clientX || (e.touches && e.touches[0].clientX);
    track.style.transition = 'none';
    try { e.target.setPointerCapture?.(e.pointerId); } catch (err) {}
    resetAutoplay();
  }
  function moveDrag(e){
    if(!isDragging) return;
    const currentX = e.clientX ?? startX;
    const diff = currentX - startX;
    const pct = (diff / slider.clientWidth) * 100;
    track.style.transform = `translateX(${ -index*100 + pct }%)`;
  }
  function endDrag(e){
    if(!isDragging) return;
    isDragging = false;
    const endX = e.clientX ?? startX;
    const diff = endX - startX;
    const threshold = slider.clientWidth * 0.15;
    track.style.transition = '';
    if(Math.abs(diff) > threshold){
      if(diff < 0) goTo(index + 1);
      else goTo(index - 1);
    } else {
      setPosition();
    }
  }

  function nextAuto(){ goTo(index + 1); }
  function startAutoplay(){ stopAutoplay(); autoplayID = setInterval(nextAuto, autoplayDelay); }
  function stopAutoplay(){ if(autoplayID) clearInterval(autoplayID); autoplayID = null; }
  function resetAutoplay(){ stopAutoplay(); startAutoplay(); }

  slider?.addEventListener('mouseenter', stopAutoplay);
  slider?.addEventListener('mouseleave', startAutoplay);
  window.addEventListener('resize', ()=> setPosition());

  assignRandomVideos();
  setPosition();
  playActive();
  startAutoplay();

  if('ontouchstart' in window && slider){
    const hint = document.createElement('div');
    hint.style.position = 'absolute';
    hint.style.left = '12px';
    hint.style.bottom = '12px';
    hint.style.color = 'rgba(255,255,255,0.9)';
    hint.style.fontWeight = '700';
    hint.style.fontSize = '13px';
    hint.style.zIndex = '60';
    hint.innerText = 'Swipe to change';
    slider.appendChild(hint);
    setTimeout(()=> hint.style.opacity = '0.6', 100);
  }
})();

(function(){
  const right = document.getElementById('promoRight');
  const overlay = document.getElementById('videoOverlay');
  const frameHost = document.getElementById('videoFrame');
  const closeBtn = document.getElementById('videoClose');

  function openVideo(src){
    if(!src) return;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
    frameHost.innerHTML = '<iframe allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen src="'+src+'"></iframe>';
    closeBtn?.focus();
  }

  function closeVideo(){
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
    frameHost.innerHTML = '';
    right?.focus();
  }

  right?.addEventListener('click', ()=>{
    openVideo(right.dataset.video || 'https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&rel=0');
  });
  right?.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      right.click();
    }
  });

  closeBtn?.addEventListener('click', closeVideo);
  overlay?.addEventListener('click', (e)=>{ if(e.target === overlay) closeVideo(); });
  window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && overlay.classList.contains('open')) closeVideo(); });
})();

(function(){
  const el = document.getElementById('ml-year');
  if(el) el.textContent = new Date().getFullYear();
  const btn = document.getElementById('ml-news-submit');
  const input = document.getElementById('ml-news-email');
  if(btn && input){
    btn.addEventListener('click', function(){
      const email = input.value.trim();
      if(!email || !/^\S+@\S+\.\S+$/.test(email)){
        input.style.outline = '2px solid rgba(255,100,80,0.9)';
        input.focus();
        return;
      }
      btn.textContent = 'Sent';
      btn.disabled = true;
      input.value = '';
      setTimeout(()=>{ btn.textContent = 'Send'; btn.disabled = false; }, 2200);
    });
  }
})();