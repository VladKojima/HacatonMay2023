cd backend/mongoDB
start start.bat
cd ../chat_1
start mvnw.cmd spring-boot:run
cd ../oauth
start mvnw.cmd spring-boot:run
cd ../../frontend
npm i
npm start