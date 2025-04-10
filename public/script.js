document.addEventListener("DOMContentLoaded", () => {
  const defaultBg = getComputedStyle(document.body).backgroundColor || "rgba(17, 24, 39, 1)";
  let isTransitioning = false;

  function changeBg(element) {
    if (!isTransitioning) {
      document.body.style.backgroundColor = element.getAttribute("data-bg");
    }
  }

  function resetBg() {
    if (!isTransitioning) {
      document.body.style.backgroundColor = defaultBg;
    }
  }

  document.querySelectorAll("a[data-bg]").forEach((element) => {
    element.addEventListener("mouseover", function () {
      changeBg(this);
    });
    element.addEventListener("mouseleave", resetBg);
  });

  // --- Page Transition Code (Fade In) ---
  const transitionLinks = document.querySelectorAll("a[data-bg]");

  transitionLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      isTransitioning = true;

      const targetHref = this.href;
      const transitionColor = this.getAttribute("data-bg");

      if (!targetHref || !transitionColor) {
        console.error("[Fade In] Missing href or data-bg attribute on clicked link:", this);
        isTransitioning = false;
        return;
      }

      // Debug Logging
      console.log(`[Fade In] Starting transition to ${targetHref} with color ${transitionColor}`);

      console.log("[Fade In] Attempting to set sessionStorage item...");
      try {
        sessionStorage.setItem("transitionBgColor", transitionColor);
        console.log("[Fade In] sessionStorage item set successfully.");
      } catch (e) {
        console.error("[Fade In] Error setting sessionStorage:", e);
        isTransitioning = false;
        return;
      }

      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100vw";
      overlay.style.height = "100vh";
      overlay.style.backgroundColor = transitionColor;
      overlay.style.zIndex = "9999";
      overlay.style.opacity = "0";
      overlay.style.transition = "opacity 0.4s ease-in-out";

      document.body.appendChild(overlay);

      requestAnimationFrame(() => {
        overlay.style.opacity = "1";
      });

      const transitionDuration = 400;
      setTimeout(() => {
        console.log(`[Fade In] Timeout reached, navigating to: ${targetHref}`);
        window.location.href = targetHref;
      }, transitionDuration + 50);
    });
  });
});
