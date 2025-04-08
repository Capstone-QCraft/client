# [Qcraft client](https://qcraft-interview.vercel.app)

### Claude 기반 AI 면접관

[프로젝트 협업 레포지토리](https://github.com/Capstone-QCraft)

###### 2024.09 - 2024.12

###### 2인 프로젝트

## 📌 Summary

이력서, 자소서 등으로 개인 맞춤형 질문을 생성하고, 답변에 대한 객관적이고 구체적인 피드백을 제공하여 효율적인 면접 대비

- `Web Speech API`

  실제와 같은 환경을 제공하기 위해 음성인식 답변이 가능하다.

## Troubleshooting

- `페이지 이름`

  SPA 에선 페이지 이름을 어떻게 바꿔야 할까 고민하다가 `useState` 로 변경하는 방법을 사용했다. 추후 더 알아보니 `helmet` 을 사용하면 메타데이터 까지 바꿀 수 있어 이를 적용하였다. `SSR` 도 사용하지 않았으면서 `react-helmet` 말고 `react-helmet-async` 를 적용한 것엔 `npmjs` 를 보니 유지보수가 5년전에 그쳐있어 상대적으로 유지보수가 잘된 `react-helmet-async` 를 사용하기로 결정하였다.

- `로딩`

  AI 가 생각하는 데 시간이 많이 소요되어 길게는 10초 가량 응답을 기다려야 했다.
  이 대기 시간에 로딩스피너를 추가하여 UX 향상 -> 지금 든 생각인데, 면접에 대한 팁을 제공해 주면 더 좋을 것 같다.

- `Web Speech API`

  1번 문항 답변을 마치고 2번 문항 답변을 할 때, 1번의 마지막 답변이 남아서 입력되는 버그로 골머리를 좀 앓았다. 하지만 해결은 꽤 간단했다. useState를 사용해서 비워주는 것으로 간단히 해결 가능했다.

- `브라우저 환경에서 화면 내보내기 문제`

  `html2canvas` 라이브러리를 사용하여 인터뷰 결과 화면을 이미지로 저장하는 것을 구현함에 있어서 등장 애니메이션으로 opacity 를 점점 높이는 것이 모두 끝난 후에도 투명하게 저장되었다. 저장하기 전에 애니메이션이 들어가는 클래스를 제거하고 저장후에 다시 추가하는 방향으로 해결하였다.

## 🔨 Technology Stack(s)

| Stack                                                                                                 | Version  | etc.        |
| ----------------------------------------------------------------------------------------------------- | -------- | ----------- |
| <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=black">           | `18.3.1` |             |
| <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"> | `4.9.5`  |
| <img src="https://img.shields.io/badge/Redux-764ABC?style=flat&logo=Redux&logoColor=white">           | `9.2.0`  | react-redux |

## ⚙️ Setup & Usage

```bash
# Install Packages
npm install

# Run Frontend Server
npm run start
```
