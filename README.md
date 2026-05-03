# Dreftinput

Dreftinput es una aplicacion de escritorio para Windows creada para mejorar textos de entrada antes de pegarlos en otra app, IA, editor o flujo de trabajo. Su objetivo es transformar frases rapidas, textos desordenados o comandos mezclados en una version clara, formal, compacta y lista para usar.

## Que hace

- Corrige ortografia, tildes, puntuacion, mayusculas y errores de escritura.
- Intenta entender palabras incompletas o mal escritas, por ejemplo `omper` como `romper`.
- Mejora el input sin cambiar la idea principal.
- Ordena textos largos en pasos, filas o bloques cuando eso ayuda a entenderlos mejor.
- Reconoce y mejora texto en espanol, ingles, japones, chino, portugues, frances e italiano.
- Permite exportar solo el texto mejorado en `MD`, `TXT` o `PDF`.
- Incluye temas visuales: oscuro, claro glass y glass absoluto.

## App de escritorio

La interfaz esta pensada en formato glass/mica, con una ventana principal de `1200 x 600`, barra superior limpia, panel de ajustes esencial y una salida animada al mejorar el texto.

El launcher presenta Dreftinput antes de instalarlo, copia la aplicacion a archivos locales y la deja lista para uso comercial en Windows.

## Website

La pagina web esta configurada en la raiz del repositorio para que Vercel pueda leerla directamente:

- `index.html`
- `styles.css`
- `script.js`
- `assets/dreitz.ico`
- `assets/hero-interface.svg`
- `assets/workflow-board.svg`

La carpeta `Website/` queda como copia local de trabajo, pero la version que debe publicar Vercel es la de la raiz.

## Comandos

- `npm.cmd run start` abre la app.
- `npm.cmd run build` compila la app.
- `npm.cmd run pack` crea `release/win-unpacked/Dreftinput.exe` y un ZIP.
- `npm.cmd run launcher` crea el launcher tipo instalador.
