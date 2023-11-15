import { Catch, ArgumentsHost } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class ZodSerializationExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    // nest-zod serializer doesn't log exceptions (which is annoying)
    if (
      exception instanceof Error &&
      exception.name === "ZodSerializationException"
    ) {
      console.error(exception);
    }

    super.catch(exception, host);
  }
}
