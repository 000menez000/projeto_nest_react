import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path'
import { CreateTableUser1724712442183 } from './migration/1724712442183-create_table_user';
import { CreateTableState1724716754997 } from './migration/1724716754997-create_table_state';
import { CreateTableCity1724716761833 } from './migration/1724716761833-create_table_city';
import { CreateTableAddress1724716771868 } from './migration/1724716771868-create_table_address';
import { alterTableState1675458729381 } from './migration/1724717645622-alter_table_state';
import { insertInState1675458748572 } from './migration/1724717677385-insert_in_state';
import { insertInCity1675458752231 } from './migration/1724717681947-insert_in_city';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      entities: [path.resolve(__dirname, '**', '*.entity{.ts,.js}')],
      migrations: [
        CreateTableUser1724712442183,
        CreateTableState1724716754997,
        CreateTableCity1724716761833,
        CreateTableAddress1724716771868,
        alterTableState1675458729381,
        insertInState1675458748572,
        insertInCity1675458752231
      ],
      migrationsRun: true,
    }),
    UserModule,
    StateModule,
    CityModule,
    AddressModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
