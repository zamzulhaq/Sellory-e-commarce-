# FILE_STRUCTURE.md

# SELLORY FILE STRUCTURE

sellory/

├── frontend/
│
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── assets/
│   │
│   ├── pages/
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/
│   │   └── store/
│   │
│   └── components/
│
├── backend/
│
│   ├── app/
│   │
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── config.py
│   │
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── store.py
│   │   │   ├── product.py
│   │   │   └── order.py
│   │
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── products.py
│   │   │   ├── stores.py
│   │   │   └── orders.py
│   │
│   │   ├── schemas/
│   │   │   ├── user_schema.py
│   │   │   ├── product_schema.py
│   │   │   └── order_schema.py
│   │
│   │   ├── services/
│   │   │   ├── auth_service.py
│   │   │   ├── product_service.py
│   │   │   └── order_service.py
│   │
│   │   ├── auth/
│   │   │   ├── jwt_handler.py
│   │   │   ├── password.py
│   │   │   └── dependencies.py
│   │
│   │   └── utils/
│   │
│   ├── alembic/
│   ├── requirements.txt
│   └── .env
│
├── docs/
│
│   ├── README.md
│   ├── LICENSE.md
│   ├── AI_AGENT_GUIDE.md
│   ├── FILE_STRUCTURE.md
│   ├── BACKEND_ARCHITECTURE.md
│   └── DATABASE_STRUCTURE.md
│
└── .gitignore

---

# Backend Flow

Frontend
↓
FastAPI Routes
↓
Services
↓
Models
↓
Supabase PostgreSQL

---

# Future Expansion

Planned future modules:

* ai/
* payments/
* whatsapp/
* analytics/
* notifications/
* themes/
* automation/
