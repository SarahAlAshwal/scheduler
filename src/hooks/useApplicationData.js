import {useState, useEffect} from 'react';
import axios from 'axios';
export default function useApplicationData (initial) {

  const [state, setState] = useState (
    {
      day: 'Monday',
      days: [],
      appointments: {},
      interviewers: {}
    }
  );

  const setDay = (day) => {
    setState({...state , day})
  }

  //the change value is +1 when we delete an appointment and -1 when we add an appointment 
  function changeSpots (change) {
    const myDay = state.days.find((d)=> d.name === state.day )
      myDay.spots = myDay.spots + change ;
      const dayId = myDay.id;
      const days = [...state.days]
      days[dayId] = myDay;
  }

  function bookInterview(id, interview) {
    //check if the interview is empty or not to decide if the operation is edit or add 
    //The value 0 is for edit an appointment so the spots number will not change
    //The value -1 for add an appointment so the number of spot will decrease by 1
    const editOrAdd = state.appointments[id].interview ? 0: -1;
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    changeSpots(editOrAdd);
    return axios.put(`/api/appointments/${id}`, appointment)
      .then((res) => setState({ ...state, appointments }))
      .catch();
  }

  function cancelAppointment(id) {
    const appointment = {
      ...state.appointments[id], interview: null
    }

    const appointments = {
      ...state.appointments, [id]:appointment
    }
   //the passed value is +1 so the number of spots will increase by one
    changeSpots(1);
    
    return axios.delete(`/api/appointments/${id}`)
    .then ((res) => {
      setState({...state, appointments})
    })
    .catch();
    
  }

  useEffect(()=>{
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
    .then((all)=>{
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    }
    )
  },[])


  return { state, setDay, bookInterview, cancelAppointment };
}