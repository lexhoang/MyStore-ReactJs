const initialState = {
    cart: parseInt((localStorage.getItem("cart") !== "NaN" && localStorage.getItem("cart") !== null && localStorage.getItem("cart") >= 0) ? localStorage.getItem("cart") : 0),
    id: ((localStorage.getItem("list") !== "NaN" && localStorage.getItem("list") !== null) ? JSON.parse(localStorage.getItem("list")) : []),
}

const addCartEvent = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CART":
            {
                let idList = JSON.stringify([...state.id, action.id])
                localStorage.setItem("list", idList)
                return {
                    ...state,
                    cart: action.cart,
                    id: [...state.id, action.id],
                }
            }
        case "ADD":
            {
                let idList = JSON.stringify([...state.id, action.id])
                localStorage.setItem("list", idList)
                return {
                    ...state,
                    cart: action.cart,
                    id: [...state.id, action.id],
                }
            }
        case "REMOVE":
            {
                let idList = JSON.stringify(action.id)
                localStorage.setItem("list", idList)
                return {
                    ...state,
                    cart: action.cart,
                    id: action.id,
                }
            }
        case "REMOVE_ITEM":
            let idList = JSON.stringify(action.id)
            localStorage.setItem("list", idList)
            return {
                ...state,
                id: action.id,
            }
        default:
            return state
    }
}


export default addCartEvent