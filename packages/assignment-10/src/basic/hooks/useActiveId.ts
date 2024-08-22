import { UniqueIdentifier, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";

const useActiveId = () => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  useDndMonitor({
    onDragStart: ({ active }) => {
      setActiveId(active.id);  // 드래그 시작 시 active ID 저장
    },
    onDragEnd: () => {
      setActiveId(null);  // 드래그 종료 시 ID 초기화
    },
  });
  
  return activeId
}

export default useActiveId