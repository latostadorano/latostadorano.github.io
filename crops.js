(function () {
  var base = location.pathname.indexOf('/work/') !== -1 ? '../imas/crops.json' : 'imas/crops.json';
  fetch(base, { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : {}; })
    .catch(function () { return {}; })
    .then(function (map) {
      document.querySelectorAll('.thumb img, .cs-gal img').forEach(function (img) {
        var key = img.getAttribute('src').replace(/^(\.\.\/)+/, '');
        if (map[key] !== undefined) {
          img.style.objectPosition = '50% ' + map[key] + '%';
        }
      });
    });
})();
