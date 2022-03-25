var express = require("express");
const { getIdParam } = require("./helper/helper");
const { models } = require("../middleware/sequelize");
const userModel = models.user;
const registrycode = models.registrycode;
const { Op } = require("sequelize");
const url = require("url");
const { encryptString } = require("../tools/encryption");
const { sendMail } = require("../service/mail");

var router = express.Router();
router.get("/login", (_req, res) => {
  const username = _req.query.userName;
  const pwd = _req.query.password;
  userModel
    .findOne({ where: { name: username } })
    .then(function (user) {
      if (user && user.password == encryptString(pwd)) {
        _req.session.user = user.id;
        res.send({ status: "success", message: "登录成功", data: { user } });
      } else {
        res.send({ status: "failed", message: "用户名或密码错误", data: {} });
      }
    })
    .catch((ex) => {
      throw new Error(ex);
    });
});
router.post("/registry", (_req, res) => {
  let user = _req.body;
  registrycode
    .findOne({
      where: {
        email: user.email,
        code: user.verifyCode,
      },
    })
    .then((code) => {
      if (code) {
        userModel
          .findOrCreate({
            where: {
              [Op.or]: [
                { email: user.email },
                { name: user.userName },
                { studentId: user.studentId },
                { phone: user.phone },
              ],
            },
            defaults: {
              password: encryptString(user.password),
              email: user.email,
              name: user.userName,
              phone: user.phone,
              studentId: user.studentId,
            },
          })
          .then((result) => {
            let [newUser, created] = result;
            console.log(newUser);
            if (created) {
              res.send({
                status: "success",
                message: "注册成功，即将跳转登录。。。",
                data: { newUser },
              });
            } else {
              res.send({
                status: "failed",
                message:
                  "注册失败，请检查您的用户名，学号，手机，邮箱等信息是否填写错误！",
              });
            }
          })
          .catch((err) => {
            throw new Error(err);
          });
      }else{
        res.send({
          status: "failed",
          message:
            "验证码错误！",
        });
      }
    });
});
router.get("/getCode", (_req, res) => {
  const email = _req.query.email;
  userModel
    .findOne({ where: { email: email } })
    .then(function (user) {
      if (user) {
        res.send({ status: "failed", message: "邮箱已被注册" });
      } else {
        sendMail({ email: email }).then((result) => {
          console.log(result);
          res.send({
            status: "success",
            message: "验证码已经发送到您的邮箱",
            code: "TODO",
          });
        });
      }
    })
    .catch((ex) => {
      throw new Error(ex);
    });
});
router.get('/getCurrentUser',async (_req, res) =>{
  let userId = _req.session.user;
  let user = await userModel.findByPk(userId)
  res.send(user);
})
module.exports = router;
