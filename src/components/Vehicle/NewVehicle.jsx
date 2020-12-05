import React from 'react';
import cn from 'classnames';
import { isEmpty, uniqueId } from '../../utils';

class NewVehicle extends React.Component {
  constructor(props) {
    super(props);
    const { vehicle: { images } } = this.props;
    this.state = {
      carouselCurrentIdx: 0,
      images: images.map((image) => {
        const key = `${image.full}_${uniqueId()}`;
        return { ...image, key };
      }),
    };
  }

  renderCarouselItem(vehicleFullName, vehicleId) {
    const { carouselCurrentIdx, images } = this.state;

    return (
      images.map(({ full, key }, index) => {
        const classesCarousel = cn({
          'carousel-item': true,
          item: true,
          active: carouselCurrentIdx === index,
        });

        return (
          <div key={key} className={classesCarousel}>
            <a
              href={full}
              data-fancybox={`gallery${vehicleId}`}
            >
              <img
                src={full}
                alt={`${vehicleFullName} Тестовый дилер Тула`}
                rel="nofollow"
              />
            </a>
          </div>
        );
      })
    );
  }

  renderCarouselIndicatorsItem(vehicleFullName, vehicleId) {
    const { carouselCurrentIdx, images } = this.state;

    return (
      images.map(({ full, key }, index) => {
        const classesCarouselIndicators = cn({
          visible: true,
          active: carouselCurrentIdx === index,
        });

        return (
          <li
            key={key}
            className={classesCarouselIndicators}
            data-target={`#js-carousel-${vehicleId}`}
            data-slide-to={index}
          >
            <a href={full}>
              <img
                src={full}
                alt={`${vehicleFullName} Тестовый дилер Тула`}
                rel="nofollow"
              />
            </a>
          </li>
        );
      })
    );
  }

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
                      <div className="autocrm10-carousel">
                        <div
                          id={`js-carousel-${id}`}
                          className="carousel-fade slide carousel"
                          data-interval="false"
                        >
                          <div className="carousel-inner">
                            {this.renderCarouselItem(vehicleFullName, id)}
                          </div>

                          <ol className="carousel-indicators">
                            {this.renderCarouselIndicatorsItem(vehicleFullName, id)}
                          </ol>

                          <a className="left carousel-control" href={`#js-carousel-${id}`} data-slide="prev">
                            <span className="svg--icon svg--arrow-alt2" data-grunticon-embed aria-hidden="true" />
                          </a>
                          <a className="right carousel-control" href={`#js-carousel-${id}`} data-slide="next">
                            <span className="svg--icon svg--arrow-alt2" data-grunticon-embed aria-hidden="true" />
                          </a>
                          <div className="carousel-counter">
                            <span className="current-slide">1</span>/<span className="all-slides">4</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              <section className="specifications">
                <ul id="js-specification" className="nav nav-tabs" role="tablist"><li className="nav-item active"><a className="nav-link active" href="#js-specification-tab0" data-toggle="tab">Общие характеристики</a></li>
                  <li className="nav-item"><a className="nav-link" href="#js-specification-tab1" data-toggle="tab">Комплектация</a></li>
                  <li className="nav-item"><a className="nav-link nav-link--special" href="#js-specification-tab2" data-toggle="tab"><span className="svg--checklist" data-grunticon-embed /> Доп. опции</a></li>
                  <li className="nav-item"><a className="nav-link nav-link--special" href="#js-specification-tab3" data-toggle="tab"><span className="svg--cogwheel" data-grunticon-embed /> Доп. оборудование</a></li>
                </ul>
                <div className="tab-content">
                  <div id="js-specification-tab0" className="tab-pane active">
                    <div className="specifications-list-categorytitle">Двигатель и трансмиссия</div>
                    <div className="specifications-list">
                      <div className="specifications-list-group">
                        <div className="specifications-list-title">Рабочий объём: </div>
                        <div className="specifications-list-value">1969 (см3)</div>
                      </div>
                    </div>
                  </div>

                  <div id="js-specification-tab1" className="tab-pane active">
                    <div id="w0" className="panel-group collapse show">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a className="collapse-toggle collapsed" href="#w0-collapse1" data-toggle="collapse" data-parent="#w0">Аудио, навигация и мультимедиа</a>
                          </h4>
                        </div>
                        <div id="w0-collapse1" className="panel-collapse collapse">
                          <ul className="list-group">
                            <li className="list-group-item"><span data-option-id="917576" data-option-name="Аудиосистема Sensus Connect HIGH PERFOMANCE - 10 динамиков" data-model-option-id="169397" data-model-option-name="Аудиосистема Sensus Connect HIGH PERFOMANCE - 10 динамиков" data-option-group-id="208" data-option-group-name="Аудио, навигация и мультимедиа">Аудиосистема Sensus Connect HIGH PERFOMANCE - 10 динамиков</span></li>
                            <li className="list-group-item"><span data-option-id="917585" data-option-name="Управление аудиосистемой на рулевом колесе" data-model-option-id="169400" data-model-option-name="Управление аудиосистемой на рулевом колесе" data-option-group-id="208" data-option-group-name="Аудио, навигация и мультимедиа">Управление аудиосистемой на рулевом колесе</span></li>
                            <li className="list-group-item"><span data-option-id="917594" data-option-name="2 USB разъема" data-model-option-id="169403" data-model-option-name="2 USB разъема" data-option-group-id="208" data-option-group-name="Аудио, навигация и мультимедиа">2 USB разъема</span></li>
                            <li className="list-group-item"><span data-option-id="917603" data-option-name="Bluetooth - система синхронизации мобильного телефона с аудиосистемой а/м" data-model-option-id="169406" data-model-option-name="Bluetooth - система синхронизации мобильного телефона с аудиосистемой а/м" data-option-group-id="208" data-option-group-name="Аудио, навигация и мультимедиа">Bluetooth - система синхронизации мобильного телефона с аудиосистемой а/м</span></li>
                            <li className="list-group-item"><span data-option-id="917612" data-option-name="WiFi модем / роутер" data-model-option-id="169409" data-model-option-name="WiFi модем / роутер" data-option-group-id="208" data-option-group-name="Аудио, навигация и мультимедиа">WiFi модем / роутер</span></li>
                            <li className="list-group-item"><span data-option-id="917621" data-option-name="Bluetooth модем" data-model-option-id="169412" data-model-option-name="Bluetooth модем" data-option-group-id="208" data-option-group-name="Аудио, навигация и мультимедиа">Bluetooth модем</span></li>
                            <li className="list-group-item"><span data-option-id="917630" data-option-name="P-SIM слот для установки SIM-карты с пакетом интернет-трафика любого поставщика услуг" data-model-option-id="169415" data-model-option-name="P-SIM слот для установки SIM-карты с пакетом интернет-трафика любого поставщика услуг" data-option-group-id="208" data-option-group-name="Аудио, навигация и мультимедиа">P-SIM слот для установки SIM-карты с пакетом интернет-трафика любого поставщика услуг</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="js-specification-tab2" className="tab-pane active">
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

                  <div id="js-specification-tab3" className="tab-pane active">
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
