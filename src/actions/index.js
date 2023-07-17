import {
  UPDATE_CHECKED_LIST,
  TOGGLE_CHECK_ALL,
  DATA_LOADED,
  ADD_TICKETS,
  CHEAPER_TICKETS,
  FASTER_TICKETS,
  OPTIMAL_TICKETS,
  FILTERED_TICKETS,
  TICKET_STATUS_LOADING,
  TICKET_STATUS_REQUEST,
  SET_OFFLINE_STATUS,
  SET_ERROR_STATUS,
} from './action-types';

export const updateCheckedList = (checkedList) => ({
  type: UPDATE_CHECKED_LIST,
  payload: checkedList,
});

export const toggleCheckAll = (checkAll) => ({
  type: TOGGLE_CHECK_ALL,
  payload: checkAll,
});

export const dataLoader = (data) => ({
  type: DATA_LOADED,
  payload: data,
});

export const ticketLoading = () => ({
  type: TICKET_STATUS_LOADING,
});

export const ticketRequest = () => ({
  type: TICKET_STATUS_REQUEST,
});

export const addTickets = () => ({
  type: ADD_TICKETS,
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

export const setFilteredTickets = (tickets) => ({
  type: FILTERED_TICKETS,
  payload: tickets,
});

export const setOfflineStatus = (offline) => {
  return {
    type: SET_OFFLINE_STATUS,
    payload: offline,
  };
};

export const setErrorStatus = () => {
  return {
    type: SET_ERROR_STATUS,
  };
};
