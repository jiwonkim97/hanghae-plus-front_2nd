import { useMemo } from "react"

export function useMyRef<T>(initValue: T | null) {
  const ret = useMemo(() => ({current: initValue}), [initValue])
  return ret
}
