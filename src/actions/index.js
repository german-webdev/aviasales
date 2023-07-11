import { 
  UPDATE_CHECKED_LIST, 
  TOGGLE_CHECK_ALL, 
  SHOW_ALL_TICKETS
} from './action-types';

export const updateCheckedList = (checkedList) => ({
  type: UPDATE_CHECKED_LIST,
  payload: checkedList,
});

export const toggleCheckAll = (checkAll) => ({
  type: TOGGLE_CHECK_ALL,
  payload: checkAll,
});

export const setHeaderTickets = (ticketHeader) => ({
  type: SHOW_ALL_TICKETS,
  payload: ticketHeader,
});


