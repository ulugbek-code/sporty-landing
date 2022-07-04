import axios from "axios";
export default {
  async getQuestions(context) {
    try {
      const res = await axios.get("http://185.196.214.250/api/v1/question/");
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
