export const navigateSmooth = (
  navigate,
  path,
  fromPage = "",
  top = 0,
  left = 0
) => {
  navigate(path, {
    state: { from: fromPage },
  });
  window.scrollTo({
    top,
    left,
    behavior: "smooth",
  });
};
