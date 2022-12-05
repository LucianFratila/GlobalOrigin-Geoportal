const createToggleVisibility = (set) => ({
  //// global state for Concession Map Layer Visibility ////
  concessionLayerVisibility: true,
  concessionLayerData: null,
  showConcession: () => set(() => ({ concessionLayerVisibility: true })),
  hideConcession: () => set(() => ({ concessionLayerVisibility: false })),
  toggleConcessionLayer: () => set((state) => ({ concessionLayerVisibility: !state.concessionLayerVisibility })),
  changeConcesionLayerData: (data) => set((state) => ({ concessionLayerData: data })),

  UFAvisibility: true,
  toggleUFA: () => set((state) => ({ UFAvisibility: !state.UFAvisibility })),
  showUFA: () => set(() => ({ UFAvisibility: true })),
  hideUFA: () => set(() => ({ UFAvisibility: false })),

  UFGvisibility: true,
  toggleUFG: () => set((state) => ({ UFGvisibility: !state.UFGvisibility })),
  showUFG: () => set(() => ({ UFGvisibility: true })),
  hideUFG: () => set(() => ({ UFGvisibility: false })),

  AACvisibility: true,
  toggleAAC: () => set((state) => ({ AACvisibility: !state.AACvisibility })),
  showAAC: () => set(() => ({ AACvisibility: true })),
  hideAAC: () => set(() => ({ AACvisibility: false })),

  //// global state for Concession Map Layer Visibility ////

  //// mainNav Visibility ////
  mainNavVisibility: true,
  toggleMainNav: () => set((state) => ({ mainNavVisibility: !state.mainNavVisibility })),
  showMainNav: () => set(() => ({ mainNavVisibility: true })),
  hideMainNav: () => set(() => ({ mainNavVisibility: false })),

  ///// SidePanel Visibility /////
  concessionSidePanelVisibility: false,
  showConcessionSidePanel: () => set(() => ({ concessionSidePanelVisibility: true })),
  hideConcessionSidePanel: () => set(() => ({ concessionSidePanelVisibility: false })),

  AACSidePanelVisibility: false,
  showAACSidePanel: () => set(() => ({ AACSidePanelVisibility: true })),
  hideAACSidePanel: () => set(() => ({ AACSidePanelVisibility: false })),

  treeSidePanelVisibility: false,
  showTreeSidePanel: () => set(() => ({ treeSidePanelVisibility: true })),
  hideTreeSidePanel: () => set(() => ({ treeSidePanelVisibility: false })),

  UGFSidePanelVisibility: false,
  showUFGSidePanel: () => set(() => ({ UGFSidePanelVisibility: true })),
  hideUFGSidePanel: () => set(() => ({ UGFSidePanelVisibility: false })),

  UFASidePanelVisibility: false,
  showUFASidePanel: () => set(() => ({ UFASidePanelVisibility: true })),
  hideUFASidePanel: () => set(() => ({ UFASidePanelVisibility: false })),

  

  jwt: null,
  setJwt: (data) => set((state) => ({ jwt: data })),
});

export default createToggleVisibility;
