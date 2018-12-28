import { Component } from '@angular/core';
import { Domain } from '../app/models/domain';
import { Request } from '../app/models/request';
import { GoDaddyService } from '../app/services/go-daddy.service';
import { MessageService } from 'primeng/api';
import { element } from '../../node_modules/protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {

  request: Request;
  requestData: Request[] = [];

  domain: Domain[] = [];
  loading: boolean;

  design = 'Extended Reality';

  available: boolean;
  showDesigns = true;

  step3 = false;

  checkedTerms: boolean;

  display: boolean = false;

  domainName: string;

  email = "";

  colorsText: string;
  sportsText: string;
  teamsText: string;

  constructor(private goDaddy: GoDaddyService, private messageService: MessageService) {
    this.request = new Request();
  }


  showDialog() {
    this.display = true;
  }

  checkDomain() {
    this.goDaddy.getAvailableDomain('costaricaapuestas.com').subscribe(data => {
      console.log(data);
    })
  }

  nextStep3() {
    this.step3 = true;
  }

  isAvailable() {

    let regExpDomain = /^\/?([^:\/\s]+)\.\/?([^:\/\s]+)$/

    if (regExpDomain.test(this.domainName)) {
      console.log('valid');
      this.available = true;
    } else {
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Format Error', detail: "please enter a domain with the following format: 'example.com'" });
      console.error('Invalid');
    }

  }


  submit() {

    this.request = new Request();

    let emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (!emailPattern.test(this.email) || this.email == "") {
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Format Error', detail: "please enter an email with the following format: 'example@example.com'" });
      console.error('Invalid');
    } else {
      if (!this.checkedTerms) {
        this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Terms and Conditions', detail: "You have to accept terms and conditions" });
      } else {
        this.request.Colors = this.colorsText.toString();
        this.request.Sports = this.sportsText.toString();
        this.request.Teams = this.teamsText.toString();
        this.request.DomainName = this.domainName;
        this.request.DesignName = this.design;
        this.request.RequesterEmail = this.email;
        this.request.RequestDate = new Date();
        this.request.IdAgent = 545;

        this.requestData.push(this.request);

        console.log(this.requestData);
        console.log('validate');
      }
    }

    /*
        console.log('Colors: ' + this.colorsText);
        console.log('Sports: ' + this.sportsText);
        console.log('Teams: ' + this.teamsText);
    */

  }


}
