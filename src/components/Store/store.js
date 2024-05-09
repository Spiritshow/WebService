import { create } from "zustand";

export const useStoreDB = create((set, get) => ({
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