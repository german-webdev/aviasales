import { UPDATE_CHECKED_LIST, TOGGLE_CHECK_ALL } from '../actions/action-types';

const initialState = {
  plainOptions: [
    { label: 'Без пересадок', value: '0' },
    { label: '1 пересадка', value: '1' },
    { label: '2 пересадки', value: '2' },
    { label: '3 пересадки', value: '3' },
  ],
  checkedList: ['0', '1', '2', '3'],
  checkAll: true,
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CHECKED_LIST:
      return {
        ...state,
        checkedList: action.payload,
        checkAll: action.payload.length === state.plainOptions.length,
      };

    case TOGGLE_CHECK_ALL:
      return {
        ...state,
        checkedList: action.payload ? state.plainOptions.map((option) => option.value) : [],
        checkAll: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;

