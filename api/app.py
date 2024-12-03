from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import datetime
from contextlib import asynccontextmanager
import asyncio
import uvicorn
import requests
import os
from dotenv import load_dotenv

load_dotenv()


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

api_responses = {}


# fetch data asynchronously from all sources
async def fetch_data():
    # fetch data from FRED
    response = requests.get(
        "https://api.stlouisfed.org/fred/series",
        params={
            "series_id": "GNPCA",
            "api_key": os.getenv("FRED_KEY"),
            "file_type": "json",
        },
    )
    api_responses["time"] = datetime.datetime.now()
    api_responses["fred"] = response.json()


# Background task to refresh data every 24 hours
async def refresh_data():
    while True:
        await fetch_data()
        await asyncio.sleep(10)  # Sleep for 24 hours


@app.on_event("startup")
async def startup_event():
    # Fetch data initially
    await fetch_data()
    # Start background task for periodic refresh
    asyncio.create_task(refresh_data())


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/test")
async def test(data: str):
    return api_responses["data1"]


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
