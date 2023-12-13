from dotenv import load_dotenv
import os

load_dotenv()

database_url = os.environ.get("DB_URL")