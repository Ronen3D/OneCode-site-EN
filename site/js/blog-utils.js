/* Shared blog rendering utilities */
var BlogUtils = {
  renderBlogCard: function (post) {
    return '<article class="blog-card">' +
      '<div class="blog-card-media"><a href="' + siteBase + 'blog/' + post.slug + '/"><img src="' + siteBase + post.imageUrl + '" alt="' + post.title + '" loading="lazy"></a></div>' +
      '<div class="blog-card-body">' +
      '<h2 class="blog-card-title"><a href="' + siteBase + 'blog/' + post.slug + '/">' + post.title + '</a></h2>' +
      '<div class="blog-card-excerpt">' + post.excerpt + '</div>' +
      '<a href="' + siteBase + 'blog/' + post.slug + '/" class="blog-card-readmore">קרא עוד &larr;</a>' +
      '<div class="blog-card-meta">' +
      '<span>' + post.date + '</span>' +
      '<span class="meta-separator">&middot;</span>' +
      '<a href="' + siteBase + 'author/onecode/">' + post.author + '</a>' +
      '</div></div></article>';
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
      html += '<li>' +
        '<img class="sidebar-post-thumb" src="' + siteBase + p.imageUrl + '" alt="" loading="lazy">' +
        '<a href="' + siteBase + 'blog/' + p.slug + '/">' + p.title + '</a>' +
        '</li>';
    });
    html += '</ul></div></div>';
    return html;
  }
};
