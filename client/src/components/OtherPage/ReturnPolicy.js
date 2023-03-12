import React from "react";
import returnPolicyImg from "../images/returnPolicyImg.jpg";
import "./ReturnPolicy.css";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import TabletMacRoundedIcon from "@mui/icons-material/TabletMacRounded";
import TouchAppRoundedIcon from "@mui/icons-material/TouchAppRounded";
import CardGiftcardRoundedIcon from "@mui/icons-material/CardGiftcardRounded";
import Footer from "../home/Footer";
import Header from "../header/Header";
import Return from "../images/returnPolicyImg.png";

const ReturnPolicy = () => {
  return (
    <>
      <Header />
      <div className="returnPolicyPage">
        <h2 className="faqTitle">Return Policy</h2>
        <div className="return-underline"></div>
        <img className="ReturnPolicyImg" src={returnPolicyImg} />
        <div className="ReturnPolicy">
          <div className="rc-section form-container">
            {/* <h1 className="rc-title">RETURNS</h1> */}

            {/* <div className="start-return-form">
                <form action="" accept-charset="UTF-8" method="post">
                    <input name="utf8" type="hidden" value="✓"/>
                <input type="hidden" name="authenticity_token" value="6" />
                <input type="email" placeholder="Enter your email" name="customer_email" required="required" />
                <input type="submit" name="commit" value="Start a Return" data-disable-with="Start a Return" className="start-return-btn"/>
                </form>
           

                <div className="return-gift-link-container">
                    <a className="rc-link" href="/gifts">Returning a Gift?</a>
                </div>
            </div> */}
            <section id="how-works" className="rc-section how-works">
              <h1 className="rc-title">How it Works</h1>
              <img src={Return} alt="returnimg" className="howitworksImg" />
            </section>
            <section id="crq" className="rc-section returns-questions">
              <h1 className="rc-title">Common Returns Questions</h1>

              <div className="content">
                <div className="f-half">
                  <h2 className="faqQuestions">What's your return policy?</h2>
                  <p className="ansColor">
                    We don't want you to have anything American Giant that you
                    aren't completely satisfied with. If you'd like to send
                    something back to us any time, for any reason, please follow
                    the return instructions. We'll completely refund your
                    original form of payment (excluding shipping charges) when
                    we receive the return.
                  </p>
                  <h2 className="faqQuestions">What's your exchange policy?</h2>
                  <p className="ansColor">
                    We don't process direct exchanges, and ask that if you'd
                    like a replacement item you follow our return instructions
                    and reorder directly through our website as a separate
                    transaction. We'll completely refund your original form of
                    payment (excluding shipping charges) when we receive the
                    return.
                  </p>
                </div>

                <div className="f-half">
                  <h2 className="faqQuestions">
                    How long will my refund take?
                  </h2>
                  <ul>
                    <li className="ansColor">
                      Items purchased in the last 7300 days.
                    </li>
                  </ul>
                  <h2 className="faqQuestions">
                    Are there any items that can't be returned?
                  </h2>
                  <p className="ansColor">
                    All discounted items purchased on the Spring Cleaning, Last
                    Chance, or AG Annual Sale&nbsp;pages are final sale and
                    cannot be returned for a refund.&nbsp;
                    <br />
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className="powered-by" style={{ margin: "1rem" }}>
            Powered by{" "}
            <a href="#" style={{ color: "rgb(104, 85, 224)" }}>
              AM Group of Companies
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReturnPolicy;

//   <div className="content newContent">
//     {/* <div className="line-wrap"> */}
//     {/* <div className="line-mask"> */}
//     <div id="line" className="line"></div>
//     {/* </div> */}
//     {/* </div> */}

//     <article className="hw-step three-steps">
//       <div className="rounded">
//         <TabletMacRoundedIcon />
//         <span className="giftSwipe">
//           <CardGiftcardRoundedIcon />
//         </span>
//         <span className="mobileSwipe">
//           <TouchAppRoundedIcon />
//         </span>
//       </div>
//       <p className="stepsCon">Select items to return</p>
//     </article>

//     <article className="hw-step three-steps">
//       <div className="rounded">
//         <CurrencyExchangeIcon />
//       </div>
//       <p className="stepsCon">Get a refund confirmation</p>
//     </article>

//     <article className="hw-step three-steps">
//       <div className="rounded">
//         <LocalShippingRoundedIcon />
//         <span className="arrowHead">
//           <ArrowForwardIosRoundedIcon
//             style={{ color: "#201aa3" }}
//           />
//         </span>
//       </div>
//       <p className="stepsCon">Send the return back to us</p>
//     </article>
//   </div>;
