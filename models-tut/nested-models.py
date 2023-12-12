from typing import List, Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from itertools import count

app = FastAPI()

class Comment(BaseModel):
    id: int
    text: str
    author: str

class Blog(BaseModel):
    id: int
    title: str
    content: str
    comments: List[Comment] = []

blog_id_counter = count(start=1)
comment_id_counter = count(start=1)

fake_db_blogs = []
fake_db_comments = []

@app.post("/blogs/", response_model=Blog)
async def create_blog(blog: Blog):
    blog_data = blog.model_dump()
    blog_data["id"] = next(blog_id_counter)
    fake_db_blogs.append(blog_data)
    return blog

@app.post("/blogs/{blogId}/comments", response_model=Comment)
async def create_comment(blogId: int, comment: Comment):
    comment_data = comment.model_dump()
    comment_data["id"] = next(comment_id_counter)
    fake_db_comments.append(comment_data)

    for blog_data in fake_db_blogs:
        if blog_data["id"] == blogId:
            comment_data["id"] = next(comment_id_counter)
            blog_data["comments"].append(comment_data)
            return comment

    raise HTTPException(status_code=404, detail=f"Blog with ID {blogId} not found")

@app.get("/blogs/", response_model=List[Blog])
async def read_blogs():
    return fake_db_blogs
