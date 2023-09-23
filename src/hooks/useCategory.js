import { useEffect, useReducer } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

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

        // the following need to be changed to the modular version of the firebase...

        async function getCurrentCategory() {
            const docRef = doc(db, "categories", categoryId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                dispatch({
                    type: ACTIONS.UPDATE_CATEGORY,
                    payload: { category: docSnap.data() },
                })
            } else {
                dispatch({
                    type: ACTIONS.UPDATE_CATEGORY,
                    payload: { category: null },
                })
            }
        }

        getCurrentCategory(); 
    }, [categoryId]);

    return state;
}