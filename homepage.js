document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("video");
  const contentSection = document.querySelector(".content");

  const sprayVideo = document.getElementById("sprayVideo");
  const designerSection = document.getElementById("designer-section");

  const siteHeader = document.getElementById("siteHeader");
  const cover = document.getElementById("cover");
  const allVideos = document.querySelectorAll("video");

  const logoLink = document.querySelector(".logo-link");

  const aboutTarget = document.getElementById("designer-section");
  const contactTarget = document.getElementById("contact");

  const navAbout = document.querySelector(".nav-about");
  const navContact = document.querySelector(".nav-contact");

  allVideos.forEach((video) => {
    video.playbackRate = 1.75;
  });

  if (video && contentSection) {
    video.addEventListener("ended", () => {
      video.pause();
      video.currentTime = video.duration;

      contentSection.scrollIntoView({
        behavior: "smooth"
      });

      if (siteHeader) {
        siteHeader.classList.add("show");
      }
    });
  }

  if (logoLink && siteHeader) {
    logoLink.addEventListener("click", () => {
      siteHeader.classList.remove("show");
    });
  }

  if (siteHeader && cover) {
    window.addEventListener("scroll", () => {
      const coverBottom = cover.offsetHeight - 80;

      if (window.scrollY > coverBottom) {
        siteHeader.classList.add("show");
      } else {
        siteHeader.classList.remove("show");
      }
    });
  }

  function clearNavHighlights() {
    if (navAbout) navAbout.classList.remove("active-section");
    if (navContact) navContact.classList.remove("active-section");
  }

  function updateNavHighlight() {
    clearNavHighlights();

    if (aboutTarget) {
      const aboutRect = aboutTarget.getBoundingClientRect();
      if (aboutRect.top <= 120 && aboutRect.bottom > 120) {
        if (navAbout) navAbout.classList.add("active-section");
        return;
      }
    }

    if (contactTarget) {
  const contactRect = contactTarget.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (contactRect.top < windowHeight && contactRect.bottom > 0) {
    if (navContact) navContact.classList.add("active-section");
  }
  }
  }

  window.addEventListener("scroll", updateNavHighlight);
  window.addEventListener("load", updateNavHighlight);

  if (sprayVideo && designerSection) {
    let hasPlayed = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasPlayed) {
          hasPlayed = true;
          sprayVideo.play().catch((error) => {
            console.log("sprayVideo play failed:", error);
          });
        }
      });
    }, {
      threshold: 0.4
    });

    observer.observe(designerSection);

    sprayVideo.addEventListener("ended", () => {
      sprayVideo.pause();
      sprayVideo.currentTime = sprayVideo.duration;
    });
  }

  const triangleItems = document.querySelectorAll(".triangle-item");

  triangleItems.forEach((item) => {
    const itemVideo = item.querySelector(".spray-word-video");
    let hasPlayed = false;

    if (!itemVideo) return;

    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasPlayed) {
          hasPlayed = true;

          itemVideo.play().catch((error) => {
            console.log("triangle video play failed:", error);
          });
        }
      });
    }, {
      threshold: 0.45
    });

    itemObserver.observe(item);

    itemVideo.addEventListener("ended", () => {
      itemVideo.pause();
      itemVideo.currentTime = itemVideo.duration;
    });

    item.addEventListener("mouseenter", () => {
      item.classList.add("hovered");
    });

    item.addEventListener("mouseleave", () => {
      item.classList.remove("hovered");
    });
  });

  const contactSection = document.querySelector(".contact-content");
  const contactVideos = document.querySelectorAll(".contact-content .spray");

  if (contactSection && contactVideos.length > 0) {
    let hasPlayed = false;

    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasPlayed) {
          hasPlayed = true;

          contactVideos.forEach((video) => {
            video.play().catch((error) => {
              console.log("contact video play failed:", error);
            });

            video.addEventListener("ended", () => {
              video.pause();
              video.currentTime = video.duration;
            });
          });
        }
      });
    }, {
      threshold: 0.4
    });

    contactObserver.observe(contactSection);
  }

  const stickersLayer = document.querySelector(".stickers-layer");

  if (stickersLayer) {
    const stickerFiles = [];

    for (let i = 1; i <= 22; i++) {
      const num = String(i).padStart(2, "0");
      stickerFiles.push(`sticker-${num}.png`);
    }

    const totalStickers = 1500;

    function createSticker() {
      const img = document.createElement("img");
      img.className = "sticker";

      const file =
        stickerFiles[Math.floor(Math.random() * stickerFiles.length)];

      const sizePresets = [
        28, 36, 44, 52, 64, 78, 92, 110, 135, 165, 210, 270, 340
      ];
      const size =
        sizePresets[Math.floor(Math.random() * sizePresets.length)];

      let x;
      let y;

      if (Math.random() < 0.65) {
        x = Math.random() * 100;
        y = Math.random() * 100;
      } else {
        const clusters = [
          { x: 14, y: 18 },
          { x: 84, y: 18 },
          { x: 18, y: 52 },
          { x: 80, y: 50 },
          { x: 20, y: 82 },
          { x: 78, y: 82 },
          { x: 48, y: 92 }
        ];

        const cluster =
          clusters[Math.floor(Math.random() * clusters.length)];

        x = cluster.x + (Math.random() * 22 - 11);
        y = cluster.y + (Math.random() * 22 - 11);
      }

      x = Math.max(0, Math.min(100, x));
      y = Math.max(0, Math.min(100, y));

      const rotate = -65 + Math.random() * 130;
      const z = Math.floor(Math.random() * 6) + 1;

      img.src = `stickers/${file}`;
      img.alt = "";

      img.style.width = `${size}px`;
      img.style.left = `${x}vw`;
      img.style.top = `${y}vh`;
      img.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`;
      img.style.zIndex = z;

      stickersLayer.appendChild(img);
    }

    for (let i = 0; i < totalStickers; i++) {
      createSticker();
    }
  }
});