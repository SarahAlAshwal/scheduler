export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let appointmentsIds= [] ;
  let appointmentesArray = [];

 for (const dayInState of state.days) {
   if (dayInState.name === day) {
     appointmentsIds = dayInState.appointments; 
   }
 }
 for (const id of appointmentsIds) {

  appointmentesArray.push(state.appointments[id])
}
return appointmentesArray;
}

export function getInterview(state, interview) {
  const foundInterview = {};
  if (interview) {
    for (const interviewer in state.interviewers) {
      if ( state.interviewers[interviewer].id === interview.interviewer) {
        foundInterview['student'] = interview.student;
        foundInterview['interviewer'] = state.interviewers[interviewer];
      }
    }
  } else {
    return null;
  }

  return foundInterview;
}

