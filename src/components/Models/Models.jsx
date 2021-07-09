import React from 'react';
import { NavLink } from 'react-router-dom';
import ModelCard from '../commons/Models/ModelCard';

class Models extends React.Component {
  renderModels() {
    const { models, brand } = this.props;

    return (
      models.map((model) => (
        <div key={model.id} className="col-lg-12 col-xl-8">

          <ModelCard
            model={model}
            brand={brand}
          />

        </div>
      ))
    );
  }

  render() {
    const { brand } = this.props;

    return (
      <>
        <h1>Автомобили {brand.name} в наличии</h1>
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
