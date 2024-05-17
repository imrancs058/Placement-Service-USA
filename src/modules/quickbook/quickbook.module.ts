import { Module } from '@nestjs/common';
import { QuickBooksController } from './quickbook.controller';
import { QuickBooksService } from './quickbook.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quickbook } from './quickbook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quickbook])],
  controllers: [QuickBooksController],
  providers: [QuickBooksService],
  exports: [QuickBooksService],
})
export class QuickbookModule {}
