"use client";

import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../../lib/features/counter/counter_slice";
import { RootState } from "../../../lib/store";

export default function Counter() {
  const dispatch = useDispatch();
  const countState = useSelector((state: RootState) => state.counter.value);
  return (
    <div>
      <h2>{countState}</h2>
      <button onClick={() => dispatch(increment(1))}>Increase</button>
    </div>
  );
}
