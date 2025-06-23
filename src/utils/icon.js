export const renderIcon = (type) =>
  type === "image" ? (
    <img src="/images/icon-image.svg" alt="Icon-image" />
  ) : (
    <img src="/images/icon-pdf.svg" alt="Icon-pdf" />
  );
