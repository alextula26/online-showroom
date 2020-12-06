import React from 'react';
import {
  isEmpty, getHtml, getPriceCurrencyFormat, isSpecialPrice,
} from '../../utils';
import VehicleCarousel from '../commons/VehicleCarousel';
import VehicleEquipment from '../commons/VehicleEquipment';
import VehicleAdditionalOptions from '../commons/VehicleAdditionalOptions';
import VehicleGeneralSpecifications from '../commons/VehicleGeneralSpecifications';

class NewVehicle extends React.Component {
  render() {
    const { vehicle } = this.props;

    console.log(vehicle);
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
      price,
      special_price: specialPrice,
      general,
      vin,
      dealership,
    } = vehicle;

    const vehicleFullName = `${brandName} ${modelname} ${modificationName} ${equipment}`;

    return (
      <>
        <section className="vehicle-view">

          <div className="row">
            <div className="col-sm-24 col-xl-16">

              <h1 className="vehicle-view--title">{vehicleFullName}</h1>

              <div className="vehicle-view--action">
                <div className="instock-block">
                  <div className="instock-block--button">
                    <span className="svg--icon svg--auto" />
                    <span className="instock-block--button-text">
                      {statusName}
                    </span>
                    <span className="svg--icon svg--arrow-alt" />
                  </div>
                </div>
              </div>

              {!isEmpty(images)
                && (
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
                <ul
                  id="js-specification"
                  className="nav nav-tabs"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#js-specification-tab0"
                      data-toggle="tab"
                    >
                      Общие характеристики
                    </a>
                  </li>

                  {!isEmpty(options) && (
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#js-specification-tab1"
                        data-toggle="tab"
                      >
                        Комплектация
                      </a>
                    </li>
                  )}

                  {!isEmpty(sideOptions) && (
                    <li className="nav-item ">
                      <a
                        className="nav-link nav-link--special "
                        href="#js-specification-tab2"
                        data-toggle="tab"
                      >
                        <span className="svg--checklist" data-grunticon-embed /> Доп. опции
                      </a>
                    </li>
                  )}

                  {!isEmpty(additionalEquipmentDescription) && (
                    <li className="nav-item active">
                      <a
                        className="nav-link nav-link--special active"
                        href="#js-specification-tab3"
                        data-toggle="tab"
                      >
                        <span className="svg--cogwheel" data-grunticon-embed /> Доп. оборудование
                      </a>
                    </li>
                  )}

                </ul>
                <div className="tab-content">
                  <div id="js-specification-tab0" className="tab-pane">
                    <div className="specifications-list-categorytitle">Двигатель и трансмиссия</div>
                    <div className="specifications-list">
                      <div className="specifications-list-group">
                        <div className="specifications-list-title">Рабочий объём: </div>
                        <div className="specifications-list-value">1969 (см3)</div>
                      </div>
                    </div>
                  </div>

                  {!isEmpty(options) && (
                    <div id="js-specification-tab1" className="tab-pane">
                      <VehicleEquipment options={options} />
                    </div>
                  )}

                  {!isEmpty(sideOptions) && (
                    <div id="js-specification-tab2" className="tab-pane ">
                      <VehicleAdditionalOptions options={sideOptions} />
                    </div>
                  )}

                  {!isEmpty(additionalEquipmentDescription) && (
                    <div id="js-specification-tab3" className="tab-pane active">
                      {getHtml(additionalEquipmentDescription)}
                    </div>
                  )}

                </div>
              </section>
            </div>
            <div className="col-sm-24 col-xl-8">
              <div className="vehicle-view--right">
                <div className="row">

                  <div className="col-sm-24 col-lg-12 col-xl-24">
                    <div className="row">
                      <div className="col-sm-24 col-md-12 col-lg-24 col-xxl-15">
                        <div className="vehicle-view--priceblock js-toggleBlock">
                          {isSpecialPrice(price, specialPrice) && (
                            <div className="vehicle-view--price-badge">
                              <span className="badge vehicle-view--price-badge-profit">
                                <span>Выгода до </span>
                                <span className="js-promo-sum">
                                  {getPriceCurrencyFormat(price - specialPrice)}
                                </span>
                                <span> ₽</span>
                              </span>
                            </div>
                          )}

                          <div className="vehicle-view--price">
                            <span className="js-final-sum" data-original-price={specialPrice}>
                              {isSpecialPrice(price, specialPrice)
                                ? getPriceCurrencyFormat(specialPrice)
                                : getPriceCurrencyFormat(price)}
                            </span>
                            <span> ₽</span>
                          </div>

                          {isSpecialPrice(price, specialPrice) && (
                            <div className="vehicle-view--price-old">
                              <span>Цена без скидок </span>
                              {getPriceCurrencyFormat(price)}
                              <span> ₽</span>
                            </div>
                          )}

                        </div>
                      </div>
                      <div className="col-sm-24 col-md-12 col-lg-24 col-xxl-9">
                        <div className="row">
                          <div className="col-xl-12 col-xxl-24">
                            <div className="tiresasgift" />
                          </div>
                          <div className="col-xl-12 col-xxl-24" />
                        </div>
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

                <div className="dealer-info-block" itemScope itemType="http://schema.org/Organization">
                  <div className="dealer-info-block--name">
                    <span itemProp="name">{dealership.name}</span>
                  </div>
                  <span className="sr-only">Контакты:</span>
                  <div className="dealer-info-block--adress" itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                    <span className="sr-only">Адрес:</span>
                    <span className="dealer-info-block--adress--street" itemProp="streetAddress">
                      {dealership.address}
                    </span>
                    <span className="dealer-info-block--postal" itemProp="postalCode" />
                    <span className="dealer-info-block--adress--city" itemProp="addressLocality">
                      Выборг
                    </span>,
                  </div>
                  <div className="dealer-info-block--email">
                    <span className="sr-only">Электронная почта:</span>
                    <span itemProp="email">{dealership.email}</span>,<br />
                  </div>
                  <div className="dealer-info-block--phone">
                    <span className="dealer-info-block--phone--icon">
                      <span className="svg--icon svg--phone" data-grunticon-embed />
                      <span className="sr-only">Телефон: </span>
                    </span>
                    <a className="dealer-info-block--phone--value" href={`${dealership.phone}`} itemProp="telephone">
                      {dealership.phone}
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default NewVehicle;
