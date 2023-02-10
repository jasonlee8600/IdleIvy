// log the pageview with their URL
export const pageview = (url) => {
	
  }
  
  // log specific events happening.
  export const event = ({ action, params }) => {
	window.gtag('event', action, params)
  }