import React from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from 'components/Appointment/Form'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"


export default function Appointment (props){

  console.log('appointments props:' ,props);

 
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // React.useEffect(() => {
  //   if(props.interview && mode === EMPTY){
  //     transition(SHOW)
  //   }
  //   if(props.interview === null && mode === EMPTY){
  //     transition(EMPTY)
  //   }
  // },[])

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    transition(SHOW)
  }

  return (
    <article className="appointment">
      <Header time= {props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}  
      {mode === CREATE && <Form interviewers={props.interviewers}  onSave={save} onCancel={()=> transition(EMPTY)}/>}
  
    </article>
  );
}