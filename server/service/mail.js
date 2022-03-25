const nodemailer = require("nodemailer"); // 创建可重用邮件传输器
const { models } = require("../middleware/sequelize");
const { Op } = require("sequelize");
const schedule = require("node-schedule");
const registrycode = models.registrycode;
const transporter = nodemailer.createTransport({
  host: "smtp.126.com", // 网易的邮件地址
  port: 465, // 端口
  secureConnection: false, // use SSL
  auth: {
    user: "yangyifandlmu@126.com", // 邮箱账号
    pass: "EFDAKJDAZXMHSITJ", // 邮箱的授权码
  },
});

const getRandomNum = function () {
  let code = "";
  for (let index = 0; index < 6; index++) {
    code += Math.floor(Math.random() * 10) + "";
  }
  return code;
};

const send = async (config) => {
  let userEmail = config.email;
  let existCode = await registrycode.findAll({ where: { email: userEmail } });
  let emailCode = getRandomNum();
  if (existCode.length > 0) {
    let result = await registrycode.destroy({ where: { email: userEmail } });
  }
  let result = await registrycode.create({
    email: userEmail,
    code: emailCode,
  });

  //验证码为6位随机数
  let email = {
    title: "海纳百物--邮箱验证码",
    htmlBody:
      '<h1>Hello!</h1><p style="font-size: 18px;color:#000;">海大百物的验证码为：<u style="font-size: 16px;color:#1890ff;">' +
      emailCode +
      '</u></p><p style="font-size: 14px;color:#666;">10分钟内有效</p>',
  };
  let mailOptions = {
    from: "yangyifandlmu@126.com", // 发件人地址
    to: userEmail, // 收件人地址，多个收件人可以使用逗号分隔
    subject: email.title, // 邮件标题
    html: email.htmlBody, // 邮件内容
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message send: %s", info.messageId);
  });
};
//定时任务，每日凌晨2点清理过期验证码数据
const job = schedule.scheduleJob("0 0 2 * * ? ", function () {
  registrycode.destroy({
    where: {
      createTime: {
        [Op.lt]: new Date(new Date() - 60 * 10 * 1000),
      },
    },
  }).then((value)=>{
    console.log(value);
  })
});
module.exports = { sendMail: send };
