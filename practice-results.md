# Resultados — Pre parcial práctico 2

IDs utilizados (obtenidos con `GET /api/categories` y `GET /api/books`): categoría Technology = 1; Clean Code = 1 (3 copias), The Pragmatic Programmer = 2 (1 copia), The Little Prince = 3 (0 copias).

| Petición y datos utilizados | Código esperado | Código obtenido | Observación |
| --- | --- | --- | --- |
| `POST /api/books` con `{ "title": "No copies yet", "availableCopies": 0, "categoryId": 1 }` | 201 | 201 | Se creó el libro con id 4 y categoría Technology. |
| `POST /api/books` con `"availableCopies": "2"` (texto) | 400 | 400 | `availableCopies must be an integer number`. |
| `POST /api/books` agregando `"status": "active"` | 400 | 400 | `property status should not exist`. |
| `POST /api/books` con `"categoryId": 999` | 404 | 404 | `Category was not found`; no se agregó ningún libro. |
| `PATCH /api/books/1/borrow` y luego `GET /api/books/1` | 200 | 200 | Clean Code pasó de 3 a 2 copias; el GET confirmó que se guardó. |
| `PATCH /api/books/2/borrow` (1 copia) | 200 | 200 | The Pragmatic Programmer quedó en 0 copias. |
| `PATCH /api/books/2/borrow` otra vez (0 copias) | 409 | 409 | `No copies available to borrow`. |
| `PATCH /api/books/3/borrow` (0 copias) | 409 | 409 | The Little Prince conservó 0 copias. |
| `PATCH /api/books/abc/borrow` | 400 | 400 | `ParseIntPipe`: `Validation failed (numeric string is expected)`. |
| `PATCH /api/books/999/borrow` | 404 | 404 | `Book with id 999 was not found`. |

## Pruebas

Resumen de `npm test`:

```
PASS  src/books/book-rules.service.spec.ts
PASS  src/books/books.service.spec.ts

Test Suites: 2 passed, 2 total
Tests:       3 passed, 3 total
```

| Prueba | Resultado obtenido |
| --- | --- |
| 1. Regla real: sin copias. | Pasó |
| 2. Servicio: préstamo exitoso. | Pasó |
| 3. Servicio: rechazo sin guardar. | Pasó |

## Comprensión del ejercicio

Respuesta: registrar un libro con 0 copias es una **validación de entrada**: en `CreateBookDto`, `availableCopies` tiene `@Min(0)`, así que 0 es un dato válido y `BooksService.create()` lo guarda. Prestar es una **regla de negocio**: `BooksService.borrow()` llama a `BookRulesService.ensureCanBorrow(book)` antes de modificar el libro, y esa regla lanza `ConflictException` (409) si `availableCopies <= 0`. Como la excepción ocurre antes de `availableCopies -= 1` y de `save()`, el libro no cambia. Entrada válida no significa operación permitida.