## 그냥 참고용
react 학생 성적 보기 뷰.<br>
React + TypeScript + Vite 이다.<br>

## 백엔드
https://github.com/parkkiung123/spring_boot_rest_example

## 기능
학생/선생님 로그인이 구분되어 있다.<br>
선생님으로 로그인 하면 모든 학생 성적을 볼 수 있다.<br>
학생으로 로그인 하면 자기 성적만 볼 수 있다.<br>
UI는 material-ui<br>

## 실행
npm install<br>
npm run dev<br>
npm run build<br>
npm run preview<br>

## 프로젝트 생성 커맨드
npm create vite@latest my-react-ts-app --template react-ts

## React Hook
다음과 같은 훅이 있다고 한다.
### useState
### useEffect
useEffect(() => { ... }, []): 처음 1번만 실행 (마운트 시)<br>
useEffect(() => { ... }, [값]): 값이 바뀔 때 실행<br>
useEffect(() => { return () => { ... } }): 컴포넌트가 사라질 때 실행 (정리 작업)<br>
함수형 라이프사이클<br>
```javascript
import { useEffect, useState } from "react";

function MyComponent() {
  const [count, setCount] = useState(0);

  // 컴포넌트 마운트 시 실행 (componentDidMount)
  useEffect(() => {
    console.log("마운트됨");

    // 언마운트 시 실행 (componentWillUnmount)
    return () => {
      console.log("언마운트됨");
    };
  }, []);

  // 상태가 변경될 때마다 실행 (componentDidUpdate)
  useEffect(() => {
    console.log("count 변경됨: ", count);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```
### useContext
useContext(Context) → Context에 저장된 값을 꺼낼 수 있음<br>
props 없이 전역 데이터 공유<br>
### useRef
useRef() → 값을 저장하거나 DOM에 접근할 수 있는 객체 생성<br>
.current로 실제 값에 접근<br>
값이 바뀌어도 렌더링이 발생하지 않음<br>
렌더링 사이 값을 유지하거나 DOM 제어할 때 사용<br>
#### useReducer
useReducer(reducer, initialState) → 상태(state)와 액션 디스패처(dispatch) 반환<br>
dispatch({ type: "..." })로 상태 변경 요청<br>
상태 로직이 복잡하거나 다양한 액션으로 상태를 변경해야 할 때 유용<br>
작은 앱에선 useState, 복잡하면 useReducer<br>
#### useCallback
useCallback(fn, [deps]) → deps가 바뀔 때만 fn을 새로 생성<br>
함수가 매 렌더링마다 새로 만들어지는 걸 방지<br>
주로 React.memo와 함께 성능 최적화에 사용<br>
렌더링 비용이 큰 컴포넌트나 자식 컴포넌트에 함수 props 전달할 때 유용<br>
#### useMemo
useMemo(() => 계산식, [deps])<br>
→ deps가 바뀔 때만 계산식 실행, 그 외엔 기존 값을 재사용<br>
렌더링마다 계산되는 무거운 작업을 최적화<br>
useCallback은 함수 메모이제이션, useMemo는 값 메모이제이션<br>

