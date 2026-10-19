import { ConflictException } from '@nestjs/common';
import { BookRulesService } from './book-rules.service';
import { BookEntity } from './entities/book.entity';

describe('BookRulesService', () => {
  let service: BookRulesService;

  beforeEach(() => {
    service = new BookRulesService();
  });

  it('rejects a book without available copies', () => {
    // Arrange
    const book = { id: 3, title: 'The Little Prince', availableCopies: 0 } as BookEntity;

    // Act and Assert
    expect(() => service.ensureCanBorrow(book)).toThrow(ConflictException);
  });
});