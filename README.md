# SD-lab3-middleware
Se va a crear un sistema que permita la consulta de una base de datos (SQL), en principio hay una única instancia y se le hace monitoreo cada 5 segundos, que consiste en obtener la memoria RAM libre y el uso del procesador, el usuario puede modificar desde la interfaz gráfica de administrado la regla para lanzar una nueva instancia (ejemplo cuando RAM libre &lt; 10 y el uso de procesador sea mayor al 90%), el usuario debe poder ver gráficos de cada máquina en tiempo real.  El sistema debe tener un cache donde se guarde la ultima consulta, entonces en caso de una petición nueva por algún usuario que corresponda a esa ultima consulta se retorna la respuesta sin ir hasta la base de datos, si la petición es diferente se actualiza el cache.