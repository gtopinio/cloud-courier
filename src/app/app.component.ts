import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('fileInput') fileInput! : ElementRef;
  files: File[] = [];
  uploadLink = 'https://node-file-upload-r8lh.onrender.com/upload';

  constructor(
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
  }

  handleFileSelect(fileInput: any){
    const files = fileInput?.files;

    if (files && files.length) {
      this.files = Array.from(files);
    }
  }

  uploadFiles(){
    if (this.files.length === 0) {
      alert('No files selected!');
      return
    } else {
      const formData = new FormData();
      this.files.forEach((file: any, index: any) => {
        formData.append('files', file, file.name);
      });
      this.http.post(this.uploadLink, formData)
        .subscribe((response: any) => {
          alert('Files uploaded successfully!');
          this.clearFileInput();
        },
        (error: any) => console.log("Error: " + error)
      );
    }
  }

  clearFileInput(){
    this.fileInput.nativeElement.value = null;
    this.files = [];
  }
}
