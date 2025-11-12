$(document).ready(function () {
  $.ajax({
    url: "https://ktmpost.com/api/articles/",
    type: "GET",
    dataType: "json",
    success: function (data) {
      const featuredArticles = data.filter((article) => article.isFeatured);
      const trendingArticles = data
        .filter((article) => article.isTrending)
        .slice(0, 5);
      const isHotNews = data.filter((article) => article.isHot)[0];

      const articlesByCategory = {};
      data.forEach((article) => {
        const categoryId = article.category.id;
        if (!articlesByCategory[categoryId]) {
          articlesByCategory[categoryId] = [];
        }
        articlesByCategory[categoryId].push(article);
      });

      console.log(
        "------------------------------------------------------------------------------------------------"
      );
      const articleBySubcategory = data.filter(
        (article) => article.subcategory === "बैंक"
      );
      console.log("articleBySubcategory", articleBySubcategory);

      const categoryIds = Object.keys(articlesByCategory);
      const firstCategoryArticles = articlesByCategory[categoryIds[0]].slice(
        0,
        5
      );
      const secondCategoryArticles = articlesByCategory[categoryIds[1]].slice(
        0,
        4
      );
      const thirdCategoryArticles = articlesByCategory[categoryIds[2]].slice(
        0,
        4
      );
      const fourthCategoryArticles = articlesByCategory[categoryIds[3]].slice(
        0,
        6
      );
      const fifthCategoryArticles = articlesByCategory[categoryIds[4]].slice(
        0,
        6
      );

      renderFeaturedArticle(featuredArticles);
      renderHotArticle(isHotNews);
      renderTrendingArticle(trendingArticles);
      renderFirstCategoryArticle(firstCategoryArticles);
      renderSecondCategoryArticle(secondCategoryArticles);
      renderThirdCategoryArticle(thirdCategoryArticles);
      renderFourthCategoryArticle(fourthCategoryArticles);
      renderFifthCategoryArticle(fifthCategoryArticles);
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });

  $.ajax({
    url: "https://ktmpost.com/api/public/videos/",
    type: "GET",
    success: function (response) {
      const data = response.results;
      const latestVideos = data.slice(0, 4);
      renderMultimedia(latestVideos);
    },
    error: function () {
      console.error("Error:", error);
    },
  });
});

function renderFeaturedArticle(articles) {
  const container = $("#featured-news-section");
  articles.forEach((article) => {
    const articleHTML = `
      <div class="single__big-news">
        <div class="big__news-card">
          <h3 class="big__title">
            <a href="/news/${article.id}">
              ${article.title}
            </a>
          </h3>
          <div class="news__big-img">
            <a href="/news/${article.id}">
              <img
                src="${article.featuredImage}"
                alt="${article.title}"
              />
            </a>
          </div>
          <div class="news__author">
            <div class="author">
              <a href="/news/detail/202921/">
                <span class="author__name">${article.author.name}</span>
              </a>
            </div>
            <div class="news__post-date">
              <p class="date">
                <i class="ph-clock"></i>
                4 hours, 35 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
    container.append(articleHTML);
  });
}

function renderHotArticle(article) {
  const container = $("#hot-article-content");

  const articleHTML = `
    <div class="row business">
      <div class="col-lg-6 image">
        <a href="/news/${article.id}">
          <img src="${article.featuredImage}" alt="${article.title}" />
        </a>
      </div>
      <div class="col-lg-6 post-title-wrap">
        <h4 class="post-title">
          <a href="/news/${article.id}" class="title__line-limit">
            ${article.title}
          </a>
        </h4>
        <p class="desc">
          ${article.excerpt}
        </p>
      </div>
    </div>
  `;
  container.append(articleHTML);
}

function renderTrendingArticle(articles) {
  const container = $("#trending-news-container");
  articles.forEach((article) => {
    const articleHTML = `
      <div class="grid__card">
        <div class="card__img">
          <a href="/news/${article.id}/">
            <img src="${article.featuredImage}" alt="${article.title}" />
          </a>
        </div>
        <div class="card__details">
          <h2 class="card__title">
            <a href="/news/${article.id}/">
              ${article.title}
            </a>
          </h2>
        </div>
      </div>
    `;
    container.append(articleHTML);
  });
}

function renderFirstCategoryArticle(articles) {
  const container = $("#first-category-articles");
  const firstArticle = articles[0];
  const categoryName = firstArticle.category.name;
  const remainingArticles = articles.slice(1);

  const categoryTitleHTML = `
    <div class="title-13 mb-30">
      <div class="title__content">
        <h2 class="section__title">${categoryName}</h2>
        <a href="/category/politics/" class="view__more">
          <i class="fa fa-chevron-right"></i>
        </a>
      </div>
    </div>
  `;

  container.append(categoryTitleHTML);

  const blockEl = document.createElement("div");
  blockEl.className = "block-20-grid";
  container.append(blockEl);

  const firstArticleHTML = `
    <div class="big__grid-card">
      <div class="big__grid-img">
        <a href="/news/${firstArticle.id}">
          <img src="${firstArticle.featuredImage}" alt="${firstArticle.title}" />
        </a>
      </div>
      <div class="big__grid-details">
        <h3 class="card__title">
          <a href="/news/${firstArticle.id}">${firstArticle.title}</a>
        </h3>
      </div>
    </div>
  `;

  $(blockEl).append(firstArticleHTML);

  remainingArticles.forEach((article) => {
    const articleHTML = `
      <div class="small__grid-card">
        <div class="small__grid-img">
          <a href="/news/${article.id}">
            <img src="${article.featuredImage}" alt="${article.title}" />
          </a>
        </div>
        <div class="small__grid-details">
          <h3 class="card__title">
            <a href="/news/${article.id}">
              ${article.title}
            </a>
          </h3>
        </div>
      </div>
    `;
    $(blockEl).append(articleHTML);
  });
}

function renderSecondCategoryArticle(articles) {
  const categoryName = articles[0].category.name;

  const container = $("#second-category-articles");

  const categoryTitleHTML = `
    <div class="title-13 mb-30">
      <div class="title__content">
        <h2 class="section__title">${categoryName}</h2>
        <a href=" /category/weekend/" class="view__more">
          <i class="fa fa-chevron-right"></i>
        </a>
      </div>
    </div>
  `;

  container.append(categoryTitleHTML);

  const articleHTML = `
    <div class="grid__box">
      ${articles
        .map(
          (article) =>
            `<div class="single__grid-box">
              <div class="single__grid-image">
                <a href="/news/${article.id}">
                  <img src="${article.featuredImage}" alt="${article.title}" />
                </a>
              </div>
              <div class="single__grid-headline">
                <h3>
                  <a href="/news/${article.id}">${article.title}</a>
                </h3>
              </div>
            </div>`
        )
        .join("")}
      </div>
  `;

  container.append(articleHTML);
}

function renderThirdCategoryArticle(articles) {
  const container = $("#third-category-articles");
  const firstArticle = articles[0];
  const categoryName = firstArticle.category.name;
  const remainingArticles = articles.slice(1);

  const categoryTitleHTML = `
    <div class="title-13 mb-30">
      <div class="title__content">
        <h2 class="section__title">${categoryName}</h2>
        <a href="/category/local-government-1/" class="view__more">
          <i class="fa fa-chevron-right"></i>
        </a>
      </div>
    </div>
  `;

  container.append(categoryTitleHTML);

  const blockEl = document.createElement("div");
  blockEl.className = "block-54-grid";
  container.append(blockEl);

  const firstArticleHTML = `
    <div class="grid__left">
      <div class="grid__card">
        <div class="card__img">
          <a href="/news/${firstArticle.id}">
            <img src="${firstArticle.featuredImage}" alt="${firstArticle.title}"/>
          </a>
        </div>
        <div class="card__details">
          <h3 class="card__title">
            <a href="/news/${firstArticle.id}">
              ${firstArticle.title}
            </a>
          </h3>
          <div class="card__desc">
            ${firstArticle.excerpt}
          </div>
        </div>
      </div>
    </div>
  `;

  $(blockEl).append(firstArticleHTML);

  const articleHTML = `
    <div class="grid__right">
      ${remainingArticles.map(
        (article) => `
          <div class="grid__card">
          <div class="card__img">
            <a href="/news/${article.id}">
              <img src="${article.featuredImage}" alt="${article.title}" />
            </a>
          </div>
          <div class="card__details">
            <h3 class="card__title">
              <a href="/news/${article.id}">
                ${article.title}
              </a>
            </h3>
          </div>
        </div>
        `
      )}
    </div>
  `;

  $(blockEl).append(articleHTML);
}

function renderFourthCategoryArticle(articles) {
  const container = $("#fourth-category-articles");
  const firstArticle = articles[0];
  const categoryName = firstArticle.category.name;
  const remainingArticles = articles.slice(1);

  const categoryTitleHTML = `
    <div class="title-13 mb-30">
      <div class="title__content">
        <h2 class="section__title">${categoryName}</h2>
        <a href="/category/sports/" class="view__more">
          <i class="fa fa-chevron-right"></i>
        </a>
      </div>
    </div>
  `;

  container.append(categoryTitleHTML);

  const blockEl = document.createElement("div");
  blockEl.className = "block-54-grid";
  container.append(blockEl);

  const leftGridSectionHTML = `
    <div class="grid__left">
      <div class="grid__card">
        <div class="card__img">
          <a href="/news/${firstArticle.id}">
            <img src="${firstArticle.featuredImage}" alt="${firstArticle.title}"  />
          </a>
        </div>
        <div class="card__details">
          <h3 class="card__title">
            <a href="/news/${firstArticle.id}">
              ${firstArticle.title}
            </a>
          </h3>
          <div class="card__desc">
            ${firstArticle.excerpt}
          </div>
        </div>
      </div>
    </div>
  `;

  $(blockEl).append(leftGridSectionHTML);

  const rightGridSectionHTML = `
    <div class="grid__right">
      ${remainingArticles
        .map(
          (article) => `
            <div class="grid__card">
              <div class="card__img">
                <a href="/news/${article.id}">
                  <img src="${article.featuredImage}" alt="${article.title}" />
                </a>
              </div>
              <div class="card__details">
                <h3 class="card__title">
                  <a href="/news/${article.id}">
                    ${article.title}
                  </a>
                </h3>
              </div>
            </div>
        `
        )
        .join("")}
    </div>
  `;

  $(blockEl).append(rightGridSectionHTML);
}

function renderFifthCategoryArticle(articles) {
  const container = $("#fifth-category-articles");
  const firstArticle = articles[0];
  const categoryName = firstArticle.category.name;
  const remainingArticles = articles.slice(1);

  const categoryTitleHTML = `
    <div class="title-13 mb-30">
      <div class="title__content">
        <h2 class="section__title">${categoryName}</h2>
        <a href="/category/sports/" class="view__more">
          <i class="fa fa-chevron-right"></i>
        </a>
      </div>
    </div>
  `;

  container.append(categoryTitleHTML);

  const blockEl = document.createElement("div");
  blockEl.className = "block-54-grid";
  container.append(blockEl);

  const leftGridSectionHTML = `
    <div class="grid__left">
      <div class="grid__card">
        <div class="card__img">
          <a href="/news/${firstArticle.id}">
            <img src="${firstArticle.featuredImage}" alt="${firstArticle.title}"  />
          </a>
        </div>
        <div class="card__details">
          <h3 class="card__title">
            <a href="/news/${firstArticle.id}">
              ${firstArticle.title}
            </a>
          </h3>
          <div class="card__desc">
            ${firstArticle.excerpt}
          </div>
        </div>
      </div>
    </div>
  `;

  $(blockEl).append(leftGridSectionHTML);

  const rightGridSectionHTML = `
    <div class="grid__right">
      ${remainingArticles
        .map(
          (article) => `
            <div class="grid__card">
              <div class="card__img">
                <a href="/news/${article.id}">
                  <img src="${article.featuredImage}" alt="${article.title}" />
                </a>
              </div>
              <div class="card__details">
                <h3 class="card__title">
                  <a href="/news/${article.id}">
                    ${article.title}
                  </a>
                </h3>
              </div>
            </div>
        `
        )
        .join("")}
    </div>
  `;

  $(blockEl).append(rightGridSectionHTML);
}

function renderMultimedia(videos) {
  const container = $("#video-section");

  const firstVideo = videos[0];
  const remainingVideos = videos.slice(1);
  console.log("from inside video section", remainingVideos);

  const renderHTML = `
    <div class="block-106-grid">
      <div class="grid__card">
        <div class="grid__card-img">
          <a href="video_detail.html?id=${firstVideo.id}">
            <img
              src="${getYouTubeThumbnail(firstVideo.platform_url)}"
              alt="${firstVideo.title}"
            />
          </a>
        </div>
        <div class="grid__card-details">
          <h2 class="card__title">
            <a href="video_detail.html?id=${firstVideo.id}">
              ${firstVideo.title}
            </a>
          </h2>
        </div>
      </div>
      ${remainingVideos
        .map(
          (video) => `
          <div class="grid__card">
            <div class="grid__card-img">
              <a href="video_detail.html?id=${video.id}">
                <img
                  src="${getYouTubeThumbnail(video.platform_url)}"
                  alt="${video.title}"
                />
              </a>
            </div>
            <div class="grid__card-details">
              <h3 class="card__title">
                <a href="video_detail.html?id=${video.id}">
                  ${video.title}
                </a>
              </h3>
            </div>
          </div>
        `
        )
        .join("")}
    </div>
  `;

  container.append(renderHTML);
}

const getYouTubeThumbnail = (url) => {
  if (!url) return null;
  const videoId = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
  );
  return videoId
    ? `https://img.youtube.com/vi/${videoId[1]}/maxresdefault.jpg`
    : null;
};
