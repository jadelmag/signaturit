# Signaturit Prueba Técnica

Prueba técnica para Signaturit

## SCSS

Para hacer la prueba se ha utilizado mixins para desarrollar las vistas responsive usando breakpoints.

## Unit Test

Pruebas unitarias usando vitest

Las pruebas unitarias se han realizado para:

- Los componentes
- Funciones globales dentro de la carpeta utils
- Los contextos 
- El router

- Para ejecutar las pruebas lanzar el script: `npm run test`
- Para ejecutar la cobertura de las pruebas lanzar el script: `npm run coverage`

## E2E Tests

Pruebas E2E usando cypress.

Las pruebas E2E se han realizado para las vistas:

- HomePage
- TrackingPage

Para ejecutar las pruebas E2E lanzar el script: `npm run cy:open`