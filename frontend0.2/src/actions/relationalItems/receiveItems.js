export const RECEIVE_ITEMS = 'RECEIVE_ITEMS'

module.exports = function(parameter, json) {
  return {
    type: RECEIVE_ITEMS,
    parameter,
    items: json,
    // items: json[ parameter ],
    receivedAt: Date.now()
  }
};