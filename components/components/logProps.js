/**
 * High order component wrapper to log props when it is time to change them
 * @link https://facebook.github.io/react/docs/higher-order-components.html
 * @param {React.Component} InputComponent 
 */
export function logProps(InputComponent) {
  InputComponent.prototype.componentWillReceiveProps(nextProps) {
    console.log('Current props: ', this.props);
    console.log('Next props: ', nextProps);
  }
  // The fact that we're returning the original input is a hint that it has
  // been mutated.
  return InputComponent;
}

// EnhancedComponent will log whenever props are received
const EnhancedComponent = logProps(InputComponent);