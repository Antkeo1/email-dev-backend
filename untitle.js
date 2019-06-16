email = 'a@a.com'
choice = 'yes' || 'no'

// find a recipient that hasnt responded yet
Survey.updateOne({
  id: surveyId,
  recipients: {
    $elemMatch: { email: email, responded: false }
  }
}, {
  //$inc is a mongo operator
  // find the choice property and increment it by 1
  $inc: { [choice]: 1 },
  // $set is a mongo operator
  // look at the recipients and change that they responded
  $set: { 'recipients.$.responded': true }
})
