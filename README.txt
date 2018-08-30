TUVIMOS PROBLEMAS DE CONFLICTO EN GIT, POR LO CUAL SUBIMOS TODO DE NUEVO

Aplicaciones necesarias:

-AngularJS
-MongoDB
-ExPress
-Moment
-Underscore
-PrimeNG 5
-RxJs 5.6
-Moment Time-zone


Comandos para inicializar:


npm start -- en la carpeta raiz de la app -- para iniciar angular en el puerto localhost:4200
node app.js-- en la carpeta /Server -- para iniciar Express en el puerto localhost:3000
sudo service mongod start -- para iniciar el servicio de mongo y con este la base de datos.


Base de datos:
Cargar la base de datos que se encuentra en la carpeta db en MongoDB aplicando agregar una 
nueva colección con los nombres de cada archivo .json en dicha carpeta como se ve en la imagen BD_CompasMongoDB.png 

Usuarios:
ADMIN
Username: admin
Password: admin
BODEGA CENTRAL
Username: daniel
Password: 123
BODEGA 1:
Username: bodega1
Password: bodega1


Instrucciones básicas uso del software:
Dependiendo del tipo de usuario se tiene un menú distinto, puede ser tipo admin, bodeguero central o bodeguero.

INVENTARIO:
Se puede agregar nuevos objetos al pulsar en agregar nuevo.
Se puede editar los campos de los objetos existentes así como el stock al pulsar sobre un elemento de la lista.

DESPACHOS:
Se pueden agregar nuevos despachos pulsando en agregar nuevo.
Para recibir, rechazar un despacho se debe presionar sobre elementos de la lista. Pillamos un bug al final de la entrega que no tuvimos
tiempo a solucionar en el que el bodeguero central puede editar las recepciones de las demás bodegas.

ADQUISICIONES:
El bodeguero central es quien puede crear nuevas adquisiciones.
El admin puede confirmarla para luego depachar (se confirma para que central no pueda cancelar, se puede dar el caso que se confirme y se
espere para comprar y despachar por eso la distinción entre depsacho y confirmación). Una vez despachado se confirma la recepción por
bodeguero central.

ORDENES:
Se pueden crear nuevas ordenes.
Se puede hacer despacho de algunos objetos en orden y dejar demás pendientes.
Cuando todo objeto fue decpachado en la cantidad pedida se cierra la orden y queda en estado final.

RETIROS:
Se pueden crear nuevos retiros, objetos pueden requerir devolución o no.
Se pueden devolver objetos en forma parcial.
Si se requiere devolución queda en estado pendiente hasta que todos los objetos requeridos son devueltos.