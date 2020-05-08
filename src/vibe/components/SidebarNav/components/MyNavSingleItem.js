import React, {createRef} from 'react';
import { NavLink } from 'react-router-dom';
// import * as Feather from 'react-feather';
import MyIcon from './MyIcon';
import NavBadge from './NavBadge';

const MyNavSingleItem = ({ item }) => {

  let ref = createRef();

  const Icon = item.icon  ? <MyIcon item={item.icon} /> : null;


  if (item.external) {
    const rel = item.target && item.target === '_blank' ? 'noopener noreferrer' : null;

    return (
      <li ref={ref} className="nav-item">
        <a href={item.url} target={item.target} rel={rel}>
          {Icon}
          <div className="nav-item-label ml-3">{item.name}</div>
          {item.badge && <NavBadge color={item.badge.variant} text={item.badge.text} />}
        </a>
      </li>
    );
  } else {
 // Force relative URLs to start with a slash
    const url = item.url.charAt(0) === '/' ? item.url : `/${item.url}`;

    return (
      <li ref={ref} className="nav-item">
        <NavLink to={url} activeClassName="active">
          {Icon}
          <div className="nav-item-label ml-3">{item.name}</div>
          {item.badge && <NavBadge color={item.badge.variant} text={item.badge.text} />}
        </NavLink>
      </li>
    );
  }
};

export default MyNavSingleItem;
