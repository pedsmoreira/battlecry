// @flow

export default function namespaced(path: string, namespace: ?string) {
  const namespaceStr = namespace ? `/namespaces/${namespace}` : '';
  return `src/app${namespaceStr}/${path}`;
}
