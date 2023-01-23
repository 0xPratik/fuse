import { create } from 'zustand'
import * as anchor from "@coral-xyz/anchor"

interface ParentMintState {
    parentMint: anchor.web3.PublicKey | undefined,
    setMint: (mint: anchor.web3.PublicKey) => void,

}

export const useParentMint = create<ParentMintState>((set) => ({
    parentMint: undefined ,
    setMint: (mint) => set({ parentMint: mint }),

}))

interface RerenderIn {
    rerender: number,
    setRender: () => void,

}


export const useReRender = create<RerenderIn>((set) => ({
    rerender: 0,
    setRender: () => set((state:any) => ({rerender: state.rerender + 1 }) )
}))