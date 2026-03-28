/* Category page rendering */
document.addEventListener('DOMContentLoaded', function () {
  /* Categories with their URL slug segments and display names */
  var categories = [
    { name: 'News', slugPath: 'news' },
    { name: 'General', slugPath: 'general' },
    { name: 'Articles', slugPath: 'news/articles' },
    { name: '3D', slugPath: 'news/articles/3d-articles' },
    { name: 'HTML 5', slugPath: 'html-5' },
    { name: 'Development Jobs', slugPath: 'dev-jobs' }
  ];

  /* Extract slug path from URL: /category/news/articles/ → news/articles */
  var path = decodeURIComponent(window.location.pathname).replace(/\/$/, '');
  var catPrefix = '/category/';
  var idx = path.indexOf(catPrefix);
  var slugPath = idx >= 0 ? path.substring(idx + catPrefix.length) : '';

  var category = null;
  for (var i = 0; i < categories.length; i++) {
    if (categories[i].slugPath === slugPath) { category = categories[i]; break; }
  }

  if (!category) {
    document.getElementById('category-list').innerHTML = '<p>Category not found</p>';
    return;
  }

  document.title = category.name + ' - OneCode';
  document.getElementById('category-hero-title').textContent = 'Posts in ' + category.name;

  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', 'Articles on ' + category.name + ' at OneCode');

  fetch(siteBase + 'data/site-data.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var filtered = BlogUtils.sortPostsByDate(data.blogPosts.filter(function (post) {
        return post.categories.some(function (c) {
          return c.toLowerCase() === category.name.toLowerCase();
        });
      }));

      var list = document.getElementById('category-list');
      if (list) {
        var html = '';
        filtered.forEach(function (p) { html += BlogUtils.renderBlogCard(p); });
        if (filtered.length === 0) html = '<p>No posts in this category.</p>';
        list.innerHTML = html;
      }

      var sidebar = document.getElementById('blog-sidebar');
      if (sidebar) sidebar.innerHTML = BlogUtils.renderSidebar(data.blogPosts);
    });
});
