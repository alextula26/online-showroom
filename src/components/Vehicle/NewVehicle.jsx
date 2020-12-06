import React from 'react';
import { isEmpty } from '../../utils';
import VehicleCarousel from '../commons/VehicleCarousel';
import VehicleSpecification from '../commons/VehicleSpecification';

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
                  <li className="nav-item active">
                    <a
                      className="nav-link active"
                      href="#js-specification-tab1"
                      data-toggle="tab"
                    >
                      Комплектация
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link nav-link--special"
                      href="#js-specification-tab2"
                      data-toggle="tab"
                    >
                      <span className="svg--checklist" data-grunticon-embed /> Доп. опции
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link nav-link--special"
                      href="#js-specification-tab3"
                      data-toggle="tab"
                    >
                      <span className="svg--cogwheel" data-grunticon-embed /> Доп. оборудование
                    </a>
                  </li>
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

                  {!isEmpty(options)
                    && (
                      <div id="js-specification-tab1" className="tab-pane active">
                        <VehicleSpecification options={options} />
                      </div>
                    )}

                  <div id="js-specification-tab2" className="tab-pane">
                    <ul>
                      <li>Блокировка замков задних дверей с электроприводом</li>
                      <li>Противотуманные фары, в спойлере переднего бампера</li>
                      <li>Тонировка стекол задних дверей и заднего стекла</li>
                      <li>Навигационная система Pro</li>
                      <li>Парковочный радар, передний и задний</li>
                      <li>Видеокамера для облегчения парковки</li>
                      <li>Чехол для автомобиля транспортировочный</li>
                      <li>Подогрев рулевого колеса</li>
                      <li>Подогрев ветрового стекла</li>
                      <li>Пакет освещения салона, высший уровень</li>
                    </ul>
                  </div>

                  <div id="js-specification-tab3" className="tab-pane">
                    <p>Резиновые коврики в салоне Коврик для багажника</p>
                    <span>52 000</span><span>₽</span>
                  </div>

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

                          <div className="vehicle-view--price-badge">
                            <span className="badge vehicle-view--price-badge-profit">
                              <span>Выгода до</span>
                              <span className="js-promo-sum">
                                20 000
                              </span>
                              <span>₽</span>
                            </span>
                          </div>
                          <div className="vehicle-view--price">
                            <span className="js-final-sum" data-original-price="4774500">
                              4 754 500
                            </span>
                            <span>₽</span>
                          </div>
                          <div className="vehicle-view--price-old">
                            <span>Цена без скидок</span>
                            4 774 500        <span>₽</span>
                          </div>
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
                <div className="row" />
                <div className="dealer-info-block">map</div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default NewVehicle;
