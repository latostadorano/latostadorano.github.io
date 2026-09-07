(function () {
  var STORAGE_KEY = 'lang';
  var lang = 'en';
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'es' || saved === 'en') lang = saved;
  } catch (e) {}

  function apply(l) {
    document.documentElement.setAttribute('lang', l);
    document.querySelectorAll('[data-en-html]').forEach(function (el) {
      var val = el.getAttribute('data-' + l + '-html');
      if (val !== null) el.innerHTML = val;
    });
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var val = el.getAttribute('data-' + l);
      if (val !== null) el.textContent = val;
    });
    document.querySelectorAll('[data-alt-en]').forEach(function (el) {
      var val = el.getAttribute('data-alt-' + l);
      if (val !== null) el.setAttribute('alt', val);
    });
    document.querySelectorAll('[data-content-en]').forEach(function (el) {
      var val = el.getAttribute('data-content-' + l);
      if (val !== null) el.setAttribute('content', val);
    });
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === l);
    });
  }

  function setLang(l) {
    lang = l;
    try { localStorage.setItem(STORAGE_KEY, l); } catch (e) {}
    apply(l);
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(lang);
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
    });
  });
})();
