const initialState = {
  user: null,
  allProduct: [],
  nameProduct: "",
  minPrice: "",
  maxPrice: "",
  productTypes: "",
  filterProducts: null,
  listCart: []
  // noPage: 0
}

const TaskEvent = (state = initialState, action) => {
  switch (action.type) {
    case "USER": {
      return {
        ...state,
        user: action.user,
      }
    }

    case "ALL_PRODUCT": {
      return {
        ...state,
        allProduct: [...action.setProducts],
      }
    }

    case "VALUE_NAME_PRODUCT": {
      return {
        ...state,
        nameProduct: action.nameProduct,
      }
    }

    case "VALUE_MIN_PRICE": {
      return {
        ...state,
        minPrice: action.minPrice,
      }
    }

    case "VALUE_MAX_PRICE": {
      return {
        ...state,
        maxPrice: action.maxPrice,
      }
    }

    case "VALUE_PRODUCT_TYPES": {
      return {
        ...state,
        productTypes: action.productTypes,
      }
    }

    case "VALUE_LIST_ORDER": {
      return {
        ...state,
        listCart: [...state.listCart, action.listCart],
      };
    }


    default: {
      return state
    }
  }
}

export default TaskEvent;