/* Shared blog rendering utilities */
var BlogUtils = {
  _hebrewMonths: {
    'בינואר': 0, 'בפברואר': 1, 'במרץ': 2, 'באפריל': 3,
    'במאי': 4, 'ביוני': 5, 'ביולי': 6, 'באוגוסט': 7,
    'בספטמבר': 8, 'באוקטובר': 9, 'בנובמבר': 10, 'בדצמבר': 11
  },

  parseHebrewDate: function (dateStr) {
    var parts = dateStr.split(' ');
    if (parts.length < 3) return new Date(0);
    var day = parseInt(parts[0], 10);
    var month = this._hebrewMonths[parts[1]];
    var year = parseInt(parts[2], 10);
    if (isNaN(day) || month === undefined || isNaN(year)) return new Date(0);
    return new Date(year, month, day);
  },

  sortPostsByDate: function (posts) {
    var self = this;
    return posts.slice().sort(function (a, b) {
      return self.parseHebrewDate(b.date) - self.parseHebrewDate(a.date);
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
      '<a href="' + siteBase + 'blog/' + post.slug + '/" class="blog-card-readmore">קרא עוד &larr;</a>' +
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
