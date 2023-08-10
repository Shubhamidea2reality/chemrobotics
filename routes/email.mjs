import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

//SEND MAIL
export const sendMail = (req, res, next) => {
    let bodydtls=req.body;
  
    let transport=nodemailer.createTransport({
      name:process.env.EMAIL_HOST,
      host:process.env.EMAIL_HOST,
      port:process.env.EMAIL_SMTPPORT,
      secure:true,
      auth:{
        user:process.env.EMAIL_USERNAME,
        pass:process.env.EMAIL_PASSWORD
      }
    });
  
    const maillOptions={
      from:process.env.EMAIL_FROM,
      to:bodydtls.to,
      subject:bodydtls.subject,
      html:bodydtls.html,
    }
  
    transport.sendMail(maillOptions,function(err,info){
      if(err){
        console.log(err);
        res.status(500).json({ message: err.message });
      }
      else{
        res.status(200).json(info);
      }
    })
    
  };

  //SEND MAIL
export const sendMail_VendorRegInfo = (req, res, next) => {
  let vendordtls=req.body.vendordetail;

  let transport=nodemailer.createTransport({
    name:process.env.EMAIL_HOST,
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_SMTPPORT,
    secure:true,
    auth:{
      user:process.env.EMAIL_USERNAME,
      pass:process.env.EMAIL_PASSWORD
    }
  });

  const maillOptions={
    from:process.env.EMAIL_FROM,
    to:"support@chemrobotics.com,sales@chemrobotics.com,greenbookcorp@gmail.com,nagarajvela@gmail.com",
    subject:`Vendor Registraion - ${vendordtls.clnt_company_name}`,
    html:`<p style="text-align:center"><span style="font-size:28px"><span style="color:#2ecc71"><strong>${vendordtls.clnt_company_name}</strong></span></span></p>

    <p style="text-align:center"><span style="font-size:22px"><span style="color:#2ecc71"><strong>Registration Detail submitted Successfully</strong></span></span></p>
    
    <p style="text-align:center">&nbsp;</p>
    
    <p><span style="font-size:14px">Hi ChemRobotics Team,</span></p>
    
    <p><span style="font-size:14px">Kindly look into ${vendordtls.clnt_company_name} Registration and take necessary action predominately.</span></p>
    
    <table border="1" cellpadding="1" cellspacing="1" style="width:700px">
      <caption>Vendor Details</caption>
      <tbody>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap; width:210px"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">CHEMROBOTICS VENDOR REGISTRATION NUMBER (CVRN)</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap; width:64px"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_cvrn}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">COMPANY NAME</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_company_name}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">COMPANY LOGO</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_company_logo}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">FIELD</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_field}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">CATEGORY</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_category}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">COMPANY DESCRIPTION</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_company_description}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">GENDER</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_gender}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">SALUTATION</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_salutation}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">DEPARTMENT</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_department}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">CONTACT PERSON NAME</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_contact_person_name}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">ALTERNATE CONTACT DETAILS</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_alternate_contact_details}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">COUNTRY</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_country}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">MANUFACTURING COUNTRY</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_manufacturing_country}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">COMPANY WEBSITE</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_company_website}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">EMAIL</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_email}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">FAX NO.</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_fax_no}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">MOBILE NUMBER OF CONTACT PERSON</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_mobile_number_of_contact_person}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">PHONE NUMBER</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_phone_number}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">REGISTERED ADDRESS</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_registered_address}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">COMMUNICATION ADDRESS</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_communication_address}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">BANK ACCOUNT DETAILS</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_bank_account_details}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">GST NUMBER (FOR INDIAN CLIENT ONLY)</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_gst_number_for_indian_client_only}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">PAN NUMBER (FOR INDIAN CLIENT ONLY)</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_pan_number_for_indian_client_only}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">TAN NUMBER (FOR INDIAN CLIENT ONLY)</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_tan_number_for_indian_client_only}</span></span></span></td>
        </tr>
        <tr>
          <td style="border-bottom:none; border-left:none; border-right:none; border-top:.7px solid #5b9bd5; height:20px; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">OTHER DETAILS</span></span></span></td>
          <td style="border-bottom:none; border-left:none; border-right:.7px solid #5b9bd5; border-top:.7px solid #5b9bd5; vertical-align:bottom; white-space:nowrap"><span style="font-size:15px"><span style="color:black"><span style="font-family:Calibri,sans-serif">${vendordtls.clnt_other_details}&nbsp;</span></span></span></td>
        </tr>
      </tbody>
    </table>
    
    <p><span style="font-size:14px">Regards,</span></p>
    
    <p><span style="font-size:14px">ChemRobotics</span></p>
    `,
  }

  transport.sendMail(maillOptions,function(err,info){
    if(err){
      console.log(err);
      res.status(500).json({ message: err.message });
    }
    else{
      res.status(200).json(info);
    }
  })
  
};

