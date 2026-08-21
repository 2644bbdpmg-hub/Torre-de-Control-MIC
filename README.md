# Torre de Control · Indicadores Semanales

Tablero de seguimiento semanal de TGO MIC, Pase 6 → 7, Disciplina Operativa, Rank,
Gestores bajo Plan de Cobranza e Indicadores CH.

> **Este repositorio debe ser privado.** El histórico incluye nombres, números de
> empleado y montos de cobranza del personal. No lo hagas público ni publiques el
> sitio sin control de acceso.

## Qué hay aquí

| Archivo | Qué es |
|---|---|
| `index.html` | La aplicación completa: interfaz, cálculos y lectura de archivos de Excel. ~1 MB. |
| `data/dataset.json.gz` | El histórico ya procesado, comprimido. ~20 MB. Se descarga al abrir el sitio y el navegador lo guarda en caché. |
| `.nojekyll` | Le dice a GitHub Pages que sirva la carpeta tal cual, sin procesarla con Jekyll. |
| `netlify.toml` | Cabeceras de caché, sólo si algún día se aloja en Netlify. En GitHub Pages se ignora. |

Ningún archivo pasa el límite de 25 MiB que impone GitHub para subir desde el
navegador, así que puedes arrastrarlos directamente.

## El histórico va cifrado

GitHub Pages no ofrece control de acceso: en cuentas gratuitas sólo publica desde repos
públicos, y aun con GitHub Pro el sitio queda abierto a cualquiera con la dirección. La
protección no viene del repositorio, entonces, sino del propio archivo de datos:

- `data/dataset.json.gz` es **AES-256-GCM**. Empieza con la firma `ENC1`, seguida del
  salt (16 bytes), el vector de inicialización (12) y el texto cifrado.
- La llave se deriva de la contraseña con **PBKDF2-SHA256 y 600,000 iteraciones**, así
  que cada intento de adivinarla cuesta trabajo de cómputo real.
- `index.html` no lleva ni un dato dentro: sólo el código del tablero.
- Al abrir el sitio aparece una pantalla que pide la contraseña. Con **Recordar en este
  dispositivo** guarda la llave derivada en ese navegador y ya no vuelve a preguntar.

Aun así conviene dejar el repositorio en privado si tu plan lo permite: cifrado o no, es
una capa menos de exposición.

**La contraseña no va en el repositorio.** Está en `CONTRASEÑA del tablero.txt`, en la
carpeta de iCloud, fuera de esta carpeta `web`. No la mandes por el mismo medio que la
dirección del sitio.

## Publicar en GitHub Pages

1. Sube estos archivos a la raíz del repositorio (sueltos, no la carpeta).
2. **Settings → Pages → Source: Deploy from a branch → main → / (root) → Save.**
3. En uno o dos minutos queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

El `.nojekyll` ya va incluido: sin él, Pages intentaría procesar la carpeta y el sitio
saldría mal.

## Actualizar con una semana nueva

Dos caminos:

- **Sin tocar el repositorio**: abre el sitio y usa **＋ Cargar archivos**. Lo que
  cargues se guarda en tu navegador y sigue ahí la próxima vez. Es lo normal
  semana a semana.
- **Regenerando el histórico**: cuando se rehace el `dataset`, se reemplaza
  `data/dataset.json.gz` y queda igual para todos los que abran el sitio.

## Versión de un solo archivo

Existe también `Torre de Control - Indicadores Semanales.html`, que lleva el
histórico incrustado y funciona con doble clic, sin internet ni servidor. Es la
misma aplicación; la de este repositorio sólo separa los datos para poder alojarla.

## Cómo se usa

El manual completo —filtros, semanas múltiples, mapa de calor, calendario de
Disciplina, criterios de cálculo y semáforos— está en
`Cómo usar la herramienta.md`, junto al archivo de un solo archivo.
