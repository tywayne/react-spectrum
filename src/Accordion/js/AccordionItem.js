import ChevronRightMedium from '../../Icon/core/ChevronRightMedium';
import classNames from 'classnames';
import createId from '../../utils/createId';
import filterDOMProps from '../../utils/filterDOMProps';
import focusRing from '../../utils/focusRing';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

/**
 * An AccordionItem component represents an item in an accordion
 */
@focusRing
export default class AccordionItem extends Component {
  static propTypes = {
    /** A string or node which will be placed at the top of the accordion item. */
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    ariaLevel: PropTypes.number,
    onItemClick: PropTypes.func
  };

  static defaultProps = {
    header: '',
    selected: false,
    disabled: false,
    ariaLevel: 3,
    onItemClick() {}
  };

  constructor(props) {
    super(props);
    this.headerId = createId();
    this.contentId = createId();
  }

  onHeaderKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.props.onItemClick();
    }
  }

  render() {
    const {
      children,
      className,
      onItemClick,
      header,
      selected,
      disabled,
      ariaLevel,
      ...otherProps
    } = this.props;

    return (
      <div
        {...filterDOMProps(otherProps)}
        className={
          classNames(
            'spectrum-Accordion-item',
            {'is-open': selected, 'is-disabled': disabled},
            className
          )
        }
        role="presentation">
        <div
          id={this.headerId}
          className="spectrum-Accordion-itemHeader"
          aria-controls={this.contentId}
          aria-selected={selected}
          aria-expanded={selected}
          aria-disabled={disabled}
          role="tab"
          tabIndex={!disabled ? 0 : null}
          onClick={!disabled ? onItemClick : null}
          onKeyPress={!disabled ? this.onHeaderKeyPress.bind(this) : null}>
          <span role="heading" aria-level={ariaLevel}>
            {header}
          </span>
        </div>
        <ChevronRightMedium role="presentation" size={null} className="spectrum-Accordion-itemIndicator" />
        <div
          id={this.contentId}
          role="tabpanel"
          aria-labelledby={this.headerId}
          aria-hidden={!selected}
          aria-expanded={selected}
          className="spectrum-Accordion-itemContent">
          {selected ? children : null}
        </div>
      </div>
    );
  }
}
