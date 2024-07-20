// import { PhotosModule } from './../../../remote/src/app/photos backu/photos.module';
// import { PhotosComponent } from './../../../remote/src/app/photos copy/photos.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const REMOTE_APP_URL = 'http://localhost:4300/remoteEntry.js';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: 'photos',
    loadChildren: () => {
      return loadRemoteModule({
        remoteEntry: REMOTE_APP_URL,

        exposedModule: './PhotosModule',
        type: 'module',
      })
        .then((m) => {
          console.log(m, 'inside');
          return m.PhotosModule;
        })
        .catch((err) => {
          console.log("i'm error");
          console.log(err);
        });
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
