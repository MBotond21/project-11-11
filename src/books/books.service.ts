import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

import * as mysql from 'mysql2/promise';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class BooksService {
  db: PrismaService

  constructor(db: PrismaService) {
    this.db = db
  }

  create(createBookDto: CreateBookDto) {
    return this.db.book.create({
      data: createBookDto
    })
  }

  async findAll() {
    return await this.db.book.findMany();
  }

  async findOne(id: number) {
    return await this.db.book.findUnique({
      where: { id }
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try{
      return await this.db.book.update({
        where: { id },
        data: updateBookDto
      });
    }catch { return undefined }
  }

  async remove(id: number) {
    try{
      return await this.db.book.delete({
        where: {
          id
        }
      })
    }catch {
      return undefined
    }
  }
}