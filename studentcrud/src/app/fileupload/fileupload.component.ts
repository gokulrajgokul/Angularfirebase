// import { Component, OnInit, inject, NgZone } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Database, ref, set, onValue, remove } from '@angular/fire/database';

// @Component({
//   selector: 'app-file-upload',
//   standalone: true,
//   imports: [CommonModule, FormsModule, ReactiveFormsModule],
//   templateUrl: './fileupload.component.html',
// })
// export class FileUploadComponent implements OnInit {
//   fileupload: FormGroup;
//   files: any = {};
//   internList: any[] = [];
//   uploadedFiles: any[] = [];
//   uploading: boolean = false;

//   fileFields = [
//     { key: 'sslc', label: 'SSLC Marksheet' },
//     { key: 'hsc', label: 'HSC Marksheet' },
//     { key: 'provisional', label: 'Provisional Certificate' },
//     { key: 'resume', label: 'Resume' },
//     { key: 'aadhar', label: 'Aadhar Card' },
//     { key: 'photo', label: 'Photo' },
//   ];

//   private ngZone = inject(NgZone);

//   constructor(private fb: FormBuilder, private db: Database) {
//     this.fileupload = this.fb.group({
//       internId: ['', Validators.required],
//     });
//   }

//   ngOnInit(): void {
//     const internRef = ref(this.db, 'intern/');
//     onValue(internRef, (snapshot) => {
//       this.ngZone.run(() => {
//         const data = snapshot.val();
//         this.internList = [];
//         if (data) {
//           for (let key in data) {
//             this.internList.push({ id: key, ...data[key] });
//           }
//         }
//       });
//     });

//     const docsRef = ref(this.db, 'documents/');
//     onValue(docsRef, (snapshot) => {
//       this.ngZone.run(() => {
//         const data = snapshot.val();
//         this.uploadedFiles = [];
//         if (data) {
//           for (let key in data) {
//             this.uploadedFiles.push({ id: key, ...data[key] }); // include ID
//           }
//         }
//       });
//     });
//   }

//   onFileChange(event: any, fileType: string): void {
//     const file = event.target.files[0];

//     if (!file) return;

//     const validTypes = ['image/png', 'image/jpeg'];
//     if (!validTypes.includes(file.type)) {
//       alert('Only PNG and JPG images are allowed.');
//       return;
//     }

//     if (file.size > 1 * 1024 * 1024) {
//       alert('File size should be less than 1MB.');
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = () => {
//       this.files[fileType] = {
//         name: file.name,
//         content: reader.result,
//       };
//     };
//     reader.readAsDataURL(file);
//   }

//   onSubmit() {
//     if (this.fileupload.invalid) {
//       alert('Please select an intern.');
//       return;
//     }

//     const selectedInternId = this.fileupload.get('internId')?.value;
//     const selectedIntern = this.internList.find(intern => intern.id === selectedInternId);

//     if (!selectedIntern) {
//       alert('Invalid intern selected.');
//       return;
//     }

//     const uploadData = {
//       studentName: selectedIntern.name,
//       domain: selectedIntern.domain,
//       ...this.files,
//     };

//     const path = `documents/${selectedInternId}`;
//     this.uploading = true;
//     set(ref(this.db, path), uploadData)
//       .then(() => {
//         alert('Files uploaded successfully!');
//         this.files = {};
//         this.fileupload.reset();
//       })
//       .catch((err) => alert('Upload failed: ' + err))
//       .finally(() => {
//         this.uploading = false;
//       });
//   }
//   onEdit(file: any) {
//     // Set the internId field in the form.
//     this.fileupload.patchValue({ internId: file.id });
  
//     // Reset the files object to clear previous selections.
//     this.files = {};
  
//     // Prepopulate the file data for each document, indicating that it's been previously uploaded.
//     this.fileFields.forEach(field => {
//       if (file[field.key]) {
//         this.files[field.key] = {
//           name: file[field.key].name || `${field.label} (previously uploaded)`,
//           content: file[field.key].content || '',
//         };
//       }
//     });
  
//     // If the file is pre-uploaded, add a note about it or other necessary details.
//     this.files = { ...this.files };
//   }
  
//   onDelete(file: any) {
//     if (confirm(`Are you sure you want to delete documents for ${file.studentName}?`)) {
//       const fileRef = ref(this.db, `documents/${file.id}`);
//       remove(fileRef)
//         .then(() => alert('Deleted successfully!'))
//         .catch((err) => alert('Delete failed: ' + err));
//     }
//   }
// }





import { Component, OnInit, inject, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Database, ref, set, onValue, remove } from '@angular/fire/database';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './fileupload.component.html',
})
export class FileUploadComponent implements OnInit {
  fileupload: FormGroup;
  files: any = {}; // Stores file data
  internList: any[] = []; // List of interns
  uploadedFiles: any[] = []; // List of uploaded files
  uploading: boolean = false;


  selectedInternId: string = ''; // For filter dropdown
  filteredFiles: any[] = [];
  
