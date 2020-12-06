import React from 'react';
import { NavLink } from 'react-router-dom';
import { getPriceCurrencyFormat } from '../../utils';

class Models extends React.Component {
  renderModels() {
    const { models, brand } = this.props;

    return (
      models.map((model) => {
        const {
          id, name, image, min_price, has_shares: hasShares, has_discounts: hasDiscounts,
        } = model;
        return (
          <div key={id} className="col-lg-12 col-xl-8">
            <div className="model-list-item-outer">
              <div className="model-list-item">

                <div className="model-list-item--title">
                  {(hasShares || hasDiscounts) && (
                    <span className="model-list-item--action">Акция</span>
                  )}
                  <NavLink
                    className="model-list-item--name"
                    to={`/catalog/${brand.id}/model/${id}`}
                  >
                    {name}
                  </NavLink>
                </div>

                <div className="model-list-item--image-container">
                  <NavLink to={`/catalog/${brand.id}/model/${id}`}>
                    <img
                      className="model-list-image img-responsive"
                      src={image}
                      alt={name}
                    />
                  </NavLink>
                </div>

                <div className="model-list-item--prices">
                  <span className="model-list-item--price">
                    {getPriceCurrencyFormat(min_price)} руб.
                  </span>
                </div>

                <div className="model-list-item--information">
                  <NavLink
                    className="btn btn--counter-instock"
                    to={`/catalog/${brand.id}/model/${id}`}
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
    const { brand } = this.props;

    return (
      <>
        <h1> Автомобили {brand.name} в наличии</h1>
        <section className="filter" style={{ marginBottom: '30px' }}>
          <div className="filter-footer-action mt-10">
            <NavLink
              to={`/catalog/${brand.id}/`}
              className="btn--reset"
            >
              Сбросить все фильтры <span className="svg--icon svg--reset" />
            </NavLink>

            <div className="btn--show mt-10 js-submit" style={{ cursor: 'default' }}>
              Доступно
              <span className="btn--show-counter">{brand.vehicles}</span>
              предложений
            </div>
          </div>
        </section>

        <div className="row model-list">
          {this.renderModels()}
        </div>
      </>
    );
  }
}

export default Models;
