# AGENTS — BEARdly preview

Aplicar la [política rectora de no solapamiento](https://github.com/ceoncoyb/gitbridge-source-intake/blob/main/okf/policies/non-overlap-adaptive-projection-20261014.md). Este repositorio es una **representación derivada / previsualización estática** de BEARdly y no la autoridad sobre la aplicación, base de datos, licencias, precios o lanzamiento.

## Contrato de réplica
- Fuente declarada en el repositorio de trabajo: `ceoncoyb/beardly-brand-platform/release/public`. No editar manualmente aquí datos de oferta, ediciones o radar como segundo maestro; corregir en el origen y exportar/reconciliar con hashes.
- 2026-10-14: `api/editions.json`, `api/offer.json`, `api/radar.json` y `robots.txt` comparten SHA Git con los archivos bajo `release/public` del origen. Duplicación de despliegue **permitida por función**, no duplicación de canon ni evidencia de publicación pública.
- Actualmente `robots.txt` contiene `User-agent: *` / `Disallow: /` en el repositorio; conservar no-indexación hasta decisión de lanzamiento y prueba del host real.
- No sincronizar backend privado, SQLite, secretos, cuentas o datos de asistentes; no inferir reservas, cobros o fechas aprobadas de objetos con estado `tentativa` o `concepto`.

GitHub primero y Desktop Commander únicamente si hay una dependencia local demostrada. No desplegar automáticamente con base solo en estos archivos.

## Publication gate — 2026-10-20

The preview is not a launch or approval of any offer. Its assets must match the reviewed `beardly-brand-platform/release/public` output. Public editions are confirmed-only; the static radar contains only verified events with future, parseable dates. Keep `noindex` and restrictive `robots.txt`; no memberships, prices, events, or new identity are implied by this repository. Do not deploy or activate offers without explicit approval.
