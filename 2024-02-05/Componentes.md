# Componentes en React 18.2

## Abstracción de elementos del DOM

En HTML los elementos son limitados. Y si queremos hacer elementos compuestos definidos por nosotros para crear elementos más grandes y poder hacer aplicaciones con ellos? La ["abstracción de procedimientos"](<https://es.wikipedia.org/wiki/Abstracci%C3%B3n_(inform%C3%A1tica)>) se traduce aquí a la "abstracción de elementos".

### Incrustar el resultado de funciones

Podemos hacer funciones nuevas que devuelvan trozos más grandes de UI:

```tsx
const Hola = () => <div>Hola majete!</div>;
```

Si tenemos la función `Hola`, para usarla podemos

```tsx
<div>{Hola()}</div>
```

En realidad `Hola` es un **componente React**. Un componente en React es simplemente una función. Pero se suele llamar así:

```tsx
<div>
  <Hola />
</div>
```

El hecho de usar `Hola` como un tipo de elemento nuevo en el JSX es una simple traducción de la llamada a la función.

Convención Importante: Los componentes del DOM normal conservan su nombre en minúsculas (`div`, `span`, `h1`, `p`, `input`, ...). Los componentes React **empiezan todos en mayúsculas** (`Hola`, `Header`, `HomePage`, `UserList`, etc.). El hecho de empezar en mayúsculas se usa en JSX para discernir elementos del DOM clásicos o bien componentes hechos por el usuario.

### Parámetros ("props" o propiedades)

Como a todas las funciones, cómo pasamos parámetros? Una función que actúa como componente `React` recibe **un solo parámetro `props`**, por definición:

```tsx
const Hola = (props) => <div>Hola majete!</div>;
```

El parámetro props contiene como campos todos los atributos del elemento Virtual DOM:

```tsx
<div>
  <Hola nombre="Pepito" efusivo={true} />
</div>
```

hace que `props` sea `{ nombre: "Pepito" }`, así que podemos cambiar el componente hola así:

```tsx
const Hola = (props) => (
  <div>
    Hola {props.nombre}
    {props.efusivo && "!"}
  </div>
);
```

Es una traducción de la llamada:

|                |                                             |
| -------------- | ------------------------------------------- |
| Función normal | `Hola({ nombre: "Pepito", efusivo: true })` |
| JSX            | `<Hola nombre="Pepito" efusivo={true} />`   |

### Destructuring de props

Dado el _destructuring_ en Javascript, en realidad podemos escribir el componente más claramente:

```tsx
const Hola = ({ nombre, efusivo }) => (
  <div>
    Hola {nombre}
    {efusivo && "!"}
  </div>
);
```

Usando tipos Typescript para los props sería:

```tsx
interface HolaProps {
  nombre: string;
  efusivo: string;
}
const Hola = ({ nombre, efusivo }: HolaProps) => (
  <div>
    Hola {nombre}
    {efusivo && "!"}
  </div>
);
```

### `children`

Cómo hacemos componentes que puedan tener otros dentro? Usando una propiedad estándar que es `children`.

Dado un componente utilizado así:

```tsx
<Box>
  <p>I am inside the box!</p>
</Box>
```

La forma de obtener el "contenido" de `Box`, es decir, los elementos contenidos dentro de éste es:

```tsx
const Box = ({ children }) => (
  <div className="bg-red-500 border">{children}</div>
);
```

Es decir, que en el código de más arriba, `children` es `<p>I am inside the box!</p>`.

## Combinación de Componentes

Usando `React`, al tener componentes podemos cumplir con el principio [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Partiendo de los siguientes datos:

```ts
const usuarios = [
  { id: 1, name: "James", age: 13 },
  { id: 2, name: "Marcia", age: 12 },
  { id: 3, name: "Paul", age: 14 },
  { id: 4, name: "Henrich", age: 10 },
];
```

En vez de escribir una página entera así:

```tsx
<html>
  <head></head>
  <body>
    <header>
      <h1>Lista de Usuarios</h1>
    </header>
    <ul>
      {usuarios.map((user) => (
        <li key={user.id}>
          {user.name} ({user.age})
        </li>
      ))}
    </ul>
  </body>
</html>
```

La organizaremos en partes y subpartes, cada una con su componente:

```tsx
const Header = () => (
  <header>
    <h1>Lista de Usuarios</h1>
  </header>
);

const UserList = ({ users }) => (
  <ul>
    {users.map((user) => (
      <li key={user.id}>
        {user.name} ({user.age})
      </li>
    ))}
  </ul>
);

const Page = () => (
  <html>
    <head></head>
    <body>
      <Header />
      <UserList users={usuarios} />
    </body>
  </html>
);
```

### Componentes como piezas de la aplicación

Dada cualquier aplicación, no es difícil explorar su interfaz gráfica y deducir qué partes son componentes usando dos pistas:

- **Partes autocontenidas de la pantalla** que se corresponden con un concepto entero (y por tanto cuyos datos provienen de un tipo de objeto muy claro). Por ejemplo, un menú, un pie de página, una figura o un _card_ que representa un elemento en una lista.

- **Repetición** de esas partes. Aun cuando esto no es un requerimento, los componentes más útiles suelen utilizarse varias veces y eso es lo que permite

### El interfaz es una función de los datos

React proporciona ayuda para construir todo el interfaz de una aplicación como una función pura de los datos de entrada. En general, los datos puros de una aplicación se denominan el **modelo**, así que la fórmula sería:

`UI = f(model)`

La interpretación que se puede hacer es que lo que se ve en la pantalla son los datos representados de una forma más fácil de digerir para los usuarios, pero son una "versión más concreta" de éstos. La versión más abstracta son los datos puros, que no tienen nada más.

## React Server Components

Los componentes `React` pueden obtener datos desde los props, pero en última instancia habrá siempre un sistema de almacenamiento: ficheros, una base de datos, o una API (que en realidad tiene ficheros o una base de datos detrás).

Cómo podemos rellenar nuestros componentes `React` con esos datos?

### Ejecutar componentes en el servidor (NextJS 13+)

En un proyecto NextJS 13+ ([casi ningún otro framework tiene esto aún!](https://nextjs.org/docs/app/building-your-application/rendering/server-components)), los componentes `React` son, por defecto, de servidor ([React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components), o RSC). Es decir, que su código se ejecuta en el servidor y éste traduce los elementos creados a HTML.

Eso permite que los componentes sean asíncronos y podamos leer desde fuentes diversas:

1. Texto cargado de ficheros:

   ```tsx
   import { readFile } from "fs/promises";

   export default async function Page() {
     const fileContents = await readFile("./document.txt");
     const text = fileContents.toString();

     return (
       <main>
         <h1>Some text</h1>
         <p>{text}</p>
       </main>
     );
   }
   ```

2. Lista de usuarios (aleatorios, de prueba) de una API:

   ```tsx
   export default async function Page() {
     const response = await fetch("https://randomuser.me/api/?results=20");
     const { results: userList } = await response.json();

     return (
       <main>
         <h1>User List</h1>
         <ul>
           {userList.map(({ email, name }) => (
             <li key={email}>
               {name.first} {name.last}
             </li>
           ))}
         </ul>
       </main>
     );
   }
   ```

Por defecto NextJS 13+ intentará, al máximo posible, renderizarlo todo en el servidor, porque ahorra tiempo de cálculo y el envío del código Javascript neceseario para hacer el renderizado.

## Componentes Interactivos

Pero hay componentes que no se pueden renderizar en el servidor. Un contador con un botón, una descripción que puede colapsar, un menú, etc. Todos estos componentes tienen _estado_, que puede cambiar en el cliente según el usuario interaccione con ellos.

### Componentes de Cliente

Para marcar un componente como cliente, hay que poner, arriba de todo del fichero del componente la directiva:

```js
"use client";
```

Esto le indica a NextJS que el componente se renderizará en el cliente, y por tanto hay que empaquetar el código para que se ejecute allí. Los componentes de tipo cliente serán algo más lentos en reaccionar una vez cargada la página, pero ese es el precio de la interactividad.

Un componente cliente no puede cargar datos como hemos hecho con los componentes de servidor, así que no puede ser una función asíncrona.

### Hooks

Los hooks son funciones que React ofrece para proporcionar utilidades a los componentes de cliente y que éstos sigan siendo funciones (hace tiempo eran clases mucho más complejas).

#### `useState`

Para que un componente tenga estado, usaremos `useState`. Este _hook_ reserva espacio para un valor Javascript que React guarda y gestiona por nosotros y que el componente puede obtener cuando se ejecuta.

Normalmente un componente se ejecutará cada vez que haya que "re-pintar" la pantalla, así que puede ser que se ejecute muchas veces. Cada vez que se ejecuta, el estado será el mismo, porque React lo guarda y lo proporciona como respuesta a la llamada a `useState`.

`useState` devuelve dos cosas: el estado en sí (un valor javascript), y una función que permite cambiar el estado. La función también tiene el propósito de avisar a React, ya que un cambio de estado debe producir un repintado del componente.

Ejemplos:

1. Un componente con estado `boolean` que pone sí o no y cambia al clicar:

   ```tsx
   "use client";

   export const YesNo = () => {
     const [yes, setYes] = useState<boolean>(false);
     return (
       <div onClick={() => setYes((prev) => !prev)}>{yes ? "yes" : "no"}</div>
     );
   };
   ```

2. Un contador, que se incrementa al apretarlo:

   ```tsx
   "use client";

   export const Counter = () => {
     const [count, setCount] = useState<number>(0);
     return (
       <button onClick={() => setCount((x) => x + 1)}>
         You have clicked me {count} times
       </button>
     );
   };
   ```

La función `setYes` o `setCount`, que cambian el estado, pueden recibir un valor directo o bien una función que será la que efectúe el cambio, quizás usando el valor anterior. En ambos casos esto es relevante porque `setYes` pasa de `true` a `false` y viceversa y `setCount` incrementa el contador en 1.

#### `useEffect`

`useEffect` se utiliza para producir "efectos secundarios" al pintado del componente. Los típicos casos son:

1. Cargar datos la primera vez que el componente se muestra.
2. Suscribir-se (y más adelante cancelar la suscripción) a algun tipo de evento para mostrar datos en tiempo real.
3. Recalcular o recargar datos en función de cambios en los `props`.

`useEffect` recibe 2 parámetros:

- Una **función** `func` a ejecutar (una clausura del entorno del componente) que es la que tiene "efectos secundarios" (que rompe la pureza del comopnente).
- Un **array** con aquellas variables que, al cambiar, deberían provocar una nueva ejecución de `func`. Este array tiene 2 casos especiales:
  - `[]`: No hay dependencias, `func` solo se ejecutará la primera vez que el componente se ejecute.
  - `undefined` (no hay 2o parámetro): `func` se ejecuta cada vez que el componente se ejecute (_mucho cuidado con este caso_, puede provocar bucles infinitos!).

Ejemplos:

1. Cargar datos cuando el componente se muestra por primera vez:

   ```tsx
   "use client";

   export const UserList = () => {
     const [users, setUsers] = useState<any[] | null>(null);

     useEffect(() => {
       fetch("https://randomuser.me/api/?results=20")
         .then((response) => response.json())
         .then(({ results: users }) => setUsers(users));
     }, []); // <-- Array vacío, cargamos datos una vez.

     if (users === null) {
       return <div>Loading...</div>;
     }
     return (
       <ul>
         {users.map((user) => (
           <li key={user.email}>
             {user.name.first} {user.name.last}
           </li>
         ))}
       </ul>
     );
   };
   ```

2. Lista de datos donde la búsqueda viene como un `prop`:

   ```tsx
   "use client";

   export const Search = ({ search }: { search: string }) => {
     const [results, setResults] = useState<any[] | null>(null);

     useEffect(() => {
       fetch(`https://api.punkapi.com/v2/beers?beer_name=${search}`)
         .then((response) => response.json())
         .then((results) => setResults(results));
       setResults(null); // Limpiar resultados anteriores
     }, [search]);

     if (results === null) {
       return <div>Loading...</div>;
     }
     return (
       <div>
         {results.map((result) => (
           <div key={result.id}>{result.name}</div>
         ))}
       </div>
     );
   };
   ```

   El formulario de búsqueda estaría en un componente más arriba en el árbol de componentes, y a éste se le pasaría el texto a buscar. Cuando el texto cambia, el componente se ejecuta nuevamente con el prop `search` cambiado y entonces `useEffect` relanza la consulta porque `search` aparece como dependencia en el array. Esto mostrará al cabo de un rato resultados distintos. El `setResults(null)` dentro de `useEffect` resetea los resultados en el mismo momento en que se sabe que `search` es otro.

3. Un reloj que se crea un timer (y lo elimina) para ir mostrando la hora actual:

   ```tsx
   "use client";

   const pad = (n: number) => String(n).padStart(2, "0");

   export const Clock = () => {
     const [time, setTime] = useState<Date>(new Date());

     useEffect(() => {
       const id = setInterval(() => {
         setTime(new Date());
       }, 1000);
       return () => clearInterval(id);
     }, []);

     const h = time.getHours();
     const m = time.getMinutes();
     const s = time.getSeconds();
     return (
       <div>
         {pad(h)}:{pad(m)}:{pad(s)}
       </div>
     );
   };
   ```

   La función `func` que se pasa a `useEffect` devuelve otra función que es la que "deshace" las cosas que ha hecho `func`, en este caso colocar un "interval", que produce un aviso cada segundo. Si no se hace eso, el evento del "interval" seguirá ocurriendo aún cuando quizás el componente no esté visible (que genera un error de ejecución).
