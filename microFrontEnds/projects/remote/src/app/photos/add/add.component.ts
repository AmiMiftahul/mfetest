import { Component } from '@angular/core';
import { Photo } from '../../models/photos';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent {
  newPhoto: Photo = {
    albumId: 1,
    id: 1,
    title: '',
    url: '',
    thumbnailUrl: '',
  };

  savePhoto() {
    console.log('Form submitted');
  }
}
