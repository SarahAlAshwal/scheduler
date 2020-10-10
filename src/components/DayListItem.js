import React from 'react'
import "components/DayListItem.scss";
import classnames from 'classnames'


export default function DayListItem(props) {

  const dayClass = classnames({'day-list__item':true},{'day-list__item--selected': props.selected,'day-list__item--full': (props.spots === 0)} );
  console.log(dayClass)
  function formatSpots (spots) {
    let spotsText = `${spots} spots remaining`;
    if (spots === 1) 
      return spotsText = `${spots} spot remaining`;
    else if ( spots === 0)
       return spotsText = `no spots remaining`;
    else
      return spotsText;
  }
  return (
    <li  data-testid="day" className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className='text--regular'>{props.name}</h2>
      <h3 className='text--light'>{formatSpots(props.spots)}</h3>
    </li>
  );
}