/* Portfolio page: filter + render */
document.addEventListener('DOMContentLoaded', function () {
  var filterCategories = ['All Projects', '3D', 'Applications', 'Cross Platform', 'Games', 'HTML5', 'UNITY'];
  var activeFilter = 'All Projects';

  fetch(siteBase + 'data/site-data.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var projects = data.projects;
      var filtersEl = document.getElementById('portfolio-filters');
      var listEl = document.getElementById('portfolio-list');

      function getCount(cat) {
        if (cat === 'All Projects') return projects.length;
        return projects.filter(function (p) { return p.categories.indexOf(cat) >= 0; }).length;
      }

      function renderFilters() {
        var html = '';
        filterCategories.forEach(function (cat, i) {
          if (i > 0) html += '<span class="pipe">|</span>';
          var label = cat === 'All Projects' ? cat : cat + ' (' + getCount(cat) + ')';
          var cls = cat === activeFilter ? 'filter-btn active' : 'filter-btn';
          html += '<button class="' + cls + '" data-cat="' + cat + '">' + label + '</button>';
        });
        filtersEl.innerHTML = html;

        filtersEl.querySelectorAll('.filter-btn').forEach(function (btn) {
          btn.addEventListener('click', function () {
            activeFilter = this.getAttribute('data-cat');
            renderFilters();
            renderList();
          });
        });
      }

      function renderList() {
        var filtered = activeFilter === 'All Projects'
          ? projects
          : projects.filter(function (p) { return p.categories.indexOf(activeFilter) >= 0; });

        var html = '';
        filtered.forEach(function (p, idx) {
          var alt = idx % 2 === 0 ? ' alt' : '';
          html += '<div class="portfolio-item' + alt + '">' +
            '<a href="' + siteBase + 'project/' + p.slug + '/" class="portfolio-item-image">' +
            '<img src="' + siteBase + p.imageUrl + '" alt="' + p.title + '" loading="lazy">' +
            '<div class="overlay"><span>View</span></div></a>' +
            '<div class="portfolio-item-text">' +
            '<a href="' + siteBase + 'project/' + p.slug + '/" class="portfolio-item-icon">◈</a>' +
            '<h3 class="portfolio-item-title"><a href="' + siteBase + 'project/' + p.slug + '/">' + p.title + '</a></h3>' +
            '<div class="portfolio-item-category">' + p.categories.join(', ') + '</div>' +
            '<div class="portfolio-item-excerpt">' + p.description.substring(0, 120) + '…</div>' +
            '</div></div>';
        });
        listEl.innerHTML = html;
      }

      renderFilters();
      renderList();
    });
});
