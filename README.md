# Let's Trip FrontEnd

10/08

## 프로젝트 개요

여행 후기 커뮤니티 프로젝트
TypeScript, Create-React-Native-App, TailWindCSS

## 스크린 명세

### 하단 메뉴바(Bottom-Tap Navigator)

`Home` <-> `Board` <-> `Top10` <-> `Search` <-> `Login/MyPage`

### 앱 화면(Stack Navigator)

`Home`  
 ᄂ추천수 높고 사진 있는 게시글 대문 사진 슬라이더 3개정도(`PostDetail`), 최근 작성 된 글(`PostDetail`)

`Board` 게시판 목록  
 ᄂ`Posts` 게시글 목록  
 &nbsp;&nbsp;ᄂ`Write Post` 게시글 작성  
 &nbsp;&nbsp;ᄂ`PostDetail` 게시글 내용  
 &nbsp;&nbsp;&nbsp;&nbsp;ᄂ`EditPost` 게시글 수정  
 &nbsp;&nbsp;&nbsp;&nbsp;ᄂ`Comment` 댓글  
 ᄂ`Create Board(UserOnly)` 게시판 등록  
 ᄂ`Edit Board(UserOnly)` 게시판 수정

`Top10`  
ᄂ추천수 높은 게시글 10개

`Search`  
ᄂ검색창 => `Posts` 검색결과 리스트

`Login(Visitor)/MyPage(User)`  
비회원  
&nbsp;&nbsp;ᄂ`Login` 로그인  
 &nbsp;&nbsp;&nbsp;&nbsp;ᄂ`Join` 회원가입  
 &nbsp;&nbsp;&nbsp;&nbsp;ᄂ`Find` 비밀번호 찾기
회원
&nbsp;&nbsp;ᄂ`MyPage` 내가 작성한 글, 좋아요 누른 글
&nbsp;&nbsp;&nbsp;&nbsp;ᄂ`EditProfile` 회원정보 수정
