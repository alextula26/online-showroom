import React from 'react';
import cn from 'classnames';
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

  renderCarouselItem(vehicleFullName, vehicleId) {
    const { carouselCurrentIdx, images } = this.state;

    return (
      images.map(({ full, key }, index) => {
        const classesCarousel = cn({
          'carousel-item': true,
          item: true,
          active: carouselCurrentIdx === index,
        });

        return (
          <div key={key} className={classesCarousel}>
            <a
              href={full}
              data-fancybox={`gallery${vehicleId}`}
            >
              <img
                src={full}
                alt={`${vehicleFullName} Тестовый дилер Тула`}
                rel="nofollow"
              />
            </a>
          </div>
        );
      })
    );
  }

  renderCarouselIndicatorsItem(vehicleFullName, vehicleId) {
    const { carouselCurrentIdx, images } = this.state;

    return (
      images.map(({ full, key }, index) => {
        const classesCarouselIndicators = cn({
          visible: true,
          active: carouselCurrentIdx === index,
        });

        return (
          <li
            key={key}
            className={classesCarouselIndicators}
            data-target={`#js-carousel-${vehicleId}`}
            data-slide-to={index}
          >
            <a href={full}>
              <img
                src={full}
                alt={`${vehicleFullName} Тестовый дилер Тула`}
                rel="nofollow"
              />
            </a>
          </li>
        );
      })
    );
  }

  render() {
    const { vehicleFullName, vehicleId } = this.props;

    return (
      <div className="autocrm10-carousel">
        <div
          id={`js-carousel-${vehicleId}`}
          className="carousel-fade slide carousel"
          data-interval="false"
        >
          <div className="carousel-inner">
            {this.renderCarouselItem(vehicleFullName, vehicleId)}
          </div>

          <ol className="carousel-indicators">
            {this.renderCarouselIndicatorsItem(vehicleFullName, vehicleId)}
          </ol>

          <a className="left carousel-control" href={`#js-carousel-${vehicleId}`} data-slide="prev">
            <span className="svg--icon svg--arrow-alt2" data-grunticon-embed aria-hidden="true" />
          </a>
          <a className="right carousel-control" href={`#js-carousel-${vehicleId}`} data-slide="next">
            <span className="svg--icon svg--arrow-alt2" data-grunticon-embed aria-hidden="true" />
          </a>
          <div className="carousel-counter">
            <span className="current-slide">1</span>/<span className="all-slides">4</span>
          </div>

        </div>
      </div>
    );
  }
}

export default VehicleCarousel;
