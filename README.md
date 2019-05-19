# TODOLIST
## Overview
* node.js
* mongodb(mongoatlas)
* heroku(배포)
* [현재 배포 중](https://rocky-depths-59329.herokuapp.com/)
</br>
</br>

## 설치 및 빌드 방법
mongoURL, PORT 번호, cookie secret을 감추기 위해 .env 파일에다가 해당 변수들을 선언해두고 현재 git에 포함하지않았습니다.
~~~ 
npm isntall dotenv 
~~~ 
를 통해 설치하고 프로젝트의 최상단폴더에 .env로 선언해야합니다. 이는 process.env.변수를 찾을 수 있게 해줍니다.
</br>
babel을 사용했는데 버전 문제로 인한 오류가 자주 발생하여서 https://github.com/babel/babel-upgrade 를 통해 babel을 업그레이드 한 것을 
package.json에 확실하게 지정합니다.
</br>
package.json의 scripts 부분을 보시면 prebuild에 rm -rf build가 있습니다. 이는 처음 npm run start시에 에러를 유발합니다. build 파일은
~~~
npm run build:server
~~~ 
시에 생성됩니다. 이렇게 스크립트를 구성한 것은 재실행을 편하게 하기 위함으로 처음 build 파일이 존재하지 않는다면 따로 스크립트를 실행해야 합니다.
~~~
npm run build:server
npm run start
~~~
순으로 실행하시면 중복하는 과정은 생기지만 오류는 발생하지않습니다.

## description
![image](https://user-images.githubusercontent.com/32104982/57986039-bd45ad80-7aaa-11e9-8083-da409240a5d9.png)
**Main**
</br>
![image](https://user-images.githubusercontent.com/32104982/57986056-e108f380-7aaa-11e9-85e5-ea082857a016.png)
**Show List**
</br>
![image](https://user-images.githubusercontent.com/32104982/57986066-f8e07780-7aaa-11e9-85c0-6d7e250f0d3e.png)
**TODOLIST 상세**
</br>
![image](https://user-images.githubusercontent.com/32104982/57986078-11e92880-7aab-11e9-802c-8e898fdad138.png)
**NEW LIST**

![image](https://user-images.githubusercontent.com/32104982/57985688-a00ee000-7aa6-11e9-8855-3f64394d4051.png)</br>
TODOLIST들을 보여줍니다. 
숫자 중 위는 현재 LIST에 존재하는 TASK들을 나타낸 것이고 아래 경고 표시는 마감기간내에 완료하지 못한 TASK들을 나타냅니다.
</br></br>

![image](https://user-images.githubusercontent.com/32104982/57985722-13b0ed00-7aa7-11e9-9be0-4926bf488bd8.png)</br>
우측 상단의 NEW LIST를 통해 새로운 리스트를 생성하면 이와 같은 화면이 나옵니다.
현재는 TASK들을 생성해놓은 상태로, 처음에는 아무런 TASK가 존재하지 않습니다.
각 TODO에 대해 우선순위, 시작 날짜, 마감 날짜, 현재 상태를 합니다.
TODO 항목들의 가장 우측에 있는 버튼들은 상태, 수정, 삭제 순으로 배치되어있습니다.
상태 버튼은 클릭할 때 마다 현재 작업이 착수하지않음, 착수중, 완료로 변경되며 완료된 작업은 현재 TODOLIST의 가장 위쪽으로 배치됩니다.
수정 버튼을 누르면 입력 폼이 팝업되며 현재의 TODO를 변경할 수 있게 됩니다.

* Alert tasks timeout: 현재 마감기간이 지났지만 완료하지 못한 작업들을 표시합니다.
* Add Task: 새로운 TODO를 작성합니다
* Delete Completed Tasks: 완료된 TODO 들을 현재 TODOLIST에서 제거합니다.
* Title 옆의 쓰레기통 아이콘: 현재 TODOLIST를 삭제합니다.
</br>

![form](https://user-images.githubusercontent.com/32104982/57985669-650cac80-7aa6-11e9-97d6-f647027bde2d.png)
</br>
Add Task 또는 수정 버튼을 클릭 하였을 때 나오는 입력 폼입니다.
제목, 내용, 상태, 우선순위, 시작날짜, 마감날짜를 입력할 수 있고 달력 아이콘을 누르면 마감기간을 사용할 지 안할 지 선택이 가능합니다.



