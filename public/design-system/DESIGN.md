# AI-Shortform Design System

윙스AI/부스텍AI 38장 캡쳐 분석 기반 공통 디자인 시스템 (2026-04-27 도입).

## 3개 프로젝트 공유 구조

```
D:/dev/ai-shortform/public/design-system/   ← canonical (단일 진실의 출처)
  ├── tokens.css                            ← 색상/타이포/스페이싱/컴포넌트
  └── DESIGN.md                             ← 이 문서

D:/dev/yutica/public/design-system/         ← mirror (sync로 복사)
D:/dev/tnt-mall/public/design-system/       ← mirror (Phase 2)
```

**변경 규칙**: ai-shortform 만 수정하고, 나머지 두 프로젝트는 동기화. 동기화 안 된 사본을 직접 고치지 말 것.

## 사용법

### Vanilla HTML (yutica `public/index.html` 등)
```html
<head>
  <link rel="stylesheet" href="/design-system/tokens.css">
</head>
<body>
  <button class="ws-btn-primary">URL로 영상 만들기</button>
  <div class="ws-card">상품 정보</div>
</body>
```

### Next.js 13+ (ai-shortform / tnt-mall) — **layout.tsx 에서 TSX import** ⭐ 권장

**Next.js 16 + Turbopack 검증된 가장 깔끔한 방식** (Lightning CSS 경고 0):

```tsx
// src/app/layout.tsx (또는 app/layout.tsx)
import "./globals.css";
import "../public/design-system/tokens.css";  // ← 상대경로 TSX import
```

`globals.css` 에는 `@import url(...)` **사용 금지**. Lightning CSS 가 다음 경고를 남김:
> `@import rules must precede all rules aside from @charset and @layer`

#### 절대 하지 말 것
- ❌ `globals.css` 에서 `@import url('/design-system/tokens.css');` (절대경로)
  → Turbopack에서 "Module not found, not implemented yet" 빌드 실패
- ❌ `globals.css` 에서 `@import url("../../public/design-system/tokens.css");`
  → 빌드는 통과하지만 Lightning CSS 경고 발생

### Vanilla HTML (yutica `public/index.html` 등)
절대경로 OK (Express 정적 파일 서빙):
```html
<link rel="stylesheet" href="/design-system/tokens.css">
```

### CSS 변수 직접 사용
```css
.my-button {
  background: var(--ws-gradient-primary);
  border-radius: var(--ws-radius-xl);
  font-weight: var(--ws-font-weight-bold);
}
```

## 핵심 토큰

### 색상 (Primary)
| 토큰 | 값 | 용도 |
|---|---|---|
| `--ws-pink` | `#ff1493` | Primary CTA, 액센트 |
| `--ws-purple` | `#8b0ab8` | Secondary, 서브 헤더 |
| `--ws-blue` | `#0099ff` | 정보, 그라디언트 종착점 |
| `--ws-orange` | `#ff8c00` | CTA 강조 (구매/할인) |

### 그라디언트 (윙스AI 시그니처)
| 토큰 | 값 | 용도 |
|---|---|---|
| `--ws-gradient-primary` | 핑크→파랑 (135°) | CTA 버튼/모달 헤더 |
| `--ws-gradient-pink-purple` | 핑크→자주 (135°) | 강조 헤더 |
| `--ws-gradient-soft` | 연핑크→흰색 | 배경 |
| `--ws-gradient-warm` | 노랑→오렌지 | 쇼핑/할인 박스 (yutica 기존) |

### 타이포
- 폰트: **Pretendard** (Korean-first, ai-shortform/yutica 공통)
- 사이즈: xs(11) / sm(13) / base(14) / lg(16) / xl(20) / 2xl(28) / 3xl(36)
- 굵기: regular(400) / medium(500) / bold(700) / extrabold(800)

### 라운드
- `sm` 6px / `md` 10px / `lg` 16px / `xl` 24px / `full` 9999px

## 컴포넌트 클래스 (vanilla 사용 가능)

| 클래스 | 설명 |
|---|---|
| `.ws-btn-primary` | 그라디언트 CTA 버튼 (핑크→파랑) |
| `.ws-btn-secondary` | 외곽선 버튼 (핑크 테두리) |
| `.ws-card` | 기본 카드 (hover 시 살짝 떠오름) |
| `.ws-modal` | 글래스모피즘 모달 (97% 흰 + blur) |
| `.ws-modal-header` | 그라디언트 헤더 |
| `.ws-input` | 입력 박스 (focus 시 핑크 글로우) |
| `.ws-tab-active` / `.ws-tab-inactive` | 탭 |
| `.ws-category-grid` / `.ws-category-item` | 카테고리 격자 (윙스AI 일반 숏폼 패턴) |

## 동기화 절차

ai-shortform 토큰 수정 후:

```bash
# yutica로 mirror
cp D:/dev/ai-shortform/public/design-system/tokens.css \
   D:/dev/yutica/public/design-system/tokens.css

# tnt-mall로 mirror (Phase 2)
cp D:/dev/ai-shortform/public/design-system/tokens.css \
   D:/dev/tnt-mall/public/design-system/tokens.css
```

자동화 sync 스크립트는 `shared-social-publisher` 패턴 참고하여 추후 추가.

## 변경 이력

### 2026-04-27 — 초기 도입
- 윙스AI 38장 캡쳐 분석 기반
- 핑크/자주/파랑 3색 그라디언트 시스템
- 카테고리 격자 패턴 (`.ws-category-grid`) 추가 — 윙스AI 일반 숏폼 핵심 UI
- yutica `public/design-system/` 으로 1차 mirror

### 2026-04-27 후속 — Next.js 16 Turbopack 호환 + 3-mirror 동기화
- **import 경로 수정**: Next.js 절대경로(`/design-system/`) Turbopack 미지원 → globals.css 기준 상대경로(`../../public/design-system/tokens.css`)
- tnt-mall mirror 완료, 3개 프로젝트 tokens.css 해시 일치 확인
- **이슈 (보류)**: ai-shortform 기존 코드는 Tailwind 팔레트(`from-pink-500/from-orange-500/from-purple-500/from-amber-500`)로 그라디언트 작성됨. wings 캔노니컬 색상과 미묘하게 다름. 일괄 마이그레이션은 시각 영향 커서 보류 — Phase 2 검증 시 별도 task로 처리 결정.

### 2026-04-27 추가 — Next.js 권장 패턴 변경 (Lightning CSS 경고 회피)
- ai-shortform(Next.js 16.2.2) 검증 결과: globals.css 의 `@import url(...)` 은 빌드 통과하지만 Lightning CSS 경고 발생 (`@import rules must precede all rules`)
- **권장 패턴 변경**: `app/layout.tsx` 에서 직접 TSX import (`import "../public/design-system/tokens.css";`), globals.css 의 `@import` 제거 → 경고 0
- 위 "사용법" 섹션 업데이트, tnt-mall 측에도 동일 패턴 권장
