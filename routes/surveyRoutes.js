const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplate/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  // to see all surveys user created
  // must be logged in (requireLogin)
  app.get('/api/surveys', requireLogin, async (req, res) => {
    // Check survey collection and find _user
    // from surveySchema that matches
    // the current user's id
    const surveys = await Survey.find({ _user: req.user.id })
      // to not include recipients property
      // when fetching list of surveys
      .select({ recipients: false });

    res.send(surveys);
  });

  // thank you page after completing our sent survey
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  // to store data from webhooks
  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

     _.chain(req.body)
      .map(({email, url}) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        // to find a recipient that hasnt responded yet
        Survey.updateOne({
          // in mongo we have to say _id instead of id
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        }, {
          //$inc is a mongo operator
          // find the choice property and increment it by 1
          $inc: { [choice]: 1 },
          // $set is a mongo operator
          // look at the recipients and change that they responded
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
          // to execute the query
        }).exec();
      })
      .value();

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
