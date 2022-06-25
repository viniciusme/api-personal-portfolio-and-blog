import { EnumToString } from './../../helpers/enumToString';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { PostCategory } from '../enums';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  'title': string; // É o título do Post

  @IsString()
  @IsNotEmpty()
  'content': string; // É Conteúdo do Post

  @IsString()
  @IsNotEmpty()
  'slug': string; // É o texto que aparece logo após o seu domínio como parte do link permanente que leva ate o conteúdo.

  @IsString()
  @IsNotEmpty()
  'excerpt': string; // É utilizado para fazer a descrição do conteúdo do Post

  @IsEnum(PostCategory, {
    message: `Opção inválida. As opções válidas são '${EnumToString(
      PostCategory,
    )}'`,
  })
  'category': PostCategory; // É utilizado para criar diferentes áreas de um Blog ou conteúdo, organizando assuntos em suas devidas categorias

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  'tags': string[]; // As tags servem para ajudar e complementar na organização das categorias do seu conteúdo, seria a classificação dos detalhes.

  @IsBoolean()
  @IsNotEmpty()
  'status': boolean;
}
