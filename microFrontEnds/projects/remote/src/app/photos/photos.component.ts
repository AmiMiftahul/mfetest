import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Photo } from '../models/photos';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { PhotosService } from '../services/photos.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
})
export class PhotosComponent implements OnInit {
  displayColumns = [
    'select',
    'albumId',
    'id',
    'title',
    'url',
    'thumbnailUrl',
    'actions',
  ];

  dataSource = new MatTableDataSource<Photo>();

  selection = new SelectionModel<Photo>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private photosService: PhotosService, private router: Router) {}

  ngOnInit(): void {
    this.photosService.getPhotos().subscribe((photos) => {
      // console.log(photos);
      this.dataSource.data = photos;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // show local storage added photo
      let storedPhotos: Photo[] = JSON.parse(
        localStorage.getItem('add') || '[]'
      );
      if (storedPhotos.length > 0) {
        this.dataSource.data = [...this.dataSource.data, ...storedPhotos];
      }
      //show local storage edited photo
      let editedPhotos: Photo[] = JSON.parse(
        localStorage.getItem('edit') || '[]'
      );

      if (editedPhotos.length > 0) {
        const revised = [...this.dataSource.data];
        //loop
        for (let i = 0; i < editedPhotos.length; i++) {
          const photo = editedPhotos[i];
          revised[photo.id - 1] = photo;
        }
        this.dataSource.data = revised;

        //forEach
        // editedPhotos.forEach((photo) => {
        //   revised[photo.id - 1] = photo;
        // });
        // this.dataSource.data = revised;
      }

      let deletedPhotos: Number[] = JSON.parse(
        localStorage.getItem('deleted') || '[]'
      );

      console.log(deletedPhotos);
      if (deletedPhotos.length > 0) {
        this.dataSource.data = this.dataSource.data.filter(
          (each) => deletedPhotos.indexOf(each.id) === -1
        );
      }
      // let deletedPhotos: Photo[] =JSON.parse(localStorage.removeItem())
    });
  }

  selectHandler(row: Photo): void {
    this.selection.toggle(row);
  }

  async customNavigate(url: string): Promise<void> {
    const fixedUrl = 'photos/' + url;
    // await this.router.navigateByUrl('fix');
    await this.router.navigateByUrl(fixedUrl);
    // window.location.href = arrayUrl[0];
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
}
