import("https://code.jquery.com/jquery-3.7.1.min.js").then(() => {
  const App = {
    init: function () {
      this.loadProducts();
    },

    loadProducts: function () {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        this.buildHTML(JSON.parse(storedProducts));
        this.buildCSS();
        this.setEvents();
      } else {
        this.fetchProducts();
      }
    },

    fetchProducts: function () {
      fetch(
        "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json"
      )
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("products", JSON.stringify(data));
          this.buildHTML(data);
          this.buildCSS();
          this.setEvents();
        })
        .catch((error) => console.error("Fetching error:", error));
    },

    buildHTML: function (products) {
      const favoriteProducts =
        JSON.parse(localStorage.getItem("favorites")) || [];

      let itemsHTML = products
        .map(
          (product) => `
              <a href="${product.url}" target="_blank" class="item-link">
                <div class="item" data-id="${product.id}">
                  <div class="favorite-icon ${
                    favoriteProducts.includes(product.id) ? "active" : ""
                  }">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                  <img src="${product.img}" alt="${product.name}">
                  <div class="item-info">
                    <p>${product.name}</p>
                    <span>${product.price} TL</span>
                  </div>
                </div>
              </a>`
        )
        .join("");

      const html = `
          <div class="carousel-wrapper">
            <h2 class="carousel-title">You Might Also Like</h2>
            <div class="carousel-container">
              <button class="prev-btn disabled">‹</button>
              <div class="carousel">
                <div class="carousel-items">
                  ${itemsHTML}
                </div>
              </div>
              <button class="next-btn">›</button>
            </div>
          </div>`;

      $(".product-detail").append(html);
    },

    buildCSS: function () {
      const css = `
        .carousel-wrapper {
            width: 100%;
            max-width: 1400px;
            margin: auto;
            padding: 20px 0;
            position: relative;
        }
    
        .carousel-title {
            font-size: 32px;
            font-weight:lighter;
            line-height: 43px;
            color: #29323b;
            margin-bottom: 15px;
            text-align: left;
        }
    
        .carousel-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            position: relative;
        
        }
        
        .carousel {
            width: 100%;
            max-width: 1600px;
            overflow: hidden;
        }
        
        .carousel-items {
            display: flex;
            transition: transform 0.4s ease-in-out;
        }
        
        .item {
            position: relative;
            min-width: 200px;
            height: 400px; 
            background-color:white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            text-align: left;
            margin-right: 10px;
        }

        .item img {
            width: 100%;
            object-fit: contain;
            background-color: #fff;
            border-radius: 5px;
        }
        
        .item-info {
            width: 100%;
            padding: 10px;
            text-align: left;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 100px;
        }
   
        .item p {
            font-size: 14px;
            font-weight: 500;
            margin: 0;
            color: #333;
            white-space: normal;
            overflow: visible;
            text-overflow: unset;
            min-height: 60px;
        }
     
        .item span {
            font-size: 18px;
            font-weight: bold;
            color: #0046be;
            min-height: 30px;
            display: flex;
            align-items: center;
        }

        .item-link {
            text-decoration: none;
            color: inherit;
        }

        .item-link:hover {
            text-decoration: none;
        }

       .prev-btn, .next-btn {
            background: none;
            border: none;
            font-size: 50px;
            color: #333;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            transition: opacity 0.3s ease-in-out;
            z-index: 10;
        }

        .prev-btn {
            left: -50px;
        }

        .next-btn {
            right: -50px;
        }

        .prev-btn.disabled, .next-btn.disabled {
            opacity: 0.3;
            pointer-events: none;
        }
        
        .favorite-icon {
            position: absolute;
            top: 9px;
            right: 15px;
            width: 34px;
            height: 34px;
            border: 0.5px solid #b6b7b9; 
            border-radius: 5px;
            box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background-color: white;
            transition: all 0.3s ease;
        }

        .favorite-icon svg {
            width: 23px;
            height: 30px;
            fill: transparent; 
            stroke: black;
            stroke-width: 1px;
            transition: fill 0.3s ease;
        }

        .favorite-icon.active svg {
            fill: #193db0;
        }

        .favorite-icon.active {
            background-color: white;
        }

        .favorite-icon.active svg {
            fill: #193db0; 
        }
            
        @media (max-width: 999px) {
        .prev-btn, .next-btn {
            display: none;
        }
        .carousel-wrapper {
            display: flex;
            padding-right: 70px;
        }
        .carousel-title {
            font-size: 24px;
            padding-left: 30px;
            padding-right: 80px;
        }
      }

        @media (max-width: 1900px) and (min-width: 1000px) {
            .carousel-wrapper {
                padding: 20px 90px;
            }
        }
    `;

      $("<style>").addClass("carousel-style").html(css).appendTo("head");
    },

    setEvents: function () {
      let position = 0;
      const carousel = $(".carousel-items");
      let isDragging = false;
      let startX, currentX, dragOffset, maxPosition;

      function updateCarousel() {
        const screenWidth = window.innerWidth;
        let visibleItems =
          screenWidth <= 768 ? 2 : screenWidth <= 1024 ? 4 : 6.5;

        const itemWidth = $(".carousel-items .item").outerWidth(true);
        const totalItems = $(".carousel-items .item").length;
        maxPosition = Math.max((totalItems - visibleItems) * itemWidth, 0);

        function updateButtons() {
          $(".prev-btn").toggleClass("disabled", position === 0);
          $(".next-btn").toggleClass("disabled", position >= maxPosition);
        }

        $(".next-btn")
          .off("click")
          .on("click", function () {
            if (position < maxPosition) {
              position += itemWidth;
              if (position > maxPosition) position = maxPosition;
              carousel.css("transform", `translateX(-${position}px)`);
            }
            updateButtons();
          });

        $(".prev-btn")
          .off("click")
          .on("click", function () {
            if (position > 0) {
              position -= itemWidth;
              if (position < 0) position = 0;
              carousel.css("transform", `translateX(-${position}px)`);
            }
            updateButtons();
          });

        carousel
          .off("click", ".favorite-icon")
          .on("click", ".favorite-icon", function (event) {
            event.stopPropagation();
            event.preventDefault();
            $(this).toggleClass("active");

            const itemId = $(this).closest(".item").data("id");
            let favoriteProducts =
              JSON.parse(localStorage.getItem("favorites")) || [];

            if (favoriteProducts.includes(itemId)) {
              favoriteProducts = favoriteProducts.filter((id) => id !== itemId);
            } else {
              favoriteProducts.push(itemId);
            }

            localStorage.setItem("favorites", JSON.stringify(favoriteProducts));
          });
        updateButtons();
      }

      function updateButtons() {
        $(".prev-btn").toggleClass("disabled", position <= 0);
        $(".next-btn").toggleClass("disabled", position >= maxPosition);
      }

      carousel.on("mousedown", function (event) {
        isDragging = true;
        startX = event.pageX;
        dragOffset = position;
        carousel.css("cursor", "grabbing");
        event.preventDefault();
      });

      $(document).on("mousemove", function (event) {
        if (!isDragging) return;
        let moveX = startX - event.pageX;
        let newPosition = dragOffset + moveX;
        position = Math.max(0, Math.min(newPosition, maxPosition));
        carousel.css("transform", `translateX(-${position}px)`);
      });

      $(document).on("mouseup", function () {
        isDragging = false;
        carousel.css("cursor", "grab");
        updateButtons();
      });

      carousel.on("touchstart", function (event) {
        isDragging = true;
        startX = event.touches[0].clientX;
        dragOffset = position;
      });

      $(document).on("touchmove", function (event) {
        if (!isDragging) return;
        let moveX = startX - event.touches[0].clientX;
        let newPosition = dragOffset + moveX;
        position = Math.max(0, Math.min(newPosition, maxPosition));
        carousel.css("transform", `translateX(-${position}px)`);
      });

      $(document).on("touchend", function () {
        isDragging = false;
        updateButtons();
      });

      $(window).on("resize", updateCarousel);
      updateCarousel();
    },
  };

  App.init();
});
