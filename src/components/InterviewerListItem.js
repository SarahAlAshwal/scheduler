import React from 'react'
import 'components/InterviewerListItem.scss'
import classnames from "classnames"

export default function InterviewerListItem(props) {

  let InterviewerClass = classnames({ 'interviewers__item': true, "interviewers__item--selected": props.selected });
  let ImageClass = classnames({ "interviewers__item-image": true, "interviewers__item--selected-image": props.selected });

  let InterviewerSelected = props.selected;

  return (
    <li className={InterviewerClass} onClick={props.setInterviewer} >
      <img
        className={ImageClass}
        src={props.avatar}
        alt={props.name}
      />
      {InterviewerSelected && props.name}
    </li>
  );
}