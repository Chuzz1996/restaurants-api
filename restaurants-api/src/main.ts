import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import credentials from './configuration/credentials';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Restaurant API')
    .setDescription('Restaurant API')
    .setVersion('1.0')
    .addTag('restaurant-api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('restaurant-api', app, document);
  await app.listen(credentials().PORT);
  console.log(`Start application in port = ${credentials().PORT}`);
}
bootstrap();
