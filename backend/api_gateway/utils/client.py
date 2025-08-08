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
    async with httpx.AsyncClient() as client:

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
        except httpx.HTTPStatusError as exc:
            print(f"Error response {exc.response.status_code}: {exc.response.text}")
            return exc.response  # Forward the actual response
