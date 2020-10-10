import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import 'components/InterviewerList.scss';
import PropTypes from 'prop-types';

function InterviewerList(props) {


  const InterviewersArr = props.interviewers.map((interviewerItem) =>

    <InterviewerListItem key={interviewerItem.id} name={interviewerItem.name} avatar={interviewerItem.avatar} selected={interviewerItem.id === props.value} setInterviewer={(event) => props.onChange(interviewerItem.id)} />
  );
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">interviewers</h4>
      <ul className="interviewers__list">{InterviewersArr}</ul>

    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;


