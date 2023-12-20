from datetime import timedelta, datetime
from pathlib import Path
import importlib
from typing import Union
from jose import JWTError,jwt
from core.config import secret,algorithm
from schemas.token import TokenData
from db.session import engine
from core.config import secret,algorithm


# Iterate over the files in the models directory
def create_all_engine_models(models_module: str):
    models_path = Path(models_module)
    for model_file in models_path.glob("*.py"):
        # Construct the full import path for each model
        model_name = model_file.stem
        model_import_path = f"{models_module}.{model_name}"

        # Dynamically import the model module
        model_module = importlib.import_module(model_import_path)

        # Check if the model has a "Base" attribute (assuming all models use a "Base" attribute)
        if hasattr(model_module, "Base"):
            # Create all tables for the model
            model_module.Base.metadata.create_all(bind=engine)

        
def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, secret, algorithm=algorithm)
    return encoded_jwt
    
    
def verify_token(token: str,credentials_exception):
    try:
        payload = jwt.decode(token,secret , algorithms=[algorithm])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception