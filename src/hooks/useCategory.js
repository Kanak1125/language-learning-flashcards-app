import { useEffect, useReducer } from "react";
import { doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { database, db } from "@/firebase/config";

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

        case ACTIONS.SET_CHILD_CARDS:
            return {
                ...state,
                child_cards: payload.child_cards,
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

    useEffect(() => {
        console.log("You need to update the child flashcards as well...");

        const q = query(database.cards, where("parentCategory", "==", categoryId));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            dispatch({
                type: ACTIONS.SET_CHILD_CARDS,
                payload: {
                    child_cards: querySnapshot.docs.map(doc => doc.data()),
                }
            })
        })

        // const unsubscribe = onSnapshot(docRef, (doc) => {
        //     dispatch({
        //         type: ACTIONS.SET_CHILD_CARDS,
        //         payload: {
        //             child_cards: 
        //         }
        //     })
        // })
        return () => unsubscribe();
    }, [category, categoryId]);

    useEffect(() => {
        console.log(state);
    }, [state]);
    return state;
}