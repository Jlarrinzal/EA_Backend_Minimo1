# Mínimo 1 Backend

[Jose Mª Larrinzal](https://github.com/Jlarrinzal)

Ejercicio tipo 3

Valoraciones implementadas con :

- 3 tipos de datos: string, number y boolean. 

- Relación con la colección User y la colección Product. Cuando se hace la función createReview se pasa por id el usuario y el producto y luego te pinta por consola el username del usuario y el name del producto.

- Tiene 4 rutas para el CRUD: POST(createreview), GET(readall), UPDATE(updatereview), DELETE(deletereview)

- La interfaz gráfica tiene un componente "review" donde se puede ver el formulario para crear una review y la lista con todas las reviews. También tiene otro componente "review-detail" donde se puede ver un formulario para actualizar las reviews, un container con los datos de la review y un botón para poder borrarlas.

- La interfaz gráfica tiene implementada las 4 llamadas a los endpoint.

En createReview se tiene que pasar: id del usuario, número de estrellas, id del producto y un boolean true o false conforme si quieres dar un like o no. Pasa lo mismo con el formulario updateReview, aunque no está implementado lo de usuario y producto por id.