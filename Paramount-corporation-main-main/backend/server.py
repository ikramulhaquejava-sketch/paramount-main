from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactFormData(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactInquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# Email sending function
async def send_email_notification(name: str, email: str, subject: str, message: str):
    try:
        gmail_user = os.environ.get('GMAIL_USER')
        gmail_password = os.environ.get('GMAIL_APP_PASSWORD')
        recipient_email = os.environ.get('RECIPIENT_EMAIL', 'info.paramountfoodcorporation@gmail.com')
        
        if not gmail_user or not gmail_password:
            logging.warning("Gmail credentials not configured. Email notification skipped.")
            return False
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"New Inquiry: {subject}"
        msg['From'] = gmail_user
        msg['To'] = recipient_email
        
        html_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #D4AF37;">
                <h2 style="color: #800000; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
                    New Contact Form Inquiry
                </h2>
                <div style="margin: 20px 0;">
                    <p><strong style="color: #800000;">Name:</strong> {name}</p>
                    <p><strong style="color: #800000;">Email:</strong> {email}</p>
                    <p><strong style="color: #800000;">Subject:</strong> {subject}</p>
                </div>
                <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #800000;">
                    <p><strong style="color: #800000;">Message:</strong></p>
                    <p>{message}</p>
                </div>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                    <p>This inquiry was submitted through the Paramount Food Corporation website contact form.</p>
                    <p>Timestamp: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        html_part = MIMEText(html_body, 'html')
        msg.attach(html_part)
        
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(gmail_user, gmail_password)
            server.sendmail(gmail_user, recipient_email, msg.as_string())
        
        logging.info(f"Email notification sent for inquiry from {email}")
        return True
        
    except Exception as e:
        logging.error(f"Failed to send email notification: {str(e)}")
        return False


# Routes
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/contact")
async def submit_contact_form(form_data: ContactFormData):
    try:
        inquiry = ContactInquiry(
            name=form_data.name,
            email=form_data.email,
            subject=form_data.subject,
            message=form_data.message
        )
        
        doc = inquiry.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        await db.contact_inquiries.insert_one(doc)
        
        email_sent = await send_email_notification(
            form_data.name,
            form_data.email,
            form_data.subject,
            form_data.message
        )
        
        return {
            "success": True,
            "message": "Your inquiry has been received. We will contact you soon.",
            "email_sent": email_sent
        }
        
    except Exception as e:
        logging.error(f"Contact form submission error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process inquiry")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
