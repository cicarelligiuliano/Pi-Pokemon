### POKEDEX 

Aplicacion SPA para poder ver pokemons, buscar de cualquier generacion, filtrarlos segun preferencias, y buscar los pokemons que mas les guste.

En este link pueden visitarla [Pokedex](https://pi-pokemon-alpha.vercel.app/)

Para evitar retrasos a la hora de cargar inicialmente solo hay 40 Pokemons cargados ya que hace una consulta a la API de pokemon.

Tienen la posiblidad de cargar sus propios pokemons, les dejo una url de una imagen asi pueden probar sus caracteristicas ya que es necesario para crear un pokemon: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/144.svg


Les facilito la api de pokemon donde pueden ver mas nombres para buscar ya que solo se precargan 40 pokemons https://pokeapi.co/api/v2/pokemon?limit=200


Para probar el codigo, tienen que descargarlo entero, luego en las 2 carpetas principales (api y client) deben hacer lo mismo para levantar el front y el back:
```
npm install
```

Para el backend (carpeta api) deben utilizar PostgreSQL, crear una DB con el nombre "pokemon" y luego crear en la carpeta API un archivo de configuracion de variables de entorno .env con los siguientes datos(Verificar que usen los mismos USER, PASSWORD, HOST y NAME):

```
DB_USER=postgres
DB_PASSWORD=1234
DB_HOST=localhost
DB_NAME=pokemon
PORT=3001
```

Luego de tener esto finalmente correr:

```
npm start
```

Para el frontend (carpeta client) crear en la carpeta API un archivo de configuracion de variables de entorno .env con los siguientes datos.

```
REACT_APP_BASE_URL= "http://localhost:3001"
```

Luego de tener esto finalmente correr:

```
npm start
```
