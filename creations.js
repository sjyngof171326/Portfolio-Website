document.addEventListener("DOMContentLoaded", () => {
  const siteHeader = document.getElementById("siteHeader");
  const stickersLayer = document.querySelector(".stickers-layer");

  const currentNav = document.querySelector(".nav-creations");
  if (currentNav) {
    currentNav.classList.add("current-page");
  }

  // 1) 讓 navbar 一進頁面就直接顯示
  if (siteHeader) {
    siteHeader.classList.add("show");
  }

  // 2) 生成貼紙背景
   if (stickersLayer) {
    const stickerFiles = [];

    for (let i = 1; i <= 22; i++) {
      const num = String(i).padStart(2, "0");
      stickerFiles.push(`sticker-${num}.png`);
    }

    const totalStickers = 1500;
    const sizePresets = [28, 36, 44, 52, 64, 78, 92, 110, 135, 165, 210, 270, 340];

    const clusters = [
      { x: 14, y: 18 },
      { x: 84, y: 18 },
      { x: 18, y: 52 },
      { x: 80, y: 50 },
      { x: 20, y: 82 },
      { x: 78, y: 82 },
      { x: 48, y: 92 }
    ];

    function createSticker() {
      const img = document.createElement("img");
      img.className = "sticker";

      const file = stickerFiles[Math.floor(Math.random() * stickerFiles.length)];
      const size = sizePresets[Math.floor(Math.random() * sizePresets.length)];

      let x;
      let y;

      if (Math.random() < 0.65) {
        x = Math.random() * 100;
        y = Math.random() * 100;
      } else {
        const cluster = clusters[Math.floor(Math.random() * clusters.length)];
        x = cluster.x + (Math.random() * 22 - 11);
        y = cluster.y + (Math.random() * 22 - 11);
      }

      x = Math.max(0, Math.min(100, x));
      y = Math.max(0, Math.min(100, y));

      const rotate = -65 + Math.random() * 130;
      const z = Math.floor(Math.random() * 6) + 1;

      // 這裡就是改好的地方：
      // 原本是 stickers/${file}
      // 現在改成直接同層檔案
      img.src = file;

      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";

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

  // 3) 卡片切換 + 文字 / spray 同步切換
  const cardStack = document.getElementById("cardStack");
  if (!cardStack) return;

  const positions = ["pos-0", "pos-1", "pos-2", "pos-3", "pos-4"];
  let cards = Array.from(cardStack.querySelectorAll(".stack-card"));

  const characterData = {
    companion: {
      title: "Companion",
      spray: "companion-spray.png",
      text1: "The first member of the KAWS family and arguably the most recognized is COMPANION.",
      text2: "With its cartoon gloves, oversized shoes, and large-buttoned shorts, the character bears a resemblance to rubber-hose animation characters from early American cartoons. Similar but not quite, COMPANION’s head instead sports a soft skull and crossbones with X’s for eyes — iconography KAWS began employing in his early years as a graffiti artist.",
      text3: "COMPANION originated as a toy in 1999 when KAWS collaborated with the Japanese company Bounty Hunter to create a figurine unlike any other on the market. It has now become KAWS’s most recurring character.",
    },

    chum: {
      title: "Chum",
      spray: "chum-spray.png",
      text1: "CHUM was first introduced in 1999 in an energized mid-run stance and later as a toy in 2002 standing proud with hands on hips. By definition, a chum is a close friend or pal.",
      text2: "In its early iterations, as seen in the exhibition’s acrylic works on canvases, CHUM embodied good humour and optimism with its poses. In 2020, KAWS brought CHUM back in a decidedly un-celebratory mood. ",
      text3: "Downcast, shoulders slumped with arms hanging dejectedly by its side. This giant red figure is reflective of the emotional discord of 2020, a year marred by the COVID-19 pandemic and socio-economic upheaval.",
    },

    bff: {
      title: "BFF",
      spray: "bff-spray.png",
      text1: "This fur-covered BFF character was introduced by KAWS in 2016.",
      text2: "With bulging eyes atop its head, a round yellow nose and a fuzzy frame, BFF initially debuted as a bright blue sculpture but has since appeared in several colours and iterations.",
    },

    accomplice: {
      title: "Accomplice",
      spray: "accomplice-spray.png",
      text1: "Standing tall in the AI Green Gallery is ACCOMPLICE. The shades of pink between its head and body tell us that ACCOMPLICE is a figure in a bunny suit. ",
      text2: "With a head striking resemblance to COMPANION with its signature skull and crossbones and a name that suggests its motive, ACCOMPLICE is up for interpretation on who exactly they are – a friend, foe, or alter ego. ",
    },

    bendy: {
      title: "Bendy",
      spray: "bendy-spray.png",
      text1: "BENDY is an amoeba-like character, in a poster that shows it spiralled around American artist Keith Haring, who is pictured making his own intervention in a New York City subway station. ",
      text2: "Influenced by Haring’s works and the artistic principle of making art accessible to everybody, KAWS made his own public advertisement interventions in the late 1990s. KAWS took public posters from their vitrines and brought them back to his studio to paint. ",
      text3: "Seamlessly adding his artwork to it, with almost invisible brushstroke lines, he then placed them back in their cases for public consumption. ",
    }
  };

  function updateCharacterContent(characterKey) {
    const title = document.getElementById("characterTitle");
    const spray = document.getElementById("characterSpray");

    const text1 = document.getElementById("characterText1");
    const text2 = document.getElementById("characterText2");
    const text3 = document.getElementById("characterText3");
    const text4 = document.getElementById("characterText4");
    const text5 = document.getElementById("characterText5");

    const data = characterData[characterKey];
    if (!data) return;

    if (title) title.textContent = data.title;
    if (spray) spray.src = data.spray;

    if (text1) text1.textContent = data.text1 || "";
    if (text2) text2.textContent = data.text2 || "";
    if (text3) text3.textContent = data.text3 || "";
    if (text4) text4.textContent = data.text4 || "";
    if (text5) text5.textContent = data.text5 || "";

    [text1, text2, text3, text4, text5].forEach((p) => {
      if (!p) return;
      if (p.textContent.trim() === "") {
        p.style.display = "none";
      } else {
        p.style.display = "block";
      }
    });
  }

  function renderStack() {
    cards.forEach((card, index) => {
      positions.forEach((pos) => card.classList.remove(pos));
      card.classList.add(positions[index]);
    });

    const frontCard = cards[0];
    if (frontCard) {
      const currentCharacter = frontCard.dataset.character;
      updateCharacterContent(currentCharacter);
    }
  }

  renderStack();

  cardStack.addEventListener("click", (event) => {
    const clickedCard = event.target.closest(".stack-card");
    if (!clickedCard) return;

    const clickedIndex = cards.indexOf(clickedCard);
    if (clickedIndex === -1) return;

    if (clickedIndex === 0) {
      // 點最前面的卡：跑到最後
      cards.push(cards.shift());
    } else {
      // 點後面的卡：到最前面，其餘保持順序
      cards = [
        cards[clickedIndex],
        ...cards.slice(0, clickedIndex),
        ...cards.slice(clickedIndex + 1)
      ];
    }

    renderStack();
  });
});