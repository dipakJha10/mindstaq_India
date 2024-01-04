const logger = require("./logger").logger;
// mail templates for user services
let emailContentCreation = (user, notification) => {
  try {
    let finalObject = {};
    switch (notification) {
      case "Sign-Up Mail":
        finalObject.subject = `Welcome to MindStaq - Your Registration is Complete!-(Testing Feature)`;
        finalObject.text = `Hi ${user.firstName},
        Welcome to MindStaq!
        We're thrilled to have you on board and thank you for choosing us. 
        Your registration is now completed, 
        and you're all set to explore the exciting features and content that our website has to offer.
        
        Best regards,
        Deepak jha`;
        finalObject.emailTo = user.email;
    }
    return finalObject;
  } catch (error) {
    logger.error(`Error in tokenValidation - ${JSON.stringify(error)}`);
  }
};

module.exports = {
  emailContentCreation,
};
