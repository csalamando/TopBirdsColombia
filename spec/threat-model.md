# Threat model — Top Trumps Aves de Colombia

## Alcance
Aplicación web demo: frontend estático, backend FastAPI, SQLite. Sin PII, pagos ni datos críticos.

## STRIDE

### Spoofing (Suplantación)
- **Riesgo**: bajo. No hay autenticación ni cuentas de usuario.
- **Mitigación**: no aplica para MVP. Si se añade multijugador online, se requeriría autenticación.

### Tampering (Manipulación)
- **Riesgo**: medio. Un atacante podría modificar requests al backend para alterar resultados de rondas.
- **Mitigación**: validación estricta de inputs con Pydantic; lógica de juego resuelta en servidor; no confiar en valores enviados por el cliente.

### Repudiation (Repudio)
- **Riesgo**: bajo. No hay transacciones financieras ni acuerdos legales.
- **Mitigación**: logs de partidas en SQLite para auditoría interna.

### Information Disclosure (Divulgación de información)
- **Riesgo**: bajo. No se almacena PII.
- **Mitigación**: evitar exponer stack traces en producción; headers de seguridad (HSTS, CSP, X-Content-Type-Options).

### Denial of Service (DoS)
- **Riesgo**: medio. Backend demo puede ser abusado con requests masivas.
- **Mitigación**: rate limiting por IP; monitoreo de uso; free tier limitado por plataforma (Render/Railway).

### Elevation of Privilege (Elevación de privilegios)
- **Riesgo**: bajo. No hay roles de usuario privilegiados.
- **Mitigación**: no exponer endpoints administrativos; validar todos los parámetros.

## Amenazas priorizadas
| ID | Amenaza | Categoría | Severidad | Mitigación | Estado |
|---|---|---|---|---|---|
| T-01 | Manipulación de requests de ronda | Tampering | Media | Validación server-side | Aceptada |
| T-02 | DoS por tráfico masivo | DoS | Media | Rate limiting + plataforma | Aceptada |
| T-03 | Exposición de stack traces | Information Disclosure | Baja | Headers de seguridad, modo producción | Aceptada |
| T-04 | Dependencias con vulnerabilidades | Tampering/Elevation | Media | SAST/SCA en CI | Aceptada |

## Riesgo residual
Bajo. La aplicación no maneja datos sensibles ni operaciones críticas. El mayor riesgo es disponibilidad del demo ante abuso.
