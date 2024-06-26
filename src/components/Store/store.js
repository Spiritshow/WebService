import { create } from "zustand";

export const useStoreDB = create((set, get) => ({
    data: [],
    addData: (dataDB) => {
        set({data: dataDB})
    }
}))

export const useOfferClient = create((set, get) => ({
    data: [],
    addData: (dataDB) => {
        set({data: dataDB})
    }
}))

export const useStoreComments = create((set,get) => ({
    comments: [],
    addComment: (newComment) => {
        set({comments: [...get().comments, newComment]})
    }
}))

export const useLoginDB = create((set,get) => ({
    user: null,
    addUser: (userDB) => {
        set({user: userDB})
    }
}))

export const useClass = create((set,get) => ({
    class: false,
    addClass: (newClass) => {
        set({class: newClass})
    }
}))