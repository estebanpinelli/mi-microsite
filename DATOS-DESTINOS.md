# Cómo cargar el detalle de cada destino

Todo sale de `public/data/destinations.json`. Cada destino es un bloque `{ ... }`.
Los campos nuevos son **opcionales**: si un destino no tiene uno, esa sección
simplemente no aparece en la página. Se pueden ir completando de a poco.

## Campos para SEO (ya cargados en los 6 destinos)

| Campo | Para qué sirve |
|---|---|
| `slug` | La URL del viaje: `exoticoslt.com/destino/<slug>`. Solo minúsculas, sin tildes, palabras separadas por guiones. **No cambiarlo** una vez publicado (rompe los links que ya circulan); si hace falta, avisar para agregar una redirección en `vercel.json`. |
| `seoTitle` | Título que aparece en Google y en la pestaña. Ideal ≤ 60 caracteres. Conviene que diga "desde Argentina". |
| `seoDescription` | Texto debajo del título en Google y en la vista previa de WhatsApp. Ideal ≤ 155 caracteres. |

## Itinerario

Se arma solo a partir de `descriptivoCompleto`, que ya existe. Dos formatos posibles:

```
Día 1: Salida de Buenos Aires hacia Tokio
Texto del día...

Día 2: Tokio
Texto del día...
```

o por etapas, con el título en MAYÚSCULAS:

```
Párrafo de introducción (opcional)

CIUDAD DEL CABO
Texto de la etapa...
```

Entre un día/etapa y el siguiente tiene que haber una línea en blanco (`\n\n` en el JSON).
El formato **día a día** es el mejor para Google y para el cliente: si podés, pasá los
demás destinos a ese formato.

## Secciones nuevas (opcionales)

```json
"salidas": [
    { "fecha": "5 de abril de 2027", "precio": 5190, "estado": "Confirmada" },
    { "fecha": "18 de octubre de 2027", "precio": 5390, "estado": "Últimos lugares" }
],
"notaPrecios": "Precios por persona en base doble. Suplemento single: USD 900.",

"alojamiento": [
    { "ciudad": "Tokio", "noches": 5, "hotel": "Nombre del hotel", "categoria": "4*" },
    { "ciudad": "Takayama", "noches": 1, "hotel": "Nombre del ryokan", "categoria": "Ryokan con onsen" }
],

"noIncluye": ["Propinas", "Comidas no mencionadas", "Gastos personales"],

"infoUtil": [
    { "titulo": "Documentación", "texto": "Qué necesita un pasajero argentino para entrar..." },
    { "titulo": "Clima", "texto": "..." },
    { "titulo": "Moneda", "texto": "..." }
],

"faq": [
    { "pregunta": "¿Necesito visa para ... con pasaporte argentino?", "respuesta": "..." },
    { "pregunta": "¿Se puede pagar en pesos?", "respuesta": "..." }
]
```

Las **preguntas frecuentes** valen mucho para SEO: Google las lee como datos
estructurados y son justo lo que la gente busca ("¿cuánto cuesta viajar a Japón
desde Argentina?", "¿qué vacunas necesito para Sudáfrica?"). Escribirlas con las
preguntas reales que te hacen los clientes.

Ojo con la sintaxis: comas entre campos, comillas dobles, y nada de coma después
del último elemento de una lista. Si el JSON queda mal escrito, el build falla
(mejor eso que publicar una web rota).

## Después de editar

`npm run build` regenera solo: el `sitemap.xml`, y una página HTML por destino con
su título, descripción y texto (lo que leen WhatsApp y los buscadores).
