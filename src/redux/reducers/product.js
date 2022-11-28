import types from "../types";

const initialState = {
    myProducts: [],
    error: null,
    loading: false,
    addProduct: null,
    updateProduct: null,
    deleteProduct: null
}

const product = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PRODUCT_BEGIN:
            console.log('Into begin');
            return {
                ...state,
                loading: true
            }
        case types.GET_PRODUCT_SUCCESS:
            console.log('Get success');
            return {
                ...state,
                loading: false,
                myProducts: action.payload.myProducts
            }

        case types.GET_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }

        case types.POST_PRODUCT_BEGIN:
            console.log('Into begin');
            return {
                ...state,
                loading: true
            }
        case types.POST_PRODUCT_SUCCESS:
            console.log('Post success');
            return {
                ...state,
                loading: false,
                addProduct: action.payload.addProduct
            }

        case types.POST_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }

        case types.EDIT_PRODUCT_BEGIN:
            console.log('Into begin');
            return {
                ...state,
                loading: true
            }
        case types.EDIT_PRODUCT_SUCCESS:
            console.log('Update success');
            return {
                ...state,
                loading: false,
                updateProduct: action.payload.updateProduct
            }

        case types.EDIT_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }

        case types.DELETE_PRODUCT_BEGIN:
            console.log('Into begin');
            return {
                ...state,
                loading: true
            }
        case types.DELETE_PRODUCT_SUCCESS:
            console.log('Delete success');
            return {
                ...state,
                loading: false,
                deleteProduct: action.payload.deleteProduct
            }

        case types.DELETE_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default product;