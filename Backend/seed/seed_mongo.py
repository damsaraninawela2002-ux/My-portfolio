import asyncio
from datetime import datetime, timezone

async def sync_db():
    try:
        import database
        projects = [
            {
                "title": "FraudGuard AI – Explainable Fraud Detection System",
                "slug": "fraudguard-ai",
                "category": "Full-Stack",
                "description": "A full-stack fraud detection platform that scores financial transactions with an XGBoost classifier and explains every prediction using SHAP feature attributions.",
                "technologies": ["React", "Vite", "Tailwind CSS", "FastAPI", "Python", "XGBoost", "scikit-learn", "SHAP", "MongoDB", "JWT"],
                "features": [
                    "Trained and evaluated on the PaySim dataset (stratified 80/20 split), handling class imbalance with scale_pos_weight; achieved PR-AUC 0.82, Precision 0.88 and Recall 0.73.",
                    "FastAPI backend with JWT authentication, MongoDB storage, paginated transaction history, statistics and CSV export endpoints, with pytest API tests.",
                    "Responsive React dashboard with Recharts: risk gauge, SHAP contribution chart, fraud trend charts and a What-If Sandbox for live scenario testing."
                ],
                "image": "/images/FraudGuard.png",
                "githubUrl": "https://github.com/damsaraninawela2002-ux/FraudGuard-AI",
                "github_link": "https://github.com/damsaraninawela2002-ux/FraudGuard-AI",
                "liveDemoUrl": "",
                "live_link": "",
                "image_url": "/images/FraudGuard.png",
                "featured": True,
                "order": 1,
                "views": 0,
                "createdAt": datetime.now(timezone.utc),
                "updatedAt": datetime.now(timezone.utc)
            },
            {
                "title": "Inventory Management System",
                "slug": "inventory-management-system",
                "category": "Full-Stack",
                "description": "A full-stack inventory management application that lets administrators manage products, stock quantities and categories through a secure, easy-to-use dashboard.",
                "technologies": ["React.js", "Vite", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "C#", "ASP.NET Core", "MongoDB"],
                "features": [
                    "Secure user login with 5 product operations (add, edit, delete, search, stock update) and full CRUD.",
                    "REST APIs built with C# and ASP.NET Core and MongoDB; endpoints tested with Postman and managed with Git/GitHub.",
                    "Administrators can manage products, stock quantities and categories from one responsive React interface."
                ],
                "image": "/images/Inventory-Management-System.jpeg",
                "githubUrl": "https://github.com/damsaraninawela2002-ux/Inventory-Management-System",
                "github_link": "https://github.com/damsaraninawela2002-ux/Inventory-Management-System",
                "liveDemoUrl": "",
                "live_link": "",
                "image_url": "/images/Inventory-Management-System.jpeg",
                "featured": True,
                "order": 2,
                "views": 0,
                "createdAt": datetime.now(timezone.utc),
                "updatedAt": datetime.now(timezone.utc)
            }
        ]

        for p in projects:
            existing = await database.db.projects.find_one({"title": p["title"]})
            if not existing:
                res = await database.db.projects.insert_one(p)
                print("Inserted:", p["title"], res.inserted_id)
            else:
                await database.db.projects.update_one({"_id": existing["_id"]}, {"$set": p})
                print("Updated:", p["title"])

        await database.db.projects.update_many({"title": {"$regex": "Galaxy", "$options": "i"}}, {"$set": {"order": 3}})
        await database.db.projects.update_many({"title": {"$regex": "Cosmetic|Dreamy", "$options": "i"}}, {"$set": {"order": 4}})

        print("--- Current projects in DB ---")
        async for doc in database.db.projects.find({}).sort("order", 1):
            print("Order", doc.get("order"), ":", doc.get("title"))
    except Exception as e:
        print("MongoDB seed notice (database offline or unreachable):", str(e))

if __name__ == "__main__":
    asyncio.run(sync_db())
