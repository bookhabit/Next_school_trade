import { useEffect, useState } from "react";

interface useIntersectionObserverProps {
	root?: null;
	rootMargin?: string;
	threshold?: number;
	onIntersect: IntersectionObserverCallback;
}

const useIntersectionObserver = ({
	root,
	rootMargin = "0px",
	threshold = 0,
	onIntersect,
}: useIntersectionObserverProps) => {// 옵션을 props로 받는다. 
	const [target, setTarget] = useState<HTMLElement | null | undefined>(null);//html 요소를 target으로 지정할 수 있게 타입을 지정해주었다. 

	useEffect(() => {
		if (!target) return; // target이 없다면 리턴해준다. 

		const observer: IntersectionObserver = new IntersectionObserver(onIntersect, { root, rootMargin, threshold }); 
    // props로 받은 옵션을 넣어주어 intersevtionObserver객체를 만들어준다. 
		observer.observe(target); // target을 observe함수를 통해 발견해준다. 그러면 callback함수 onIntersect를 실행하게 된다. 

		return () => observer.unobserve(target); // 다시 unobserve상태로 만들어준다. 
	}, [onIntersect, root, rootMargin, target, threshold]);// useEffect의 의존성 배열로 모든 옵션 변수들을 지정해주었다. 

  // setTarget함수를 return 하여 훅의 매개변수로 target을 지정할 수 있게 한다. 
	return { setTarget }; 
};

export default useIntersectionObserver;