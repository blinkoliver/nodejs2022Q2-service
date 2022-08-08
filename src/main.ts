import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { CustomLogger } from './logger/CustomLogger';

async function bootstrap() {
  const port = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  const rootDirname = process.cwd();
  const DOC_API = await readFile(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');
  const document = parse(DOC_API);
  SwaggerModule.setup('doc', app, document);
  await app.listen(port);
  console.log(
    ` 🔉  Listening on port ${port}
    🚀  Swagger working at http://localhost:${port}/doc`,
  );
}
bootstrap();
