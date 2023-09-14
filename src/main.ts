import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyparser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyparser.json())
  app.use(bodyparser.urlencoded({extended:true}))

  const config = new DocumentBuilder()
  .setTitle('Blog Api')
  .setDescription('')
  .setVersion('1.0')
  .addTag('blog')
  .build();
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('blogapi',app,document)
   await app.listen(3005);
}
bootstrap();
