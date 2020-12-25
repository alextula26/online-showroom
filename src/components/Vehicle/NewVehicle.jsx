import React from 'react';
import { isEmpty } from '../../utils';
import VehicleCarousel from '../commons/Vehicle/VehicleCarousel';
import VehicleSpecifications from '../commons/Vehicle/VehicleSpecifications';
import VehicleGeneralSpecifications from '../commons/Vehicle/VehicleGeneralSpecifications';
import VehicleInstock from '../commons/Vehicle/VehicleInstock';
import VehicleDealerInfo from '../commons/Vehicle/VehicleDealerInfo';
import VehiclePrice from '../commons/Vehicle/VehiclePrice';

class NewVehicle extends React.Component {
  render() {
    const { vehicle } = this.props;
    const {
      id,
      brand_name: brandName,
      model_name: modelname,
      modification_name: modificationName,
      equipment,
      status: { name: statusName },
      images,
      options,
      side_options: sideOptions,
      additional_equipment_description: additionalEquipmentDescription,
      specifications,
      price,
      special_price: specialPrice,
      general,
      vin,
      dealership,
    } = vehicle;

    const vehicleFullName = `${brandName} ${modelname} ${modificationName} ${equipment}`;
    console.log(this.props);
    return (
      <>
        <section className="vehicle-view">
          <div className="row">
            <div className="col-sm-24 col-xl-16">
              <h1 className="vehicle-view--title">{vehicleFullName}</h1>

              <div className="vehicle-view--action">
                <VehicleInstock statusName={statusName} />
              </div>

              {!isEmpty(images) && (
                <div className="vehicle-view-block">
                  <div className="carousel-overflow-hidden">
                    <VehicleCarousel
                      vehicleFullName={vehicleFullName}
                      vehicleId={id}
                      images={images}
                    />
                  </div>
                </div>
              )}

              <section className="specifications">
                <VehicleSpecifications
                  options={options}
                  sideOptions={sideOptions}
                  additionalEquipmentDescription={additionalEquipmentDescription}
                  specifications={specifications}
                />
              </section>
            </div>

            <div className="col-sm-24 col-xl-8">
              <div className="vehicle-view--right">

                <div className="row">
                  <div className="col-sm-24 col-lg-12 col-xl-24">
                    <div className="row">
                      <div className="col-sm-24 col-md-12 col-lg-24 col-xxl-15">
                        <VehiclePrice price={price} specialPrice={specialPrice} />
                      </div>
                    </div>
                  </div>
                </div>

                {!isEmpty(general) && (
                  <div className="row">
                    <div className="col-sm-24 col-md-12-col-xl-24">
                      <VehicleGeneralSpecifications general={general} vin={vin} />
                    </div>
                  </div>
                )}

                {isEmpty(dealership) && (
                  <div className="row">
                    <div className="col-sm-24 col-md-12-col-xl-24">
                      <VehicleDealerInfo dealership={dealership} />
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default NewVehicle;
