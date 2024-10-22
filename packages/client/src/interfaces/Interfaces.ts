export interface Entry {
  id: number;
  word: string;
  wordType: string;
  definition: string;
}

export interface SnackProps {
  open: boolean;
  message: string;
}

export interface AppContainerProps {
  window?: () => Window;
  children?: React.ReactNode;
}

export interface SearchBarProps {
  word: string;
  setWord: React.Dispatch<React.SetStateAction<string>>;
  handleClick: () => void;
  isCircularOpen: boolean;
}

export interface SearchCardProps {
  entries: Entry[];
  closeCard: () => void;
}

export interface Count {
  word: Entry;
  count: number;
}

export interface SnackProps {
  open: boolean;
  message: string;
}

export interface TopSearchesProps {
  setSnackProps: React.Dispatch<React.SetStateAction<SnackProps>>;
}
