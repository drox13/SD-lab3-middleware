#!/bin/bash

# #creo el contenedor
docker run -d --name instancia$1 -p 400$1:4000 --net mynet --ip 119.18.0.$1 instanciasimg