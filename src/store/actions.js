import axios from "axios";
export default {
  async getQuestions(context) {
    try {
      const res = await axios.get(
        "http://938943-cy98692.tmweb.ru/api/v1/question/"
      );
      context.commit("getQuestions", res);
    } catch (err) {
      console.log(err);
    }
  },
  resetWeeks(context) {
    context.commit("reset");
  },
};
