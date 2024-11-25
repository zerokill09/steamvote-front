export interface CatalogData {
    appId: number;
    name: string;
    thumbnail: string;
    liked: number;
    disliked: number;
    isLiked: boolean;
}

export class SearchParam {
    page?: number;
    size?: number;
  
    constructor() {
      this.page = 1;
      this.size = 16;
    }
  }