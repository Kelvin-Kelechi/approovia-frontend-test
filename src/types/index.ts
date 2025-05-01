export interface Project {
  id: string;
  name: string;
}

export interface Folder {
  id: string;
  name: string;
  projects: Project[];
}

