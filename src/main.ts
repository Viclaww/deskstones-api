import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // Allow requests from this frontend origin
    methods: 'GET,POST', // Allowed HTTP methods
    credentials: true, // Allow credentials if needed
  });

  await app.listen(1000);
}
bootstrap();
