import React, { Component, createRef } from 'react';
import * as Feather from 'react-feather';
import NavBadge from './NavBadge';
import MyNavSingleItem from './MyNavSingleItem';
import MyIcon from './MyIcon';


export default class MyNavDropdownItem extends Component {


  
  constructor(props) {
    super(props);
    this.state = {
      open: props.item.open
    };
  }
  toggle = e => {
    this.setState(prevState => ({ open: !prevState.open }));
    e.preventDefault();
    e.stopPropagation();
  };


  
  render() {

    let ref = createRef();
    const { item } = this.props;
    const isExpanded = this.state.open ? 'open' : '';
    const Icon = item.icon  ? <MyIcon item={item.icon} /> : null;
    const ExpandIcon = this.state.open
      ? Feather.ChevronDown
      : Feather.ChevronRight;
    return (
      <li ref={ref} className={`nav-item has-submenu ${isExpanded}`}>
        <a href="#!" role="button" onClick={this.toggle}>
           {Icon}
          <div className="nav-item-label ml-2">{item.name}</div>{' '}
          {item.badge && (
            <NavBadge color={item.badge.variant} text={item.badge.text} />
          )}
          <ExpandIcon className="menu-expand-icon" />
        </a>
        {(this.state.open || this.props.isSidebarCollapsed) && (
          <ul className="nav-submenu">
            {item.children.map((item, index) => (
              <MyNavSingleItem item={item} key={index} />
            ))}
          </ul>
        )}
      </li>
    );
  }
}
