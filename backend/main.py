from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel


class Post(BaseModel):
    title: str
    content: str | None = None


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


temp_mem = dict({
    "post1": "This is a sample blog post",
    "post2": "Hello world",
    "post3": "Bye bye"
});

@app.get("/blog")
def get_blog():
    return temp_mem

@app.get("/blog/{title}")
def get_blog(title):
    if title in temp_mem.keys():
        return {"title": title, "content": temp_mem[title]}
    else:
        return None

@app.post("/blog/new")
def create_post(post: Post):
    msg = None

    if post.title in temp_mem.keys():
        msg = "Key already exist!"
    else:
        temp_mem[post.title] = post.content
        msg = "Successfully posted!"

    return {"msg": msg, "title": post.title}

@app.post("/blog/update")
def create_post(post: Post):
    msg = None

    if post.title in temp_mem.keys():
        temp_mem[post.title] = post.content
        msg = "Successfully updated!"
    else:
        msg = "Key does not exist!"

    return {"msg": msg, "title": post.title}

@app.post("/blog/delete")
def delete_post(post: Post):
    msg = None

    if post.title in temp_mem.keys():
        del temp_mem[post.title]
        msg = "Post deleted!"
    else:
        msg = "Post does not exist!"

    return {"msg": msg, "title": post.title}

# @app.get("/")
# def read_root():
#     return {"Hello": "World"}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}
