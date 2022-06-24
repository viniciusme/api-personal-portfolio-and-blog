export class CreatePostDto {
  'title': string;
  'content': string;
  'slug': string;
  'excerpt': string;
  'category': string;
  'tags': string[];
  'status': boolean;
}
