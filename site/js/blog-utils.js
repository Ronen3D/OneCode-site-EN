/* Shared blog rendering utilities */
var BlogUtils = {
  categorySlugMap: {
    'News': 'news',
    'כללי': 'כללי',
    'מאמרים': 'news/מאמרים',
    '3D': 'news/מאמרים/3d-מאמרים',
    'HTML 5': 'html-5',
    'דרושים בפיתוח': 'דרושים-בפיתוח'
  },

  getCategoryUrl: function (name) {
    var slug = this.categorySlugMap[name] || encodeURIComponent(name.toLowerCase());
    return siteBase + 'category/' + slug + '/';
  },

  renderBlogCard: function (post) {
    var cats = post.categories.map(function (c) {
      return '<a href="' + BlogUtils.getCategoryUrl(c) + '">' + c + '</a>';
    }).join(', ');

    return '<article class="blog-card">' +
      '<div class="blog-card-media"><a href="' + siteBase + 'blog/' + post.slug + '/"><img src="' + siteBase + post.imageUrl + '" alt="' + post.title + '"></a></div>' +
      '<h2 class="blog-card-title"><a href="' + siteBase + 'blog/' + post.slug + '/">' + post.title + '</a></h2>' +
      '<div class="blog-card-excerpt">' + post.excerpt + '</div>' +
      '<div class="blog-card-meta">' +
      '<span>' + post.date + '</span> | ' +
      '<a href="' + siteBase + 'author/onecode/">' + post.author + '</a> | ' +
      cats + ' | ' +
      '<span>' + post.commentCount + ' תגובות</span>' +
      '</div></article>';
  },

  renderSidebar: function (posts) {
    var recent = posts.slice(0, 5);
    var html = '<div class="sidebar">' +
      '<div class="search-widget">' +
      '<h3 class="widget-title">חיפוש</h3>' +
      '<input type="text" placeholder="חיפוש...">' +
      '<button type="button">🔍</button>' +
      '</div>' +
      '<div><h3 class="widget-title">פוסטים אחרונים</h3>' +
      '<ul class="sidebar-posts">';
    recent.forEach(function (p) {
      html += '<li><a href="' + siteBase + 'blog/' + p.slug + '/">' + p.title + '</a></li>';
    });
    html += '</ul></div></div>';
    return html;
  }
};
