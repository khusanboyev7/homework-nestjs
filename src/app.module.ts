import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { DistrictModule } from './district/district.module';
import { RegionModule } from './region/region.module';
import { MedicinesModule } from './medicines/medicines.module';
import { District } from './district/models/district.model';
import { Region } from './region/models/region.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),

    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      models: [District, Region],
      autoLoadModels: true,
      sync: { alter: true },
      logging: true,
    }),
    

    DistrictModule,

    RegionModule,

    MedicinesModule,
  ],
  controllers: [],
  providers: [],
  
})

export class AppModule {}
