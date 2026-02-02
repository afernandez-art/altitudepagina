
## Plan: Contadores Animados en Estadísticas

### Objetivo
Agregar contadores que animen los números desde 0 hasta su valor final cuando la sección de estadísticas aparece en pantalla, creando un efecto visual impactante.

### Implementacion

**1. Crear un custom hook `useCountUp`**

Un hook reutilizable que:
- Detecta cuando el elemento entra en el viewport usando `IntersectionObserver`
- Anima el número desde 0 hasta el valor objetivo
- Usa `requestAnimationFrame` para una animación suave
- Incluye una función de easing para que el contador desacelere al final

**2. Modificar la estructura de datos de stats**

Cambiar el formato de los stats para separar:
- Valor numérico (para animar): `150`, `98`, `500`, `12`
- Prefijo (opcional): `+`
- Sufijo (opcional): `%`

```text
Estructura actual:  { value: "+150", label: "Clientes" }
Estructura nueva:   { value: 150, prefix: "+", suffix: "", label: "Clientes" }
```

**3. Crear componente `AnimatedCounter`**

Un componente que:
- Recibe el valor numérico, prefijo y sufijo
- Usa el hook `useCountUp` para la animación
- Renderiza el número animado con sus decoradores

**4. Integrar en ClientsSection**

Reemplazar el renderizado estático de stats por el nuevo componente animado.

### Detalles Tecnicos

- **Duracion de animacion**: 2 segundos
- **Easing**: `easeOutExpo` para que el contador sea rapido al inicio y desacelere al final
- **Trigger**: Una sola vez cuando el elemento entra al viewport (50% visible)
- **Dependencias**: Solo React hooks nativos (`useState`, `useEffect`, `useRef`)
- **Compatibilidad**: IntersectionObserver tiene soporte amplio en navegadores modernos

### Archivos a Crear/Modificar

| Archivo | Accion |
|---------|--------|
| `src/hooks/useCountUp.ts` | Crear - Custom hook para animacion de conteo |
| `src/components/landing/ClientsSection.tsx` | Modificar - Integrar contadores animados |

### Resultado Esperado

Cuando el usuario hace scroll hasta la seccion de estadisticas, los numeros comenzaran en 0 y contaran hacia arriba hasta su valor final (+150, 98%, +500, 12) con una animacion fluida que desacelera al llegar al numero objetivo.
