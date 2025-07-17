export type MediaItemProps = {
  id: number;
  name: string;
  size: number;
  url: string;
  is_used: boolean;
};

export type FolderProps = {
  id: number;
  name: string;
  parent_id?: number;
  children?: FolderProps[];
  media_files?: MediaItemProps[];
};
