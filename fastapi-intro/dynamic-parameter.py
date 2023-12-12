from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def blogs():
    return {'data': 'blog-list'}

@app.get('/blog/{id}')
def blog(id: int):
    return {'data': id}


@app.get('/blog/{id}/comments')
def comments():
    return {'data': {'1','2','3'}}


@app.get('/blog/unpublished')
def unpublished_blog():
    return {'data': 'all unpublished blog'}
