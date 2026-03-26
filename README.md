## Posts API

기본 경로: `/posts`

> 현재 데이터는 인메모리(배열)로 관리됩니다. 서버 재시작 시 초기화됩니다.

### 데이터 모델

| 필드      | 타입   | 설명                       |
| --------- | ------ | -------------------------- |
| `id`      | number | 게시글 고유 ID (자동 생성) |
| `title`   | string | 제목                       |
| `content` | string | 본문                       |
| `userId`  | number | 작성자 ID                  |

### 엔드포인트

#### 게시글 목록 조회

```
GET /posts
GET /posts?userId={userId}
```

- `userId` 쿼리 파라미터를 전달하면 해당 유저의 게시글만 반환합니다.

**응답 예시**

```json
[{ "id": 1, "title": "Post 1", "content": "Content 1", "userId": 1 }]
```

#### 게시글 단건 조회

```
GET /posts/:id
```

| 파라미터 | 위치 | 타입   | 설명      |
| -------- | ---- | ------ | --------- |
| `id`     | path | number | 게시글 ID |

- 존재하지 않는 ID 요청 시 `404 Not Found` 반환

#### 게시글 생성

```
POST /posts
```

**Request Body**

| 필드      | 타입          | 필수 | 설명              |
| --------- | ------------- | ---- | ----------------- |
| `title`   | string        | O    | 제목 (빈 값 불가) |
| `content` | string        | O    | 본문 (빈 값 불가) |
| `userId`  | number (정수) | O    | 작성자 ID         |

**요청 예시**

```json
{
  "title": "새 게시글",
  "content": "내용입니다.",
  "userId": 1
}
```

#### 게시글 수정

```
PATCH /posts/:id?userId={userId}
```

| 파라미터 | 위치  | 타입   | 설명           |
| -------- | ----- | ------ | -------------- |
| `id`     | path  | number | 게시글 ID      |
| `userId` | query | number | 수정 요청자 ID |

**Request Body** (모두 선택)

| 필드      | 타입   | 설명        |
| --------- | ------ | ----------- |
| `title`   | string | 변경할 제목 |
| `content` | string | 변경할 본문 |

- 게시글 작성자(`userId`)와 요청자가 다를 경우 `403 Forbidden` 반환
- 존재하지 않는 ID 요청 시 `404 Not Found` 반환

#### 게시글 삭제

```
DELETE /posts/:id
```

| 파라미터 | 위치 | 타입   | 설명      |
| -------- | ---- | ------ | --------- |
| `id`     | path | number | 게시글 ID |

- 존재하지 않는 ID 요청 시 `404 Not Found` 반환

**응답 예시**

```
"Removed #1 post"
```

### 에러 응답

| 상태 코드       | 발생 상황                           |
| --------------- | ----------------------------------- |
| `403 Forbidden` | 본인 게시글이 아닌 게시글 수정 시도 |
| `404 Not Found` | 존재하지 않는 게시글 ID 요청        |
