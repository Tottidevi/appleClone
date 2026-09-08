/* =========================================================
   APPLE CLONE — script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------
     MEGA MENU (hover na navbar)
  ------------------------------------------------- */
  const navItems = document.querySelectorAll(".globalnav-item[data-menu]");
  const megaMenu = document.getElementById("megaMenu");
  const panels = megaMenu ? megaMenu.querySelectorAll(".megamenu-panel") : [];
  let closeTimeout;

  function showPanel(key) {
    clearTimeout(closeTimeout);
    panels.forEach((p) => p.classList.toggle("active", p.dataset.panel === key));
    megaMenu.classList.add("open");
  }

  function scheduleClose() {
    clearTimeout(closeTimeout);
    closeTimeout = setTimeout(() => {
      megaMenu.classList.remove("open");
    }, 150);
  }

  if (megaMenu && navItems.length) {
    navItems.forEach((item) => {
      item.addEventListener("mouseenter", () => showPanel(item.dataset.menu));
      item.addEventListener("mouseleave", scheduleClose);
    });

    megaMenu.addEventListener("mouseenter", () => clearTimeout(closeTimeout));
    megaMenu.addEventListener("mouseleave", scheduleClose);
  }

  /* -------------------------------------------------
     MENU MOBILE
  ------------------------------------------------- */
  const menuTrigger = document.getElementById("menuTrigger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuTrigger && mobileMenu) {
    menuTrigger.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      menuTrigger.classList.toggle("active");
    });

    // Fecha o menu ao clicar em um link
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
      });
    });
  }

  /* -------------------------------------------------
     BUSCA (placeholder de interação — abre a busca oficial)
  ------------------------------------------------- */
  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      window.location.href = "https://www.apple.com/br/search";
    });
  }

  /* -------------------------------------------------
     CARROSSEL — TV GALLERY
  ------------------------------------------------- */
  const track = document.getElementById("tvTrack");
  const prevBtn = document.getElementById("tvPrev");
  const nextBtn = document.getElementById("tvNext");
  const dotsWrap = document.getElementById("tvDots");

  if (track && prevBtn && nextBtn && dotsWrap) {
    const cards = Array.from(track.children);

    // Cria os indicadores dinamicamente
    cards.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("tv-dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => scrollToCard(i));
      dotsWrap.appendChild(dot);
    });

    const dots = Array.from(dotsWrap.children);

    function getCardStep() {
      const card = cards[0];
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.columnGap || style.gap || 0);
      return card.getBoundingClientRect().width + gap;
    }

    function scrollToCard(index) {
      const step = getCardStep();
      track.scrollTo({ left: step * index, behavior: "smooth" });
    }

    function currentIndex() {
      const step = getCardStep();
      return Math.round(track.scrollLeft / step);
    }

    function updateDots() {
      const idx = Math.min(currentIndex(), dots.length - 1);
      dots.forEach((d, i) => d.classList.toggle("active", i === idx));
    }

    prevBtn.addEventListener("click", () => {
      scrollToCard(Math.max(currentIndex() - 1, 0));
    });

    nextBtn.addEventListener("click", () => {
      scrollToCard(Math.min(currentIndex() + 1, cards.length - 1));
    });

    let scrollTimeout;
    track.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateDots, 100);
    });
  }

  /* -------------------------------------------------
     NAVBAR — leve sombra ao rolar a página
  ------------------------------------------------- */
  const nav = document.getElementById("globalnav");
  if (nav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 4) {
        nav.style.boxShadow = "0 1px 0 rgba(0,0,0,0.08)";
      } else {
        nav.style.boxShadow = "none";
      }
    });
  }

});