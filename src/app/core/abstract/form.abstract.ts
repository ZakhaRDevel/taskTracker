import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable()
export abstract class Form {
  @Output() sentSuccess: EventEmitter<any> = new EventEmitter();
  @Output() sentFailed: EventEmitter<any> = new EventEmitter();

  protected requestSubscription = new Subscription();
  protected request$: Observable<any> = of([]);

  isSubmitted = false;
  isSubmit = false;
  isSent = false;
  isShowError = false;
  reset = false;

  abstract formGroup: FormGroup;

  abstract prepareRequest(): Observable<any>;

  get input(): { [p: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  control(key: string): FormControl {
    return this.formGroup.get(key) as FormControl;
  }

  subControl(key: string, key2: string): FormControl {
    return this.control(key).get(key2) as FormControl;
  }

  submitPrepare() {
    this.isSubmit = true
    this.formGroup.setErrors(null);
    Object.keys(this.formGroup.getRawValue()).forEach((field) => {
      this.input[field].updateValueAndValidity();
    });
    this.formGroup.markAllAsTouched();
  }

  submit() {
    this.submitPrepare();
    if (this.formGroup.valid) {
      this.isSubmitted = true;
      this.isShowError = false;
      this.send();
    }
  }

  send() {
    if (this.isSent) {
      return;
    }

    this.request$ = this.prepareRequest();
    this.isSent = true;
    this.requestSubscription = this.request$

      .pipe(finalize(() => this.onRequestFinal()))
      .subscribe({
        next: (response) => this.onRequestSuccess(response),
        error: (error) => this.onRequestFailed(error)
      });
  }

  onRequestSuccess(value: any): void {
    this.sentSuccess.emit(value);

    if (this.reset) {
      this.formGroup.reset();
    }
  }

  onRequestFailed(errorResponse: HttpErrorResponse): void {
    this.isShowError = true;
    this.setFormErrors(errorResponse);
    this.sentFailed.emit(this.formGroup.errors);
  }

  onRequestFinal(): void {
    this.isSubmitted = false;
    this.isSent = false;
    this.requestSubscription.unsubscribe();
  }

  hasValue(control: FormControl): boolean {
    return !!control.value;
  }

  clear(control: FormControl) {
    control.setValue('');
  }

  errors(control: FormControl): string[] {
    const errors: string[] = [];

    if (control.errors) {
      Object.keys(control.errors).forEach((key: string) => {
        errors.push(key);
      });
    }

    return errors;
  }

  setFormErrors(errorResponse: HttpErrorResponse) {
    const generalErrors: any = {};

    // Nest Errors Handler
    if (errorResponse.error && errorResponse.error.message?.length) {
      for (const message of errorResponse.error.message) {
        const control = this.control(message.property);

        if (control) {
          const error: any = {};
          error[message.value] = true;
          control.setErrors(error);
        } else {
          generalErrors[message.property] = true;
        }
      }
    }

    if (
      errorResponse.status === 0 ||
      errorResponse.status === 403 ||
      errorResponse.status === 404 ||
      errorResponse.status >= 500
    ) {
      generalErrors.server = true;
    }

    this.formGroup.setErrors(generalErrors);
  }
}
