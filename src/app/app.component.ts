import { Component } from '@angular/core';
import { Domain } from '../app/models/domain';
import { GoDaddyService } from '../app/services/go-daddy.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ MessageService ]
})
export class AppComponent {
  
  domain: Domain[] = [];
  loading: boolean;

  val1 = 'Easy Login';

  available: boolean;

  step3 = false;

  checked: boolean;

  display: boolean = false;

  domainName: string;

  email: string;

  constructor(private goDaddy: GoDaddyService, private messageService: MessageService){}


  showDialog() {
    this.display = true;
}

  checkDomain(){
    this.goDaddy.getAvailableDomain('costaricaapuestas.com').subscribe( data => {
      console.log(data);
    } )
  }

  nextStep3(){
    this.step3 = true;
  }

  isAvailable(){

    let regExpDomain = /^\/?([^:\/\s]+)\.\/?([^:\/\s]+)$/
    
    if (regExpDomain.test(this.domainName)){
      console.log('valid');
      this.available = true;
    }else{
      this.messageService.add({key: 'tc', severity:'warn', summary: 'Format Error', detail:"please enter a domain with the following format: 'example.com'"});
      console.error('Invalid');
    }
    
  }


  submit(){
    
  let emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if(!emailPattern.test(this.email)){
      this.messageService.add({key: 'tc', severity:'warn', summary: 'Format Error', detail:"please enter a domain with the following format: 'example@example.com'"});
      console.error('Invalid');
    }else{
      console.log('validate');
    }


  }

}
