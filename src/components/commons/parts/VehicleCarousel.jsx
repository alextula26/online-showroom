import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

const VehicleCarousel = ({ name, images, isControls }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      className="carousel-fade"
      interval={999999}
      activeIndex={index}
      onSelect={handleSelect}
      controls={isControls}
      nextIcon={<span className="svg--icon svg--arrow-alt2" />}
      prevIcon={<span className="svg--icon svg--arrow-alt2" />}
    >
      {images.map(({ full }) => (
        <Carousel.Item>
          <img
            src={full}
            alt={`${name} Тестовый дилер Тула`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default VehicleCarousel;
