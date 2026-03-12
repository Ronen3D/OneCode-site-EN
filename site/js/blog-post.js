/* Blog post page rendering */
document.addEventListener('DOMContentLoaded', function () {
  var pathParts = window.location.pathname.replace(/\/$/, '').split('/');
  var slug = pathParts[pathParts.length - 1];

  fetch(siteBase + 'data/site-data.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var post = null;
      for (var i = 0; i < data.blogPosts.length; i++) {
        if (data.blogPosts[i].slug === slug) { post = data.blogPosts[i]; break; }
      }
      if (!post) { document.getElementById('post-content').innerHTML = '<p>הפוסט לא נמצא</p>'; return; }

      /* Page title */
      document.title = post.title + ' - OneCode';
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', post.excerpt.substring(0, 160));

      /* Hero */
      document.getElementById('post-hero-title').textContent = post.title;

      /* Featured image */
      var imgEl = document.getElementById('post-image');
      if (imgEl) { imgEl.src = siteBase + post.imageUrl; imgEl.alt = post.title; }

      /* Body */
      var body = '<p>' + post.excerpt + '</p>' +
        '<p>תוכן המאמר המלא יופיע כאן. זהו תוכן לדוגמה עבור הפוסט.</p>' +
        '<p>OneCode מתמחה בפיתוח אפליקציות מתקדמות, משחקים ופתרונות תלת מימד עבור ארגונים, חברות סטארט-אפ ועסקים.</p>';
      document.getElementById('post-body').innerHTML = body;

      /* Meta */
      var cats = post.categories.map(function (c) {
        return '<a href="' + BlogUtils.getCategoryUrl(c) + '">' + c + '</a>';
      }).join(', ');
      document.getElementById('post-meta').innerHTML =
        '<span>' + post.date + '</span> | ' +
        '<span>By <a href="' + siteBase + 'author/onecode/">' + post.author + '</a></span> | ' +
        '<span>In ' + cats + '</span> | ' +
        '<a href="#respond">' + post.commentCount + ' תגובות</a>';

      /* Comments */
      document.getElementById('post-comments').innerHTML =
        '<h2>תגובות (' + post.commentCount + ')</h2>' +
        '<h3 id="respond">השאירו תגובה</h3>';

      /* Sidebar */
      document.getElementById('blog-sidebar').innerHTML = BlogUtils.renderSidebar(data.blogPosts);
    });
});
