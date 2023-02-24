# 🐶 TOGETDOG : 강아지 산책 SNS

![togetdog.png](https://user-images.githubusercontent.com/55757379/221074030-2b50d5e1-3078-46aa-8baa-cf39e8d0394c.png)

### **_지금 TOGETDOG으로 👉🏻 https://togetdog.site_**

---

### **💚 프로젝트 진행기간**

<p> 2023/1/9 - 2023/1/17 </p>
<p> SSAFY 8기 공통 프로젝트 </p>

---

### **💛 TOGETDOG?**

하나 뿐인 내 강아지에게 동네 친구를 만들어주세요!

반려동물 1500만 시대, 주변의 강아지 친구들도 늘어나고 있습니다. 강아지들에게 필수인 산책 다들 어떻게 하고 계신가요?

우리 TOGETDOG에서는 내 강아지에게 맞춤인 산책 친구들을 찾아볼 수 있습니다. 몸무게, 중성화 여부 등 안전을 고려한 추천을 사용해보세요. 위치 정보를 기반으로 제공되는 산책 친구 추천을 통해 지금 내 소중한 강아지에게 친구를 만들어주세요.

강아지와의 소중한 순간을 남길 수 있는 SNS 기능도 제공하고 있습니다!

---

### **💚 주요 기능을 소개합니다!**

1️⃣ **산책 친구를 찾고 산책 약속 잡기**

> 우리 강아지에게 딱 맞는 산책 친구 찾고 싶지 않으셨나요?
>
> 내가 등록한 강아지의 등록정보를 기반으로 강아지의 몸무게, 성별, 중성화 여부 등을 고려하여 같은 동네의 산책 친구들을 추천해드립니다.
>
> 만약, 만나고 싶은 친구가 생겼다면 산책 약속 생성하기를 통해 산책 약속을 신청해보세요.
>
> 상대방이 산책 약속을 수락한다면, 신청한 날짜와 시간에 산책을 다녀오시면 됩니다.
>
> 더 편의성있는 산책 친구 추천 시스템을 위하여 산책이 완료되면 서로 평점을 남길 수 있습니다.

2️⃣ **내 강아지의 다이어리 꾸미고 소통하기**

> 소중한 내 강아지와의 시간, 기록하고 싶지 않으신가요?
>
> TOGETDOG에서는 계정 당 최대 3마리까지의 SNS 기능을 제공하고 있습니다.
>
> 강아지 프로필을 등록하면 해당 강아지의 피드가 생성됩니다. 강아지를 스왑하는 기능을 통해 강아지마다 원하는 사진을 골라 올릴 수 있습니다.
>
> 또한 게시물을 등록하면 좋아요, 댓글 기능 등을 제공하고 있으니, 주변 이웃과의 활발한 소통을 해보시길 추천드립니다!

3️⃣ **내가 원하는 친구들을 팔로우하고 소식받기**

> 우리 강아지에게 친구가 생겼다면, 친구의 소식을 받아 보아요!
>
> 팔로우 기능을 통해 원하는 친구들의 소식을 모아 볼 수 있어요.
>
> TOGETDOG의 홈에서는 내가 팔로우하는 강아지 친구들의 사진을 모아서 제공해드리고 있습니다.

---

### **💛 또 어떤 기능이 있나요?**

1️⃣ **지금 위치에서 갈 수 있는 애완동물 시설 확인하기!**

> 우리 서비스를 이용하는 지금, 가까운 애완 동물 시설을 확인하고 싶으시다면 위치기반 애완동물 시설 제공 서비스를 이용해보세요.

2️⃣ **강아지 및 주인닉네임으로 검색 기능**

> 기억하고 있는 그 강아지, 나와 같이 이 서비스를 이용하고 있을까요? 검색 기능을 통해 찾아보세요!

3️⃣ **소셜 로그인 기능으로 더 편하게!**

> 번거로운 회원가입 과정을 단축해주는 소셜 로그인 기능으로 더 편하게 서비스를 이용해보세요!

---

### **💚 기술 스택 및 Version 📚**

> **Backend** <br>
> development tool : sts 3.9.14.release <br>
> spring boot : 2.7.7 <br>
> gradle : 7.6 <br>
> jdk : zulu-8 <br>
> my sql : 8.0.31 <br>
> swagger : 3.0.0 <br>
> lombok <br>
> Spring Data JPA <br>
> Spring Security <br>
> Spring Web <br>
> Web Socket <br>

> **Frontend** <br>
> development tool : Visual Studio Code <br>
> npm : 8.19.2 <br>
> node.js : 18.12.1 <br>
> React 17.0.2 <br>
> react-router : v6. <br>
> recoil : 0.7.6 <br>
> emotion : v11. <br>
> Viewport Size: 360px x 800px (Galaxy S21 기준) <br>

> **CI/CD** <br>
> AWS EC2 <br>
> Jenkins <br>
> NGINX <br>
> Docker <br>

> **그 외 협업툴 📕** <br>
> Git, source tree - 브랜치 전략을 통해 기능 분리<br>
> Notion - 전체적인 회의 관할 및 모든 메모<br>
> JIRA - 주단위 목표량 설정 및 할일 배분 <br>
> Slack - 빌드 소식 확인용 <br>

---

### **💛 프로젝트 구조도 📚**

#### B.E

```
togetdog
  ├── global
  │   ├── advice
  │   ├── config
  │   ├── exception
  │   ├── interceptor
  │   ├── util
  ├── domain
  │   ├── controller
  │   ├── model
  │   │   ├── dto
  │   │   ├── vo
  │   │   ├── entity
  │   │   ├── repository
  └──	└── └── service
```

#### F.E

```
togetdog
  ├── node_modules
  ├── public
  │   └── index
  ├── src
  │   ├── assets
  │   ├── components
  │   ├── pages
  │   ├── recoil
  │   ├── styles
  │   ├── model
  │   ├── App
  │   ├── index
  │   └── config
  ├── package
  ├── package.lock
  └── yarn.lock
```

---

### **💚 팀원 구성 및 소개**

- **B.E**
  | 팀원 | 역할 | 이메일 |
  | --------- | -------------------------------------------- | ----------------------------- |
  | 권성은 👑 | 팀장, CI/CD, API 설계 및 관리 | sungeun.kweon@gmail.com |
  | 곽민주 | 협업 툴 및 문서 관리, 외부 API 관리, DB 설계 | kacamimi@naver.com |
  | 윤상빈 | API 설계 및 관리, UCC 담당 | mailto:ssafybin0308@gmail.com |
- **F.E**
  | 팀원 | 역할 | 이메일 |
  | ------ | -------------------------------------------------- | ------------------------------------------ |
  | 성다연 | F.E 팀장, 기획 및 디자인, 와이어프레임 및 API 설계 | dysung32@gmail.com, sdy32@naver.com (etc…) |
  | 박정호 | 협업 툴 및 문서 관리, 와이어프레임 및 API 설계 | juggorrvol.2@gmail.com |
  | 성예빈 | 기획 및 디자인, 와이어프레임 및 API 설계, UCC 담당 | ebing.code@gmail.com |

---

### **💛 프로젝트 산출물**

> [**기능명세서**](https://regal-beach-e41.notion.site/c40879febfaf42ed9956653e8435129f?v=ad2508761ce4498f90113f2ce236b7b7) <br> > [**와이어프레임 및 시퀀스**](https://www.figma.com/file/bM2moocb7C1pZ1oNKSAYhi/%EA%B3%B5%ED%86%B5-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?node-id=0%3A1) <br> > [**API 설계 문서**](https://regal-beach-e41.notion.site/API-3572f7ae0b5f45ebb0a92c790e7e026b) <br> > [**SWAGGER**](http://i8a807.p.ssafy.io:8080/swagger-ui/index.html) <br> > [**ERD**](https://www.erdcloud.com/d/3HCYpC8Zzsv7PCsQL) <br> > [**회의록**](https://regal-beach-e41.notion.site/dfe23419903d42a1b277b34039b0df26?v=7ec50ead467f4823b464f2e82d8314aa)

---

### **💚 프로젝트 시연화면**

#### Home 화면

![home](https://user-images.githubusercontent.com/55757379/221075479-8e56ff04-8a24-4079-8d24-22e2a4962a45.png)

#### 알림 창

![notify](https://user-images.githubusercontent.com/55757379/221075685-76feabf9-ab5a-4559-9b23-d03a7ad5e66a.gif)

#### 사람 및 강아지 검색

![검색](https://user-images.githubusercontent.com/55757379/221075804-fb538f34-75cf-4f6b-b24f-f79f0a943205.gif)

#### 주변시설 검색

![지도](https://user-images.githubusercontent.com/55757379/221075916-728ef1e0-7181-4e2d-9347-e0ed268bcc45.gif)

### SNS 서비스

![SNS](https://user-images.githubusercontent.com/55757379/221076089-8e972811-da10-4fc8-9c92-060f3b5ca565.gif)

#### 산책 친구 찾기

![산책](https://user-images.githubusercontent.com/55757379/221076254-ec88b615-6538-478a-8e29-667c6c78b581.gif)

#### 자세한 약속은 DM을 통해 조율하세요!

![DM 목록](https://user-images.githubusercontent.com/55757379/221076542-153f4f33-e0ae-41b6-9ddb-df6273aee2b7.gif)
![DM 산책 신청](https://user-images.githubusercontent.com/55757379/221076674-e9be755e-7442-470c-8ca6-f275f4e016a9.gif)
