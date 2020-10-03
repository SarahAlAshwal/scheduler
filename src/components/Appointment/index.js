import React from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from 'components/Appointment/Form'
import Status from './Status';
import Confirm from './Confirm';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVE";
const CONFIRM = "CONFIRM";
const DELETING = "DLETING";
const EDIT = 'EDIT';


export default function Appointment (props){
 
   const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
   
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(res => transition(SHOW)
    );
    
  }

  function onDelete(id) {
    transition(CONFIRM);
    transition(DELETING);
    props.cancelAppointment(id)
    .then((res) => transition(EMPTY))
  }

  function onEdit(id) {
    transition(EDIT);
  }
  return (
    <article className="appointment">
      <Header time= {props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={()=> transition(CONFIRM)}
          onEdit={onEdit}
          id={props.id}
        />
      )}  
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={()=> transition(EMPTY)}/>}
      {mode === EDIT && <Form interviewers={props.interviewers} interviewer={props.interview.interviewer.id} name={props.interview.student} onSave={save} onCancel={()=> transition(SHOW)}/>}
      {mode === SAVING && <Status message= {"SAVING"}/>}
      {mode === DELETING && <Status message= {"DELETING"}/>}
      {mode === CONFIRM && <Confirm onCancel={()=> transition(SHOW)} onDelete={onDelete} message={'Are you sure you would like to delete?'} />}
    </article>
  );
}