document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");

  // API에서 활동 목록을 가져오는 함수
  async function fetchActivities() {
    try {
      const response = await fetch("/activities");
      const activities = await response.json();

      // 로딩 메시지 제거
      activitiesList.innerHTML = "";

      // 활동 목록 렌더링
      Object.entries(activities).forEach(([name, details]) => {
        const activityCard = document.createElement("div");
        activityCard.className = "activity-card";

        const spotsLeft = details.max_participants - details.participants.length;

        activityCard.innerHTML = `
          <h4>${name}</h4>
          <p>${details.description}</p>
          <p><strong>일정:</strong> ${details.schedule}</p>
          <p><strong>잔여 인원:</strong> ${spotsLeft}자리 남음</p>
        `;

        activitiesList.appendChild(activityCard);

        // 선택 드롭다운에 활동 옵션 추가
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        activitySelect.appendChild(option);
      });
    } catch (error) {
      activitiesList.innerHTML = "<p>활동 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>";
      console.error("Error fetching activities:", error);
    }
  }

  // 신청 폼 제출 처리
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = result.message;
        messageDiv.className = "success";
        signupForm.reset();
      } else {
        messageDiv.textContent = result.detail || "오류가 발생했습니다";
        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      // 5초 후 메시지 숨김
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = "신청에 실패했습니다. 다시 시도해 주세요.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error signing up:", error);
    }
  });

  // 앱 초기화
  fetchActivities();
});
