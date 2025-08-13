import React from 'react';

const ImageWithFallback = ({ src, alt, className = '', fallbackSrc = '/placeholder.png' }) => {
  const [imageSrc, setImageSrc] = React.useState(src);

  const handleError = () => {
    setImageSrc(fallbackSrc);
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

export { ImageWithFallback };
