// Shows the page in one language: ?lang=xx, then the visitor's last choice, then the browser's language, else English.
(function () {
  var langs = ['en', 'ro', 'fr', 'de'];
  function pick() {
    var q = new URLSearchParams(location.search).get('lang');
    if (langs.indexOf(q) >= 0) return q;
    try { var s = localStorage.getItem('lang'); if (langs.indexOf(s) >= 0) return s; } catch (e) {}
    var list = navigator.languages || [navigator.language || 'en'];
    for (var i = 0; i < list.length; i++) {
      var code = String(list[i]).slice(0, 2).toLowerCase();
      if (langs.indexOf(code) >= 0) return code;
    }
    return 'en';
  }
  function show(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('section[data-l]').forEach(function (s) {
      s.classList.toggle('on', s.getAttribute('data-l') === lang);
    });
    document.querySelectorAll('.langs button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
    var on = document.querySelector('section[data-l].on h1');
    if (on) document.title = on.textContent + ' · Bi-Fuel Tracker';
    document.querySelectorAll('a[data-keep-lang]').forEach(function (a) {
      a.href = a.getAttribute('href').split('?')[0] + '?lang=' + lang;
    });
  }
  document.documentElement.classList.add('js');
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.langs button').forEach(function (b) {
      b.addEventListener('click', function () {
        var l = b.getAttribute('data-lang');
        try { localStorage.setItem('lang', l); } catch (e) {}
        show(l);
      });
    });
    show(pick());
  });
})();
