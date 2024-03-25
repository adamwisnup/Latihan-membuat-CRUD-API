# Students API

## Database Setup

Buat tabel `students` di database PostgreSQL Anda dengan query berikut:

```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    age INTEGER,
    address TEXT,
    is_active BOOLEAN
);
```

## API Endpoints

#### POST `/api/students`

Request body:

```json
{
  "name": "Adam Wisnu",
  "age": 22,
  "address": "Bandung, Indonesia",
  "is_active": true
}
```

Response body:

```json
{
  "message": "Student created successfully",
  "student": {
    "id": 1,
    "name": "Adam Wisnu",
    "age": 22,
    "address": "Bandung, Indonesia",
    "is_active": true
  }
}
```

#### GET `/api/students`

Response body:

```json
{
  "message": "get all students success",
  "students": [
    {
      "name": "Adam Wisnu",
      "age": 22,
      "address": "Bandung, Indonesia",
      "is_active": true
    },
    {
      "id": 2,
      "name": "Agam Ilham Candra",
      "age": 15,
      "address": "Ponorogo, Indonesia",
      "is_active": false
    }
  ]
}
```

#### GET `/api/students/:id`

Response body:

```json
{
  "message": "Student retrieved successfully",
  "student": {
    "id": 1,
    "name": "Adam Wisnu Pradana",
    "age": 22,
    "address": "Bandung, Indonesia",
    "is_active": true
  }
}
```

#### PUT `/api/students/:id`

Request body:

```json
{
  "name": "Adam Wisnu Pradana",
  "age": 22,
  "address": "Bandung, Indonesia",
  "is_active": true
}
```

Response body:

```json
{
  "message": "Student updated successfully",
  "student": {
    "id": 3,
    "name": "Adam Wisnu Pradana",
    "age": 22,
    "address": "Bandung, Indonesia",
    "is_active": true
  }
}
```

#### DELETE `/api/students/:id`

Response body:

```json
{
  "message": "Student deleted successfully"
}
```
