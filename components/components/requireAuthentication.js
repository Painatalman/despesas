import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
    class Authentication extends Component {
        // if you console.log the context
        // and not define it, 
        // it will just show an empty object
        // static refers to a property on the actual class, not instances of it
        // for this case, it is the same as Authentication.contextTypes
        static contextTypes = {
            router: React.PropTypes.object
        }

        componentWillMount() {
            if (!this.props.authenticated) {
                // go home!
                this.context.router.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            // not authenticated yet?
            if (!nextProps.authenticated) {
                // go home!
                this.context.router.push('/');
            }
        }

        render() {
            if (this.props.authenticated) {
                return <ComposedComponent {... this.props} />
            } else {
                return <div></div>
            }
        }
    }

    function mapStateToProps(state) {
        return {
            authenticated: state.auth.authenticated
        }
    }

    return connect(mapStateToProps)(Authentication);
}