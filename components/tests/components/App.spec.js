import { renderComponent , expect } from '../test_helper';
import App from '../../components/App';

describe('App' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(App);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('shows an expense form', () => {
    expect(component.find('.expense-form')).to.exist;
  });

  it('shows an expense list', () => {
    expect(component.find('.expense-list')).to.exist;
  });
});
