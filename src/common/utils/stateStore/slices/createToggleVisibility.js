 const createToggleVisibility = (set) => ({

    //// global state for mainNav Visibility ////
    mainNavVisibility:true,
    toggleMainNav:() => set(state => ({ mainNavVisibility: !state.mainNavVisibility })),
    showMainNav:() => set(() => ({ mainNavVisibility: true })),
    hideMainNav:() => set(() => ({ mainNavVisibility: false })),

    //// global state for Concession Map Layer Visibility ////
    concessionLayerVisibility:true,
    concessionLayerData:null,
    toggleConcessionLayer:() => set(state => ({ concessionLayerVisibility: !state.concessionLayerVisibility })),
    changeConcesionLayerData:(data) => set((state) => ({ concessionLayerData: data })),



})

export default createToggleVisibility