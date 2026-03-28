/* Blog post page rendering */
document.addEventListener('DOMContentLoaded', function () {
  var pathParts = window.location.pathname.replace(/\/$/, '').split('/');
  var slug = pathParts[pathParts.length - 1];

  fetch(siteBase + 'data/site-data.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var post = null;
      var postIndex = -1;
      for (var i = 0; i < data.blogPosts.length; i++) {
        if (data.blogPosts[i].slug === slug) { post = data.blogPosts[i]; postIndex = i; break; }
      }
      if (!post) { document.getElementById('post-content').innerHTML = '<p>Post not found</p>'; return; }

      /* Page title */
      document.title = post.title + ' - OneCode';
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', post.excerpt.substring(0, 160));

      /* Hero */
      document.getElementById('post-hero-title').textContent = post.title;

      /* Breadcrumb */
      var breadcrumbEl = document.getElementById('post-breadcrumb');
      if (breadcrumbEl) {
        breadcrumbEl.innerHTML =
          '<a href="' + siteBase + '">Home</a>' +
          '<span class="breadcrumb-separator">›</span>' +
          '<a href="' + siteBase + 'blog/">Blog</a>' +
          '<span class="breadcrumb-separator">›</span>' +
          '<span>' + post.title + '</span>';
      }

      /* Featured image */
      var imgEl = document.getElementById('post-image');
      if (imgEl) {
        imgEl.src = siteBase + post.imageUrl;
        imgEl.alt = post.title;
        if (post.imageCredit) {
          var creditEl = document.createElement('small');
          creditEl.className = 'post-image-credit';
          creditEl.textContent = post.imageCredit;
          imgEl.parentNode.insertBefore(creditEl, imgEl.nextSibling);
        }
      }

      /* Meta (above body) */
      document.getElementById('post-meta').innerHTML =
        '<span>' + post.date + '</span>' +
        '<span class="meta-separator">&middot;</span>' +
        '<a href="' + siteBase + 'author/onecode/">' + post.author + '</a>';

      /* Body */
      if (post.contentUrl) {
        fetch(siteBase + post.contentUrl)
          .then(function (r) { return r.text(); })
          .then(function (html) {
            document.getElementById('post-body').innerHTML = html;
          });
      } else {
        var body = '<p>' + post.excerpt + '</p>';
        if (post.externalUrl) {
          body += '<p><a href="' + post.externalUrl + '" target="_blank" rel="noopener noreferrer" class="external-article-link">Read the full article &#8594;</a></p>';
        }
        document.getElementById('post-body').innerHTML = body;
      }

      /* Comments */
      document.getElementById('post-comments').innerHTML =
        '<h2>Comments (' + post.commentCount + ')</h2>' +
        '<h3 id="respond">Leave a reply</h3>';

      /* Related posts */
      var relatedEl = document.getElementById('related-posts');
      if (relatedEl) {
        var related = data.blogPosts.filter(function (p) {
          if (p.slug === post.slug) return false;
          return p.categories.some(function (c) { return post.categories.indexOf(c) >= 0; });
        }).slice(0, 3);
        if (related.length === 0) {
          related = data.blogPosts.filter(function (p) { return p.slug !== post.slug; }).slice(0, 3);
        }
        var relHtml = '<h3 class="related-posts-title">More articles</h3><div class="related-posts-grid">';
        related.forEach(function (r) {
          relHtml += '<div class="related-post-card">' +
            '<a href="' + siteBase + 'blog/' + r.slug + '/"><img src="' + siteBase + r.imageUrl + '" alt="' + r.title + '" loading="lazy"></a>' +
            '<div class="related-post-card-body">' +
            '<h4><a href="' + siteBase + 'blog/' + r.slug + '/">' + r.title + '</a></h4>' +
            '<div class="related-post-date">' + r.date + '</div>' +
            '</div></div>';
        });
        relHtml += '</div>';
        relatedEl.innerHTML = relHtml;
      }

      /* Sidebar */
      document.getElementById('blog-sidebar').innerHTML = BlogUtils.renderSidebar(data.blogPosts);
    });
});
