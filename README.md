# Screen Editor V2

Editor visual para el formato UNIT/ELEMENT.

## Reglas implementadas

- Pantalla: 24 columnas (`COL 0..23`) y 13 filas (`ROW 0..12`).
- `UNIT_00_TITTLE` siempre ocupa `ROW 0`.
- `UNIT_L1..L6` y `UNIT_R1..R6`.
- `_0_UP` corresponde a filas impares.
- `_1_DWN` corresponde a filas pares.
- El `ROW` lo determina el UNIT; el usuario solo mueve `COL`.
- Cada UNIT puede tener uno o varios ELEMENT.
- Se conserva `TITTLE` con esa ortografía para coincidir exactamente con el JSON original.
- Importa y exporta el JSON del formato original.
- Arrastrar un elemento cambia su COL.
- Los elementos vacíos se conservan.

## Arrancar

```powershell
npm.cmd install
npm.cmd run dev
```

Abre la dirección que indique Vite, normalmente `http://localhost:5173/`.

El fichero `src/sample.json` contiene un ejemplo completo.
