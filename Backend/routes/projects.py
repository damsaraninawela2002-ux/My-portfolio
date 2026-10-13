from datetime import datetime, timezone
from typing import List
from bson import ObjectId
from fastapi import APIRouter, HTTPException, status, Depends
from database import db
from models import ProjectCreate, ProjectUpdate, ProjectResponse
from routes.auth import get_current_admin

router = APIRouter()

def format_project_doc(doc: dict) -> dict:
    """Format MongoDB project document for client response."""
    doc["_id"] = str(doc["_id"])
    doc["id"] = doc["_id"]
    if "views" not in doc:
        doc["views"] = 0
    if "createdAt" not in doc:
        doc["createdAt"] = doc.get("created_at")
    if "updatedAt" not in doc:
        doc["updatedAt"] = doc.get("updated_at")
    if "githubUrl" not in doc:
        doc["githubUrl"] = doc.get("github_link", "")
    if "liveDemoUrl" not in doc:
        doc["liveDemoUrl"] = doc.get("live_link", "")
    if "image" not in doc:
        doc["image"] = doc.get("image_url", "")
    return doc

# 1. GET /api/projects (Public, list all)
@router.get(
    "/projects",
    response_model=List[dict],
    summary="List all projects",
    description="Public endpoint to list all portfolio projects sorted by creation date."
)
async def get_projects():
    projects = []
    cursor = db.projects.find({}).sort([("order", 1), ("createdAt", -1)])
    async for document in cursor:
        projects.append(format_project_doc(document))
    return projects

# 2. GET /api/projects/{id} (Public, single project)
@router.get(
    "/projects/{id}",
    response_model=dict,
    summary="Get single project",
    description="Public endpoint to retrieve a single project by its ObjectId."
)
async def get_project(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid project ID format")
    
    document = await db.projects.find_one({"_id": ObjectId(id)})
    if not document:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    
    return format_project_doc(document)

# 3. POST /api/projects/{id}/view (Public, increments view count)
@router.post(
    "/projects/{id}/view",
    summary="Increment project view count",
    description="Public endpoint to atomically increment the view counter for a project."
)
async def increment_project_view(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid project ID format")
    
    result = await db.projects.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$inc": {"views": 1}},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    
    return {
        "id": str(result["_id"]),
        "views": result.get("views", 1),
        "message": "View count incremented successfully"
    }

# 4. POST /api/projects (Admin only, JWT-protected, create)
@router.post(
    "/projects",
    status_code=status.HTTP_201_CREATED,
    summary="Create project",
    description="Admin-only endpoint to create a new project. Requires JWT Bearer token."
)
async def create_project(
    project: ProjectCreate,
    admin_user: str = Depends(get_current_admin)
):
    now = datetime.now(timezone.utc)
    doc = project.model_dump(by_alias=False)
    doc["views"] = 0
    doc["createdAt"] = now
    doc["updatedAt"] = now
    
    # Store with both camelCase and snake_case aliases for broad compatibility
    doc["github_link"] = doc.get("githubUrl", "")
    doc["live_link"] = doc.get("liveDemoUrl", "")
    doc["image_url"] = doc.get("image", "")

    result = await db.projects.insert_one(doc)
    doc["_id"] = str(result.inserted_id)
    doc["id"] = doc["_id"]
    return doc

# 5. PUT /api/projects/{id} (Admin only, JWT-protected, update)
@router.put(
    "/projects/{id}",
    summary="Update project",
    description="Admin-only endpoint to update an existing project. Requires JWT Bearer token."
)
async def update_project(
    id: str,
    project_update: ProjectUpdate,
    admin_user: str = Depends(get_current_admin)
):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid project ID format")

    update_data = {k: v for k, v in project_update.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields provided to update")

    update_data["updatedAt"] = datetime.now(timezone.utc)
    
    # Keep aliases synchronized
    if "githubUrl" in update_data:
        update_data["github_link"] = update_data["githubUrl"]
    if "liveDemoUrl" in update_data:
        update_data["live_link"] = update_data["liveDemoUrl"]
    if "image" in update_data:
        update_data["image_url"] = update_data["image"]

    result = await db.projects.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": update_data},
        return_document=True
    )

    if not result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    return format_project_doc(result)

# 6. DELETE /api/projects/{id} (Admin only, JWT-protected, delete)
@router.delete(
    "/projects/{id}",
    summary="Delete project",
    description="Admin-only endpoint to remove a project. Requires JWT Bearer token."
)
async def delete_project(
    id: str,
    admin_user: str = Depends(get_current_admin)
):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid project ID format")

    result = await db.projects.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    return {
        "status": "success",
        "message": f"Project {id} deleted successfully"
    }