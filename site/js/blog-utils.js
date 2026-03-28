/* Shared blog rendering utilities */
var BlogUtils = {
  parseDate: function (dateStr) {
    var date = new Date(dateStr);
    if (!isNaN(date.getTime())) return date;
    var fallback = Date.parse(dateStr.replace(/,/g, ''));
    return isNaN(fallback) ? new Date(0) : new Date(fallback);
  },

  sortPostsByDate: function (posts) {
    var self = this;
    return posts.slice().sort(function (a, b) {
      return self.parseDate(b.date) - self.parseDate(a.date);
    });
  },

  renderBlogCard: function (post) {
    if (post.archived) {
      return '<article class="blog-card blog-card-archived">' +
        '<div class="blog-card-media"><img src="' + siteBase + post.imageUrl + '" alt="' + post.title + '" loading="lazy"></div>' +
        '<div class="blog-card-body">' +
        '<h2 class="blog-card-title">' + post.title + '</h2>' +
        '<div class="blog-card-excerpt">' + post.excerpt + '</div>' +
        '<div class="blog-card-meta">' +
        '<span>' + post.date + '</span>' +
        '<span class="meta-separator">&middot;</span>' +
        '<span>' + post.author + '</span>' +
        '</div></div></article>';
    }
    return '<article class="blog-card">' +
      '<div class="blog-card-media"><a href="' + siteBase + 'blog/' + post.slug + '/"><img src="' + siteBase + post.imageUrl + '" alt="' + post.title + '" loading="lazy"></a></div>' +
      '<div class="blog-card-body">' +
      '<h2 class="blog-card-title"><a href="' + siteBase + 'blog/' + post.slug + '/">' + post.title + '</a></h2>' +
      '<div class="blog-card-excerpt">' + post.excerpt + '</div>' +
      '<a href="' + siteBase + 'blog/' + post.slug + '/" class="blog-card-readmore">Read more &rarr;</a>' +
      '<div class="blog-card-meta">' +
      '<span>' + post.date + '</span>' +
      '<span class="meta-separator">&middot;</span>' +
      '<a href="' + siteBase + 'author/onecode/">' + post.author + '</a>' +
      '</div></div></article>';
  },

  renderSidebar: function (posts) {
    var recent = this.sortPostsByDate(posts.filter(function (p) { return !p.archived; })).slice(0, 5);
    var html = '<div class="sidebar">' +
      '<div class="search-widget">' +
      '<h3 class="widget-title">Search</h3>' +
      '<input type="text" placeholder="Search...">' +
      '<button type="button">🔍</button>' +
      '</div>' +
      '<div><h3 class="widget-title">Recent posts</h3>' +
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
