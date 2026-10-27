const PlantImage = ({ src, alt, className = '', ...props }) => {
  const handleError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop';
  };

  return (
    <img
      src={src || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop'}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      {...props}
    />
  );
};

export default PlantImage;
