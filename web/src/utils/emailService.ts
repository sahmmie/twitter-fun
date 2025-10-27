import type { Tweet, User } from '../types';

/**
 * Mock email sending function
 * In production, this would connect to an email service (SendGrid, AWS SES, etc.)
 */
export const sendTweetEmail = (tweet: Tweet, recipient: User): void => {
  console.log('============ SENDING EMAIL ============');
  console.log('To:', recipient.email);
  console.log('Subject: New Tweet Shared With You');
  console.log('Body:');
  console.log(`
    Hi ${recipient.name},
    
    You have received a new tweet:
    
    "${tweet.content}"
    
    Shared by: ${tweet.author?.name || 'A user'}
    
    Log in to view and interact with this tweet.
    
    Best regards,
    The Twitter App Team
  `);
  console.log('=======================================');
};

/**
 * Send emails to multiple recipients
 */
export const sendTweetEmails = (tweet: Tweet, recipients: User[]): void => {
  recipients.forEach((recipient) => {
    sendTweetEmail(tweet, recipient);
  });
  
  console.log(`\n✅ Mock emails sent to ${recipients.length} recipient(s)`);
};

