from dotenv import load_dotenv
import os

load_dotenv()

db_url = os.environ.get("DB_URL")
secret = os.environ.get("SECRET_KEY")
algorithm = os.environ.get("ALGORITHM")
access_token_time = os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES")

