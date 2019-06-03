const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/mailer')
const surveyTemplate = require('../services/emailTemplate/surveyTemplate')

const Survey = mongoose.model('surveys')

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits,(req, res) => {
    // to create surveys
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    // to send email of survey
    const mailer = new Mailer(survey, surveyTemplate(survey));
  });
};
