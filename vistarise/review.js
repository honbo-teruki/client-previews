/* 確認マーク（テスト用）。本番では review.js の読み込みと .confirm-note の要素を消すだけで全部消える。?review=0 で非表示。 */
(function () {
  var N = [
    [1, "index.html", "トップ／ファーストビュー", "写真を高画質の指導風景（姿勢チェック）に差し替えました。ご希望の「サイドレイズを指導している画像」が届きしだい差し替えます。写真をお送りいただけますか？"],
    [31, "index.html", "トップ／VISTARISEの理念", "11/3に「VVMをもう少し外部向けにマイルドな表現に」とのことでした。外部向けに書き直した案をこちらで作ってよいですか？変えたくない言葉があれば教えてください。"],
    [4, "index.html", "トップ／お客様の変化（写真）", "写真枠は横3:2です。T.K様・K.C様のビフォーアフターの元写真（ACLの40代女性は11/15に入れました）をいただけますか？こちらでこの比率に作ります。"],
    [35, "index.html", "トップ／お客様の変化（40代女性・ACL）", "女性の立ち姿3枚をACLの40代女性の写真として入れました。11/3に「女性顔出しのものはまだ使えないので、切り取るか、削除して使ってもらえると！」とのことだったので、顔はぼかしています。写真の時計は時刻だけで日付がないため、ビフォー（黒のポロシャツ）とアフター（ベージュのTシャツ・正面と横）の並びは仮です。この事例の写真で合っていますか？どれがビフォーで、どれがアフターですか？"],
    [41, "index.html", "トップ／理念（やわらかい表現の案）", "確認31を受けて、こちらで外部向けにやわらかく言い換えた【案】です（オレンジの点線の3枚）。上の3枚はいただいた原文のままです。どちらを使うか、変えたくない言葉があれば教えてください。"],
    [26, "index.html", "トップ／お客様の変化（K.C様）", "「ここの内容はカットでよいかも」を受けて、紹介文の欄を外しました。K.C様の事例ごと外す場合は教えてください。"],
    [40, "index.html", "トップ／お客様の変化（ボディメイク）", "ボディメイクのビフォーアフター3枚を、トップにも小さく載せました（第2弾では競技系の事例はボディメイクページへ、とのことでした）。トップに載せてよいですか？"],
    [42, "index.html", "トップ／口コミ（PCの並べ方）", "PCでは縦に長くなりすぎないよう、左に名前と評価、右に本文を置き、薄い線で区切りました（スマホは冒頭だけ＋「続きを読む」）。この形でよいか、一旦このまま確認します。"],
    [30, "index.html", "トップ／口コミ（H.H様）", "林様（H.H様）の口コミ原文に「BISTARIZE 藤田さん」という表記があります。原文のまま載せますか？この部分だけ省きますか？"],
    [44, "index.html", "トップ／3つのコース（ボディメイクの写真）", "MR.MODEL NIIGATAのタスキの4人の写真を仮に入れました。トップ用の「もっと鍛えている印象」の写真が届きしだい差し替えます。"],
    [36, "kids.html", "キッズ／写真（円盤投げ・棒の姿勢づくり）", "円盤投げの写真をトップのキッズコース、棒で姿勢をつくる写真を右の事例に入れました。この割り当てでよいですか？お子様の顔はこのまま出してよいですか？（11/15 本保さん：お子様の顔は一旦このまま出してOK）"],
    [34, "index.html", "トップ／お客様インタビュー（K.T様）", "「#01 client STORY」5枚（K.T様）は、STORY NO.1の中身として載せる素材ですか？本文に実名「高瀬さん」が入っていますが、イニシャルに直しますか？掲載許可は取れていますか？"],
    [14, "kids.html", "キッズ／お子様の変化・成果（タグ）", "見出しを「お子様の変化・成果」にしました。タグも「お子様・卓球」にそろえました（11/15 本保さんの指示で「お子様」に統一）。"],
    [37, "kids.html", "キッズ／お子様の変化・成果（左）", "トレーナーと男の子が吊り輪にぶら下がる写真を入れました（11/15 本保さんより）。チューブ・ボールの写真の代わりにこの写真を使う形でよいですか？"],
    [27, "kids.html", "キッズ／インターハイの事例", "11/1に送っていただいた参考画像（「拾った画像で参考ですが、インターハイの部分に」）の件です。インターハイの部分をどうしたいか（似たイメージ写真を入れる、など）を教えてください。"],
    [28, "kids.html", "キッズ／お子様の変化・成果（詳細文）", "いただいた文面を、1段落目は左（小学生）、2段落目は右（お子様・卓球）に入れました。この入れ方でよいですか？（表記は「お子様」に統一済み）"],
    [29, "bodymake.html", "ボディメイク／ボディメイクの変化（頻度）", "期間（5ヶ月・5ヶ月・3ヶ月）を入れました。それぞれの頻度（週◯回）も教えてください。"],
    [32, "bodymake.html", "ボディメイク／大会実績（2026 BBJ新潟大会）", "8/29の「ベストボディ・ジャパン2026新潟大会」の結果（グランプリ2名・3位1名）を実績に載せますか？載せる場合は選手名と部門を教えてください。（いただいたPDFは当日の進行表と選手名簿で、順位は載っていませんでした）"],
    [33, "bodymake.html", "ボディメイク／大会実績（神田選手＝Y.K様）", "神田さんとY.K様の実績を1つにまとめ、「神田選手」の表記にしました。この表記でよいですか？インタビューのSTORY NO.2（Y.K様）も同じ方ですか？"],
    [45, "kids.html", "キッズ／お子様の変化・成果（真ん中・高校生・卓球）", "新潟日報の記事（県中学体育大会2025・7月12日）の「女子団体で優勝した黒埼の主将、笹川彩桜」の写真を、テストとして入れています（出典：新潟日報）。新聞社の写真は、そのままでは使えず利用申請が必要です。同じ場面の写真をご本人・親御さんからいただけますか？また、記事は中学の大会ですが、この事例（高校生・インターハイ）の写真として合っていますか？"],
    [46, "index.html", "トップ／お客様インタビュー（並び順・リンク）", "インタビュー画像に書かれた番号（#01 K.T様・#02 Y.K様・#03 S.W様）に合わせて並べ替えました。K.T様はVISTARISEのInstagram投稿を埋め込み、投稿へ移動できるようにしました。Y.K様・S.W様の投稿のURLを教えていただけますか？"],
    [47, "index.html", "トップ／サポート選手の大会実績（位置）", "「サポート選手の大会実績」を、ページ下部から「ボディメイク・肉体改革コースの変化」と口コミの間に移しました。この位置でよいですか？"],
    [43, "bodymake.html", "ボディメイク／サポート選手の大会実績（8名）", "高橋・中島・渡辺・稲田・藤井・村井・吉田・神田の8名のサポートアスリート紹介画像（アルバムの画像）を載せました。押すと大きく見られます。渡辺選手は、下の実績リストに載せる文面がまだないため画像のみです。文面をいただけますか？"],
    [39, "bodymake.html", "ボディメイク／くにちゃんの競技実績（写真）", "BEST BODY JAPAN 2023のポーズ写真に差し替えました。11/12には「インスタトップ、右側の写真」とのことでしたが、この写真でよいですか？"]
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
