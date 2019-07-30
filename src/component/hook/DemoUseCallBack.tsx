import * as React from 'react';
import update from 'immutability-helper';
import { useCallback, useEffect, useMemo } from 'react';

// 如果使用函数作为依赖需要将函数使用useCallback包裹一层  。
function ProductPage({ productId, time }) {
  const fetchProduct = useCallback(() => {
    console.log(`产品id:${productId}`);
  }, [productId]);

  // const fetchProduct = () => {
  //   console.log(`产品id:${productId}`);
  // };
  console.log('render ProductPage');
  useEffect(() => {
    //console.log('useEffect');
    fetchProduct();
  }, [fetchProduct]);

  return <div>文章详情{productId}</div>;
}

export default function Demo() {
  const [produceId, setProduceId] = React.useState('100');
  const [inputValue, setInputValue] = React.useState('');
  const [time, setTime] = React.useState();
  return (
    <>
      <ProductPage productId={produceId} time={time} />
      <div>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={() => {
            // setProduceId(inputValue);
            // setTime(new Date().getTime());
            list.push('123');
          }}
        >
          改变produceId
        </button>
      </div>
    </>
  );
}
