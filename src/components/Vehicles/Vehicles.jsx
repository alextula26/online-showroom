import React from 'react';
import { NavLink } from 'react-bootstrap';
import { getPriceCurrencyFormat, isSpecialPrice } from '../../utils';

class Vehicles extends React.Component {
  renderCars() {
    const { vehicles } = this.props;

    return (
      vehicles.map((vehicle) => {
        const {
          id,
          brand_name: brandName,
          model_name: modelname,
          modification_name: modificationName,
          image_preview: imagePreview,
          price,
          special_price: specialPrice,
          status,
        } = vehicle;

        const carsFullName = `${brandName} ${modelname} ${modificationName}`;

        return (
          <div key={id} className="col-lg-12 col-xl-4 col-xxl-3">
            <div className="vehicle-list-item">
              <div className="vehicle-list-item--title">
                <NavLink
                  className="vehicle-list-item--title--link"
                  href="#"
                  data-toggle="tooltip"
                  data-original-title={carsFullName}
                >
                  {carsFullName}
                </NavLink>
              </div>

              <div>
                <div className="clearfix">
                  <div className="instock-block">
                    <div className="instock-block--button instock-block--button--shipping">
                      <span className="svg--icon svg--auto" data-grunticon-embed />
                      {status.name}
                    </div>
                  </div>
                </div>

                <div className="vehicle-list-item--image-container">
                  <img
                    src={imagePreview}
                    alt={`${carsFullName} Тестовый дилер Тула`}
                    rel="nofollow"
                    style={{ width: '100%' }}
                  />
                  {isSpecialPrice(price, specialPrice)
                    && (
                    <div className="vehicle-list-item--discount">
                      Цена ниже на {price - specialPrice} руб.
                    </div>
                    )}
                </div>

                <div className="vehicle-list-item--information">
                  <div className="vehicle-list-item--price--outer">
                    <div>
                      {isSpecialPrice(price, specialPrice)
                        ? (
                          <>
                            <span className="vehicle-list-item--price vehicle-list-item--price--action">
                              {getPriceCurrencyFormat(specialPrice)}
                              {' '}
                              руб.
                            </span>
                            <span className="vehicle-list-item--oldprice">
                              {getPriceCurrencyFormat(price)}
                              {' '}
                              руб.
                            </span>
                          </>
                        ) : (
                          <span className="vehicle-list-item--price">
                            {getPriceCurrencyFormat(price)}
                            {' '}
                            руб.
                          </span>
                        )}
                    </div>
                  </div>

                  <div
                    className="vehicle-list-item--description"
                    data-toggle="tooltip"
                    data-original-title="2,0 л / (190 л.с.) / Бензиновый, Автомат, 2019, Передний"
                  >
                    2,0 л / (190 л.с.) / Бензиновый, Автомат, 2019, Передний
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })
    );
  }

  render() {
    const { vehicles } = this.props;

    if (vehicles.length === 0) {
      return null;
    }

    return (
      <div className="model-list">
        <div className="row model-list-flex items">
          {this.renderCars()}
        </div>
      </div>

    );
  }
}

export default Vehicles;
