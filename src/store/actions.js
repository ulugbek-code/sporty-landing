import axios from "axios";
export default {
  async getQuestions(context) {
    try {
      const res = await axios.get("https://e-hub.uz/api/v1/question/");
      context.commit("getQuestions", res);
    } catch (err) {
      console.log(err);
    }
  },
  resetWeeks(context) {
    context.commit("reset");
  },
  changeClassDate(context) {
    context.commit("changeClassDate");
  },
};
