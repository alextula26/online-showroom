import React from 'react';
import { isEmpty } from '../../utils';
import VehicleListTitle from '../commons/parts/VehicleListTitle';
import VehicleListInStock from '../commons/parts/VehicleListInStock';
import VehicleCarousel from '../commons/parts/VehicleCarousel';
import VehicleListDiscount from '../commons/parts/VehicleListDiscount';
import VehicleListPrice from '../commons/parts/VehicleListPrice';
import VehicleListDescription from '../commons/parts/VehicleListDescription';
import More from '../commons/buttons/More';
import defaultVehiclePhoto from '../../img/car_dummy_empty.svg';

class NewVehicles extends React.Component {
  renderNewVehicles() {
    const { brand, model, vehicles } = this.props;

    return (
      vehicles.map((vehicle) => {
        const {
          id,
          brand_name: brandName,
          model_name: modelName,
          modification_name: modificationName,
          price,
          special_price: specialPrice,
          status,
          body_type: bodyType,
          general,
          images,
        } = vehicle;

        const vehicleFullName = `${brandName} ${modelName} ${modificationName}`;
        const vehicleUrl = `/catalog/${brand.id}/model/${model.id}/vehicle/${id}`;
        const [engine, transmission, , , year] = general;
        const characteristicsFullName = `${engine.value}, ${transmission.value}, ${year.value}, ${bodyType}`;
        const defaultPhoto = [{ full: defaultVehiclePhoto }];

        return (
          <div key={id} className="col-lg-12 col-xl-8 col-xxl-6">
            <div className="vehicle-list-item">

              <VehicleListTitle url={vehicleUrl} title={vehicleFullName} />

              <div>
                <div className="clearfix">
                  <VehicleListInStock name={status.name} />
                </div>

                <div className="vehicle-list-item--image-container">
                  {!isEmpty(images) && (
                    <VehicleCarousel
                      name={vehicleFullName}
                      images={images.length <= 1 ? defaultPhoto : images.slice(0, 4)}
                      isControls={false}
                    />
                  )}

                  <VehicleListDiscount price={price} specialPrice={specialPrice} />
                </div>

                <div className="vehicle-list-item--information">
                  <div className="vehicle-list-item--price--outer">
                    <div>
                      <VehicleListPrice price={price} specialPrice={specialPrice} />
                    </div>
                  </div>
                  <VehicleListDescription characteristicsFullName={characteristicsFullName} />
                </div>

                <div className="vehicle-list-item--separator" />

                <div className="vehicle-list-item--link-more-outer">
                  <More
                    url={vehicleUrl}
                    title="Подробнее"
                    options={{
                      classes: 'vehicle-list-item--link-more',
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
