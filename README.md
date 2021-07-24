# Node.js_ChattingProject
Node.js_ChattingProject

http://socialchattingservice.herokuapp.com/

# :love_letter: Social Chatting Service (소셜 채팅 서비스) 
Node.js, Express로 구현한 소셜 채팅 서비스

### 개발 환경
___
- **Operating System** : Window OS
- **Server** : Node.js
- **Database** : MySQL
- **Development Tool** : Visual Studio Code, npm(Node Package Manager)
- **Development Language** : Node.js, JavaScript, jQuery, HTML5, CSS3, SQL, EJS
- **Framework** : Express, Bootstrap
- **Technologies used** : Socket.io, jQuery, Ajax


### 구현 기능
___
- **회원** : 회원가입, 로그인, 로그아웃, 팔로잉

- **실시간 채팅** : 오픈 채팅방(멀티 채팅), 회원 간 1대1 실시간 채팅(채팅 내용 DB 저장)


### DB 설계
___
![Social_Chatting_Service ERD](https://user-images.githubusercontent.com/64412357/105644067-f1f04600-5ed6-11eb-8bc5-654a9401bb14.png)
<br>
<a href="https://www.erdcloud.com/d/mtznbdvCjCma6vHiq" target="_blank">Social Chatting Service ERD</a>


 - **팔로잉 테이블** : User 테이블의 Primary Key인 UserId를 'Follow_From', 'Follow_To' 컬럼에 외래키로 사용하였고, 중복을 방지하기 위해 'Follow_From', 'Follow_To' 두 컬럼을 복합키로 설정하였다. 'STATUS' 컬럼을 이용하여 팔로잉 요청 승인, 대기를 구분하였다.
 - **메세지 테이블** : 채팅방 테이블을 따로 만들지 않고, 'Message_Sender'와 'Message_Receiver'를 두어 1대1 채팅 메세지를 저장하였다. 채팅방 목록을 사용하지 않을 것이기 때문에 채팅방 테이블은 DB로 생성하지 않고, 'Message_Sender'와 'Message_Receiver'의 아이디 조합으로 유일한 문자열을 생성하여 채팅방 ID를 생성하였다. 후에 채팅방 목록 기능을 구현하기 위해서는 채팅방 테이블과 채팅방 관리 테이블을 생성해야 한다.

## 페이지

 ### 로그인

![Social_Chatting_Service Login_Page](https://user-images.githubusercontent.com/64412357/105644410-c66e5b00-5ed8-11eb-9084-6be8332e493a.png)
 
- 로그인, 회원가입.

<br>

 ### 회원가입
 
![Social_Chatting_Service SignUp_Page](https://user-images.githubusercontent.com/64412357/105644460-046b7f00-5ed9-11eb-999f-c78af210bf9e.png)

1. 아이디 중복체크, 비밀번호 유효성 검증

<br>

 ### 메인 페이지

![Social_Chatting_Service Main_Page](https://user-images.githubusercontent.com/64412357/105644503-4268a300-5ed9-11eb-8fd2-44433f94e391.png)

- 메인 페이지

<br>

### 오픈 채팅방 목록

![Social_Chatting_Service OpenChattingRoomList_Page](https://user-images.githubusercontent.com/64412357/105644835-1bab6c00-5edb-11eb-8207-45b7b9b17dc8.png)

- 채팅방 목록, 참여 인원 수, 방 번호, 입장 버튼
- 실시간으로 참여인원 수 갱신

<br>

### 오픈 채팅방

![Social_Chatting_Service OpenChatting_Page](https://user-images.githubusercontent.com/64412357/105644833-1a7a3f00-5edb-11eb-8497-1b62d3c79531.png)

- 방 번호, 현재 인원 수, 현재 인원 목록
- 입퇴장 시 채팅방에 메세지, 현재 인원 수 및 목록 갱신

<br>

### 친구 목록

![Social_Chatting_Service FriendsList_Page](https://user-images.githubusercontent.com/64412357/105644874-7b097c00-5edb-11eb-8cfc-2a8fdb1f57d0.png)

- 친구 삭제, DM(Direct Message) 버튼

<br>

### 친구 신청 목록 ###

![Social_Chatting_Service FollowRequestList_Page](https://user-images.githubusercontent.com/64412357/105644876-7d6bd600-5edb-11eb-92c7-e98d7d517e99.png)

- 수락 시 친구관계 맺음
- 거절 시 요청 삭제

<br>

### 전체 회원 목록 ###

![Social_Chatting_Service AllUsersList_Page](https://user-images.githubusercontent.com/64412357/105644877-7e046c80-5edb-11eb-8360-1225d0acac2f.png)

- ID, 가입날짜, 친구수, 친구요청 표시
- 이미 친구인 경우 버튼 X, 요청 전 친구요청, 요청 후 요청대기 버튼

<br>

### DM(Direct Message)

![Social_Chatting_Service DirectMessage_Page](https://user-images.githubusercontent.com/64412357/105644878-7e046c80-5edb-11eb-9456-0bac2e986564.png)

- 1대1 실시간 채팅 및 메세지 DB 저장

<br>
