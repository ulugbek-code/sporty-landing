export default {
  getQuestions(state, payload) {
    state.questions = payload.data;
  },
};
