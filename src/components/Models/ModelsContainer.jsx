import React from 'react';
import {connect} from 'react-redux';
import Models from './Models';
import { fetchModels } from '../../redusers/modelsReduser';
import { fetchBrands } from '../../redusers/brandsReduser';

class ModelsContainer extends React.Component {    
    componentDidMount() {
        this.props.fetchBrands();      


        this.props.fetchModels();
    }    
    
    render() {
        const { models, brands } = this.props;
        console.log('brands', brands);
        console.log('models', models);
        return(
            <Models />
        );
    }
}

const mapStateToProps = (state) => {

    return {
    brands: state.brands,
    models: state.models,
}};

export default connect(mapStateToProps, { fetchModels, fetchBrands })(ModelsContainer);

