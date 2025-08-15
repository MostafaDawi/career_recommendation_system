from fastapi import HTTPException
import httpx

UNSAFE_HEADERS = {
    "content-length",
    "content-type",
    "host",
    "connection",
    "accept-encoding"
}

# Can be extended with retry logic or connection pooling
async def forward_request(method, url, headers=None, json=None, params=None):
    async with httpx.AsyncClient(timeout=30.0) as client:

        cleaned_headers = {
        k: v for k, v in (headers or {}).items()
        if k.lower() not in UNSAFE_HEADERS
        }

        request_ = {
            "method":method,
            "url":url,
            "headers":cleaned_headers,
            "params":params,
        }

        if method.upper() != "GET" and json is not None:
            request_['json'] = json

        print(f"[Forwarding] {method} {url}")
        print(f"[Headers] {cleaned_headers}")
        if json:
            print(f"[Payload] {json}")  

        try:
            response = await client.request(**request_)
            return response
        except Exception as e:
            raise HTTPException(status_code=500, detail="Service is down. Try again later") # Forward the actual response
