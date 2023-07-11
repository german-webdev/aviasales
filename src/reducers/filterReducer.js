import { UPDATE_CHECKED_LIST, TOGGLE_CHECK_ALL } from '../actions/action-types';

const initialState = {
  plainOptions: [
    { label: 'Без пересадок', value: 'option1' },
    { label: '1 пересадка', value: 'option2' },
    { label: '2 пересадки', value: 'option3' },
    { label: '3 пересадки', value: 'option4' },
  ],
  checkedList: [],
  checkAll: false,
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

