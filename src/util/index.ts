
export var getAData = ({ data: { code, data, msg } }: {
  data: { code: number, data: any, msg: string }
}) => {
  if (code === 0) {
    return data
  }
  throw msg;
};