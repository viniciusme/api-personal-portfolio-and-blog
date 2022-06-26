import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({
    message: 'Nome não pode ser vazio',
  })
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty({
    message: 'Sobrenome não pode ser vazio',
  })
  @MaxLength(255)
  lastName: string;

  @IsEmail({
    message: 'Email precisa ser válido',
  })
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'Password não pode ser vazio',
  })
  @MinLength(8, {
    message: 'Password deve ser maior ou igual a 8 caracteres',
  })
  @MaxLength(128, {
    message: 'Password deve ser menor ou igual a 128 caracteres',
  })
  password: string;
}
