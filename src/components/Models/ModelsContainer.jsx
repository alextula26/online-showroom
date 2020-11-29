import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Models from './Models';
import { fetchModels } from '../../redusers/modelsReduser';
import { filteredModelsSelector } from '../../selectors';
import { isEmpty } from '../../utils';

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
    const { brand: { id } } = this.props;
    return id;
  }

  render() {
    const { models, brand } = this.props;

    if (isEmpty(models)) {
      return null;
    }

    return (
      <Models models={models} brand={brand} />
    );
  }
}

const mapStateToProps = (state) => {
  const [brand] = state.brands;
  return {
    brand,
    models: filteredModelsSelector(state),
    dealers: state.dealers,
  };
};

const actionCreators = {
  setModels: fetchModels,
};

export default compose(
  connect(mapStateToProps, actionCreators),
  withRouter,
)(ModelsContainer);
