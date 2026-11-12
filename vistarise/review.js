/* 確認マーク（テスト用）。本番では review.js の読み込みと .confirm-note の要素を消すだけで全部消える。?review=0 で非表示。 */
(function () {
  var N = [
    [1, "index.html", "トップ／ファーストビュー", "写真を「トレーニング指導風景」に差し替えました。この写真でよいですか？"],
    [2, "index.html", "トップ／お悩み", "「猫背・巻き肩、姿勢を改善したい」をお悩みのひとつとして入れました。この入れ方で合っていますか？"],
    [3, "index.html", "トップ／VISTARISEの理念", "この節は、いただいた並び順にはない節です。この位置のままでよいですか？"],
    [4, "index.html", "トップ／お客様の変化（写真）", "写真枠は横3:2（例：1500×1000px）にそろえました。ACL・T.K様・K.C様のビフォーアフターの元写真をいただけますか？こちらでこの比率に作ります。"],
    [5, "index.html", "トップ／お客様の変化（掲載許可）", "事例の4名（ACLの女性・T.K様・S.W様・K.C様）の掲載許可は取れていますか？"],
    [6, "index.html", "トップ／お客様の変化（S.W様）", "S.W様の紹介文（詳細）をいただけますか？"],
    [7, "index.html", "トップ／お客様の変化（K.C様）", "K.C様の紹介文をいただけますか？"],
    [8, "index.html", "トップ／口コミ", "五十嵐様・阿部様・林様の口コミ本文をいただけますか？お名前の表記（フルネーム／イニシャルなど）もご指定ください。"],
    [9, "index.html", "トップ／トレーナー（経歴）", "バッジを「医療機関での医師・療法士と連携したトレーニング指導6年」に変えました。サブコピー・紹介文・FAQ・検索用の説明文にある「病院のリハビリ現場で6年」も同じ表現にそろえますか？"],
    [10, "index.html", "トップ／トレーナー（バッジの数）", "経歴バッジは「3つ」のご指示でしたが、今は5つ（大会実績3件を個別に表示）です。3つにまとめますか？"],
    [11, "index.html", "トップ／3つのコース（不調改善・ダイエット）", "この写真には女性が写っています。顔が分かる状態で掲載してよいですか？"],
    [12, "index.html", "トップ／3つのコース（キッズ）", "いただいた写真に差し替える予定です。写真データを再送いただけますか（オリジナル画質）？"],
    [13, "kids.html", "キッズ／サポート選手の様子", "羽島選手の顔が写っています（ページには「顔はぼかしています」の注記があります）。このまま掲載してよいですか？"],
    [14, "kids.html", "キッズ／お子様の変化・成果（タグ）", "見出しを「お子様の変化・成果」にしました。タグの「お子さん・卓球」も「お子様」にそろえますか？"],
    [15, "kids.html", "キッズ／お子様の変化・成果（左）", "左の枠に入れる写真をお待ちしています（届いたのは1枚だけでした）。"],
    [16, "kids.html", "キッズ／お子様の変化・成果（真ん中）", "真ん中はイメージ画像にします。手持ちに子どもを指導している写真がないため、ご提供いただくか、こちらで用意してよいか教えてください。"],
    [17, "kids.html", "キッズ／インターハイの事例", "「拾った画像で参考ですが、インターハイの部分に」の続きと、参考の画像を教えてください。"],
    [18, "kids.html", "キッズ／お子様の変化・成果（右）", "右の枠に入れる写真をお待ちしています。"],
    [19, "kids.html", "キッズ／お子様の変化・成果（詳細）", "左（小学生）と右（お子様・卓球）の事例の詳細文をいただけますか？"],
    [20, "bodymake.html", "ボディメイク／ボディメイクの変化", "3件それぞれの期間と頻度をいただけますか？"],
    [21, "bodymake.html", "ボディメイク／ボディメイクの変化（画像）", "「体脂肪率-17%」の同じ画像が、1件目（5ヶ月で体質改善）と3件目（リコンプ）の両方に入っています。どちらの事例の画像ですか？もう一方の事例の画像もいただけますか？"],
    [22, "bodymake.html", "ボディメイク／大会実績（吉田選手）", "ポスターの戦績に差し替えました。ポスターにない「2026 BBJ関東大会 モデルジャパン部門グランプリ」（Instagram投稿より）もリストに加えますか？"],
    [23, "bodymake.html", "ボディメイク／大会実績（神田選手・中島選手）", "ポスターがない神田選手・中島選手も、実績リストに残してよいですか？"],
    [24, "bodymake.html", "ボディメイク／大会実績（顔出し）", "選手のポスター・写真は顔が写っています。各選手の掲載許可は取れていますか？"],
    [25, "bodymake.html", "ボディメイク／くにちゃんの競技実績（写真）", "使う写真は、Instagram固定投稿の右（正面ポーズ）で合っていますか？元の画像データをいただけますか？"]
  ];
  var q = new URLSearchParams(location.search);
  if (q.get("review") === "0") { document.documentElement.classList.add("review-off"); return; }
  var here = (location.pathname.split("/").pop() || "index.html");
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function run() {
    document.querySelectorAll(".confirm-note[data-n]").forEach(function (el) {
      var n = +el.getAttribute("data-n"), d = N[n - 1];
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
