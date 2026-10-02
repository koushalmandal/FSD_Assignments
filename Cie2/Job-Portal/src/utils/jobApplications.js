export const applicationsStorageKey = 'jobhook:applications'

export function getAppliedJobIds(storage = globalThis.localStorage) {
  try {
    const storedIds = JSON.parse(storage?.getItem(applicationsStorageKey) || '[]')
    return Array.isArray(storedIds) ? storedIds : []
  } catch {
    return []
  }
}

export function saveAppliedJobId(jobId, storage = globalThis.localStorage) {
  const appliedIds = getAppliedJobIds(storage)
  if (appliedIds.includes(jobId)) return appliedIds

  const updatedIds = [...appliedIds, jobId]
  storage.setItem(applicationsStorageKey, JSON.stringify(updatedIds))
  return updatedIds
}