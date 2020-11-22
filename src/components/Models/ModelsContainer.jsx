import React from 'react';
import { connect } from 'react-redux';
import Models from './Models';
import { isEqual } from '../../utils';
import { fetchModels } from '../../redusers/modelsReduser';
import { fetchBrands } from '../../redusers/brandsReduser';
import { fetchDealers } from '../../redusers/dealersReduser';
import { filteredModelsSelector } from '../../selectors';

class ModelsContainer extends React.Component {
  componentDidMount() {
    // this.props.fetchDealers();
    this.props.fetchBrands();
  }

  componentDidUpdate(prevProps) {
    const { brands } = this.props;
    if (!isEqual(brands, prevProps.brands)) {
      const [{ id }] = brands;
      this.props.fetchModels(id);
    }
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

export default connect(
  mapStateToProps,
  { fetchModels, fetchBrands, fetchDealers },
)(ModelsContainer);
