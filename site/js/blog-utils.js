/* Shared blog rendering utilities */
var BlogUtils = {
  _englishMonths: {
    'January': 0, 'February': 1, 'March': 2, 'April': 3,
    'May': 4, 'June': 5, 'July': 6, 'August': 7,
    'September': 8, 'October': 9, 'November': 10, 'December': 11
  },

  parseEnglishDate: function (dateStr) {
    var match = dateStr.match(/^(\w+)\s+(\d+),\s+(\d+)$/);
    if (!match) return new Date(0);
    var month = this._englishMonths[match[1]];
    var day = parseInt(match[2], 10);
    var year = parseInt(match[3], 10);
    if (isNaN(day) || month === undefined || isNaN(year)) return new Date(0);
    return new Date(year, month, day);
  },

  sortPostsByDate: function (posts) {
    var self = this;
    return posts.slice().sort(function (a, b) {
      return self.parseEnglishDate(b.date) - self.parseEnglishDate(a.date);
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
      '<div><h3 class="widget-title">Recent Posts</h3>' +
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
