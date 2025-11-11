$(document).ready(function () {
  $.ajax({
    url: "https://ktmpost.com/api/public/videos/",
    type: "GET",
    dataType: "json",
    success: function (data) {
      const videoData = data.results;
      renderVideos(videoData);
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });
});

function renderVideos(videos) {
  const container = $("#video-section");

  const videoTitleHTML = `
    <div class="title-13 mb-30">
      <div class="title__content">
        <h2 class="section__title">भिडियो समाचार</h2>
      </div>
    </div>
  `;

  container.append(videoTitleHTML);

  const videoHTML = `
    <div class="grid__box">
      ${videos
        .map(
          (video) =>
            `<div class="single__grid-box">
              <div class="single__grid-image">
                <a href="video_detail.html?id=${video.id}">
                  <img src="${getYouTubeThumbnail(video.platform_url)}" alt="${
              video.title
            }" />
                </a>
              </div>
              <div class="single__grid-headline">
                <h3>
                  <a href="video_detail.html?id=${video.id}">${video.title}</a>
                </h3>
              </div>
            </div>`
        )
        .join("")}
      </div>
  `;

  container.append(videoHTML);
}

function getYouTubeThumbnail(url) {
  if (!url) return nul;
  const videoId = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
  );
  return videoId
    ? `https://img.youtube.com/vi/${videoId[1]}/maxresdefault.jpg`
    : null;
}
