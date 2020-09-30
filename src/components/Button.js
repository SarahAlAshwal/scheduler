import React from "react";

import "components/Button.scss";

import classnames from 'classnames'

export default function Button(props) {

   // let buttonClass = 'button';
   // if(props.confirm) {
   //    buttonClass+= ' button--confirm'
   // }

   // if(props.danger) {
   //    buttonClass += ' button--danger'
   // }

   const buttonClass = classnames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
    });

  // const buttonClass = classNames('button', {'button--confirm': props.confirm}, {'button--danger': props.danger} );
   
   return <button onClick = { props.onClick} className={buttonClass} disabled= {props.disabled}>{props.children}</button>;
}
