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

// スムーススクロール
// → ページ内リンクをクリックしたとき滑らかにスクロール
document.addEventListener('DOMContentLoaded', () => {
  // スムーススクロール（同一ページ内のアンカーリンク）
  document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      const hash = href.includes('#') ? '#' + href.split('#')[1] : null;
      if (!hash) return;
      // 同一ページ内のリンクのみスムーススクロール
      const isSamePage = href.startsWith('#') || href.startsWith('/#') || href.startsWith(location.pathname + '#');
      if (isSamePage && location.pathname === '/' || location.pathname.endsWith('/index.html')) {
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // フォームバリデーション表示
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', e => {
      form.parentElement.classList.add('was-validated');
      if (!form.checkValidity()) {
        e.preventDefault();
      }
    });
  }

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
