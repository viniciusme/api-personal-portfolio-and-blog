import { PostCategory } from '../enums';

export class CreatePostDto {
  'title': string;
  'content': string;
  'slug': string;
  'excerpt': string;
  'category': PostCategory;
  'tags': string[];
  'status': boolean;
}
