// import React from 'react'
import './FAQPage.css'
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import Footer from '../home/Footer';


const FAQPage = () => {
  return (
    <>
      <div className='faqPage'>
        <h2 className='faqTitle'>FAQs</h2>
        <div className='faq-underline'></div>
        <div className='accordian'>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="typography">Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="typography1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className="typography">Accordion 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="typography1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default FAQPage