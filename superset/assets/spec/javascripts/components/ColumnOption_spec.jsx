import React from 'react';
import { shallow } from 'enzyme';

import ColumnOption from '../../../src/components/ColumnOption';
import ColumnTypeLabel from '../../../src/components/ColumnTypeLabel';
import InfoTooltipWithTrigger from '../../../src/components/InfoTooltipWithTrigger';

describe('ColumnOption', () => {
  const defaultProps = {
    column: {
      column_name: 'foo',
      verbose_name: 'Foo',
      expression: 'SUM(foo)',
      description: 'Foo is the greatest column of all',
    },
    showType: false,
  };

  let wrapper;
  let props;
  const factory = o => <ColumnOption {...o} />;
  beforeEach(() => {
    wrapper = shallow(factory(defaultProps));
    props = Object.assign({}, defaultProps);
  });
  it('is a valid element', () => {
    expect(React.isValidElement(<ColumnOption {...defaultProps} />)).toBe(true);
  });
  it('shows a label with verbose_name', () => {
    const lbl = wrapper.find('.option-label');
    expect(lbl).toHaveLength(1);
    expect(lbl.first().text()).toBe('Foo');
  });
  it('shows 2 InfoTooltipWithTrigger', () => {
    expect(wrapper.find(InfoTooltipWithTrigger)).toHaveLength(2);
  });
  it('shows only 1 InfoTooltipWithTrigger when no descr', () => {
    props.column.description = null;
    wrapper = shallow(factory(props));
    expect(wrapper.find(InfoTooltipWithTrigger)).toHaveLength(1);
  });
  it('shows a label with column_name when no verbose_name', () => {
    props.column.verbose_name = null;
    wrapper = shallow(factory(props));
    expect(wrapper.find('.option-label').first().text()).toBe('foo');
  });
  it('shows a column type label when showType is true', () => {
    wrapper = shallow(factory({
      ...props,
      showType: true,
      column: {
        expression: null,
        type: 'str',
      },
    }));
    expect(wrapper.find(ColumnTypeLabel)).toHaveLength(1);
  });
  it('column with expression has correct column label if showType is true', () => {
    props.showType = true;
    wrapper = shallow(factory(props));
    expect(wrapper.find(ColumnTypeLabel)).toHaveLength(1);
    expect(wrapper.find(ColumnTypeLabel).props().type).toBe('expression');
  });
  it('shows no column type label when type is null', () => {
    wrapper = shallow(factory({
      ...props,
      showType: true,
      column: {
        expression: null,
        type: null,
      },
    }));
    expect(wrapper.find(ColumnTypeLabel)).toHaveLength(0);
  });
  it('dttm column has correct column label if showType is true', () => {
    props.showType = true;
    props.column.is_dttm = true;
    wrapper = shallow(factory(props));
    expect(wrapper.find(ColumnTypeLabel)).toHaveLength(1);
    expect(wrapper.find(ColumnTypeLabel).props().type).toBe('time');
  });
});
