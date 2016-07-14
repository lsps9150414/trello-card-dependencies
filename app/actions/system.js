export const actionTypes = {
  TOGGLE_CARD_DEP_VIEW: 'TOGGLE_CARD_DEP_VIEW',
};

export const toggleCardDepView = (showCardDepView) => ({
  type: actionTypes.TOGGLE_CARD_DEP_VIEW,
  showCardDepView,
});
