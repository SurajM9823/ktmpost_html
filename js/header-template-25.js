// sticky navbar
function scrollSticky() {
  const headerHeight = document.querySelector(".header-25");
  const bottomVal = headerHeight.offsetHeight;

  //   alert(bottomVal);
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > bottomVal) {
    document.getElementById("webStickyHeader").classList.add("sticky");

  } else {
    document.getElementById("webStickyHeader").classList.remove("sticky");

  }
  // lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}

window.addEventListener("scroll", scrollSticky);


//setting btn
const settingBtn = document.querySelector(".setting__btn");
const helpList = document.querySelector(".help-list");

settingBtn.addEventListener("click", (e) =>{
  e.preventDefault();
  helpList.classList.add("active");
});

//search__box
const searchBtn = document.querySelector(".search__btn");
const searchWrapper = document.querySelector(".search__wrapper");
const searchClose = document.querySelector(".search__box-close");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchWrapper.classList.add("active");
});


document.addEventListener("click", function (event) {
  if (searchWrapper.classList.contains('active')){
    if (!event.target.closest(".header__search")) {
      searchWrapper.classList.remove("active");
    }
  }
  if (helpList.classList.contains('active')){
    if (!event.target.closest(".setting__wrapper")) {
      helpList.classList.remove("active");
    }
  }
});


document.addEventListener("scroll", function() {
  searchWrapper.classList.remove("active");
});


// creating element for backdrop
const backdropOverlay = document.createElement("div");
backdropOverlay.classList.add("backdrop__overlay");



//sidebar__menu
const sidebarIcon = document.querySelector(".sidebar__icon");
const sidebarMenuWrapper = document.querySelector(".sidebar__menu-wrapper");
const sidebarClose = document.querySelector(".sidebar__close-btn");

sidebarIcon.addEventListener("click", (e) => {
  e.preventDefault();
  sidebarMenuWrapper.classList.add("active");
  document.body.append(backdropOverlay);
});
sidebarClose.addEventListener("click", (e) => {
  e.preventDefault();
  sidebarMenuWrapper.classList.remove("active");
  backdropOverlay.remove();
});

//sidebar__dropdown
$(".sidebar__dropdown").mouseenter(function () {
  $(this).find(".sidebar__dropdown-menu").addClass("active");
  $(this).addClass("active");
})

$(".sidebar__dropdown").mouseleave(function () {
  $(this).find(".sidebar__dropdown-menu").removeClass("active");
  $(this).removeClass("active");
})

//removing mobile nav on backdrop-overlay click
backdropOverlay.addEventListener("click", () => {
  sidebarMenuWrapper.classList.remove("active");
  backdropOverlay.remove();
});


