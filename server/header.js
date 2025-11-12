// Dynamic Header Navigation
class DynamicHeader {
  constructor() {
    this.apiUrl = `${BASE_URL}/categories`;
    this.init();
  }

  async init() {
    try {
      const categories = await this.fetchCategories();
      this.updateNavigation(categories);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  }

  async fetchCategories() {
    const response = await fetch(this.apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  updateNavigation(categories) {
    const mainNav = document.querySelector(".navbar-nav");
    const sidebarNav = document.querySelector(".sidebar__menu-list");

    if (!mainNav || !sidebarNav) return;

    // Clear existing dynamic items (keep home)
    this.clearDynamicItems(mainNav);
    this.clearDynamicItems(sidebarNav);

    // Add dynamic categories
    categories.forEach((category) => {
      if (category.isActive) {
        this.addMainNavItem(mainNav, category);
        this.addSidebarNavItem(sidebarNav, category);
      }
    });
  }

  clearDynamicItems(nav) {
    const items = nav.querySelectorAll(
      ".nav-item:not(:first-child), .sidebar__nav-item"
    );
    items.forEach((item) => item.remove());
  }

  addMainNavItem(nav, category) {
    const li = document.createElement("li");
    li.className = "nav-item";

    if (category.subcategories && category.subcategories.length > 0) {
      li.classList.add("dropdown");
      li.innerHTML = `
        <a class="nav-link" href="category_news_detail.html?category=${
          category.name
        }" role="button">
          ${category.name}
          <span class="dropdown__arrow"><i class="fa-solid fa-angle-down"></i></span>
        </a>
        <div class="dropdown-menu">
          <div class="dropdown-box">
            <ul>
              ${category.subcategories
                .map(
                  (sub) =>
                    `<li>
                      <a class="dropdown-item" href="subcategory_news_detail.html?category=${sub}">${sub}</a>
                    </li>`
                )
                .join("")}
            </ul>
          </div>
        </div>
        `;
    } else {
      li.innerHTML = `
        <a class="nav-link" href="category_news_detail.html?category=${category.name}">
          ${category.name}
        </a>
      `;
    }

    nav.appendChild(li);
  }

  addSidebarNavItem(nav, category) {
    const li = document.createElement("li");
    li.className = "sidebar__nav-item";

    if (category.subcategories && category.subcategories.length > 0) {
      li.classList.add("sidebar__dropdown");
      li.innerHTML = `
        <a class="sidebar__nav-link" href="category_news_detail.html?category=${
          category.name
        }"" role="button">
          ${category.name}
          <span class="sidebar__dropdown__arrow"><i class="fa-solid fa-angle-down"></i></span>
        </a>
        <div class="sidebar__dropdown-menu">
          ${category.subcategories
            .map(
              (sub) =>
                `<a class="sidebar__dropdown-item" href="subcategory_news_detail.html?category=${sub}">${sub}</a>`
            )
            .join("")}
        </div>
      `;

      // Add click event for dropdown toggle
      const link = li.querySelector(".sidebar__nav-link");
      link.addEventListener("click", (e) => {
        e.preventDefault();
        li.classList.toggle("active");
      });
    } else {
      li.innerHTML = `
        <a class="sidebar__nav-link" href="category_news_detail.html?category=${category.name}">
          ${category.name}
        </a>
      `;
    }

    nav.appendChild(li);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new DynamicHeader();
});
