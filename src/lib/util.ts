export const getHeight = (container: HTMLElement | null) => {
  if (container === null) return 0;
  return container.getBoundingClientRect().height;
};
