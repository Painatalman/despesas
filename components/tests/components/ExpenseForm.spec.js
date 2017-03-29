import {
  renderComponent,
  expect
} from '../test_helper';
import ExpenseForm from '../../components/ExpenseForm';

// must have a title input component
// must have a date input component
// must have an 'is-expense' input
// must have all inputs valid when submitting
// should have a category input
describe('Expense Form', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(ExpenseForm);
  });

  it('shows an expense form price input', () => {
    expect(component.find('.expense-form__price-input')).to.exist;
  });
  it('shows an expense form title input', () => {
    expect(component.find('.expense-form__title-input')).to.exist;
  });
  it('shows ONE input named "title" only', () => {
    expect(component.find('input[name=title]')).length.to.be(1);
  });
  it('shows a submit button', () => {
    expect(component.find('button')).to.exist;
  });

  describe('Entering title', () => {
    let inputNode;

    beforeEach(() => {
      inputNode = component.find('input[name=title]');
      inputNode.simulate('change', 'new expense')
    });

    it('should update title state value on title input change', () => {
      expect(inputNode).to.have.value('new expense');
      // TODO: check state
    })

    it('clears the title, when submitted', () => {
      component.simulate('submit');

      expect(inputNode).to.have.value('');
    });
  })

  describe('Entering price', () => {
    let inputNode;

    beforeEach(() => {
      inputNode = component.find('input[name=price]');
      inputNode.simulate('change', 20)
    });

    it('should update price state value on price input change', () => {
      expect(inputNode).to.have.value('20');

      inputNode.simulate('change', 24);
      expect(inputNode).to.have.value('24');
      // TODO: check state
    })

    it('empties price, when submitted', () => {
      component.simulate('submit');
      
      expect(inputNode).to.have.value('');
    });
  })
});