import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-lc';
  loginform: FormGroup;
  isLoading: boolean;
  submitted: boolean;
  hasError: boolean;
  hide = true;


  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
  ) { };

  ngOnInit() {
    this.initform();
  }
  initform() {
    this.loginform = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern(/^\s*[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}\s*$/i)])],
      password: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
        ]),
      ],
    })
  }

  submit() {
    this.isLoading = true;
    this.submitted = true;
    const controls = this.loginform.controls;
    if (this.loginform.invalid) {
      Object.keys(controls).forEach(controlName => {
        controls[controlName].markAsTouched()
      });
      this.isLoading = false;
      this.toastr.error("Your Form is invalid");
      return false;
    } else {
      this.toastr.success("Your Form is valid");
      return true;
    }
  }
}
