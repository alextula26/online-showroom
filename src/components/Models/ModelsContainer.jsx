import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as thunkes from '../../thunkes';
import Models from './Models';
import { getVisibleModels } from '../../selectors';
import { isEmpty } from '../../utils';

class ModelsContainer extends React.Component {
  componentDidMount() {
    const { fetchModels } = this.props;

    const currentBrandId = this.getCurrentBrandId();

    fetchModels(currentBrandId);
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

    console.log(this.props);

    return (
      <Models models={models} brand={brand} />
    );
  }
}

const mapStateToProps = (state) => ({
  brand: state.brands[0],
  models: getVisibleModels(state),
});

const actionCreators = {
  fetchModels: thunkes.fetchModels,
};

export default compose(
  connect(mapStateToProps, actionCreators),
  withRouter,
)(ModelsContainer);
