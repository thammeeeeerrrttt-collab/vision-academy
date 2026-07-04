document.querySelectorAll(".faq-question").forEach(q => {
  q.addEventListener("click", () => {
    const item = q.parentElement;

    // toggle class بدل style
    item.classList.toggle("open");
  });
});

// ================= ANIMATION =================
const items = document.querySelectorAll(".card, h2, .stats div");

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

items.forEach(i => {
  i.classList.add("fade");
  obs.observe(i);
});