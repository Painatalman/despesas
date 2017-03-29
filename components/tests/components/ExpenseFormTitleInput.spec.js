import { renderComponent , expect } from '../test_helper';
import ExpenseFormTitleInput from '../../components/ExpenseFormTitleInput';

// must be set to invalid if it is empty
// must show error if set to do so
// must have an input for title
describe('Expense Form Title Input', () => {
  let component;
  
  beforeEach(() => {
    component = renderComponent(ExpenseFormTitleInput);
  });
  
  it ('should exist', () => {
    expect(component).to.exist;
  });
  it('has an input', () => {
    expect(component.find('input')).to.exist;
  });
  it('has ONE input only', () => {
    expect(component.find('input').length).to.equal(1);
  });
  it('has a class name based on the component name', () => {
    expect(component).to.have.class('expense-form__title-input');
  });

  

  describe('Entering title', () => {
  beforeEach(() => {
    component.find('input').simulate('change', 'new expense')
  });
  
  it('should call the onChange props method', () => {
    let inputNode = component.find('input');
    inputNode.simulate('change', 'new expense');

    throw new Error();
  });
})
});

