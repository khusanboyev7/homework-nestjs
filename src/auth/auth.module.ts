import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AdminModule } from "../admin/admin.module";

@Module({
  imports: [JwtModule.register({ secret: "secret" }), AdminModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
