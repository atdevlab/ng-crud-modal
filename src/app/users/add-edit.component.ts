import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService, AlertService, MessageService } from '@app/_services';
import { MustMatch } from '@app/_helpers';
import { Message } from '@app/_models';

@Component({
  selector: 'user-add-edit',
  templateUrl: 'add-edit.component.html',
})
export class AddEditComponent implements OnInit {
  form: FormGroup;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  user = null;
  message: Message;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private msgSvc: MessageService
  ) {}

  ngOnInit() {
    this.initialize();
    this.msgSvc.receive().subscribe((msg) => {
      if (msg.header === 'user_data') {
        this.user = msg.content;
        this.initialize();
        console.log(msg);
      }
    });
  }

  initialize(): void {
    this.isAddMode = !this.user;

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group(
      {
        title: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        role: ['', Validators.required],
        password: [
          '',
          [
            Validators.minLength(6),
            this.isAddMode ? Validators.required : Validators.nullValidator,
          ],
        ],
        confirmPassword: [
          '',
          this.isAddMode ? Validators.required : Validators.nullValidator,
        ],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );

    if (!this.isAddMode) {
      this.userService
        .getById(this.user.id)
        .pipe(first())
        .subscribe((x) => this.form.patchValue(x));
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onClose() {
    this.msgSvc.send({ header: 'directive', content: 'x' });
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser() {
    this.userService
      .create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('User added', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['/users'], { relativeTo: this.route });
          window.location.reload();
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      });
    this.onClose();
  }

  private updateUser() {
    this.userService
      .update(this.user.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('User updated', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['/users'], { relativeTo: this.route });
          window.location.reload();
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      });
    this.onClose();
  }
}
