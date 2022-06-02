import axios from "axios";
export default {
  async getQuestions(context) {
    try {
      const res = await axios.get(
        "http://ec2-3-91-8-58.compute-1.amazonaws.com/api/v1/question/"
      );
      context.commit("getQuestions", res);
    } catch (err) {
      console.log(err);
    }
  },
};
