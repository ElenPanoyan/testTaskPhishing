export const getEmailContent =
    (url: string): string => {
        return `
  <p>
    Warning: This is a simulated phishing test. 
    For your security, please click <a href="${url}" target="_blank" rel="noopener noreferrer">this link</a> 
    to review your response.
  </p>
`;
    }

