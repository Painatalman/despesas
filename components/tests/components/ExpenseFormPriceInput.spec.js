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
    });

    // either we add state to this, or these checks must go to the Expense Form itself
    // this may end up becoming one of those uncontrolled components
    it('should allow integer numbers and convert it to decimal', () => {
      inputNode.simulate('change', 20);
      inputNode.simulate('blur');
      expect(inputNode.val()).equal('20.00');
    });

    it('should allow decimal numbers up to 2 cases', () => {
      inputNode.simulate('change', 20.25);
      expect(inputNode.val()).equal('20.25');

      inputNode.simulate('change', 20.255);
      expect(inputNode.val()).equal('20.25');
    });

    it('should not allow text with no numbers', () => {
      inputNode.simulate('change', 'Bla bla bla - prince of all saiyans!');
      inputNode.simulate('blur');
      expect(inputNode.val()).equal('');
  });

    it('should just use the numbers when a mix of text and numbers is included', () => {
      inputNode.simulate('change', 'Bla bla bla - prince of all saiyans!');
    });
    
    it('should call the onChange props method', () => {
      throw new Error();
    });
  });
});
