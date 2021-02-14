import React from 'react';
import { isEmpty, getPriceCurrencyFormat } from '../../utils';
import VehicleCarousel from '../commons/parts/VehicleCarousel';
import VehiclePrice from '../commons/parts/VehiclePrice';
import VehicleSpecifications from '../commons/parts/VehicleSpecifications';
import VehicleGeneralSpecifications from '../commons/parts/VehicleGeneralSpecifications';
import VehicleDealerInfo from '../commons/parts/VehicleDealerInfo';

class TradeInVehicle extends React.Component {
  render() {
    const { vehicle } = this.props;
    const {
      id,
      brand_name: brandName,
      model_name: modelname,
      modification_name: modificationName,
      equipment,
      //  status: { name: statusName },
      images,
      options,
      side_options: sideOptions,
      additional_equipment_description: additionalEquipmentDescription,
      description,
      specifications,
      price,
      special_price: specialPrice,
      general,
      vin,
      dealership,
    } = vehicle;

    const vehicleFullName = `${brandName} ${modelname} ${modificationName} ${equipment}`;
    const year = general[4].value;
    const mileage = `${getPriceCurrencyFormat(general[5].value)} км.`;

    return (
      <>
        <section className="vehicle-view tradein-view">
          <div className="row">
            <div className="col-sm-24 col-xl-16">
              <h1 className="vehicle-view--title">{vehicleFullName}</h1>

              {!isEmpty(images) && (
                <div className="vehicle-view-block">
                  <div className="carousel-overflow-hidden">
                    <VehicleCarousel
                      name={vehicleFullName}
                      vehicleId={id}
                      images={images}
                      isControls
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
                  description={description}
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

                <div className="col-sm-24 col-md-12 col-lg-24">
                  <div className="vehicle-view-tradein--info">
                    <div className="vehicle-view-tradein--info-item">
                      <span className="svg--icon svg--date" data-grunticon-embed />
                      <span>{year}</span>
                    </div>
                    <div className="vehicle-view-tradein--info-item">
                      <span className="svg--icon svg--union" data-grunticon-embed />
                      <span>{mileage}</span>
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

                {!isEmpty(dealership) && (
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

export default TradeInVehicle;
