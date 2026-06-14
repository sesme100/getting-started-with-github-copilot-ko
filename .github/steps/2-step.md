## Step 2: Copilot으로 실제 작업하기

이전 단계에서 GitHub Copilot을 활용해 프로젝트를 빠르게 파악했습니다. 이제 본격적으로 작업을 진행해 봅시다.

:bug: **웹사이트에 버그가 있습니다** :bug:

신청 흐름에서 문제가 발견되었습니다.
현재 학생이 같은 활동을 **여러 번** 신청할 수 있습니다. 원인을 찾고 깔끔하게 수정하는 데 Copilot이 얼마나 도와주는지 확인해 봅시다.

본격적으로 시작하기 전에 Copilot 동작 방식을 간단히 짚고 넘어가겠습니다. 🧑‍🚀

### 📖 이론: Copilot은 어떻게 동작하나요?

Copilot은 전문성이 높은 동료 개발자처럼 생각하면 이해하기 쉽습니다. 효과적으로 활용하려면 배경 정보(컨텍스트)와 명확한 지시(프롬프트)를 제공해야 합니다. 또한 모델마다 강점이 다를 수 있습니다.

- **컨텍스트는 어떻게 제공하나요?:** 코딩 환경에서 Copilot은 주변 코드와 열린 탭을 자동으로 참고합니다. 채팅에서는 파일을 명시적으로 지정할 수도 있습니다.

- **어떤 모델을 선택해야 하나요?:** 이번 실습에서는 큰 차이가 없을 수 있습니다. 다양한 모델을 실험해 보는 것도 좋은 학습입니다. 🤖

- **프롬프트는 어떻게 작성하나요?:** 구체적이고 명확할수록 Copilot이 더 정확히 동작합니다. 필요하면 후속 프롬프트로 방향을 계속 보정할 수 있습니다.

