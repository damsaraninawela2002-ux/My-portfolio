from fastapi import APIRouter, HTTPException, status
from datetime import datetime, timezone
from database import db
from models import ContactMessageCreate, ContactMessageResponse

router = APIRouter()

@router.post(
    "/contact",
    response_model=ContactMessageResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit contact message",
    description="Validates and saves a visitor's message to MongoDB messages collection with read=False and timestamp."
)
async def submit_contact_message(message: ContactMessageCreate):
    try:
        doc = message.model_dump()
        doc["createdAt"] = datetime.now(timezone.utc)
        doc["read"] = False
        
        # Asynchronously insert into MongoDB messages collection
        result = await db.messages.insert_one(doc)
        
        return ContactMessageResponse(
            status="success",
            message="Thank you! Your message has been sent successfully.",
            id=str(result.inserted_id)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to save contact message: {str(e)}"
        )
