from fastapi import HTTPException, status

class TodoNotFoundException(HTTPException):
    def __init__(self, todo_id: int):
        detail = f'Todo with ID {todo_id} not found'
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail=detail)
