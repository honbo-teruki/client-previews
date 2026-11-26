/* 確認マーク（テスト用）。本番では review.js の読み込みと .confirm-note の要素を消すだけで全部消える。?review=0 で非表示。 */
(function () {
  var N = [
    [29, "bodymake.html", "ボディメイク／ボディメイクの変化（頻度）", "期間（5ヶ月・5ヶ月・3ヶ月）を入れました。それぞれの頻度（週◯回）も教えてください。"],
    [33, "bodymake.html", "ボディメイク／大会実績（神田選手＝Y.K様）", "Y.K選手の実績を1つにまとめ、Instagramアカウントの記述は「神田選手」にしています。この表記でよいですか？"],
    [43, "bodymake.html", "ボディメイク／サポート選手の大会実績（8名）", "高橋・中島・稲田・藤井・村井・吉田・神田の7名のサポートアスリート紹介画像を載せています。押すと大きく見られます。"],
  ];
  var q = new URLSearchParams(location.search);
  if (q.get("review") === "0") { document.documentElement.classList.add("review-off"); return; }
  var here = (location.pathname.split("/").pop() || "index.html");
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function run() {
    document.querySelectorAll(".confirm-note[data-n]").forEach(function (el) {
      var n = +el.getAttribute("data-n"), d = N.filter(function (x) { return x[0] === n; })[0];
      if (!d) return;
      el.id = "cn" + n;
      el.innerHTML = "<b>確認" + pad(n) + "</b><span>" + esc(d[3]) + "</span>";
    });
    var p = document.createElement("div");
    p.id = "review-panel";
    var html = '<button type="button" class="rp-btn">確認事項 ' + N.length + '件</button><div class="rp-box"><div class="rp-head"><b>先方への確認事項</b><button type="button" class="rp-hide">マークを隠す</button></div><ol>';
    var pages = [[here]], order = ["index.html", "kids.html", "bodymake.html"];
    order.forEach(function (pg) {
      N.filter(function (d) { return d[1] === pg; }).forEach(function (d) {
        var href = (pg === here ? "" : pg) + "#cn" + d[0];
        html += '<li><a href="' + href + '"><b>確認' + pad(d[0]) + "</b> " + esc(d[2]) + "<small>" + esc(d[3]) + "</small></a></li>";
      });
    });
    html += "</ol><p>テスト用の表示です。本番では消します。</p></div>";
    p.innerHTML = html;
    document.body.appendChild(p);
    if (q.get("panel") === "1") p.classList.add("open");
    p.querySelector(".rp-btn").onclick = function () { p.classList.toggle("open"); };
    p.querySelector(".rp-hide").onclick = function () {
      var off = document.documentElement.classList.toggle("marks-hidden");
      this.textContent = off ? "マークを表示" : "マークを隠す";
    };
    p.querySelectorAll("li a").forEach(function (a) { a.addEventListener("click", function () { if (window.innerWidth < 760) p.classList.remove("open"); document.documentElement.classList.remove("marks-hidden"); }); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
