import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  /**
   * Mock email sending function
   * In production, this would integrate with SendGrid, AWS SES, or similar service
   */
  sendTweetNotification(
    recipientEmail: string,
    recipientName: string,
    tweetContent: string,
    authorName: string,
  ): void {
    console.log('============ SENDING EMAIL ============');
    console.log('To:', recipientEmail);
    console.log('Subject: New Tweet Shared With You');
    console.log('Body:');
    console.log(`
    Hi ${recipientName},
    
    You have received a new tweet:
    
    "${tweetContent}"
    
    Shared by: ${authorName}
    
    Log in to view and interact with this tweet.
    
    Best regards,
    The Twitter App Team
  `);
    console.log('=======================================\n');
  }

  /**
   * Send email to multiple recipients
   */
  sendBulkTweetNotifications(
    recipients: Array<{ email: string; name: string }>,
    tweetContent: string,
    authorName: string,
  ): void {
    recipients.forEach((recipient) => {
      this.sendTweetNotification(
        recipient.email,
        recipient.name,
        tweetContent,
        authorName,
      );
    });
    
    console.log(`✅ Mock emails sent to ${recipients.length} recipient(s)\n`);
  }
}

