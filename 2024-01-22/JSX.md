# JSX (Javascript eXtended)

_[by [@pauek](https://pauek.dev)]_

Javascript que permite incrustar expresiones en "HTML". Esas expresiones se traducen a un árbol de elementos del Virtual DOM de React.

La extensión de los ficheros de código cambia para indicar el hecho de que usen o no JSX:

|            | Sin JSX | Con JSX |
| ---------- | ------- | ------- |
| Javascript | `.js`   | `.jsx`  |
| Typescript | `.ts`   | `.tsx`  |

## Expresiones JSX

### JSX son expresiones Javascript

Cada trozo de JSX en un programa es una **expresión**:

```tsx
let a = <div>Un div</div>;
let title = <h1>To be or not to be</h1>;
let A = [
  <div>caja</div>,
  <main>caja principal</main>,
  <section>sección</section>,
  <header>cabecera</header>,
  <footer>pie de página</footer>,
];
let f = () => <p>Un párrafo</p>;
```

### JSX se traduce a `React.createElement`

El JSX se transforma realmente a llamadas a `React.createElement`.

Con JSX tendríamos:

```tsx
let jsx = (
  <div>
    Un div con <span>un span</span> dentro
  </div>
);
```

Lo mismo pero usando solo llamadas a `React.createElement`:

```tsx
let jsx2 = React.createElement("div", [
  "Un div con ",
  React.createElement("span", ["un span"]),
  " dentro",
]);
```

### Se incrustan expresiones con `{` y `}`

Se pueden incrustar valores Javascript en JSX usando **`{`** y **`}`**. Una expresión JSX se convierte así en una **plantilla**.

```tsx
const age = 5;
const ui = <div>I am {age} years old</div>;
```

```tsx
const name = "James";
const lastname = "Bond";
const ui = (
  <p>
    My name is {lastname}, {name} {lastname}.
  </p>
);
```

Dentro de **`{`** y **`}`** puede haber expresiones _arbitrarias_ en Javascript:

```tsx
const a = 23;
const b = 89;
<div>El resultado es {a * 100 + b}</div>;
```

También se pueden incrustar expresiones en los atributos de los elementos del Virtual DOM:

```tsx
const cname = "font-bold text-xl";
return <div className={cname}>A big message</div>;
```

```tsx
const type = "button";
return <input type={type} title="Click me" />;
```

### Estilos

Para poner estilos, se utiliza notación CSS-in-JS. En vez de poner:

```tsx
<div style="color: red; width: 500px">...</div>
```

Se convierte cada propiedad CSS a un campo de un objeto:

```tsx
() => <div style={{ color: "red", width: 500 }}>...</div>;
```

Eso permite incrustar valores directamente porque el CSS es un objeto de Javascript:

```tsx
() => {
  const color = "red";
  const width = 500;
  return <div style={{ color, width }}>...</div>;
};
```

### Arrays

Al incrustar un array, simplemente se incrustan los elementos consecutivamente:

```tsx
const a = [1, 2, 3, 4];
const ui = <div>{a}</div>;
```

es lo mismo que:

```tsx
const _ = [1, 2, 3, 4];
const ui = <div>{a[0]}{a[1]}{a[2]}{a[3]}</div>
```

### Valores que desaparecen

Al incrustar los siguientes valores, no se produce salida:

- `null`
- `undefined`
- `true`
- `false`
- `[]`

### Incrustar objetos es un error

```tsx
const obj = { a: 1, b: true, c: "hi" };
<div>{obj}</div> // <--- ERROR
```

## Construcciones típicas

#### Ifs

- Ifs del tipo `if (<cond>) <then>`:

  ```tsx
  () => {
    let body;
    if (condition) {
      body = <span>Condition was true</span>;
    }
    return <div>{body}</div>;
  };
  ```

  ```tsx
  () => <div>{condition && <span>Condition was true</span>}</div>;
  ```

- Ifs del tipo `if (!cond) <then>`:

  ```tsx
  () => <div>{condition || <span>Condition was false</span>}</div>;
  ```

- Ifs del tipo `if (cond) <then> else <else>`:

  ```tsx
  () => <div>{isItRaining ? <p>Plou</p> : <p>Fa sol</p>}</div>;
  ```

#### Bucles

El siguiente bucle

```tsx
let elements = [];
for (const value in valueArray) {
  elements.push(<span>{value}</span>);
}
return <div>{elements}</div>;
```

equivale a:

```tsx
<div>
  {valueArray.map((value) => (
    <span>{value}</span>
  ))}
</div>
```
