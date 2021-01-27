import React from 'react';
import { NavLink } from 'react-router-dom';
import { isEmpty } from '../../utils';
import Description from '../commons/Vehicles/Description';
import Price from '../commons/Vehicles/Price';
import Title from '../commons/Vehicles/Title';
import Images from '../commons/Vehicles/Images';
import Discount from '../commons/Vehicles/Discount';
import defaultVehiclePhoto from '../../img/car_dummy_empty.svg';
import TradeInInfo from '../commons/Vehicles/TradeInInfo';

class TradeInVehicles extends React.Component {
  renderTradeInVehicles() {
    const { brands, models, tradeInVehicles } = this.props;
    console.log('brands', brands);
    console.log('models', models);
    console.log('tradeInVehicles', tradeInVehicles);
    return (
      tradeInVehicles.map((vehicle) => {
        const {
          id,
          brand_id: brandId,
          brand_name: brandName,
          model_id: modelId,
          model_name: modelName,
          modification_name: modificationName,
          price,
          mileage,
          manufacture_year: manufactureYear,
          vin,
          general,
          images,
          special_price: specialPrice,
        } = vehicle;

        const vehicleFullName = `${brandName} ${modelName} ${modificationName}`;
        const vehicleUrl = `/trade-in/${brandId}/model/${modelId}/vehicle/${vin}`;
        const [engine, transmission, , , year] = general;
        const characteristicsFullName = `${engine.value}, ${transmission.value}, ${year.value}`;
        const defaultPhoto = [{ full: defaultVehiclePhoto }];
        return (
          <div key={id} className="col-lg-12 col-xl-8 col-xxl-6">
            <div className="vehicle-list-item tradein-model-list-item">

              <Title url={vehicleUrl} title={vehicleFullName} />

              <div>
                <div className="vehicle-list-item--image-container">
                  {!isEmpty(images) && (
                    <Images
                      name={vehicleFullName}
                      images={images.length <= 1 ? defaultPhoto : images.slice(0, 4)}
                    />
                  )}

                  <div className="vehicle-list-item--image-information">
                    <div className="vehicle-list-item--image-counter">{images.length}</div>
                    <Discount price={price} specialPrice={specialPrice} />
                  </div>
                </div>

                <div className="vehicle-list-item--information">
                  <div className="vehicle-list-item--price--outer">
                    <Price price={price} specialPrice={specialPrice} />
                    <TradeInInfo year={manufactureYear} mileage={mileage} />
                  </div>
                  <Description characteristicsFullName={characteristicsFullName} />
                </div>

                <div className="vehicle-list-item--separator" />

                <div className="vehicle-list-item--link-more-outer withButton">
                  <div className="clearfix">
                    <NavLink
                      className="vehicle-list-item--link-more"
                      to={vehicleUrl}
                    >
                      Подробнее
                    </NavLink>
                  </div>
                  <span
                    className="btn btn--mainButton btn-block"
                    data-href="/ajax-form/request-call?id=357545"
                  >
                    <span>Заказать звонок</span>
                  </span>
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
      <div className="list-view">
        <div className="model-list">
          <div className="row model-list-flex tradein-model-list items">
            {this.renderTradeInVehicles()}
          </div>
        </div>
      </div>
    );
  }
}

export default TradeInVehicles;
