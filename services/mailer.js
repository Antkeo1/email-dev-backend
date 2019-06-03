const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.from_email = new helper.email('no-reply@emailer.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    // function comes from helper.Mail
    this.addContent(this.body);

    this.addClickTracking();
    this.addRecipients();
  }

  // to iterate over list of recipients
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
        return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
  // to add recipients
  addRecipients(){
    const personalize = new helper.Personalize();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    // function from helper.Mail
    this.addPersonalization(personalize);
  }
}

module.exports = Mailer;
