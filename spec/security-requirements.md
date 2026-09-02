# Requisitos de seguridad — Top Trumps Aves de Colombia

## SR-01 Sin datos personales
La aplicación no almacenará ni procesará PII (Personally Identifiable Information). Los nombres de jugador son opcionales y temporales por partida.

## SR-02 Validación de inputs
Todo input del cliente será validado por Pydantic en el backend. No se confiará en valores enviados por el frontend para resolver rondas.

## SR-03 Headers de seguridad HTTP
El backend y el frontend en producción incluirán los siguientes headers:
- `Strict-Transport-Security` (HSTS)
- `Content-Security-Policy` (CSP)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`

## SR-04 HTTPS en producción
Toda comunicación cliente-servidor en producción usará HTTPS. El backend redirigirá HTTP a HTTPS.

## SR-05 Rate limiting
El backend implementará rate limiting por IP para endpoints de creación de partidas y rondas, mitigando abuso del demo.

## SR-06 Sin endpoints administrativos
No se expondrán endpoints de administración de datos sin autenticación. El seed de aves se ejecutará como comando offline o en CI.

## SR-07 Gestión de dependencias
Las dependencias serán auditadas en CI con herramientas SAST/SCA. Ninguna vulnerabilidad crítica o alta pasará a producción (GATE 2.5).

## SR-08 Logs sin datos sensibles
Los logs no contendrán PII ni datos de partidas que permitan identificar a usuarios.

## SR-09 Atribución de datos abiertos
Las imágenes y datos de aves provendrán de fuentes abiertas con atribución visible, respetando licencias.

## Verificación
- `security-engineer` validará estos requisitos en Fase 2.
- `sdlc-qa-automation` y `sdlc-security-engineer` verificarán cumplimiento en GATE 2.5.
