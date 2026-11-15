/* 表示の調整（内容は変えず、見せ方だけ）。 */
(function () {
  var mob = window.matchMedia && matchMedia('(max-width:600px)').matches;
  // 口コミ：本文をまとめる（PCは左に名前・評価／右に本文、スマホは冒頭だけ＋「続きを読む」）
  document.querySelectorAll('.rv').forEach(function (c) {
    var ps = [].slice.call(c.querySelectorAll(':scope > p'));
    if (!ps.length) return;
    var box = document.createElement('div'); box.className = 'rvb';
    ps[0].parentNode.insertBefore(box, ps[0]);
    ps.forEach(function (p) { box.appendChild(p); });
    if (!mob) return;
    var b = document.createElement('button'); b.type = 'button'; b.className = 'rvm'; b.textContent = '続きを読む';
    b.onclick = function () { var o = c.classList.toggle('rv-open'); b.textContent = o ? '閉じる' : '続きを読む'; };
    box.parentNode.insertBefore(b, box.nextSibling);
  });
  // FAQ：最初は閉じておく（HTMLでも閉じてある）
  document.querySelectorAll('.faq details[open]').forEach(function (d) { d.removeAttribute('open'); });
})();
