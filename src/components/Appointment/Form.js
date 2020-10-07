import React, {useState} from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form (props){
  const [name, setName] = useState(props.name || "");
  const[interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function validate() {
    //check if the student name is empty
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    //check if the user haven't choose an interviewer 
    if (!interviewer) {
      setError("Please choose un interviewer")
      return;
    }
    //if both the student name and the interviewer have values the save operation can be processed
    setError("");
    props.onSave(name, interviewer);
  }

  function reset() {
    setName("");
    setInterviewer(null);
  }

  function cancel () {
    reset();
    props.onCancel();
  }
 

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
           <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value= {(name ? name: "")}
            data-testid= "student-name-input"
            placeholder="Enter Student Name"
            onChange= {(event) => { setName(event.target.value)}}
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
</main>
  );
}