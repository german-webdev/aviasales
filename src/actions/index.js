import { 
  UPDATE_CHECKED_LIST, 
  TOGGLE_CHECK_ALL, 
  TICKET_LOADED,
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


