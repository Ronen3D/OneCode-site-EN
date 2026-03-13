document.addEventListener('DOMContentLoaded', function () {
  fetch(siteBase + 'data/site-data.json')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      renderServices(data.services);
      renderPortfolioCategories(data.portfolioCategories);
      renderClients(data.clients);
      renderRecentBlog(data.blogPosts.slice(0, 4));
      renderSpecializations(data.specializations);
    });

  function renderServices(services) {
    var container = document.getElementById('services-row');
    if (!container) return;
    var html = '';
    services.forEach(function (s) {
      var extra = '';
      if (s.id === '3') {
        extra = ' <a href="' + siteBase + 'portfolio/" class="read-more-link">Read more about One Vision</a>';
      }
      var iconHtml = s.iconImage
        ? '<img src="' + siteBase + s.iconImage + '" alt="' + s.title + '" class="service-icon-img">'
        : '<span class="service-icon">' + s.icon + '</span>';
      html += '<div class="service-item">' +
        '<div class="service-icon-wrap">' + iconHtml + '</div>' +
        '<h3 class="service-title">' + s.title + '</h3>' +
        '<p class="service-desc">' + s.description + extra + '</p>' +
        '</div>';
    });
    container.innerHTML = html;
  }

  function renderPortfolioCategories(cats) {
    var container = document.getElementById('portfolio-row');
    if (!container) return;
    var html = '';
    cats.forEach(function (cat) {
      html += '<div class="portfolio-card">' +
        '<a href="' + siteBase + 'portfolio/" class="portfolio-image-link">' +
        '<img src="' + siteBase + cat.imageUrl + '" alt="' + cat.title + '" class="portfolio-image">' +
        '</a>' +
        '<h3 class="portfolio-title"><a href="' + siteBase + 'portfolio/" class="portfolio-title-link">' + cat.title + '</a></h3>' +
        '<p class="portfolio-desc">' + cat.description + '</p>' +
        '</div>';
    });
    container.innerHTML = html;
  }

  function renderClients(clients) {
    var container = document.getElementById('carousel-track');
    if (!container) return;
    var html = '';
    clients.forEach(function (c) {
      html += '<div class="carousel-slide">' +
        '<img src="' + siteBase + c.logoUrl + '" alt="' + c.name + '">' +
        '</div>';
    });
    container.innerHTML = html;
  }

  function renderRecentBlog(posts) {
    var container = document.getElementById('recent-blog-grid');
    if (!container) return;
    var html = '';
    posts.forEach(function (p) {
      html += '<div class="recent-blog-item">' +
        '<a href="' + siteBase + 'blog/' + p.slug + '/" class="recent-blog-image-wrap">' +
        '<img src="' + siteBase + p.imageUrl + '" alt="' + p.title + '" loading="lazy">' +
        '<div class="recent-blog-overlay"><span>Read more</span></div>' +
        '</a>' +
        '<h3 class="recent-blog-title"><a href="' + siteBase + 'blog/' + p.slug + '/">' + p.title + '</a></h3>' +
        '<div class="recent-blog-meta">' + p.date + '</div>' +
        '</div>';
    });
    container.innerHTML = html;
  }

  function renderSpecializations(specs) {
    var container = document.getElementById('specs-grid');
    if (!container) return;
    var html = '';
    specs.forEach(function (s) {
      html += '<div class="spec-card">' +
        '<img src="' + siteBase + s.imageUrl + '" alt="' + s.title + '" style="width:' + s.imageWidth + '">' +
        '<h3>' + s.title + '</h3>' +
        '<p>' + s.description + '</p>' +
        '</div>';
    });
    container.innerHTML = html;
  }
});
