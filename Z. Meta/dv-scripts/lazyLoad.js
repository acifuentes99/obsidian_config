const viewObserver = new IntersectionObserver((entries) => {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      viewObserver.unobserve(entry.target);
      if (typeof input === 'string') {
        dv.execute(input)
      } else {
        input()
      }
    }
  });
});
viewObserver.observe(dv.container)
