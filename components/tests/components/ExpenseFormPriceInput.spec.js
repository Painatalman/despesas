import { renderComponent , expect } from '../test_helper';
import ExpenseFormPriceInput from '../../components/ExpenseFormPriceInput';

// must be set to invalid if it is empty
// must show error if set to do so
// must have an input for title
describe('Expense Form Price Input', () => {
  let component;
  
  beforeEach(() => {
    component = renderComponent(ExpenseFormPriceInput);
  });
  
  it ('should exist', () => {
    expect(component).to.exist;
  });
  
  it('has ONE input only', () => {
    expect(component.find('input').length).to.equal(1);
  });
  it('has an input of type number', () => {
    expect(component.find('input[type=number]')).to.exist;
  });
  it('has an input named "price"', () => {
    expect(component.find('input[name=price]')).length.to.be(1);
  });
  it('has a class name based on the component name', () => {
    expect(component).to.have.class('expense-form__price-input');
  })

  describe('Entering price', () => {
    let inputNode;
  beforeEach(() => {
    inputNode = component.find('input');
    inputNode.simulate('change', 25)
  });

  it('should not allow text', () => {
    throw new Error();
  })
  
  it('should call the onChange props method', () => {
    throw new Error();
  });
})
});
