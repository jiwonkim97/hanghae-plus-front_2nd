import { useCallback, useState } from "react";
import { BarkButton, MeowButton } from "./UseCallbackTest.components.tsx";

export default function UseCallbackTest() {
  const [meowCount, setMeowCount] = useState(0);
  const [barkedCount, setBarkedCount] = useState(0);

  const Meow = useCallback(() => {
    return <p data-testid="cat">meowCount {meowCount}</p>
  }, [meowCount])
  
  const Bark = useCallback(() => {
    return <p data-testid="dog">barkedCount {barkedCount}</p>
  }, [barkedCount])

  return (
    <div>
      <Meow />
      <Bark />
      <MeowButton onClick={() => setMeowCount(n => n + 1)}/>
      <BarkButton onClick={() => setBarkedCount(n => n + 1)}/>
    </div>
  );
}