  isEditMode: boolean = false;  // Flag to check if we are in edit mode
  fileToEdit: any = null;

  // List of file fields (SSLC, HSC, etc.)
  fileFields = [
    { key: 'sslc', label: 'SSLC Marksheet' },
    { key: 'hsc', label: 'HSC Marksheet' },
    { key: 'provisional', label: 'Provisional Certificate' },
    { key: 'resume', label: 'Resume' },
    { key: 'aadhar', label: 'Aadhar Card' },
    { key: 'photo', label: 'Photo' },
  ];

  private ngZone = inject(NgZone);

  constructor(private fb: FormBuilder, private db: Database) {
    this.fileupload = this.fb.group({
      internId: ['', Validators.required],
    });
  }

  // ngOnInit(): void {
  //   const internRef = ref(this.db, 'intern/');
 
  //   const docsRef = ref(this.db, 'documents/');
  //   onValue(docsRef, (snapshot) => {
  //     this.ngZone.run(() => {
  //       const data = snapshot.val();
  //       this.uploadedFiles = [];
  //       if (data) {
  //         for (let key in data) {
  //           this.uploadedFiles.push({ id: key, ...data[key] });
  //         }
  //       }
  //       this.filteredFiles = [...this.uploadedFiles]; // Initialize filtered list
  //     });
  //   });


  //   onValue(docsRef, (snapshot) => {
  //     this.ngZone.run(() => {
  //       const data = snapshot.val();
  //       this.uploadedFiles = [];
  //       if (data) {
  //         for (let key in data) {
  //           this.uploadedFiles.push({ id: key, ...data[key] });
  //         }
  //       }
  //     });
  //   });
  // }

  ngOnInit(): void {
    // ✅ Fetch Intern List from Firebase
    const internRef = ref(this.db, 'intern/');
    onValue(internRef, (snapshot) => {
      this.ngZone.run(() => {
        const data = snapshot.val();
        this.internList = [];
        if (data) {
          for (let key in data) {
            this.internList.push({ id: key, ...data[key] });
          }
        }
      });
    });
  
    // ✅ Fetch Document Uploads
    const docsRef = ref(this.db, 'documents/');
    onValue(docsRef, (snapshot) => {
      this.ngZone.run(() => {
        const data = snapshot.val();
        this.uploadedFiles = [];
        if (data) {
          for (let key in data) {
            this.uploadedFiles.push({ id: key, ...data[key] });
          }
        }
        this.filterFiles();
      });
    });
  }
  
  filterFiles() {
    if (!this.selectedInternId) {
      this.filteredFiles = [...this.uploadedFiles];
    } else {
      this.filteredFiles = this.uploadedFiles.filter(
        file => file.id === this.selectedInternId
      );
    }
  }

  // Function to handle file changes (uploading files)
  onFileChange(event: any, fileType: string): void {
    const file = event.target.files[0];

    if (!file) return;

    const validTypes = ['image/png', 'image/jpeg'];
    if (!validTypes.includes(file.type)) {
      alert('Only PNG and JPG images are allowed.');
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      alert('File size should be less than 1MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.files[fileType] = {
        name: file.name,
        content: reader.result,
      };
    };
    reader.readAsDataURL(file);
  }

  // Handle form submission (uploading the files)
  onSubmit() {
    if (this.fileupload.invalid) {
      alert('Please select an intern.');
      return;
    }

    const selectedInternId = this.fileupload.get('internId')?.value;
    const selectedIntern = this.internList.find(intern => intern.id === selectedInternId);

    if (!selectedIntern) {
      alert('Invalid intern selected.');
      return;
    }

    const uploadData = {
      studentName: selectedIntern.name,
      domain: selectedIntern.domain,
      ...this.files, // Adding file data
    };

    const path = `documents/${selectedInternId}`;
    this.uploading = true;
    set(ref(this.db, path), uploadData)
      .then(() => {
        alert('Files uploaded successfully!');
        this.files = {}; // Reset files
        this.fileupload.reset(); // Reset the form
      })
      .catch((err) => alert('Upload failed: ' + err))
      .finally(() => {
        this.uploading = false;
      });
  }

  // Handle edit functionality
  onEdit(file: any) {
    this.isEditMode = true; // Set edit mode flag to true
    this.fileToEdit = file;  // Store the file to edit

    // Set the internId field in the form
    this.fileupload.patchValue({ internId: file.id });

    // Reset the files object to clear previous selections
    this.files = {};

    // Prepopulate the file data for each document
    this.fileFields.forEach(field => {
      if (file[field.key]) {
        this.files[field.key] = {
          name: file[field.key].name || `${field.label} (previously uploaded)`,
          content: file[field.key].content || '',
        };
      }
    });
  }
  // Handle delete functionality
  onDelete(file: any) {
    if (confirm(`Are you sure you want to delete documents for ${file.studentName}?`)) {
      const fileRef = ref(this.db, `documents/${file.id}`);
      remove(fileRef)
        .then(() => alert('Deleted successfully!'))
        .catch((err) => alert('Delete failed: ' + err));
    }
  }
}
