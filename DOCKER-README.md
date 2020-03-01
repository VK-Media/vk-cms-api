# How to use

4 services is configured with default values ready for a development environment in `docker-compose.yml` and should work out of the box with the command `docker-compose up` in the root directory where the file `docker-compose.yml` lives.

If you encounter problems with ports or containers not running, try running `docker ps` and debug, you can also try to run the command `docker-compose down` which will both stop and remove all containers defined in `docker-compose.yml`.

## Database
The service **mongo** is a MongoDB container. By default port 27017 is opened up on the host. This enables other programs installed on the host machine such as MongoDB Compass to connect to the database with the connection url `mongodb://dev_db_admin_username:dev_db_admin_password@mongo:27017`.

It's also possible to use the included service **mongo_admin_interface**, a web-based MongoDB admin interface, listening on [http://127.0.0.1:8081](http://localhost:8081). If mongo-express is sufficient for your use case, the configuration `ports: - 27017:27017` on service mongo can be removed as the api and admin page communicate on a default docker network.

## API
The service **api** builds a container based on the included Dockerfile. The service will listen for any changes inside the package `src`. This enables the container to live update when you are developing on the host machine. By default the container will not update when you install/remove/update an npm package, this can be configured if needed.

The container gets two environment variables provided:
- `MONGODB_URL`: Uses by default the included mongo database, this can be changed to an external url connection string if needed.
  
- `PORT`: The port on which the app should listen for connections, this is by default port 5000. If this variable needs to be changed you need to also change `ports: - 5000:5000` to match. The first value is the port to open on the host machine and the second value is the container port.

- `REDIS_HOST`: Uses by default the included redis container URL, this can be changed to an external URL connection string if needed.

- `REDIS_PORT`: Uses by default the included redis container port 6379, this can be changed to another port if needed.

## Redis
A standard redis service listening on host port 6379.