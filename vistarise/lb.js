/* 写真の拡大表示（ライトボックス）。PC・スマホ共通。クリック/タップで開き、背景・×・Escで閉じる。←→で前後。 */
(function () {
  var page = (location.pathname.split("/").pop() || "index.html");
  var SEL = {
    "index.html": ".bam img, #change .case .im img",
    "kids.html": ".kg img, .kcimg img, .case .im img",
    "bodymake.html": "#ba img, #ach-ph img, .tr .ph img"
  }[page];
  if (!SEL) return;
  var imgs = [].slice.call(document.querySelectorAll(SEL));
  if (!imgs.length) return;
  var box = document.createElement("div");
  box.id = "lb"; box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true");
  box.innerHTML = '<button type="button" class="lb-x" aria-label="閉じる">×</button><button type="button" class="lb-p" aria-label="前へ">‹</button><figure><img alt=""><figcaption></figcaption></figure><button type="button" class="lb-n" aria-label="次へ">›</button>';
  document.body.appendChild(box);
  var im = box.querySelector("img"), cap = box.querySelector("figcaption"), cur = 0, group = imgs;
  function show(i) { cur = (i + group.length) % group.length; var g = group[cur]; im.src = g.currentSrc || g.src; im.alt = g.alt || ""; cap.textContent = g.alt || ""; box.classList.toggle("one", group.length < 2); }
  function open(el) {
    var sec = el.closest("section"); group = imgs.filter(function (x) { return x.closest("section") === sec; });
    show(group.indexOf(el)); box.classList.add("on"); document.documentElement.classList.add("lb-lock");
  }
  function close() { box.classList.remove("on"); document.documentElement.classList.remove("lb-lock"); }
  imgs.forEach(function (el) {
    el.classList.add("zoomable"); el.setAttribute("tabindex", "0");
    el.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); open(el); });
    el.addEventListener("keydown", function (e) { if (e.key === "Enter") open(el); });
  });
  box.addEventListener("click", function (e) { if (e.target === box || e.target.classList.contains("lb-x") || e.target.tagName === "FIGURE") close(); });
  box.querySelector(".lb-p").addEventListener("click", function (e) { e.stopPropagation(); show(cur - 1); });
  box.querySelector(".lb-n").addEventListener("click", function (e) { e.stopPropagation(); show(cur + 1); });
  document.addEventListener("keydown", function (e) { if (!box.classList.contains("on")) return; if (e.key === "Escape") close(); if (e.key === "ArrowLeft") show(cur - 1); if (e.key === "ArrowRight") show(cur + 1); });
})();
