// ヘッダーのスクロール時のクラス付与
// → スクロールすると影が変わるエフェクト
// → ページトップへ戻るボタンの表示/非表示
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (header) header.classList.toggle('scrolled', window.scrollY > 5);

  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) backToTop.classList.toggle('is-visible', window.scrollY > 300);
});

// ページトップへ戻るボタン
document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// ヒーローのスライドショー
// → 背景写真を一定の間隔で切り替える（切り替えのフェードは CSS の transition）
// → 動きを減らす設定の閲覧者には切り替えず、最初の写真のままにする
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length < 2) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let current = [...slides].findIndex(slide => slide.classList.contains('is-active'));
  if (current < 0) current = 0;
  setInterval(() => {
    slides[current].classList.remove('is-active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('is-active');
  }, 5000);
});

// スムーススクロール
// → ページ内リンクをクリックしたとき滑らかにスクロール
document.addEventListener('DOMContentLoaded', () => {
  // スムーススクロール（同一ページ内のアンカーリンク）
  const isIndexPage = location.pathname.endsWith('/') || location.pathname.endsWith('/index.html');
  if (isIndexPage) {
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const href = anchor.getAttribute('href');
        const hash = href.includes('#') ? '#' + href.split('#')[1] : null;
        if (!hash) return;
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // メールアドレスの mailto リンク化
  // → HTML には全角の＠で書いておき、ここで半角のアドレスと件名入りのリンクに組み立てる
  document.querySelectorAll('.contact-mail-address').forEach(el => {
    const { user, domain, subject } = el.dataset;
    if (!user || !domain) return;
    const address = `${user}@${domain}`;
    const link = document.createElement('a');
    link.href = `mailto:${address}` + (subject ? `?subject=${encodeURIComponent(subject)}` : '');
    link.textContent = address;
    el.replaceChildren(link);
    // 半角で表示できたので、全角の＠についての注記は不要
    const note = el.parentElement.querySelector('.contact-mail-note');
    if (note) note.hidden = true;
  });

  // スクロール表示アニメーション
  // セクションにfade-inクラスを付与
  document.querySelectorAll('.section-bg-gray > *, .section-bg-white > *').forEach(el => {
    el.classList.add('fade-in');
  });

  // 製品カードに段階的アニメーション用クラスを付与
  document.querySelectorAll('.card-modern').forEach((card, i) => {
    card.classList.add('fade-in-card');
    card.style.transitionDelay = `${i % 3 * 0.1}s`;
  });

  // Intersection Observerで画面内に入ったら表示
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-in, .fade-in-card').forEach(el => {
    observer.observe(el);
  });
});
