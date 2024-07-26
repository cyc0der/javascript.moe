export const getHeight = (container: HTMLElement | null) => {
  if (container === null) return 0;
  return container.getBoundingClientRect().height;
};
export const getVH = (n: number) => {
  return (document.body.getBoundingClientRect().height / 100) * n;
};

export const scrollToTop = () => {
  window.scrollTo({
    top: window.scrollY <= 0 ? window.innerHeight : 0,
    behavior: "smooth",
  });
};
