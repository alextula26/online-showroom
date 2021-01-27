import React from 'react';
import { Carousel } from 'react-bootstrap';
import { uniqueId } from '../../../utils';

class Images extends React.Component {
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
    const { name } = this.props;
    const { carouselCurrentIdx, images } = this.state;

    return (
      <div className="autocrm10-carousel">
        <Carousel
          className="carousel-fade"
          interval={999999}
          activeIndex={carouselCurrentIdx}
          onSelect={this.handleSelect}
          controls={false}
        >
          {images.map(({ full, key }) => (
            <Carousel.Item key={key}>
              <img
                src={full}
                alt={`${name} Тестовый дилер Тула`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default Images;
