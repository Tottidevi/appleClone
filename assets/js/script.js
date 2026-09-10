const menuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

menuButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
});

mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
    });
});

const searchButton = document.getElementById("search-button");
const searchModal = document.getElementById("search-modal");
const closeSearch = document.getElementById("close-search");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", () => {
    searchModal.classList.add("open");
    setTimeout(() => searchInput.focus(), 50);
});

closeSearch.addEventListener("click", () => {
    searchModal.classList.remove("open");
});

searchModal.addEventListener("click", (event) => {
    if (event.target === searchModal) {
        searchModal.classList.remove("open");
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        searchModal.classList.remove("open");
    }
});

document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
});

/* ================= MEGA MENU ================= */

const megaMenu = document.getElementById("mega-menu");
const megaMenuContent = document.getElementById("mega-menu-content");
const megaBackdrop = document.getElementById("mega-backdrop");

// conteúdo de cada painel — edite/adicione conforme seus produtos
const menuData = {
    loja: {
        title: "Comprar na Apple",
        links: ["Comprar os lançamentos", "Mac", "iPad", "iPhone", "Apple Watch", "AirPods"]
    },
    mac: {
        title: "Explorar Mac",
        links: ["MacBook Air", "MacBook Pro", "iMac", "Mac mini", "Mac Studio"]
    },
    ipad: {
        title: "Explorar iPad",
        links: ["iPad Pro", "iPad Air", "iPad", "iPad mini"]
    },
    iphone: {
        title: "Explorar iPhone",
        links: ["iPhone 18 Pro", "iPhone Duo", "iPhone 17"]
    },
    watch: {
        title: "Explorar Apple Watch",
        links: ["Series 12", "Ultra 4", "SE"]
    },
    airpods: {
        title: "Explorar AirPods",
        links: ["AirPods 5", "AirPods Pro", "AirPods Max"]
    },
    "tv-e-casa": {
        title: "Explorar TV e Casa",
        links: ["Apple TV 4K", "Siri Remote", "HomeKit"]
    },
    entretenimento: {
        title: "Explorar Entretenimento",
        links: ["Apple TV+", "Apple Music", "Apple Arcade", "Apple Podcasts"]
    },
    acessorios: {
        title: "Explorar Acessórios",
        links: ["Capas", "Carregadores", "Cabos", "Adaptadores"]
    },
    suporte: {
        title: "Suporte",
        links: ["Central de Ajuda", "Verificar cobertura", "Agendar reparo"]
    }
};

let closeTimeout;

function openMegaMenu(key) {
    clearTimeout(closeTimeout);
    const data = menuData[key];
    if (!data) return;

    megaMenuContent.innerHTML = `
      <div>
        <h3>${data.title}</h3>
        <ul>
          ${data.links.map(link => `<li><a href="#">${link}</a></li>`).join("")}
        </ul>
      </div>
    `;

    megaMenu.classList.add("open");
    megaBackdrop.classList.add("open");
}

function scheduleCloseMegaMenu() {
    clearTimeout(closeTimeout);
    closeTimeout = setTimeout(() => {
        megaMenu.classList.remove("open");
        megaBackdrop.classList.remove("open");
    }, 150);
}

document.querySelectorAll(".nav-links a[data-menu]").forEach((link) => {
    link.addEventListener("mouseenter", () => openMegaMenu(link.dataset.menu));
    link.addEventListener("mouseleave", scheduleCloseMegaMenu);
});

megaMenu.addEventListener("mouseenter", () => clearTimeout(closeTimeout));
megaMenu.addEventListener("mouseleave", scheduleCloseMegaMenu);

/* ================= SCROLL REVEAL ================= */

const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target); // anima só uma vez
        }
    });
}, {
    threshold: 0.2 // dispara quando 20% do elemento aparece na tela
});

revealEls.forEach((el) => revealObserver.observe(el));
