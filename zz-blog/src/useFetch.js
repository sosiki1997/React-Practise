import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    /**
     * 第一步：返回一个响应对象，use json method on that
     *    fetch返回一个promise，res是一个response object, 并不是data, 为了获取数据，用.then方法
     *    res.json() pass the json into a javaScript object, return 回来的也是一个promise, 因为这也是异步的
     * 第二步：再用一个.then方法获取数据
     */
    // setTimeout(() => {

    // }, 1000);
    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        // Takeing the array of objects, updating the blog state with that array
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortCont.abort();

    // url变化时，就会重新调用这个函数来获取数据
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
