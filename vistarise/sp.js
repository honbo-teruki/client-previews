/* スマホ表示の調整（内容は変えず、見せ方だけ）。PC（601px以上）では何もしない。 */
(function () {
  if (!window.matchMedia || !matchMedia('(max-width:600px)').matches) return;
  // FAQ：スマホでは最初は閉じておく（押すと開く）
  document.querySelectorAll('.faq details[open]').forEach(function (d) { d.removeAttribute('open'); });
  // 口コミ：冒頭だけ見せて「続きを読む」で全文
  document.querySelectorAll('.rv').forEach(function (c) {
    var ps = [].slice.call(c.querySelectorAll(':scope > p'));
    if (!ps.length) return;
    var box = document.createElement('div'); box.className = 'rvb';
    ps[0].parentNode.insertBefore(box, ps[0]);
    ps.forEach(function (p) { box.appendChild(p); });
    var b = document.createElement('button'); b.type = 'button'; b.className = 'rvm'; b.textContent = '続きを読む';
    b.onclick = function () { var o = c.classList.toggle('rv-open'); b.textContent = o ? '閉じる' : '続きを読む'; };
    box.parentNode.insertBefore(b, box.nextSibling);
  });
})();
