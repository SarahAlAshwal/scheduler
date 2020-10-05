import React from 'react'
import 'components/InterviewerListItem.scss'
import classnames from "classnames"

export default function InterviewerListItem (props) {

  let InterviewerClass = classnames ({'interviewers__item': !(props.selected), "interviewers__item--selected":props.selected});
  let ImageClass = classnames({"interviewers__item-image":!(props.selected),"interviewers__item-image--selected": props.selected });

  let InterviewerSelected = props.selected;

  
  return (
    <li className={InterviewerClass} onClick = {props.setInterviewer} >
  <img
    className={ImageClass}
    src={props.avatar}
    alt={props.name}
  />
  {InterviewerSelected && props.name}
</li>
  );
}