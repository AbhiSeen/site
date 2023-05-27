import axios from 'axios'
import React, { useEffect, useState } from 'react';
import "./ReferAndEarn.css";
import WalletImg from "../images/WalletImg.png"
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';


const ReferNdEarn = () => {
  const [earnings,setEarnings]=useState(0);

  const getEarnings=async()=>{
    const response=await axios.get("http://localhost:8000/getEarnings")
    setEarnings(response.data.earnings??0);
  }

  useEffect(()=>{
    getEarnings();
  },[]);

  return (
    <div className="ReferAndEarn">
      <h1 className="ReferHeading">
        Add Money to your Wallet 
      </h1>
      <h3 className="ReferSubHeading">
        The more friends you refer or share, the more money you make.
      </h3>
      <img src={WalletImg}m className='walletImg'/>
      <button
        className="LearnMoreBtn"
      >
        <a
          className="mcnButton moreBtn"
          title="Learn more"
          href="https://www.postable.com/login"
          target="_blank"
        >
          Withdraw Now
        </a>
      </button>
      <div className='earning'>You Have Earned <span className='money'> {earnings} </span> &#x20b9; </div>
      
      {/* <center>
      <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%"
      width="100%" id="bodyTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 0;width: 100%;background-color: #ffffff;">
        <tr>
          <td align="center" valign="top" id="bodyCell" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 0;width: 100%;border-top: 0;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
              <tr>
                <td align="center" valign="top" id="templatePreheader" style="background:#ffd579 none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #ffd579;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 20px;padding-bottom: 0px;">
               
                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                      <tr>
                        <td align="center" valign="top" width="600" style="width:600px;">
                       
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                        class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;max-width: 600px !important;">
                          <tr>
                            <td valign="top" class="preheaderContainer" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                              <table class="mcnImageBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                              width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody class="mcnImageBlockOuter">
                                  <tr>
                                    <td style="padding: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                                    class="mcnImageBlockInner" valign="top">
                                      <table class="mcnImageContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                                      width="100%" cellspacing="0" cellpadding="0" border="0" align="left">
                                        <tbody>
                                          <tr>
                                            <td class="mcnImageContent" style="padding-right: 0px;padding-left: 0px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                                            valign="top">
                                              <a href="https://www.postable.com/login" title="" class="" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                <img alt="" src="https://gallery.mailchimp.com/e72d296ac00c8aefc3885f91f/images/fb8f74cc-d6cf-4ae6-be0e-5c2756cd92d0.png"
                                                style="max-width: 1200px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;"
                                                class="mcnImage" width="600" align="middle"/>
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table class="mcnDividerBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;table-layout: fixed !important;"
                              width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody class="mcnDividerBlockOuter">
                                  <tr>
                                    <td class="mcnDividerBlockInner" style="min-width: 100%;padding: 10px 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                      <table class="mcnDividerContent" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                                      width="100%" cellspacing="0" cellpadding="0" border="0">
                                        <tbody>
                                          <tr>
                                            <td style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"> <span></span>

                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                              width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody class="mcnTextBlockOuter">
                                  <tr>
                                    <td class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                                    valign="top">
                                      
                                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                                          <tr>
                                          
                                          
                                            <td valign="top" width="600" style="width:600px;">
                                            
                                            <table style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                                            class="mcnTextContentContainer" width="100%" cellspacing="0" cellpadding="0" border="0"
                                            align="left">
                                              <tbody>
                                                <tr>
                                                  <td class="mcnTextContent" style="padding: 0px 18px 9px;color: #FFFFFF;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;font-family: Helvetica;font-size: 16px;line-height: 150%;text-align: left;"
                                                  valign="top">
                                                     <h1 class="null" style="display: block;margin: 0;padding: 0;color: #00265d;font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size: 38px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: 1px;text-align: center;">Get $5 of credit for each friend you refer.</h1>

                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            
                                            </td>
                                          
                                          
                                          </tr>
                                        </table>
                                      
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                              width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody class="mcnTextBlockOuter">
                                  <tr>
                                    <td class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                                    valign="top">
                                      
                                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                                          <tr>
                                          
                                          
                                            <td valign="top" width="600" style="width:600px;">
                                            
                                            <table style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                                            class="mcnTextContentContainer" width="100%" cellspacing="0" cellpadding="0" border="0"
                                            align="left">
                                              <tbody>
                                                <tr>
                                                  <td class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #00265d;font-family: Helvetica;font-size: 16px;line-height: 150%;text-align: left;"
                                                  valign="top">
                                                     <h3 class="null" style="display: block;margin: 0;padding: 0;color: #00265d;font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size: 18px;font-style: normal;font-weight: normal;line-height: 150%;letter-spacing: 1px;text-align: center;">The more friends you refer, the more money you make.</h3>

                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            
                                            </td>
                                          
                                          
                                          </tr>
                                        </table>
                                      
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table class="mcnDividerBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;table-layout: fixed !important;"
                              width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody class="mcnDividerBlockOuter">
                                  <tr>
                                    <td class="mcnDividerBlockInner" style="min-width: 100%;padding: 10px 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                      <table class="mcnDividerContent" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                                      width="100%" cellspacing="0" cellpadding="0" border="0">
                                        <tbody>
                                          <tr>
                                            <td style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"> <span></span>

                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table class="mcnButtonBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                              width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody class="mcnButtonBlockOuter">
                                  <tr>
                                    <td style="padding-top: 0;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                                    class="mcnButtonBlockInner" valign="top" align="center">
                                      <table class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 4px;background-color: #00265D;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                                      cellspacing="0" cellpadding="0" border="0">
                                        <tbody>
                                          <tr>
                                            <td class="mcnButtonContent" style="font-family: Arial;font-size: 16px;padding: 16px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                                            valign="middle" align="center">
                                              <a class="mcnButton " title="Learn more" href="https://www.postable.com/login"
                                              target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;display: block;">Learn more</a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table class="mcnImageBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                              width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody class="mcnImageBlockOuter">
                                  <tr>
                                    <td style="padding: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                                    class="mcnImageBlockInner" valign="top">
                                      <table class="mcnImageContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                                      width="100%" cellspacing="0" cellpadding="0" border="0" align="left">
                                        <tbody>
                                          <tr>
                                            <td class="mcnImageContent" style="padding-right: 0px;padding-left: 0px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                                            valign="top">
                                              <a href="https://www.postable.com/login" title="" class="" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                <img alt="" src="https://gallery.mailchimp.com/e72d296ac00c8aefc3885f91f/images/0d15130b-9cfe-4370-8dcb-c4093427e075.gif"
                                                style="max-width: 1080px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;"
                                                class="mcnImage" width="600" align="middle" />
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </table>
                        </td>
                      </tr>
                    </table>
                  
                </td>
              </tr>
              <tr>
                <td align="center" valign="top" id="templateHeader" style="background:#ffffff none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #ffffff;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 20px;padding-bottom: 0px;">
                  
                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                      <tr>
                        <td align="center" valign="top" width="600" style="width:600px;">
                        
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                        class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;max-width: 600px !important;">
                          <tr>
                            <td valign="top" class="headerContainer" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                              <table class="mcnDividerBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;table-layout: fixed !important;"
                              width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody class="mcnDividerBlockOuter">
                                  <tr>
                                    <td class="mcnDividerBlockInner" style="min-width: 100%;padding: 10px 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                      <table class="mcnDividerContent" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"
                                      width="100%" cellspacing="0" cellpadding="0" border="0">
                                        <tbody>
                                          <tr>
                                            <td style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"> <span></span>

                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                            </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </table>
                       
                        </td>
                      </tr>
                    </table>
                  
                </td>
              </tr>
              <tr>
                <td align="center" valign="top" id="templateBody" style="background:#transparent none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #transparent;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0px;padding-bottom: 0px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                        class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;max-width: 600px !important;">
                          <tr>
                            <td valign="top" class="bodyContainer" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                              
                            </td>
                          </tr>
                        </table>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </center> */}
    </div>
  );
};

export default ReferNdEarn;
