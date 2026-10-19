import { ConflictException, Injectable } from '@nestjs/common';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BookRulesService {
  ensureCanBorrow(book: BookEntity): void {
    if (book.availableCopies <= 0) {
      throw new ConflictException('No copies available to borrow');
    }
  }
}