> [!TIP]
> [chat participants](https://docs.github.com/en/copilot/using-github-copilot/copilot-chat/github-copilot-chat-cheat-sheet?tool=vscode#chat-participants), [chat variables](https://docs.github.com/en/copilot/using-github-copilot/copilot-chat/github-copilot-chat-cheat-sheet?tool=vscode#chat-variables), [slash commands](https://docs.github.com/en/copilot/using-github-copilot/copilot-chat/github-copilot-chat-cheat-sheet?tool=vscode#slash-commands-1), [MCP tools](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) 등으로 Copilot의 지식과 기능을 확장할 수 있습니다.

### :keyboard: 활동: Copilot으로 신청 버그 수정하기 :bug:

1. 먼저 버그 원인이 어디인지 Copilot에게 물어봅시다. **Copilot Chat** 패널을 **Ask Mode**로 열고 아래처럼 질문하세요.

   > 🪧 **참고:** 실습 재현성을 위해 아래 영어 프롬프트를 **그대로 복사**해 사용하세요.
   > 의미: 같은 활동을 두 번 등록할 수 있는 버그의 원인 위치를 코드베이스에서 찾도록 요청합니다.

   > ![Static Badge](https://img.shields.io/badge/-Prompt-text?style=social&logo=github%20copilot)
   >
   > ```prompt
   > #codebase Students are able to register twice for an activity.
   > Where could this bug be coming from?
   > ```

1. 문제가 `src/app.py`의 `signup_for_activity` 메서드에 있다는 것을 알았으니, Copilot 제안을 따라 반수동 방식으로 수정해 봅시다. 먼저 주석을 입력하고 Copilot이 이어서 완성하게 합니다.
   1. `src/app.py` 파일을 엽니다.

      > 💡 **팁:** 채팅에서 `src/app.py`가 언급되었다면, 채팅 뷰에서 파일명을 클릭해 바로 열 수 있습니다.

   1. 파일 하단 근처에서 `signup_for_activity` 함수를 찾습니다.

   1. 학생을 추가하는 주석 라인을 찾습니다. 그 위에 중복 신청 검사 로직을 넣는 것이 자연스럽습니다.

   1. 아래 주석을 입력하고 Enter로 다음 줄로 이동하세요. 잠시 후 Copilot 제안이 그림자 텍스트로 나타납니다. :tada:

      주석:

      ```python
      # Validate student is not already signed up
      ```

      <img width="700" alt="Copilot shadow text suggestion in the editor" src="../images/shadow-text.gif" />

   1. `Tab`을 눌러 Copilot 제안을 수락하고 실제 코드로 반영합니다.

   <details>
   <summary>예시 결과</summary><br/>

   Copilot은 계속 발전 중이므로 결과가 항상 동일하지 않을 수 있습니다. 제안 결과가 마음에 들지 않으면 아래 예시를 참고해 진행해도 됩니다.

   ```python
   @app.post("/activities/{activity_name}/signup")
   def signup_for_activity(activity_name: str, email: str):
      """Sign up a student for an activity"""
      # Validate activity exists
      if activity_name not in activities:
         raise HTTPException(status_code=404, detail="Activity not found")

      # Get the activity
      activity = activities[activity_name]

      # Validate student is not already signed up
      if email in activity["participants"]:
        raise HTTPException(status_code=400, detail="Student is already signed up")

      # Add student
      activity["participants"].append(email)
      return {"message": f"Signed up {email} for {activity_name}"}
   ```

   </details>

### :keyboard: 활동: Copilot으로 샘플 데이터 생성하기 📋

새 프로젝트에서는 테스트용으로 현실적인 샘플 데이터가 있으면 매우 유용합니다. Copilot은 이런 작업에 강하므로, 활동 데이터를 추가하면서 **Inline Chat** 사용법도 함께 익혀봅시다.

**Inline Chat**과 **Copilot Chat** 패널은 유사하지만 범위가 다릅니다. Copilot Chat은 다중 파일/탐색형 질문에 유리하고, Inline Chat은 현재 줄이나 선택 블록에 대한 빠른 보조에 적합합니다.

1. `src/app.py` 상단(약 23줄 부근)에서 예시 활동이 정의된 `activities` 변수를 찾습니다.

1. `activities` 딕셔너리 전체를 드래그로 선택합니다. 다음 프롬프트에서 Copilot이 문맥을 이해하는 데 도움이 됩니다.

   <img width="700" alt="Highlighted activities dictionary before opening inline chat" src="../images/activities-dict-highlighted.png" />


1. `Ctrl + I`(Windows) 또는 `Cmd + I`(macOS)로 Copilot Inline Chat을 엽니다.

   > 💡 **팁:** 선택된 줄에서 마우스 오른쪽 버튼을 누르고 `Open Inline Chat`을 선택해도 됩니다.

1. 아래 프롬프트를 입력하고 Enter 또는 오른쪽 **Send** 버튼을 누릅니다.

   > 🪧 **참고:** 실습 재현성을 위해 아래 영어 프롬프트를 **그대로 복사**해 사용하세요.
   > 의미: 스포츠 2개, 예술 2개, 지적 활동 2개를 추가하도록 요청합니다.

   > ![Static Badge](https://img.shields.io/badge/-Prompt-text?style=social&logo=github%20copilot)
   >
   > ```prompt
   > Add 2 more sports related activities, 2 more artistic
   > activities, and 2 more intellectual activities.
   > ```

1. 잠시 후 Copilot이 코드를 직접 수정합니다. 추가/삭제가 구분되어 표시되므로 변경 내용을 확인한 뒤 **Keep** 버튼을 누르세요.

   <details>
   <summary>예시 결과</summary><br/>

   Copilot은 항상 동일한 결과를 생성하지 않을 수 있습니다. 결과가 마음에 들지 않거나 진행이 어려우면 아래 예시를 참고해 계속 진행하세요.

   ```python
   # In-memory activity database
   activities = {
      "Chess Club": {
         "description": "Learn strategies and compete in chess tournaments",
         "schedule": "Fridays, 3:30 PM - 5:00 PM",
         "max_participants": 12,
         "participants": ["michael@mergington.edu", "daniel@mergington.edu"]
      },
      "Programming Class": {
         "description": "Learn programming fundamentals and build software projects",
         "schedule": "Tuesdays and Thursdays, 3:30 PM - 4:30 PM",
         "max_participants": 20,
         "participants": ["emma@mergington.edu", "sophia@mergington.edu"]
      },
      "Gym Class": {
         "description": "Physical education and sports activities",
         "schedule": "Mondays, Wednesdays, Fridays, 2:00 PM - 3:00 PM",
         "max_participants": 30,
         "participants": ["john@mergington.edu", "olivia@mergington.edu"]
      },
      "Basketball Team": {
         "description": "Competitive basketball training and games",
         "schedule": "Tuesdays and Thursdays, 4:00 PM - 6:00 PM",
         "max_participants": 15,
         "participants": []
      },
      "Swimming Club": {
         "description": "Swimming training and water sports",
         "schedule": "Mondays and Wednesdays, 3:30 PM - 5:00 PM",
         "max_participants": 20,
         "participants": []
      },
      "Art Studio": {
         "description": "Express creativity through painting and drawing",
         "schedule": "Wednesdays, 3:30 PM - 5:00 PM",
         "max_participants": 15,
         "participants": []
      },
      "Drama Club": {
         "description": "Theater arts and performance training",
         "schedule": "Tuesdays, 4:00 PM - 6:00 PM",
         "max_participants": 25,
         "participants": []
      },
      "Debate Team": {
         "description": "Learn public speaking and argumentation skills",
         "schedule": "Thursdays, 3:30 PM - 5:00 PM",
         "max_participants": 16,
         "participants": []
      },
      "Science Club": {
         "description": "Hands-on experiments and scientific exploration",
         "schedule": "Fridays, 3:30 PM - 5:00 PM",
         "max_participants": 20,
         "participants": []
      }
   }
   ```

   </details>

1. 웹사이트로 돌아가 새 활동이 표시되는지 확인합니다.

### :keyboard: 활동: Copilot으로 작업 내용 요약하기 💬

버그를 고치고 샘플 활동도 잘 확장했습니다. 이제 Copilot의 도움으로 커밋과 푸시까지 진행해 봅시다.

1. 왼쪽 사이드바에서 `Source Control` 탭을 선택합니다.

   > 💡 **팁:** Source Control 영역에서 파일을 열면 원본 대비 변경점(diff)을 바로 확인할 수 있습니다.

1. `app.py` 파일 옆 `+` 버튼을 눌러 변경사항을 스테이징합니다.

   ![image](../images/staging-changes-icon.png)

1. 스테이징 목록 위의 **Message** 입력칸을 찾되, 지금은 **아무 것도 입력하지 마세요**.
   - 보통은 직접 커밋 메시지를 작성하지만, 이번에는 Copilot을 사용합니다.

1. **Message** 입력칸 오른쪽의 **Generate Commit Message** 버튼(반짝이 아이콘)을 누릅니다.

1. **Commit** 버튼과 **Sync Changes** 버튼을 눌러 GitHub에 푸시합니다.

1. Mona가 작업을 검사하고 피드백 및 다음 레슨을 안내할 때까지 잠시 기다립니다.

<details>
<summary>문제가 있나요? 🤷</summary><br/>

피드백이 오지 않으면 아래를 확인하세요.

- `src/app.py` 변경사항을 `accelerate-with-copilot` 브랜치로 푸시했는지 확인하세요.

</details>
