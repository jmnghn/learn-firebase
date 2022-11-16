## 파이어베이스 앱 만들기.

> [Notion](https://paullabworkspace.notion.site/Firebase-43e93768fad149ba92765940411bf55a)<br />
> (※ 토이프로젝트나 PoC, 프로토타입용으로 사용할 목적으로 학습)

### 파이어베이스 🔥

'아군 포병의 화력을 지원받는 기지'를 뜻하는 군사 용어.<br />
최전방(!)에서 사용자를 대상으로 개발해야 하는 프론트엔드(클라이언트) 개발자에게 백엔드의 화력을 지원한다는 찰떡 네이밍 😄<br />

- 서버리스하게 정형화된 기능을 지원한다. :)<br />
- 웹 페이지만 만들고 싶어도 웹 서버, 백엔드 서버, 데이터베이스 서버를 구축해야 한다.<br />
- 비지니스 로직이 완성되어 자체적으로 내장되어 있는 BaaS(Backend-as-a-Service)에 속한다.
- 파이어베이스가 제공하는 여러가지 서비스들
  - Cloud FireStore<br />
    : 데이터베이스.
  - Firebase ML<br />
    : 모바일기기에서만 사용 가능. 머신러닝 기능의 SDK를 제공함.
  - Cloud Functions<br />
    : 사용자가 작성한 코드를 비지니스 로직으로 실행할 수 있게 제공.(기본적으로 유료)
  - Cloud Storage<br />
    : 이미지 파일같은 데이터를 저장하는 기능을 제공함.
  - Hostring<br />
  - Authentication<br />
    : 여러 인증로직을 미리 구현해 사용자에게 간단히 제공할 수 있다.
  - RealTime Database<br />
    : 구글에 인수되기 전 파이어베이스사가 개발하던 원조 데이터베이스다.<br />
    DB에 데이터가 실시간으로 반영되고 사용자에게 동기화된다. (다른 사람이 작성한 글 또는 수정한 글을 실시간으로 바로 볼 수 있게된다.)

개인적으로 사용하는 앱이나 이윤을 추구하지 않는 간단한 수준의 앱을 테스트할 때 사용하는 게 좋다.<br />
당연히 엔터프라이즈 급의 앱을 만든다면 파이어베이스는 사용하지 않는다.<br />

<br />

### MyDiary Project

#### 상태관리

- useContext API 및 useReducer
  > `useAuthContext` hook.

#### `.env`(react-scripts Depndencies)

```
REACT_APP_API_KEY="..."
REACT_APP_AUTH_DOMAIN="..."
REACT_APP_PROJECT_ID="..."
REACT_APP_STORAGE_BUCKET="..."
REACT_APP_MESSAGING_SENDER_ID="..."
REACT_APP_APP_ID="..."
```

> .gitignore에 `.env` 추가.

<br />

#### `firebase/auth`

- [`getAuth() - 인증 SDK 추가 및 초기화`](https://firebase.google.com/docs/auth/web/start?hl=ko&authuser=0#add-initialize-sdk)
- [`createUserWithEmailAndPassword() - 신규 사용자 가입`](https://firebase.google.com/docs/auth/web/start?hl=ko&authuser=0#sign_up_new_users)
- [`updateProfile() - 사용자 프로필 업데이트`](https://firebase.google.com/docs/auth/web/manage-users?hl=ko&authuser=0#update_a_users_profile)

> `src/pages/Signup`, `useSignup` hook. 사용

- [`signOut`](https://firebase.google.com/docs/auth/web/password-auth?hl=ko&authuser=0#next_steps)
