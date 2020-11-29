import React from 'react';
import { NavLink } from 'react-router-dom';
import { getPriceCurrencyFormat, isSpecialPrice } from '../../utils';

class Vehicles extends React.Component {
  renderVehicles() {
    const { vehicles, characteristics } = this.props;

    return (
      vehicles.map((vehicle) => {
        const {
          id,
          modification,
          price,
          status,
          brand_name: brandName,
          model_name: modelname,
          modification_name: modificationName,
          image_preview: imagePreview,
          special_price: specialPrice,
        } = vehicle;

        const carsFullName = `${brandName} ${modelname} ${modificationName}`;

        const {
          body, engineType, engine, power, kpp, drive,
        } = characteristics[modification];

        const characteristicsFullName = `${engine.value} ${engine.unit} / (${power.value} ${power.unit}) /  ${engineType.value}, ${kpp.value}, ${drive.value} / ${body.value}`;

        return (
          <div key={id} className="col-lg-12 col-xl-8 col-xxl-6">
            <div className="vehicle-list-item">
              <div className="vehicle-list-item--title">
                <NavLink
                  className="vehicle-list-item--title--link"
                  to="/"
                  data-toggle="tooltip"
                  data-original-title={carsFullName}
                >
                  {carsFullName}
                </NavLink>
              </div>

              <div>
                <div className="clearfix">
                  <div className="instock-block">
                    <div className="instock-block--button instock-block--button--instock ">
                      <span className="svg--icon svg--auto" style={{ backgroundImage: 'none' }} />
                      {status.name}
                    </div>
                  </div>
                </div>

                <div className="vehicle-list-item--image-container">
                  <div className="autocrm10-carousel">
                    <img
                      src={imagePreview}
                      alt={`${carsFullName} Тестовый дилер Тула`}
                      rel="nofollow"
                      style={{ width: '100%' }}
                    />
                  </div>
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
                              {getPriceCurrencyFormat(specialPrice)} руб.
                            </span>
                            <span className="vehicle-list-item--oldprice">
                              {getPriceCurrencyFormat(price)} руб.
                            </span>
                          </>
                        ) : (
                          <span className="vehicle-list-item--price">
                            {getPriceCurrencyFormat(price)} руб.
                          </span>
                        )}
                    </div>
                  </div>

                  <div className="vehicle-list-item--description">
                    {characteristicsFullName}
                  </div>
                </div>

                <div className="vehicle-list-item--separator" />
                <div className="vehicle-list-item--link-more-outer">
                  <NavLink
                    className="vehicle-list-item--link-more"
                    to="/"
                    rel="nofollow"
                  >
                    Подробнее
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        );
      })
    );
  }

  render() {
    const { brand, model } = this.props;
    return (
      <>
        <div className="clearfix">
          <h1 className="page-title">Автомобили {brand.name} {model.name} в наличии</h1>
        </div>

        <div id="vehicle-list-by-model" className="list-view">
          <div className="model-list">
            <div className="row model-list-flex items">
              {this.renderVehicles()}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Vehicles;
