import Papa, { ParseResult } from 'papaparse';

export const getCSV = async (file: string) => {
  try {
    console.log('before');
    const result = await Papa.parse(file, {
      header: true,
      dynamicTyping: true,
    });
    return result;
  } catch (e) {
    console.log(e);
  }
};
