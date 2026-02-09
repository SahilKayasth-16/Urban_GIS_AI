from fastapi import APIRouter, Query
import requests

router = APIRouter()

@router.get("/geocode")
def geocode_location(q: str = Query(...)):
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": q,
        "format": "json",
        "limt": 1
    }

    headers = {
        "User-Agent": "Urban GIS AI / 1.0 (Iternship Project)"
    }

    response = requests.get(url, params= params, headers = headers, timeout=10)
    response.raise_for_status()

    return response.json()