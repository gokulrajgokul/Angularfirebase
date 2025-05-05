// export interface file {
//     sslc:file ;
//     hsc: file;
//     provisional:file ;
//     aadhar: file;
//     resume:file ;
//     photo:file ;
//   }
  

export interface FileUploads {
  sslc: File | null;
  hsc: File | null;
  provisional: File | null;
  aadhar: File | null;
  resume: File | null;
  photo: File | null;
}
