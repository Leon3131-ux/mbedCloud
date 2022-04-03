# mbedCloud

## How to host
1. Clone the repository
2. Change all Websocket addresses in the frontend in the following files to your server IP:
  - `/src/allCharts/allCharts.js`
  - `/src/btnc/btnc.js`
  - `/src/temp/temp.js`
  - `/src/gyro/gyro.js`
  - `/src/rfid/rfid.js`
  - `/src/hum/hum.js`
3. Run `docker-compose build` and `docker-compose up -d` for the frontend
4. For the backend you will need Java 11 and then run `mvn clean install`, `docker-compose build` and `docker-compose up -d`

Now both the front and backend should be running in separate docker containers.
