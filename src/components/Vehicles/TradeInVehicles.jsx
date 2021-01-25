import React from 'react';

class TradeInVehicles extends React.Component {
  renderTradeInVehicles() {
    const { brands, models, tradeInVehicles } = this.props;
    console.log('brands', brands);
    console.log('models', models);
    console.log('tradeInVehicles', tradeInVehicles);
    return (
      tradeInVehicles.map((vehicle) => {
        const {
          id,
          brand_id: brandId,
          model_id: modelId,
          modification_name: modificationName,
          price,
          status,
          vin,
        } = vehicle;
        return (
          <div key={id} style={{ border: '1px solid green' }}>
            <div>{id}</div>
            <div>{brandId}</div>
            <div>{modelId}</div>
            <div>{modificationName}</div>
            <div>{price}</div>
            <div>{status.name}</div>
            <div>{vin}</div>
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
            <div className="col-lg-12 col-xl-8 col-xxl-6">
              {this.renderTradeInVehicles()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TradeInVehicles;
