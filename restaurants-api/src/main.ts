import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  await app.listen(process.env.PORT);
}
bootstrap();
