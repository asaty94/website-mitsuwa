// ヘッダーのスクロール時のクラス付与
// → スクロールすると影が変わるエフェクト
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (header) header.classList.toggle('scrolled', window.scrollY > 5);
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
});
