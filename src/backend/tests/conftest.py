import os

os.environ.setdefault("DATABASE_URL", ":memory:")
os.environ.setdefault("TESTING", "1")
