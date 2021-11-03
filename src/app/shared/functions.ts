import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
const  URL_API_CONFIRMATION_MAIL = environment. URL_API_CONFIRMATION_MAIL;

export function CheckYourMails(userAgent: {mobile: boolean, os: string, email: string | undefined}): void {
    Swal.fire({
      title: 'Vous devez valider votre compte !',
      text: "Vous avez reçu un email pour la validation de votre compte",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuer',
      cancelButtonText: 'Plus tard',
    }).then((result) => {
      if (result.isConfirmed && !userAgent.mobile) {
        Swal.fire({
          title: '<strong>Choisissez votre service mail</strong>',
          icon: 'info',
          html:
            `<div class="flex-space"> 
            <a href="https://mail.google.com/mail/u/0/#inbox"><img class="logo" src="../../assets/logger-module/gmail_logo.jpg" ></a>
            <a href="https://outlook.live.com/mail/0/inbox"><img class="logo" src="../../assets/logger-module/outlook.jpg">
            <a href="https://mail.yahoo.com/d/folders/1?.intl=fr&.lang=fr-FR"><img class="logo" src="../../assets/logger-module/yahoo.jpg"></a></div>`,
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          backdrop: true,
          confirmButtonText:
            "Me renvoyer un autre email",
          cancelButtonText: 'Quitter',
        }).then((result)=>{    
          if(result.isConfirmed){
            ShowInputAlert( URL_API_CONFIRMATION_MAIL, userAgent.email).then((res)=>{
              console.log("then.showInput",res);
              MakeAlert("Rendez-vous dans votre boîte mail pour valider votre compte", "success", 3000)
            }).catch((error)=>{
              MakeAlert("Un problème est survenu...", "error", 3000)
            })
          }else{
            return
          }
        })
      }else if(result.isConfirmed && userAgent.mobile && userAgent.os === "AndroidOS"){
        Swal.fire({
          title: '<strong>Choisissez votre service mail</strong>',
          icon: 'info',
          html:
            `<div class="flex-space"> 
            <a href="http://play.google.com/store/apps/details?id=<packageId>"><img class="logo" src="../../assets/logger-module/gmail_logo.jpg" ></a>
            <a href="http://play.google.com/store/apps/details?id=<packageId>"><img class="logo" src="../../assets/logger-module/outlook.jpg">
            <a href="http://play.google.com/store/apps/details?id=<packageId>"><img class="logo" src="../../assets/logger-module/yahoo.jpg"></a></div>`,
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          backdrop: true,
          confirmButtonText:
          'Me renvoyer un autre email',
          cancelButtonText: 'Quitter',
        }).then((result)=>{
          if(result.isConfirmed){
            ShowInputAlert( URL_API_CONFIRMATION_MAIL,  userAgent.email).then((res)=>{
              console.log("then.showInput",res);
              MakeAlert("Rendez-vous dans votre boîte mail pour valider votre compte", "success", 3000)
            }).catch((error)=>{
              MakeAlert("Un problème est survenu...", "error", 3000)
            })
          }else{
            return
          }
        })
      }else if(result.isConfirmed && !userAgent.mobile){
        Swal.fire({
          title: '<strong>Choisissez votre service mail</strong>',
          icon: 'info',
          html:
            `<div class="flex-space"> 
            <a href=" https://apps.apple.com/us/app/<appId>"><img class="logo" src="../../assets/logger-module/gmail_logo.jpg" ></a>
            <a href=" https://apps.apple.com/us/app/<appId>"><img class="logo" src="../../assets/logger-module/outlook.jpg">
            <a href=" https://apps.apple.com/us/app/<appId>"><img class="logo" src="../../assets/logger-module/yahoo.jpg"></a></div>`,
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: false,
          backdrop: true,
          confirmButtonText:
            "Me renvoyer un autre email",
            cancelButtonText: 'Quitter',
        }).then((result)=>{
          console.log(result);
          
          if(result.isConfirmed){
            ShowInputAlert( URL_API_CONFIRMATION_MAIL,  userAgent.email).then((res)=>{
              console.log("then.showInput",res);
              MakeAlert("Rendez-vous dans votre boîte mail pour valider votre compte", "success", 3000)
            }).catch((error)=>{
              MakeAlert("Un problème est survenu...", "error", 3000)
            })
          }else{
            return;
          }
        })
      }else{
        return
      }
    })
 
}
export function MakeAlert(
  message: string,
  icon: 'success' | 'error' | 'info', timer?: number
): Promise<any> {
  return Swal.fire({
    position: 'center',
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: timer ? timer : 1500 ,
  });
}
export function ShowInputAlert( urlApi: string, email?: string): Promise<any> {
  return Swal.fire({
    title: 'Entrer votre email',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off',
      value: email ? email : ""
    },
    showCancelButton: true,
    confirmButtonText: 'envoyer',
    showLoaderOnConfirm: true,
    backdrop: true,
    preConfirm: (email: string) => {
      return fetch(urlApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      })
        .then((response: Response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .catch((error) => {
          Swal.showValidationMessage(`Votre requête a échoué: ${error}`);
        });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  })
}

export const myValidators = {
  validatorPassword: (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const reg = '^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$';
      const regexp = new RegExp(reg);
      return regexp.test(control.value) ? null : { error: true };
    };
  },
  validatorText: (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const reg = '^[^<>%$#*µ§]*$';
      const regexp = new RegExp(reg);
      return regexp.test(control.value) ? null : { notValid: true };
    };
  },
  validatorTel: (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const reg = '^(0|\\+33)[1-9]([-. ]?[0-9]{2}){4}$';
      const regexp = new RegExp(reg);
      return regexp.test(control.value) ? null : { notValid: true };
    };
  },
  forEachControlOfForm(form: FormGroup): void {
    const allControls = form.controls;
    for (const control in allControls) {
      if (allControls[control].invalid) {
        allControls[control].markAsTouched();
      }
    }
  },
};
