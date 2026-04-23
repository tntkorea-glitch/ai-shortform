@AGENTS.md

## 세션 시작 시 자동 실행 (필수)
매 세션 시작 시 사용자의 첫 메시지를 처리하기 전에:
```bash
[ -f setup.sh ] && { [ ! -f .git/hooks/pre-commit ] || [ ! -d node_modules ]; } && bash setup.sh
git pull
```

## 프로젝트 정보
- 개발 포트: 3012 (고정 — `npm run dev`)
- 로컬 URL: http://localhost:3012
- 벤치마킹 원본: https://wingsaistudio.com/WingsAIStudioShotForm
- 테마: 핑크-오렌지 그라디언트, glassmorphism, 한국어 UI
