# Design System — Top Trumps Aves de Colombia

## Filosofía
Sistema visual inspirado en la biodiversidad colombiana: colores naturales, tipografía legible, componentes accesibles y estados explícitos para carga, vacío y error.

## Color
- **Primario**: `#2E7D32` (verde bosque) — botones principales, acentos.
- **Secundario**: `#F57C00` (naranja tierra) — alertas, atributos destacados.
- **Fondo**: `#FAFAF8` (blanco hueso) — superficie principal.
- **Superficie**: `#FFFFFF` — tarjetas y modales.
- **Texto principal**: `#1F2937` (gris oscuro).
- **Texto secundario**: `#6B7280`.
- **Éxito**: `#4CAF50`.
- **Advertencia**: `#FFC107`.
- **Error**: `#D32F2F`.

## Tipografía
- **Familia**: Inter (sans-serif) para UI; Merriweather (serif) para nombres científicos.
- **Tamaños**: xs 12px, sm 14px, base 16px, lg 20px, xl 24px, 2xl 32px, 3xl 48px.
- **Pesos**: regular 400, semibold 600, bold 700.

## Espaciado
- Escala: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px.
- Bordes redondeados: sm 4px, md 8px, lg 16px, full 9999px.

## Componentes

### Button
- Estados: default, hover, active, disabled, loading.
- Variantes: primary, secondary, ghost, danger.

### Card (Carta de ave)
- Imagen del ave, nombre común, nombre científico, atributos comparables.
- Estados: active, selected, disabled, loading (skeleton).

### AttributeButton
- Botón que muestra nombre del atributo y valor numérico.
- Estados: default, hover, selected, disabled cuando no es turno del jugador.

### Scoreboard
- Indicador de cartas restantes por jugador.
- Estados: loading, empty, error.

### ScreenStates
- **Loading**: spinner + mensaje contextual.
- **Empty**: icono + título + descripción + CTA opcional.
- **Error**: icono + mensaje + botón reintentar.
- **Success**: icono + título + CTA principal.

## Layout
- Contenedor máximo: 1280px centrado.
- Grid de cartas: 1 columna móvil, 2 columnas tablet, 3 columnas escritorio.
- Responsive: breakpoint sm 640px, md 768px, lg 1024px, xl 1280px.

## Iconografía
- Iconos de Lucide React; tamaños: 16, 20, 24, 32.

## Tokens
Ver `spec/tokens.json` para el formato consumible por el frontend.
