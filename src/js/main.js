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
  // スムーススクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
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
  document.querySelectorAll('.section-bg-gray > *, .section-bg-white > *, .cta-text, .button-container').forEach(el => {
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
