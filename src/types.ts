export type Decision = {
  title: string;
  options: string[];
  pros: {
    [key: string]: {
      text: string;
      weight: number;
    }[];
  };
  cons: {
    [key: string]: {
      text: string;
      weight: number;
    }[];
  };
  weights: {
    [key: string]: number;
  };
};