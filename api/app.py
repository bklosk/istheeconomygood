from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import datetime
from contextlib import asynccontextmanager
import asyncio
import uvicorn
import requests
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

# ai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

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
    fred_rent = requests.get(
        "https://api.stlouisfed.org/fred/series/observations",
        params={
            "series_id": "CUSR0000SAS2RS",
            "api_key": os.getenv("FRED_KEY"),
            "file_type": "json",
            "frequency": "m",
        },
    )
    fred_unrate = requests.get(
        "https://api.stlouisfed.org/fred/series/observations",
        params={
            "series_id": "UNRATE",
            "api_key": os.getenv("FRED_KEY"),
            "file_type": "json",
            "frequency": "m",
        },
    )
    fred_cpi = requests.get(
        "https://api.stlouisfed.org/fred/series/observations",
        params={
            "series_id": "CPIAUCSL",
            "api_key": os.getenv("FRED_KEY"),
            "file_type": "json",
            "frequency": "m",
        },
    )

    # ai_test = ai_client.chat.completions.create(
    #     messages=[
    #         {
    #             "role": "user",
    #             "content": f"You are a PhD economist. Explain the direct, applied implications of last month's {fred_unrate.json()["observations"][-1]["value"]}% increase in unemployment to a smart high schooler. Use easily understandable words. Use short sentences. Keep the tone light. Do not use exclamation marks. Explain in one paragraph how it will impact workers. If unemployment went up, assume workers will be fired rather than take pay cuts.",
    #         }
    #     ],
    #     model="gpt-4o-mini",
    # )

    api_responses["time"] = datetime.datetime.now()
    api_responses["fred_rent"] = fred_rent.json()
    api_responses["fred_unrate"] = fred_unrate.json()
    api_responses["fred_cpi"] = fred_cpi.json()
    # api_responses["ai_test"] = {"message": ai_test.choices[0].message.content}


# Background task to refresh data every 24 hours
async def refresh_data():
    while True:
        await fetch_data()
        await asyncio.sleep(24 * 60 * 60)  # Sleep for 24 hours


@app.on_event("startup")
async def startup_event():
    # Fetch data initially
    await fetch_data()
    # Start background task for periodic refresh
    asyncio.create_task(refresh_data())


@app.get("/health")
async def health():
    return {"status": "ok"}


# the monthly rent level for urban areas
@app.get("/rent")
async def rent():
    return api_responses["fred_rent"]


# the monthly unemployment rate
@app.get("/unrate")
async def unrate():
    return api_responses["fred_unrate"]


# consumer price index
@app.get("/cpi")
async def cpi():
    return api_responses["fred_cpi"]


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
