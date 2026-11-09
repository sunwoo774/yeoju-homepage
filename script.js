(function(){
  "use strict";

  /* 모바일 메뉴 토글 */
  var btn = document.getElementById('menuBtn');
  var menu = document.getElementById('mMenu');
  if (btn && menu) {
    btn.addEventListener('click', function(){
      var open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* 사진 라이트박스 (클릭 시 확대) */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightboxImg');
  var lbClose = document.getElementById('lightboxClose');
  if (lb && lbImg) {
    function openLightbox(src, alt){
      lbImg.src = src;
      lbImg.alt = alt || '';
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
    }
    function closeLightbox(){
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      lbImg.src = '';
    }
    document.querySelectorAll('img[data-lightbox]').forEach(function(img){
      img.addEventListener('click', function(){
        openLightbox(img.currentSrc || img.src, img.alt);
      });
    });
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    lb.addEventListener('click', function(e){
      if (e.target === lb) closeLightbox();
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* 현장 기록 섹션: 스크롤 진입 시 절제된 등장 효과 */
  var revealItems = document.querySelectorAll('.case, .svc-card, .hero-proof > div');
  if ('IntersectionObserver' in window && revealItems.length) {
    revealItems.forEach(function(item, index){
      item.classList.add('will-reveal');
      item.style.setProperty('--reveal-delay', Math.min(index % 4, 3) * 70 + 'ms');
    });
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function(item){ observer.observe(item); });
  }
})();
