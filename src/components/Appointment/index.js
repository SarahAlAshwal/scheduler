import React from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from 'components/Appointment/Form'
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVE";
const CONFIRM = "CONFIRM";
const DELETING = "DLETING";
const EDIT = 'EDIT';
const ERROR_SAVE = "EROOR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(res => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))

  }

  function onDelete(id) {
    transition(CONFIRM);
    transition(DELETING, true);
    props.cancelAppointment(id)
      .then((res) => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  function onEdit(id) {
    transition(EDIT);
  }
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={onEdit}
          id={props.id}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => transition(EMPTY)} />}
      {mode === EDIT && <Form interviewers={props.interviewers} interviewer={props.interview.interviewer.id} name={props.interview.student} onSave={save} onCancel={() => transition(SHOW)} />}
      {mode === SAVING && <Status message={"SAVING"} />}
      {mode === DELETING && <Status message={"DELETING"} />}
      {mode === CONFIRM && <Confirm onCancel={() => transition(SHOW)} onDelete={onDelete} message={'Are you sure you would like to delete?'} id={props.id} />}
      {mode === ERROR_SAVE && <Error message={"Sorry, could not save the new appointment"} onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error message={"Sorry, could not delete this appointment"} onClose={() => back()} />}
    </article>
  );
}