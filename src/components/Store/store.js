import { create } from "zustand";

export const useStoreDB = create((set, get) => ({
    data: [],
    addData: (dataDB) => {
        set({data: dataDB})
    }
}))