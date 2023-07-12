# Nextjs TesloShop

Para correr localmente se necesita la base de datos

```
docker-compose up -d
```

- El -d, significa **detached**

Para detener el contenedor de la base de datos

```
docker stop teslo-database
```

- MongoDB URL Local:

```
mongodb://localhost:27017/teslodb
```

- Reconstruir lod modulos de Node y levantar Next

```
yarn install
yarn dev
```

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

## Llenar la base de daros con información de pruebas

Llamar a:

```
  http://localhost:3000/api/seed
```
