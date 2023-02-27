class ExpressError extends Error {
   contsructor(msg, code) {
      this.super();
      this.msg = msg;
      this.code = code;
      console.error(this.stack)
   }
}

module.exports = ExpressError;