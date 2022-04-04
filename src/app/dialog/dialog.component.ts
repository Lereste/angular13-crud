import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  // freshnessList = ["Brand New", "Second Hand", "Refurbished"];
  studentForm !: FormGroup;
  actionBtn: string = "Save"

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  // Validation before add new product
  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      studentName: ['', Validators.required],
      gender: ['', Validators.required],
      birth: ['', Validators.required],
      updatedAt: new Date(),
      // freshness: ['', Validators.required],
      // price: ['', Validators.required],
      city: [''],
    })

    console.log(this.editData);

    // pass data to form edit
    if (this.editData) {
      // change text button from "save" to "update"
      this.actionBtn = "Update"
      this.studentForm.controls['studentName'].setValue(this.editData.studentName);
      this.studentForm.controls['gender'].setValue(this.editData.gender);
      this.studentForm.controls['birth'].setValue(this.editData.birth);
      this.studentForm.controls['updatedAt'].setValue(this.editData.updatedAt = new Date());
      this.studentForm.controls['city'].setValue(this.editData.city);
    }
  }

  addStudent() {
    // console.log(this.studentForm.value);
    // Check mode: Add/Edit Product
    if (!this.editData) {
      if (this.studentForm.valid) {
        this.api.postStudent(this.studentForm.value)
          .subscribe({
            next: (response) => {
              alert("Student added successfully!");

              // clear form to empty and close
              this.studentForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error while adding student!")
            }
          })
      }
    } else {
      this.updateStudent();
    }
  }

  updateStudent() {
    this.api.putStudent(this.studentForm.value, this.editData.id)
      .subscribe({
        next: (response) => {
          alert("Student update successfully!");
          // clear form to empty and close after updated
          this.studentForm.reset();
          this.dialogRef.close('update');
        },
        error: (error) => {
          alert("Error " + error.message);
        }
      })
  }


}
