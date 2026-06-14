"""
고등학교 관리 시스템 API

학생들이 Mergington High School의 방과후 활동을 조회하고 신청할 수 있는
매우 간단한 FastAPI 애플리케이션입니다.
"""

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
import os
from pathlib import Path

app = FastAPI(title="Mergington High School API",
              description="방과후 활동 조회 및 신청을 위한 API")

# 정적 파일 디렉터리 마운트
current_dir = Path(__file__).parent
app.mount("/static", StaticFiles(directory=os.path.join(Path(__file__).parent,
          "static")), name="static")

# 메모리 기반 활동 데이터베이스
activities = {
    "Chess Club": {
        "description": "전략을 익히고 체스 대회에 참가합니다",
        "schedule": "금요일, 오후 3:30 - 5:00",
        "max_participants": 12,
        "participants": ["michael@mergington.edu", "daniel@mergington.edu"]
    },
    "Programming Class": {
        "description": "프로그래밍 기초를 배우고 소프트웨어 프로젝트를 만듭니다",
        "schedule": "화요일, 목요일 오후 3:30 - 4:30",
        "max_participants": 20,
        "participants": ["emma@mergington.edu", "sophia@mergington.edu"]
    },
    "Gym Class": {
        "description": "체육 수업 및 스포츠 활동을 진행합니다",
        "schedule": "월요일, 수요일, 금요일 오후 2:00 - 3:00",
        "max_participants": 30,
        "participants": ["john@mergington.edu", "olivia@mergington.edu"]
    }
}


@app.get("/")
def root():
    return RedirectResponse(url="/static/index.html")


@app.get("/activities")
def get_activities():
    return activities


@app.post("/activities/{activity_name}/signup")
def signup_for_activity(activity_name: str, email: str):
    """학생을 활동에 신청시킵니다."""
    # 활동 존재 여부 확인
    if activity_name not in activities:
        raise HTTPException(status_code=404, detail="활동을 찾을 수 없습니다")

    # 대상 활동 조회
    activity = activities[activity_name]

    # 학생 추가
    activity["participants"].append(email)
    return {"message": f"{email} 님이 {activity_name} 활동에 신청되었습니다"}
