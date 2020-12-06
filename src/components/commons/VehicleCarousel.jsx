import React from 'react';
import { Carousel } from 'react-bootstrap';
import { uniqueId } from '../../utils';

class VehicleCarousel extends React.Component {
  constructor(props) {
    super(props);
    const { images } = props;
    this.state = {
      carouselCurrentIdx: 0,
      images: images.map((image) => {
        const key = `${image.full}_${uniqueId()}`;
        return { ...image, key };
      }),
    };
  }

  handleSelect = (selectedIndex) => {
    this.setState({ carouselCurrentIdx: selectedIndex });
  };

  render() {
    const { vehicleFullName } = this.props;
    const { carouselCurrentIdx, images } = this.state;

    return (
      <div className="autocrm10-carousel">
        <Carousel
          className="carousel-fade"
          interval={999999}
          activeIndex={carouselCurrentIdx}
          onSelect={this.handleSelect}
          nextIcon={<span className="svg--icon svg--arrow-alt2" data-grunticon-embed aria-hidden="true" />}
          prevIcon={<span className="svg--icon svg--arrow-alt2" data-grunticon-embed aria-hidden="true" />}
        >
          {images.map(({ full, key }) => (
            <Carousel.Item key={key}>
              <img
                src={full}
                alt={`${vehicleFullName} Тестовый дилер Тула`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default VehicleCarousel;
