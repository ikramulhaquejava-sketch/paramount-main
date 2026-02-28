# Email Notification Setup for Contact Form

Your website's contact form is working and storing all inquiries in the database. To enable **email notifications** to receive inquiries directly in your inbox, follow these steps:

## Gmail Setup (Free Option)

### Step 1: Generate Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left menu
3. Under "Signing in to Google", enable **2-Step Verification** if not already enabled
4. After enabling 2-Step Verification, go back to **Security**
5. Under "Signing in to Google", click on **App passwords**
6. Select app: **Mail**
7. Select device: **Other (Custom name)** → Enter "Paramount Website"
8. Click **Generate**
9. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

### Step 2: Update Backend Environment Variables

1. Open `/app/backend/.env` file
2. Update these values:
   ```
   GMAIL_USER="info.paramountfoodcorporation@gmail.com"
   GMAIL_APP_PASSWORD="your-16-character-app-password"
   RECIPIENT_EMAIL="info.paramountfoodcorporation@gmail.com"
   ```
3. Replace `your-16-character-app-password` with the password from Step 1

### Step 3: Restart Backend Server

Run this command:
```bash
sudo supervisorctl restart backend
```

## Testing Email Notifications

After setup, test the contact form:
1. Go to your website: https://meat-processing-hub.preview.emergentagent.com/contact
2. Fill out and submit the contact form
3. Check your email inbox for the notification

## What Happens Now?

✓ **Currently Working:**
- Contact form submissions are saved in MongoDB database
- You can view all inquiries in the database
- Form validation and user feedback working

⚠️ **Pending Setup:**
- Email notifications to info.paramountfoodcorporation@gmail.com
- Requires Gmail App Password (free, 5 minutes to setup)

## Security Notes

- App passwords are more secure than your actual Gmail password
- Never share your app password publicly
- The app password is only used for sending email notifications
- You can revoke the app password anytime from your Google Account

## Alternative: View Inquiries from Database

You can also check inquiries directly from MongoDB:
```bash
# Connect to MongoDB and view contact inquiries
mongosh mongodb://localhost:27017/test_database --eval "db.contact_inquiries.find().pretty()"
```

---

Need help? The email notification feature will work automatically once you add the Gmail credentials above.
