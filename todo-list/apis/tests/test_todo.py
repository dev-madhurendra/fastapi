# tests/test_todo.py

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db.session import Base
from main import app
from db.db_connection import get_db

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

Base.metadata.create_all(bind=engine)

client = TestClient(app)

def test_create_todo():
    # Test the creation of a todo
    todo_data = {
        "title": "Test Todo",
        "body": "Test Body"
    }
    response = client.post("/todos/", json=todo_data)
    assert response.status_code == 200
    assert response.json()["title"] == "Test Todo"
    assert response.json()["body"] == "Test Body"
    assert response.json()["isCompleted"] is False

def test_get_all_todos():
    # Test retrieving all todos
    response = client.get("/todos/")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_get_todo_by_id():
    # Test retrieving a todo by ID
    response = client.get("/todos/1")
    assert response.status_code == 200
    assert response.json()["id"] == 1

def test_update_todo():
    # Test updating a todo
    todo_data = {
        "title": "Updated Todo",
        "body": "body updated",
        "isCompleted": True
    }
    response = client.put("/todos/1", json=todo_data)
    assert response.status_code == 200
    assert response.json()["title"] == "Updated Todo"
    assert response.json()["body"] == "body updated"
    assert response.json()["isCompleted"] is True

def test_delete_todo():
    # Test deleting a todo
    response = client.delete("/todos/1")
    assert response.status_code == 200
    assert response.json()["detail"] == "Todo 1 deleted successfully!"
