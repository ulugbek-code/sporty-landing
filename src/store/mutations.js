export default {
  changeClassDate(state) {
    state.isClassDateChanged = !state.isClassDateChanged;
  },
  getQuestions(state, payload) {
    state.questions = payload.data;
  },
  getEachWeekDates(state, payload) {
    state.eachWeekDates.push(payload);
  },
  removeEachWeekDates(state, payload) {
    state.eachWeekDates = state.eachWeekDates.filter((d) => d != payload);
  },
  reset(state) {
    state.eachWeekDates = [];
  },
};
