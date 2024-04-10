import {Resend} from 'resend'
import ApiError from './ApiError.js';

const resend = new Resend(process.env.RESEND_API_KEY)

async function verifyEmail(email , verificationToken) {
    
     
      console.log(email)
      const {response , error} = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: email,
        subject: 'Verify Your Email', 
        html: `
          <h1>Thank You for SignUp</h1>
          <p>We are glad to have you on board</p>
          <p>Please verify your email address</p>
          <a href="${verificationToken}">Verify Email</a>
        `,
      });
  
      if(error){
      console.error(`Error sending verification email for ${email}:`, error);
        throw new ApiError(500, error)
      }
      
      return response;
  }
  

export default verifyEmail