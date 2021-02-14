import React from 'react';
import { isEmpty } from '../../utils';
import VehicleListTitle from '../commons/parts/VehicleListTitle';
import VehicleCarousel from '../commons/parts/VehicleCarousel';
import VehicleListDiscount from '../commons/parts/VehicleListDiscount';
import VehicleListPrice from '../commons/parts/VehicleListPrice';
import VehicleListInfo from '../commons/parts/VehicleListInfo';
import VehicleListDescription from '../commons/parts/VehicleListDescription';
import More from '../commons/buttons/More';
import OrderCall from '../commons/buttons/OrderСall';
import defaultVehiclePhoto from '../../img/car_dummy_empty.svg';

class TradeInVehicles extends React.Component {
  renderTradeInVehicles() {
    const { vehicles } = this.props;

    return (
      vehicles.map((vehicle) => {
        const {
          id,
          brand_id: brandId,
          brand_name: brandName,
          model_id: modelId,
          model_name: modelName,
          // ref_model_id: refModelId,
          ref_model_name: refModelName,
          modification_name: modificationName,
          price,
          special_price: specialPrice,
          // vin,
          general,
          images,
          mileage,
          manufacture_year: manufactureYear,
        } = vehicle;

        const modelNameForTitle = !isEmpty(modelName) ? modelName : refModelName;
        const vehicleFullName = `${brandName} ${modelNameForTitle} ${modificationName}`;
        const vehicleUrl = `/trade-in/${brandId}/model/${modelId}/vehicle/${id}`;
        const [engine, transmission, , , year] = general;
        const characteristicsFullName = `${engine.value}, ${transmission.value}, ${year.value}`;
        const defaultPhoto = [{ full: defaultVehiclePhoto }];

        return (
          <div key={id} className="col-lg-12 col-xl-8 col-xxl-6">
            <div className="vehicle-list-item tradein-model-list-item">

              <VehicleListTitle url={vehicleUrl} title={vehicleFullName} />

              <div>
                <div className="vehicle-list-item--image-container">
                  {!isEmpty(images) && (
                    <VehicleCarousel
                      name={vehicleFullName}
                      images={images.length <= 1 ? defaultPhoto : images.slice(0, 4)}
                      isControls={false}
                    />
                  )}

                  <div className="vehicle-list-item--image-information">
                    <div className="vehicle-list-item--image-counter">{images.length}</div>
                    <VehicleListDiscount price={price} specialPrice={specialPrice} />
                  </div>
                </div>

                <div className="vehicle-list-item--information">
                  <div className="vehicle-list-item--price--outer">
                    <VehicleListPrice price={price} specialPrice={specialPrice} />
                    <VehicleListInfo year={manufactureYear} mileage={mileage} />
                  </div>
                  <VehicleListDescription characteristicsFullName={characteristicsFullName} />
                </div>

                <div className="vehicle-list-item--separator" />

                <div className="vehicle-list-item--link-more-outer withButton">
                  <div className="clearfix">
                    <More
                      url={vehicleUrl}
                      title="Подробнее"
                      options={{
                        classes: 'vehicle-list-item--link-more',
                      }}
                    />
                  </div>

                  <OrderCall
                    title="Заказать звонок"
                    options={{
                      classes: 'btn btn--mainButton btn-block',
                    }}
                  />

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
