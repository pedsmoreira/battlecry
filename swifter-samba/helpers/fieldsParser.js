// @flow

export default function fieldsParser(fieldsArg: string) {
  return fieldsArg.split(' ').map(fieldArg => {
    const fieldSplit = fieldArg.split(':');
    return { name: fieldSplit[0], type: fieldSplit[1] };
  });
}
