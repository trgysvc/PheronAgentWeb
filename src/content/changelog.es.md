# Registro de cambios

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), y este proyecto se adhiere al [Versionado Semántico](https://semver.org/spec/v2.0.0.html).

## [1.0.7] - 2026-09-17

### Añadido
- **Integración con TikTok** — Conexión de tipo "trae tu propia app" (Ajustes > Conexiones > TikTok): publica un vídeo o carrusel de fotos directamente, o envíalo como borrador a tu propia bandeja de entrada de TikTok. También lee tu propio perfil/info de creador, lista de vídeos y estado de procesamiento.
- **X (Twitter) — Marcadores, seguir, silenciar, bloquear, listas y mensajes directos** — Ampliado más allá de publicar/eliminar/dar me gusta/retuitear: ahora incluye marcadores, seguir/dejar de seguir, silenciar/bloquear, ocultar respuestas, citar publicaciones, encuestas, gestión de tus propias Listas y envío/lectura de Mensajes Directos.
- **LinkedIn — Republicar, artículos, multiimagen, encuestas y documentos** — Republica una publicación ajena, comparte un enlace con título/descripción, publica hasta 20 imágenes, crea una encuesta, adjunta un documento (PDF/PPT/DOC), añade un botón de llamada a la acción y edita el texto de una publicación ya publicada.
- **Facebook — Gestión de página y álbumes de fotos** — Actualiza el perfil de tu página, crea y sube fotos a álbumes, además de estadísticas por publicación y un desglose completo de reacciones.
- **Instagram — Moderación de comentarios** — Oculta/muestra un comentario en tu propia publicación sin eliminarlo, además de leer tu propio perfil y contenido reciente.
- **Archivo de conversaciones** (Ajustes > Datos y privacidad) — Búsqueda opcional y local en el dispositivo entre tus conversaciones pasadas de iMessage/SMS, WhatsApp y Mail. Nada se envía a la nube; el texto sin procesar nunca se almacena, solo resúmenes por tema cifrados en reposo.
- **Jira, Slack, Notion y Zapier — ahora completamente probados en vivo y funcionando**, cada uno con un flujo de conexión más simple o fiable.
- **Hooks** — Ejecuta automáticamente una tarea de seguimiento cuando una llamada a herramienta específica tiene éxito.

### Corregido
- **Fechas de vencimiento de recordatorios** — Un recordatorio creado con fecha/hora podía guardarse silenciosamente sin fecha de vencimiento; corregido.
- **Expiración de tokens de Instagram y Facebook** — Ambas conexiones podían dejar de funcionar silenciosamente una hora después de conectarse porque el token de corta duración nunca se intercambiaba por el real de ~60 días; corregido — reconecta una vez para aplicarlo.
- **Fiabilidad del OAuth de TikTok** — Tres causas distintas de un error genérico de "scope"/"malformed request", todas corregidas.
- **Desvío de estadísticas de redes sociales** — Preguntar por las estadísticas de "rendimiento" de una página de Facebook o Instagram podía responderse con la telemetría de CPU/RAM del propio Mac; corregido.
- **Desambiguación de herramientas de X** — Las cinco herramientas de X podían confundirse entre sí en una sola solicitud; ahora cada solicitud se resuelve con la herramienta que realmente corresponde.
- **Recuperación de conversaciones y habilidades** — Preguntas como "qué hablé con X" podían responderse con la imaginación del modelo en lugar de tus datos reales; corregido.
- **Parpadeo de disponibilidad de conexión** — Una integración conectada podía desaparecer brevemente bajo mucha carga del sistema aunque ya se hubiera confirmado que funcionaba; ahora un resultado confirmado se confía durante mucho más tiempo.
- **Fiabilidad de búsqueda web y citas** — Un nuevo lote de correcciones de investigación/citas sobre las de 1.0.6.
- **Consistencia de enrutamiento de integraciones** — Las solicitudes sobre Jira, Sentry, Linear, Slack o Postgres ahora se enrutan de forma consistente.
- **Compatibilidad con Swift 6.4 / Xcode 27** — Se adoptó el soporte de `defer` asíncrono para cerrar tres fugas de recursos reales, además de un conflicto de empaquetado de shaders Metal que rompía la compilación.

## [1.0.6] - 2026-08-01

### Añadido
- **Integración con Lark Suite** — Conecta el servidor MCP oficial de Lark/Feishu para mensajería, chats, calendario, Base, documentos y tareas mediante una conexión de tipo "trae tu propia app".
- **Integración con LemonSqueezy** — Puente REST directo para gestionar pedidos, clientes, suscripciones, descuentos y claves de licencia.
- **Integración con Kit (ConvertKit)** — Puente REST directo para gestionar suscriptores, difusiones, secuencias y etiquetas.
- **Soporte de desconexión en MCP Hub** — Cada servicio conectado ahora tiene una forma de un clic para borrar sus credenciales y desconectarse.
- **Integración con Audacity** — Controla una instancia de Audacity en ejecución directamente mediante su propio protocolo de scripting para edición de audio y efectos.
- **Notas de Apple, Recordatorios y exportación de Office** — Soporte nativo de Notas/Recordatorios, exportación real a Excel/PowerPoint/Word desde Numbers/Keynote/Pages, y eliminación de fondo en el dispositivo.

### Corregido
- **Fiabilidad de búsqueda web y citas** — Se corrigió un conjunto de problemas en las respuestas de investigación, incluyendo resultados de búsqueda perdidos, rechazos falsos de "respuesta incompleta" y citas marcadas incorrectamente.
- **Detectabilidad de nuevas herramientas** — Notas, Recordatorios, eliminación de fondo y las herramientas de documentos de Office ahora son correctamente accesibles con solicitudes simples.
- **Finalización de tareas de varios pasos** — Se corrigieron casos en los que el agente podía describir un siguiente paso sin ejecutarlo, o marcar un informe como completado sin haberlo escrito.
- **Fiabilidad de memoria y recuerdo** — Las solicitudes de "recuerda esto" ahora se guardan de forma fiable en lugar de no hacer nada silenciosamente.
- **Lógica de reintento de herramientas más segura** — Una herramienta desactivada tras fallos repetidos ahora se recupera automáticamente, y las restricciones permanentes se informan de inmediato en lugar de reintentarse.
- **Precisión de fechas en el calendario** — Se corrigió un error por el que los eventos podían guardarse silenciosamente con una fecha incorrecta.
- **Correcciones de integración con Stripe y Git** — Se corrigió el conjunto de acciones de Stripe tras un cambio previo y se estabilizó la integración con Git MCP.
- **Seguridad en operaciones de archivos y carpetas** — Se corrigieron casos límite en las comprobaciones de permisos de ruta y en el comportamiento de mover/copiar carpetas.
- **Fiabilidad general** — Correcciones menores en la entrega de telemetría, automatización del navegador, presupuestos de tiempo de espera y detección de carga del sistema.

## [1.0.5] - 2026-07-24

### Corregido
- **Seguridad en la citación de fuentes** — Se corrigió un problema por el que el agente podía citar URLs de origen, fechas o números de versión inexistentes, trasladando las comprobaciones de seguridad de citas a la ruta de ejecución activa.
- **Ejecución de solicitudes compuestas** — Se corrigió un problema por el que las solicitudes compuestas de varias partes (p. ej., pedir telemetría y versión del sistema operativo a la vez) podían devolver solo la mitad de la respuesta, forzando las llamadas a herramientas faltantes.
- **Seguridad en la redirección de salida de shell** — Se impidió que las redirecciones de shell de un solo archivo (`command > file`) eludieran la protección binaria y las comprobaciones de seguridad de escritura.
- **Detección de bots y filtrado de CAPTCHA** — La búsqueda web ahora detecta y filtra páginas de CAPTCHA/desafío de bots de los motores de búsqueda para evitar que el razonamiento se vea afectado por el texto del desafío.
- **Estabilización de JS en la búsqueda de Google** — Se mejoró la obtención de resultados de búsqueda de Google esperando a que se complete el renderizado de JavaScript del lado del cliente.
- **Resiliencia del respaldo de Safari** — Abre pestañas de Safari realmente visibles para el respaldo de búsqueda, con orientación clara de permisos cuando es necesario.
- **Concurrencia biométrica y de Keychain** — Se corrigió el manejo de tiempo de espera de Touch ID y se desbloquearon las lecturas de Keychain en segundo plano que bloqueaban las comprobaciones de disponibilidad de herramientas.
- **Límites de reintento del daemon** — Se impidió que las conexiones fallidas del daemon en segundo plano se reintentaran indefinidamente.

### Añadido
- **Investigación de fuentes autorizadas** — El agente ahora prioriza los datos oficiales del proyecto, las especificaciones estructuradas y la documentación directa por encima de fragmentos de búsqueda de terceros.
- **Conjuntos de herramientas de GitHub ampliados** — Se añadió acceso a GitHub Actions, seguridad de código, Dependabot, discusiones, avisos, gists, proyectos, etiquetas y notificaciones.

## [1.0.4] - 2026-07-06

### Añadido
- **Puentes de herramientas MCP** — Pheron Agent ahora se integra con servidores externos de Model Context Protocol (MCP), incluyendo Git, automatización de navegador con Playwright, búsqueda web con Perplexity, Stripe, GitHub, Notion, Unreal Engine y Zapier.
- **MCP Hub y Conexiones** — Se añadió un asistente dedicado en forma de cuadrícula de tarjetas en Configuración > Conexiones para configurar, guardar y probar fácilmente las credenciales de conexiones con herramientas externas.
- **Recomendaciones sensibles al contexto** — El agente ahora sugiere conectar integraciones faltantes en Configuración > Conexiones cuando una tarea requiere una herramienta que necesita credenciales.
- **Razonamiento unificado de pantalla y accesibilidad** — Se encadenaron descripciones de capturas de pantalla, OCR y análisis del árbol de accesibilidad (AX) para acciones más coherentes y fiables relacionadas con el navegador/pantalla.
- **Perfil de usuario local** — Las preferencias descubiertas por el agente y la información de identidad del usuario ahora se guardan en un perfil Markdown legible (`UserProfile.md`).
- **Rediseño de la pestaña de rendimiento** — Se combinaron las pestañas Salud y Analítica en Configuración en una sola pestaña con gráficos de tendencia en tiempo real de uso de CPU, memoria y velocidad.
- **Soporte de telemetría de disco** — Los informes de telemetría ahora incluyen el espacio libre del volumen de arranque junto con las estadísticas de CPU y memoria.

### Corregido
- **Contexto de conversación de varios turnos** — Se corrigió la pérdida de contexto entre turnos consecutivos en el mismo hilo de conversación, asegurando que el agente recuerde el contexto inmediato.
- **Límites de contexto del modelo** — Se corrigieron problemas de escalado del presupuesto de contexto del modelo local que restringían artificialmente las ventanas de tokens utilizables en sistemas con más RAM.
- **Correcciones de bucles de memoria** — Se resolvió un disparador de bucle de llamada a herramientas al buscar detalles de recuerdo del usuario (p. ej., "¿recuerdas mi nombre?").
- **Estabilidad de Keychain y autenticación** — Se corrigieron las devoluciones de llamada del flujo OAuth para Notion/Zapier y se restauraron las entradas de Keychain eliminadas durante las ejecuciones de pruebas locales.
- **Rendimiento al cambiar de tarea** — Se detuvieron inmediatamente los procesos en segundo plano y las ejecuciones de comandos al agotarse el tiempo o cancelar la tarea, para evitar fugas de CPU.
- **Enrutamiento de preposiciones en comandos en turco** — Se corrigió un error de enrutamiento incorrecto por el que las indicaciones en turco que contenían "üzerinden" (a través de) se enviaban incorrectamente a la ruta de matemáticas/cálculo.

## [1.0.3] - 2026-06-19

### Añadido
- **Memoria personal y recuerdo** — el agente ahora recuerda y muestra de forma fiable los datos que has compartido explícitamente (antecedentes, currículum, preferencias) cuando le preguntas por ellos; se cerró una brecha profunda de recuperación en la que los datos guardados podían volverse efectivamente imposibles de buscar
- **Comandos de archivos/carpetas multilingües** — las solicitudes tipo "organiza esta carpeta" ahora se reconocen en 13 idiomas (se añadieron ES, FR, DE, PT, IT, RU, ZH, JA, KO, AR además de TR/EN), no solo turco/inglés
- **Acciones de informe de MusicDNA** — los resultados del análisis ahora incluyen botones "Abrir informe" y "Mostrar en Finder" para saltar directamente a los archivos `.dna.md` / `.report.plist` generados
- **Telemetría — integración con Supabase:** todos los eventos de telemetría ahora fluyen a través de `telemetry_events` con solicitudes autenticadas, lógica de reintento y un vaciado síncrono al salir
- **Seguimiento de energía — basado en IOKit:** mediciones reales de julios de CPU+GPU+ANE mediante `powermetrics`, mostradas en vivo en el indicador de esfuerzo de la barra de menús
- **Analítica activada por defecto:** la analítica ahora está habilitada por defecto cuando no se ha establecido una preferencia explícita

### Corregido
- **Pérdida de contexto tras una pregunta aclaratoria** — responder a la pregunta de seguimiento del agente (p. ej., "¿qué formato de fecha?") anteriormente podía desviar la conversación hacia resultados no relacionados (una coincidencia parcial errónea con "ram" desviaba estas respuestas); el agente ahora permanece en la tarea original después de que respondas
- **Respuestas de recuerdo personal más rápidas** — se eliminó un turno de razonamiento desperdiciado cuando el agente busca algo que le dijiste anteriormente
- Reproducción de Apple Music y control de volumen: la confirmación ahora refleja el estado real del reproductor, corrigiendo fallos silenciosos cuando Music no estaba ya en ejecución
- Telemetría: las métricas de RAM/inferencia y la autenticación ya no informan valores obsoletos o en cero; los lotes de analítica fallidos ya no fallan silenciosamente
- Las compilaciones de depuración ahora se firman con el equipo de desarrollo correcto, corrigiendo derechos (entitlements) faltantes

## [1.0.2] - 2026-06-03

### Añadido
- **Procesamiento de tareas en segundo plano** — inicia una nueva conversación mientras una tarea sigue en ejecución; la conversación antigua permanece en la barra lateral con un indicador ⟳ y continúa en segundo plano
- **Interrupción de tareas** — El botón Detener (y la tecla Escape) cancela una tarea en ejecución a mitad de la ejecución
- **Model Hub** — catálogo completo de modelos: más de 30 modelos MLX locales (Qwen3, Llama 4, Gemma 3/4, Mistral, Devstral, Phi-4, DeepSeek) en una cuadrícula de 3 columnas; visualización adaptada al hardware
- Soporte de **VLM (Visión)** ampliado: se añadió Qwen2.5-VL 7B para sistemas con 48 GB o más
- Sección de documentación **Ayuda → Catálogo de modelos** con listas completas de archivos y requisitos de RAM
- **Enlace directo de licencia** — esquema de URL `pheron://activate?key=...` para activación con un clic
- Qwen3 Dense: 0.6B · 1.7B · 4B · 8B · 14B · 32B
- Qwen3 MoE: 30B-A3B · Coder-30B-A3B · Next-80B-A3B · 235B-A22B · Coder-480B-A35B
- Llama 4 Maverick (512 GB)
- Mistral Small 3.2 24B · Devstral Small 24B · Mistral Large 123B · Devstral 2 123B
- DeepSeek V4 Flash (192 GB)
- VLM: Qwen2.5-VL 7B (48 GB+)

### Cambiado
- Los títulos de sesión ahora usan el primer mensaje en lugar del nombre del modelo
- La sección VLM de Model Hub se muestra por separado
- La pestaña Configuración → IA ahora contiene la sección de Configuración
- Mejoras de fiabilidad en WebSearchTool

### Corregido
- La ventana de activación de licencia ahora se recrea correctamente al abrirse con una clave precargada

## [1.0.1] - 2026-06-01

### Cambiado
- RAM mínima actualizada a 16 GB en toda la documentación e Info.plist

### Corregido
- Visualización del Apple ID de relé privado en el panel de perfil (muestra "Cuenta de Apple" + logotipo de Apple)
- Redimensionamiento de la ventana de Configuración para las pestañas Perfil y Analítica
- Elemento de Política de reembolso faltante en el menú de Ayuda
- Ruta del paquete de Ayuda dentro de la app (los documentos no se cargaban)
- Rutas de navegación de la interfaz de documentación corregidas en todo el sistema

## [1.0.0] - 2026-06-01
Lanzamiento público

### Añadido
- Inicio de sesión con Apple mediante autenticación de Supabase
- Activación de licencia a través de Lemon Squeezy

### Corregido
- La ventana de Configuración ahora se redimensiona automáticamente según el contenido de la pestaña
- Corrección del tamaño de ventana de la pestaña Analítica (carga de datos asíncrona)
- Corrección del tamaño de ventana del panel de perfil
