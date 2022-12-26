import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidateNumberOfFileUploaded(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        console.log(control)
        if (control.value.length > 5 || control.value.length === 0) {
            console.log("invalid Image files")
            return { invalidNumberOfFiles: true }
        }
        return null;
    }

}