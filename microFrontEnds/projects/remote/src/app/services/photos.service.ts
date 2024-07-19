import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../models/photos';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/photos/';
  constructor(private httpClient: HttpClient) {}

  // CRUD FUNCTIONALITY

  // FOR ADD
  createPhoto(photo: Photo): Observable<Photo> {
    return this.httpClient.post<Photo>(this.apiUrl, photo);
  }

  // FOR VIEW ALL
  getPhotos(): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(this.apiUrl);
  }

  // FOR VIEW BY ID
  getPhotosById(id: Number): Observable<Photo> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Photo>(url);
  }

  // FOR EDIT
  updatePhoto(photo: Photo): Observable<Photo> {
    const url = `${this.apiUrl}/${photo.id}`;
    return this.httpClient.put<Photo>(url, photo);
  }

  // FOR DELETE
  deletePhoto(id: Number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
