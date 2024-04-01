import short from 'short-uuid';

export const useUUID = () => {
  const alphaNum = short("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

  const getShortUUID = () => alphaNum.generate().slice(0, 10);

  return {
    getShortUUID
  }

}

export default useUUID;