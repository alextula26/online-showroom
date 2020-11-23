import React from 'react';
import { NavLink } from 'react-router-dom';
import { getPrice } from '../../utils';

class Models extends React.Component {
  renderModels() {
    const { models } = this.props;

    return (
      models.map((model) => {
        const {
          id, name, image, min_price,
        } = model;
        const minPrice = getPrice(min_price);
        return (
          <div key={id} className="col-lg-6 col-xl-4">
            <div className="card model-list-item-outer">
              <img src={image} className="card-img-top" alt={name} />
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{minPrice} руб.</p>
                <NavLink to="#" className="btn btn-primary">Подробнее</NavLink>
              </div>
            </div>
          </div>
        );
      })
    );
  }

  render() {
    const { brands, models } = this.props;

    if (models.length === 0) {
      return null;
    }

    const [{ name, vehicles }] = brands;

    return (
      <>
        <h1>
          Автомобили
          {name}
          {' '}
          в наличии
        </h1>

        <div className="filter-footer-action mt-10">
          <div className="btn--show mt-10 js-submit">
            Доступно
            <span className="btn--show-counter">{vehicles}</span>
            предложение
          </div>
        </div>

        <div className="row model-list">
          {this.renderModels()}
        </div>
      </>
    );
  }
}

export default Models;
