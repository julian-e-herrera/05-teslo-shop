#Next.js Teslo Shop
Para correr localmente , se necesita base de datos
```
docker-compose up -d   
```

*El -d ,significa __detached__

## Configurar variables de entorno
Renombrar el archivo __.env.template__

MongoDV URL Local:
```
mongodb://localhost:27017/teslodb
```
* Reconstruir modulos de node y levantar Next
```
npm install
npm run dev
```


##Llenar la base de datos con informaciond e prueba
llamar a
````
http://localhost:3000/api/seed
````