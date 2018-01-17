import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './style.scss';

class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropped: false,
    };
    const value = this.getValue();
    this.input = {
      value,
    };
    this.items = [...this.props.items];
    if (this.props.defaultValue) this.items.unshift(this.props.defaultValue);
  }

  getSelected() {
    const value = this.input.value || null;
    return this.items.find(item => item.value === value);
  }

  getValue() {
    switch (true) {
      case this.props.value:
        return this.props.value;
      case this.props.defaultValue:
        return this.props.defaultValue.value;
      default:
        return null;
    }
  }

  handleSelect = (item, e) => {
    const value = item.value || null;
    this.input.value = value;
    e.stopPropagation();
    this.setState({
      dropped: false,
    });
    this.props.onSelect(value);
  };

  toggleDrop = () => {
    this.setState(prevState => ({
      dropped: !prevState.dropped,
    }));
  };

  renderList() {
    const dropClass = classNames(style.dropWrapperHidden, {
      [style.dropWrapper]: this.state.dropped,
    });
    return (
      <div className={dropClass} ref={(node) => { this.dropList = node; }}>
        <div className={style.listWrapper}>
          {this.items.map((item, key) => {
            const itemClass = classNames(style.item, {
              [style.itemSelected]: this.input.value === item.value,
            });
            return (
              <div key={`item_${key.toString()}`} className={itemClass} role="presentation" onClick={e => this.handleSelect(item, e)}>
                {item.text}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    const arrowClass = classNames(style.arrowDown, {
      [style.arrowUp]: this.state.dropped,
    });
    const wrapperClass = classNames(style.wrapper, {
      [style.wrapperDropped]: this.state.dropped,
    });
    const valueClass = classNames(style.valueText, {
      [style.valuePlaceholder]: !this.props.defaultValue && !this.input.value,
    });
    const itemSelected = this.getSelected();
    const valueText = itemSelected ? itemSelected.text : this.props.placeholder;
    return (
      <div role="presentation" className={wrapperClass} onClick={this.toggleDrop} >
        <input ref={(node) => { this.input = node; }} type="hidden" value={this.input.value || ''} />
        <div className={valueClass}>{valueText}</div>
        <div className={style.arrowWrapper}>
          <div className={arrowClass} />
        </div>
        {this.renderList()}
      </div>
    );
  }
}

SelectBox.propTypes = {
  defaultValue: PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })),
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

SelectBox.defaultProps = {
  defaultValue: null,
  items: [],
  onSelect: () => {},
  placeholder: 'Выберите значение',
  value: null,
};

export default SelectBox;
