# Mergington High School 활동 API

학생들이 방과후 활동을 조회하고 신청할 수 있는 매우 간단한 FastAPI 애플리케이션입니다.

## 주요 기능

- 이용 가능한 방과후 활동 전체 조회
- 활동 신청

## 시작하기

1. 의존성 설치:

   ```bash
   pip install fastapi uvicorn
   ```

2. 애플리케이션 실행:

   ```bash
   python app.py
   ```

3. 브라우저에서 다음 주소로 이동:
   - API 문서: <http://localhost:8000/docs>
   - 대체 문서: <http://localhost:8000/redoc>

## API 엔드포인트

| 메서드 | 엔드포인트 | 설명 |
| :--- | :--- | :--- |
| GET | `/activities` | 모든 활동의 상세 정보와 현재 참가자 수를 조회합니다. |
| POST | `/activities/{activity_name}/signup?email=student@mergington.edu` | 활동을 신청합니다. |

## 데이터 모델

애플리케이션은 의미 있는 식별자를 사용하는 간단한 데이터 모델을 사용합니다.

1. **Activities** - 활동 이름을 식별자로 사용:

   - 설명
   - 일정
   - 최대 참가 가능 인원
   - 신청한 학생 이메일 목록

2. **Students** - 이메일을 식별자로 사용:
   - 이름
   - 학년

모든 데이터는 메모리에 저장되므로, 서버를 재시작하면 데이터가 초기화됩니다.
