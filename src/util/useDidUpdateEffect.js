import { useEffect, useRef } from 'react';

const useDidUpdateEffect = (func, dependencies) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, dependencies);
}

export default useDidUpdateEffect;