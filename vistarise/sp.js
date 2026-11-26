/* 表示の調整（内容は変えず、見せ方だけ）。 */
(function () {
  var mq = window.matchMedia ? matchMedia('(max-width:767px)') : { matches: false };
  // ハンバーガーメニュー（スマホ・タブレット）：開閉・Escで閉じる・リンクを押したら閉じる・aria-expanded
  var nav = document.getElementById('gnav'), hb = document.querySelector('.hb');
  if (nav && hb) {
    var setOpen = function (o) {
      nav.classList.toggle('open', o);
      hb.setAttribute('aria-expanded', o ? 'true' : 'false');
      hb.setAttribute('aria-label', o ? 'メニューを閉じる' : 'メニューを開く');
    };
    hb.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); hb.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !e.target.closest('header')) setOpen(false);
    });
    var wide = window.matchMedia ? matchMedia('(min-width:1024px)') : null;
    if (wide && wide.addEventListener) wide.addEventListener('change', function (e) { if (e.matches) setOpen(false); });
  }
  // 口コミ：本文をまとめる（タブレット・PCは左に名前・評価／右に本文。どの幅でも冒頭だけ＋「続きを読む」）
  document.querySelectorAll('.rv').forEach(function (c) {
    var ps = [].slice.call(c.querySelectorAll(':scope > p'));
    if (!ps.length) return;
    var box = document.createElement('div'); box.className = 'rvb';
    ps[0].parentNode.insertBefore(box, ps[0]);
    ps.forEach(function (p) { box.appendChild(p); });
    var b = document.createElement('button'); b.type = 'button'; b.className = 'rvm'; b.textContent = '続きを読む';
    b.setAttribute('aria-expanded', 'false');
    b.onclick = function () { var o = c.classList.toggle('rv-open'); b.textContent = o ? '閉じる' : '続きを読む'; b.setAttribute('aria-expanded', o ? 'true' : 'false'); };
    var col = document.createElement('div'); col.className = 'rvc';
    box.parentNode.insertBefore(col, box); col.appendChild(box); col.appendChild(b);
    c.classList.add('has-rvm');
  });
  // お客様の変化：見出しの下の本文をたたむ（口コミと同じ「続きを読む」／「閉じる」）
  document.querySelectorAll('#change .case > .card').forEach(function (c) {
    var h = c.querySelector(':scope > h3'); if (!h) return;
    var ps = [].slice.call(c.querySelectorAll(':scope > h3 ~ p:not(.meta):not(.note)'));
    if (!ps.length) return;
    var box = document.createElement('div'); box.className = 'rvb cfb';
    ps[0].parentNode.insertBefore(box, ps[0]);
    ps.forEach(function (p) { box.appendChild(p); });
    var b = document.createElement('button'); b.type = 'button'; b.className = 'rvm'; b.textContent = '続きを読む';
    b.setAttribute('aria-expanded', 'false');
    b.onclick = function () { var o = c.classList.toggle('rv-open'); b.textContent = o ? '閉じる' : '続きを読む'; b.setAttribute('aria-expanded', o ? 'true' : 'false'); };
    box.parentNode.insertBefore(b, box.nextSibling);
    c.classList.add('has-rvm');
  });
  // 11/26 本番前チェック：段落・見出しの最後（と<br>の直前）の4文字を改行させない。1〜2文字や「。」「す」だけが次の行に残るのを防ぐ（文言は変えない）
  document.querySelectorAll('main p, main h2, main h3, main li, main dd, main summary, main .go, section p, section h2, section h3, section li, section dd, section summary, section .go').forEach(function (el) {
    if (el.closest('.ba2-row, .vvm3, .instagram-media')) return;
    var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), n, list = [];
    while ((n = w.nextNode())) list.push(n);
    list.forEach(function (t) {
      if (t.parentNode.classList && t.parentNode.classList.contains('nw')) return;
      var nx = t.nextSibling; while (nx && nx.nodeType === 3 && !nx.data.trim()) nx = nx.nextSibling;
      var atEnd = !nx || nx.nodeName === 'BR';
      if (!atEnd) { var p = t.parentNode; if (p !== el && !p.nextSibling && p.parentNode === el && !nx) atEnd = true; }
      if (!atEnd) return;
      var ch = Array.from(t.data.replace(/\s+$/, '')); if (ch.length < 8) return;
      var str = ch.join(''), sp0 = str.search(/\s\S*$/), k = 4;
      if (sp0 >= 0 && Array.from(str.slice(sp0 + 1)).length <= 8) k = Array.from(str.slice(sp0 + 1)).length; // 最後が空白で区切られた語なら、その語ごと
      if (k < 2) return;
      var tail = ch.slice(-k).join(''), head = ch.slice(0, -k).join('');
      var sp = document.createElement('span'); sp.className = 'nw'; sp.style.cssText = 'display:inline;white-space:nowrap;padding:0;margin:0;border:0;background:none;font:inherit;color:inherit'; sp.textContent = tail;
      t.data = head; t.parentNode.insertBefore(sp, t.nextSibling);
    });
  });
  // FAQ：最初は閉じておく（HTMLでも閉じてある）
  document.querySelectorAll('.faq details[open]').forEach(function (d) { d.removeAttribute('open'); });
})();
