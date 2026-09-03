"""Middleware de seguridad y rate limiting para la demo.

Implementa los requisitos SR-03 (headers de seguridad HTTP) y SR-05
(rate limiting por IP) de spec/security-requirements.md.
"""
from __future__ import annotations

import os
from typing import Callable, Awaitable

from fastapi import FastAPI, Request, Response
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from starlette.middleware.base import BaseHTTPMiddleware


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """Añade headers de seguridad recomendados a cada respuesta."""

    async def dispatch(
        self, request: Request, call_next: Callable[[Request], Awaitable[Response]]
    ) -> Response:
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains"
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self'; "
            "style-src 'self' 'unsafe-inline'; "
            "img-src 'self' data:; "
            "connect-src 'self';"
        )
        response.headers["X-XSS-Protection"] = "0"
        response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
        return response


def _rate_limit_exceeded_handler(request: Request, exc: RateLimitExceeded) -> JSONResponse:
    return JSONResponse(
        status_code=429,
        content={"detail": "Demasiadas solicitudes. Inténtalo más tarde."},
    )


# Límite generoso para demo; se desactiva en tests unitarios con TESTING=1
limiter = Limiter(key_func=get_remote_address, enabled=os.getenv("TESTING") != "1")


def setup_security(app: FastAPI) -> Limiter:
    """Registra middleware de headers y limitador de tasa en la app."""
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
    app.add_middleware(SecurityHeadersMiddleware)
    return limiter
