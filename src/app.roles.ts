import { RolesBuilder } from 'nest-access-control';
// Tipos de Usuários que temos em nosso app
export enum AppRoles {
  AUTHOR = 'AUTHOR',
  ADMIN = 'ADMIN',
}

// Módulos que serão protegido em nosso app.
export enum AppResource {
  USER = 'USER',
  POST = 'POST',
}
export const roles: RolesBuilder = new RolesBuilder();

roles
  // Author Roles
  .grant(AppRoles.AUTHOR)
  .updateOwn([AppResource.USER])
  .deleteOwn([AppResource.USER])
  .createOwn([AppResource.POST])
  .updateOwn([AppResource.POST])
  .deleteOwn([AppResource.POST])

  // Admin Roles
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.AUTHOR)
  .createAny([AppResource.USER])
  .updateAny([AppResource.POST, AppResource.USER])
  .deleteAny([AppResource.POST, AppResource.USER]);
