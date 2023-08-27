import * as process from "process";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function start() {
    const PORT = process.env.PORT
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('Backend')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('DimonDr')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    app.enableCors();
    await app.listen(PORT, () => console.log('Server start on PORT ' + PORT))
}

start()