import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

class ExpenseContainer extends Component {
    componentWillMount() {
        this.props.fetchExpenses();
    }

    render() {
        return (
            <div className="expense-page">
                <ExpenseForm></ExpenseForm>
                <ExpenseList expenses={this.props.expenses}></ExpenseList>
            </div>
        )
    }
}

// get the state from the store
function mapStateToProps(state) {
    return { expenses: state.expenses };
}

// the first parameter is 'mapStateToProps'
export default connect(mapStateToProps, actions)(ExpenseContainer);