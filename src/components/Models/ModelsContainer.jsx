import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Models from './Models';
import { fetchModels } from '../../redusers/modelsReduser';
import { filteredModelsSelector } from '../../selectors';

class ModelsContainer extends React.Component {
  componentDidMount() {
    const { setModels } = this.props;

    const currentBrandId = this.getCurrentBrandId();

    setModels(currentBrandId);
  }

  getCurrentBrandId() {
    const { match: { params: { brandId } } } = this.props;
    const currentBrandId = brandId || this.getBrandId();
    return currentBrandId;
  }

  getBrandId() {
    const { brands } = this.props;
    const [{ id }] = brands;
    return id;
  }

  render() {
    const { models, brands } = this.props;
    return (
      <Models
        models={models}
        brands={brands}
        currentBrandId={this.getCurrentBrandId()}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  dealers: state.dealers,
  brands: state.brands,
  models: filteredModelsSelector(state),
});

const actionCreators = {
  setModels: fetchModels,
};

export default compose(
  connect(mapStateToProps, actionCreators),
  withRouter,
)(ModelsContainer);
