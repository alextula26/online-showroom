import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Models from './Models';
import { fetchModels } from '../../redusers/modelsReduser';
import { fetchDealers } from '../../redusers/dealersReduser';
import { filteredModelsSelector } from '../../selectors';

class ModelsContainer extends React.Component {
  componentDidMount() {
    const { brands } = this.props;
    const [{ id }] = brands;
    this.props.fetchModels(id);
  }

  render() {
    const { models, brands } = this.props;
    return (
      <Models
        models={models}
        brands={brands}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  dealers: state.dealers,
  brands: state.brands,
  models: filteredModelsSelector(state),
});

export default compose(
  connect(mapStateToProps, {
    fetchModels, fetchDealers,
  }),
  withRouter,
)(ModelsContainer);
