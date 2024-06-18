import { memo, useCallback, useState } from "react";
import { BarkButton, MeowButton } from "./UseCallbackTest.components.tsx";

export default function UseCallbackTest() {
  const [meowCount, setMeowCount] = useState(0);
  const [barkedCount, setBarkedCount] = useState(0);

  const handleMeow = useCallback(() => {
    setMeowCount(n => n + 1)
  }, [])

  const handleBark = useCallback(() => {
    setBarkedCount(n => n + 1)
  }, [])

  return (
    <div>
      <Meow meowCount={meowCount}/>
      <Bark barkedCount={barkedCount}/>
      <MeowButton onClick={handleMeow}/>
      <BarkButton onClick={handleBark}/>
    </div>
  );
}

const Meow = memo(({meowCount}:{meowCount: number}) => <p data-testid="cat">meowCount {meowCount}</p>)
const Bark = memo(({barkedCount}:{barkedCount: number}) => <p data-testid="dog">barkedCount {barkedCount}</p>)