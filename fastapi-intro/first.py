from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def index():
    # return "Hello, World !"
    return {'data': {'firstname': 'Madhurendra', 'lastname':'Nath Tiwari'}}


@app.get('/about')
def about():
    return {'data': {'position': 'Intern','organization': 'Zemosolabs Pvt. Ltd.'}}

