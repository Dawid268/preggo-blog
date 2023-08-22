export const setFontColorFn = (backgroundColor: string): string => {
  const splittedColor = backgroundColor.split(',');
  let fontColor = '';
  const opacity = 1;

  for (let i = 0; i < splittedColor.length - 1; i++) {
    fontColor += `${splittedColor[i]},`;
  }

  fontColor += `${opacity})`;

  return fontColor;
};
