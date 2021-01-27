import React from 'react';
import { NavLink } from 'react-router-dom';
import Description from '../commons/Vehicles/Description';
import Price from '../commons/Vehicles/Price';
import Discount from '../commons/Vehicles/Discount';

class NewVehicles extends React.Component {
  renderNewVehicles() {
    const { brand, model, vehicles } = this.props;

    return (
      vehicles.map((vehicle) => {
        const {
          id,
          price,
          status,
          brand_name: brandName,
          model_name: modelName,
          modification_name: modificationName,
          image_preview: imagePreview,
          special_price: specialPrice,
          body_type: bodyType,
          general,
        } = vehicle;

        const vehicleFullName = `${brandName} ${modelName} ${modificationName}`;
        const vehicleUrl = `/catalog/${brand.id}/model/${model.id}/vehicle/${id}`;
        const [engine, transmission, , , year] = general;
        const characteristicsFullName = `${engine.value}, ${transmission.value}, ${year.value}, ${bodyType}`;

        return (
          <div key={id} className="col-lg-12 col-xl-8 col-xxl-6">
            <div className="vehicle-list-item">
              <div className="vehicle-list-item--title">
                <NavLink
                  className="vehicle-list-item--title--link"
                  to={vehicleUrl}
                  data-original-title={vehicleFullName}
                >
                  {vehicleFullName}
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
                      alt={`${vehicleFullName} Тестовый дилер Тула`}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <Discount price={price} specialPrice={specialPrice} />

                </div>

                <div className="vehicle-list-item--information">
                  <div className="vehicle-list-item--price--outer">
                    <div>
                      <Price price={price} specialPrice={specialPrice} />
                    </div>
                  </div>
                  <Description characteristicsFullName={characteristicsFullName} />
                </div>

                <div className="vehicle-list-item--separator" />
                <div className="vehicle-list-item--link-more-outer">
                  <NavLink
                    className="vehicle-list-item--link-more"
                    to={vehicleUrl}
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
    return (
      <div id="vehicle-list-by-model" className="list-view">
        <div className="model-list">
          <div className="row model-list-flex items">
            {this.renderNewVehicles()}
          </div>
        </div>
      </div>
    );
  }
}

export default NewVehicles;
