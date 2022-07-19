export interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const countItemsInApi = async (stepSize = 100) => {
  const emptyResponseIndex = await findEmptyResponse(stepSize);
  const previousHitIndex = emptyResponseIndex - stepSize;
  const lastIndex = await findLastIndex(previousHitIndex, emptyResponseIndex);
  return lastIndex;
};

const findEmptyResponse = async (
  stepSize = 100,
  startValue = 0
): Promise<number> => {
  const newIndex = startValue + stepSize;
  const data = await getDataFromApi(newIndex, 1);
  if (data.length === 0) {
    return newIndex;
  } else {
    return findEmptyResponse(stepSize, newIndex);
  }
};

const findLastIndex = async (start: number, end: number): Promise<number> => {
  const middle = Math.ceil(start + (end - start) / 2);
  const data = await getDataFromApi(middle, 1);
  if (start > end) {
    return start;
  }
  if (data.length === 0) {
    return findLastIndex(start, middle - 1);
  } else {
    return findLastIndex(middle + 1, end);
  }
};

export const getDataFromApi = async (offset: number, count: number) => {
  const requestUrl = `https://naszsklep-api.vercel.app/api/products?offset=${offset.toString()}&take=${count}`;

  const res = await fetch(requestUrl);
  const data: StoreApiResponse[] | null = await res.json();

  return data ? data : [];
};
