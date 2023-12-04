export interface TeamI {
  _id?: string;
  name: string;
  championships: ChampI[];
  flag?: File;
  ranking: number;
}

export interface ChampI {
  tournament: string;
  position: number;
  year: number;
}
