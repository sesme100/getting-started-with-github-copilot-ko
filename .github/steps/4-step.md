## Step 4: Planning Agent로 구현 계획 세우기 🧭

이전 단계에서 Agent Mode를 활용해 빠르게 기능을 구현했습니다. 🚀

이번에는 한 템포 늦추고 아키텍트처럼 접근해 봅시다. 먼저 테스트 전략을 탄탄히 세운 뒤 구현으로 넘기면, 더 명확하고 예측 가능하며 깔끔한 결과를 얻을 수 있습니다. 🧪

### 📖 이론: Copilot Plan Agent란?

Copilot [Plan Agent](https://code.visualstudio.com/docs/copilot/agents/planning)는 코드 변경 전에 해결 방안을 설계하도록 도와줍니다.

곧바로 편집에 들어가지 않고, 요청을 조사하고 명확화 질문을 한 뒤, 사용자가 다듬을 수 있는 구현 계획 초안을 작성합니다.

#### Plan Agent 한눈에 보기

| 항목 | 🧭 Plan Agent |
| --- | --- |
| 목적 | 코딩 시작 전에 구조화된 구현 계획을 수립합니다. |
| 컨텍스트 수집 | 읽기 전용 조사로 요구사항과 제약을 파악합니다. |
| 협업 방식 | 명확화 질문을 하고, 답변을 반영해 계획을 업데이트합니다. |
| 반복성 | 구현 전 여러 차례 계획 정제를 지원합니다. |
| 안전성 | 계획 승인 후 **Agent Mode**로 넘기기 전까지 파일을 수정하지 않습니다. |
| 핸드오프 | **Start implementation** 버튼으로 승인된 계획을 **Agent Mode**에 전달해 코딩을 시작합니다. |

> [!TIP]
> 상위 수준 요청으로 시작한 뒤 후속 프롬프트에서 제약 조건과 세부사항을 추가할 수 있습니다.

### ⌨️ 활동: 백엔드 테스트 계획 및 구현

현재 백엔드는 테스트 커버리지가 없습니다. **Plan Agent**로 계획을 만들고 질문에 답한 뒤 구현을 시작하세요.

1. **Copilot Chat** 패널을 열고 **Plan Agent**로 전환합니다.

   <img width="350" alt="image" src="../images/plan-mode-dropdown.png" />


1. 먼저 넓은 범위의 프롬프트로 시작하고, Copilot과 함께 세부사항을 채워갑니다.

   > ![Static Badge](https://img.shields.io/badge/-Prompt-text?style=social&logo=github%20copilot)
   >
   > ```prompt
   > I want to add backend FastAPI tests in a separate tests directory.
   > ```

1. Copilot의 첫 계획이 생성될 때까지 기다립니다. 질문이 나오면 가능한 한 답변하세요.

   > 🪧 **참고:** 처음부터 완벽할 필요는 없습니다. 이후에 계획을 계속 다듬을 수 있습니다.

1. 후속 프롬프트로 계획을 정제하고 세부 요구사항을 추가합니다.

   예시는 다음과 같습니다.

   > ![Static Badge](https://img.shields.io/badge/-Prompt-text?style=social&logo=github%20copilot)
   >
   > ```prompt
   > Let's use the AAA (Arrange-Act-Assert) testing pattern to structure our tests
   > ```

   > ![Static Badge](https://img.shields.io/badge/-Prompt-text?style=social&logo=github%20copilot)
   >
   > ```prompt
   > Make sure we use `pytest` and add it to `requirements.txt` file
   > ```


1. 제안된 계획을 검토하고 만족하면 **Start implementation**을 눌러 **Agent Mode**로 넘깁니다.

   <img width="350" alt="image" src="../images/plan-mode-start-implementation.png" />

   버튼을 누르면 **Plan**에서 **Agent Mode**로 전환됩니다. 이 시점부터 Copilot은 이전과 같이 코드베이스를 수정할 수 있습니다.

1. Copilot이 방금 만든 계획을 구현하는 과정을 확인하세요. 도구 실행 권한(예: 명령 실행, 가상환경 생성)을 요청할 수 있으며, 계속 진행하려면 승인해 주세요.

1. 변경사항을 검토하고 테스트가 성공하는지 확인하세요. 필요하면 구현이 완료될 때까지 추가로 가이드합니다.

   **🎯 목표: 다음 단계로 넘어가기 전에 모든 테스트를 통과(녹색)시키기 ✅**

   > 🪧 **참고:** Agent Mode가 한 번에 완료할 수도 있고, 후속 프롬프트가 필요할 수도 있습니다.

1. 모든 변경을 `accelerate-with-copilot` 브랜치에 **commit**하고 **push**합니다.

1. Mona가 작업을 검사하고 다음 단계를 안내할 때까지 기다립니다.

<details>
<summary>문제가 있나요? 🤷</summary><br/>

- 테스트가 실행되지 않았다면 Copilot에게 테스트 실행을 요청하세요.
- `requirements.txt`에 `pytest`가 추가되어 있고 `tests/` 디렉터리가 존재하는지 확인하세요.

</details>
