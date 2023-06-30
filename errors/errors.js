exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bud request" });
  } else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err, "<--- Err from handle500s error handler");
  res.status(500).send({ msg: "I am broken... " });
};
