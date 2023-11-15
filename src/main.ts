import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaClientExceptionFilter } from "nestjs-prisma";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { patchNestJsSwagger } from "nestjs-zod";
import { ZodSerializationExceptionFilter } from "./lib/zod-serialization-exception.filter";

patchNestJsSwagger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);

  // app.use(helmet());

  // CORS
  app.enableCors();

  // Nest-Zod Error Filter
  app.useGlobalFilters(
    new ZodSerializationExceptionFilter(httpAdapterHost.httpAdapter),
  );

  // Prisma Error Filter
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapterHost.httpAdapter),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle("Demo")
    .setDescription("The demo description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  // 🚀
  await app.listen(3000);
}
bootstrap();
