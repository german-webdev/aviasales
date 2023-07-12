import { 
  UPDATE_CHECKED_LIST, 
  TOGGLE_CHECK_ALL, 
  TICKET_LOADED,
  ADD_TICKETS,
  STOP_STATUS,
  CHEAPER_TICKETS,
  FASTER_TICKETS,
  OPTIMAL_TICKETS,
} from './action-types';

export const updateCheckedList = (checkedList) => ({
  type: UPDATE_CHECKED_LIST,
  payload: checkedList,
});

export const toggleCheckAll = (checkAll) => ({
  type: TOGGLE_CHECK_ALL,
  payload: checkAll,
});

export const ticketLoader = (tickets) => ({
  type: TICKET_LOADED,
  payload: tickets,
});

export const addTickets = () => ({
  type: ADD_TICKETS,
});

export const setStopStatus = (status) => ({
  type: STOP_STATUS,
  payload: status,
});

export const setCheaperTickets = () => ({
  type: CHEAPER_TICKETS,
});

export const setFasterTickets = () => ({
  type: FASTER_TICKETS,
});

export const setOptimalTickets = () => ({
  type: OPTIMAL_TICKETS,
});



