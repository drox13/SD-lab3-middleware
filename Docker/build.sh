docker build -t instanciasimg .
docker network create --subnet=119.18.0.0/16 othernet

docker run -d --name mysqldb -p 3306:3306 -e MYSQL_ROOT_PASSWORD=a mysql:latest
docker exec -it mysqldb bash
#la p es de password la a es el valor
#esto es para conectar a la base de datos
#mysql -u root -pa

#docker run -d --name instancia2 -p 4002:4000 --net mynet --ip 119.18.0.2 instanciasimg
#docker run -d --name instancia3 -p 4003:4000 --net mynet --ip 119.18.0.3 instanciasimg