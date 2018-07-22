
var user = require('../functions/userFunctions');

//generate resetCode



module.exports.generateResetCodeTemplate = (resetCode)=>{

 return   `<div style="font-family:'Arial'">

    <h1 style="font-family:lato">It's easy! Reset your password now.</h1>
    <h4>Hello Kenneth,</h4><br>
    <p>Please enter the following verification code on our website or app, and you'll be able to reset your password.</p>
    <b>${resetCode}</b>
      <p>Sincerely,<br>
    </p>-GlammyCare Customer Care Team</p>

  </div>`;


}
