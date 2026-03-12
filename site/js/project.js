/* Individual project page rendering */
document.addEventListener('DOMContentLoaded', function () {
  var pathParts = window.location.pathname.replace(/\/$/, '').split('/');
  var slug = pathParts[pathParts.length - 1];

  fetch(siteBase + 'data/site-data.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var projects = data.projects;
      var projectIndex = -1;
      var project = null;
      for (var i = 0; i < projects.length; i++) {
        if (projects[i].slug === slug) { project = projects[i]; projectIndex = i; break; }
      }
      if (!project) { document.getElementById('project-content').innerHTML = '<p>Project not found</p>'; return; }

      document.title = project.title + ' - OneCode';
      document.getElementById('project-hero-title').textContent = project.title;

      /* Image */
      var imgEl = document.getElementById('project-image');
      if (imgEl) { imgEl.src = siteBase + project.imageUrl; imgEl.alt = project.title; }

      /* Description */
      document.getElementById('project-description').innerHTML = '<p>' + project.description + '</p>';

      /* Next project nav */
      var navEl = document.getElementById('project-nav');
      if (projectIndex < projects.length - 1) {
        var next = projects[projectIndex + 1];
        navEl.innerHTML = '<a href="' + siteBase + 'project/' + next.slug + '/" class="project-nav-icon">◈</a>' +
          '<a href="' + siteBase + 'project/' + next.slug + '/">' + next.title + '</a>';
      } else {
        navEl.style.display = 'none';
      }

      /* Related projects */
      var related = projects.filter(function (p) {
        if (p.slug === project.slug) return false;
        return p.categories.some(function (c) { return project.categories.indexOf(c) >= 0; });
      }).slice(0, 4);

      var relatedEl = document.getElementById('project-related-grid');
      if (related.length > 0) {
        var html = '';
        related.forEach(function (r) {
          var excerpt = r.description.length > 80 ? r.description.substring(0, 80) + '…' : r.description;
          html += '<div class="related-card">' +
            '<a href="' + siteBase + 'project/' + r.slug + '/" class="related-card-image">' +
            '<img src="' + siteBase + r.imageUrl + '" alt="' + r.title + '" loading="lazy">' +
            '<div class="overlay"><span>View</span></div></a>' +
            '<h4 class="related-card-title"><a href="' + siteBase + 'project/' + r.slug + '/">' + r.title + '</a></h4>' +
            '<div class="related-card-category">' + r.categories.join(', ') + '</div>' +
            '<div class="related-card-excerpt">' + excerpt + '</div></div>';
        });
        relatedEl.innerHTML = html;
      } else {
        document.getElementById('project-related').style.display = 'none';
      }
    });
});
