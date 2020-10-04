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
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    changeSpots(-1);
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
   
    changeSpots(1);
    
    return axios.delete(`/api/appointments/${id}`)
    .then ((res) => {
      setState({...state, appointments})
    })
    .catch();
    
  }

  useEffect(()=>{
    Promise.all([
      axios.get('http://localhost:8080/api/days'),
      axios.get('http://localhost:8080/api/appointments'),
      axios.get('http://localhost:8080/api/interviewers')
    ])
    .then((all)=>{
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    }
    )
  },[])


  return { state, setDay, bookInterview, cancelAppointment };
}