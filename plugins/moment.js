import moment from "moment";

export default (ctx, inject) => {
  inject("moment", moment);
};
