import { useEffect, useReducer } from "react";
import { database } from "@/firebase/config";

const ACTIONS = {
    SELECT_CATEGORY: 'select_category',
    UPDATE_CATEGORY: 'update_category',
    SET_CHILD_CARDS: 'set_child_cards',
}

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.SELECT_CATEGORY:
            return {
                categoryId: payload.categoryId,
                category: payload.category,
                child_cards: [],
            }

        case ACTIONS.UPDATE_CATEGORY:
            return {
                ...state,
                category: payload.category
            }
    }
}

export function useCategory(categoryId = null, category = null) {
    const [state, dispatch] = useReducer(reducer, {
        categoryId,
        category,
        child_cards: [],
    })

    useEffect(() => {
        dispatch({type: ACTIONS.SELECT_CATEGORY, payload: { categoryId, category }})
    }, [categoryId, category]);

    useEffect(() => {
        if (categoryId == null) {
            return dispatch({
                type: ACTIONS.UPDATE_CATEGORY,
                payload: { category: null }
            })
        }

        database.categories.doc(categoryId).get().then(doc => {
            dispatch({
                type: ACTIONS.UPDATE_CATEGORY,
                payload: { category: doc }
            })
        }).catch(() => {
            dispatch({
                type: ACTIONS.UPDATE_CATEGORY,
                payload: { category: null },
            })
        })     
    }, [categoryId]);

    return state;
}