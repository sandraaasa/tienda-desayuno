# tienda-desayuno
El fichero de inicio de escaparate es el index.html

LOG IN Y REGISTRO
    ·Usuario por defecto=> nombre: nombre
                        => email: nombre@nombre.com
                        => contraseña: Contra02
    ·Para agregar cosas al carrito hay que loguearse obligatoriamente (por eso esta el usuario por defecto)
    .Expresiones regulares  =>Para el nombre de usuario solo acepta letras y números.
                            =>Para el email palabraConNumeros@palabra.ltras
                            =>Para la contraseña se acepta letras, numeros y @ o _
    
COOKIES
    ·en las cookies almaceno el dia en que se entra en la página

WEBSTORAGE
    ·Con localstorage guardo => nombre: nombre del usuario registrado
                             => users: array con el email, nombre y contraseña de cada usuario
                             => interruptor: un booleano de si esta iniciada la sesion o no
                             => carrito: un array con los productos añadidos para mostrarlos en el carrito

MULTIMEDIA
    ·Cuando finalizas la compra se escucha un sonido y se muestra un video de felicitaciones

NOTIFICACIONES
    ·Despues de dar me gusta a un producto se notificara de ello.
    ·Cuando entras en la pagina de inicio se te muestra una notificación de bienvenida y se alerta de las cookies
    ·Cuando se intenta añadir al carrito algún producto se te notifica de que debes registrarte primero
