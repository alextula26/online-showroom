import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as thunkes from '../../thunkes';
import { isEmpty } from '../../utils';
import { getVisibleBrands, getVisibleModels } from '../../selectors';
import Models from './Models';
import Preloader from '../commons/Preloader';

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
      return <Preloader />;
    }

    return (
      <Models models={models} brand={brand} />
    );
  }
}

const mapStateToProps = (state) => ({
  brand: getVisibleBrands(state)[0],
  models: getVisibleModels(state),
});

const actionCreators = {
  fetchModels: thunkes.fetchModels,
};

ModelsContainer.propTypes = {
  brand: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  models: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchModels: PropTypes.func.isRequired,
};

export default compose(
  connect(mapStateToProps, actionCreators),
  withRouter,
)(ModelsContainer);
